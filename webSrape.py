import requests
from bs4 import BeautifulSoup
import re
import csv

# Collect first page of list
# list_of_pages = requests.get("https://www.immobilienscout24.de/Suche/S-T/Wohnung-Miete/Fahrzeitsuche/Frankfurt_20am_20Main/-/-95993/2244895/-/1276007004/60?enteredFrom=result_list")

# Create a BeautifulSoup object
# soup_for_list = BeautifulSoup(list_of_pages.text, 'html.parser')


result = []
header = ["type_of_house", "living_space", "number_of_rooms", "rent", "construction_year", "street", "zipcode", "region", "tag"]
result.append(header)

def page_spider():
    for i in range(0, 143):
        link = "https://www.immobilienscout24.de/Suche/S-"
        link += str(i)
        link += "/Wohnung-Miete/Fahrzeitsuche/Frankfurt_20am_20Main/-/-95993/2244895/-/1276007004/60?enteredFrom=result_list"
        page = requests.get(link)
        soup_for_list = BeautifulSoup(page.text, 'html.parser')
        list_spider(soup_for_list)

def list_spider(soup_for_list):
    lst = []
    for paragraph in soup_for_list.find_all('a'):
        if '/expose/' in str(paragraph.get("href")):
            lst.append(paragraph.get('href'))

    lst = list(set(lst))

    for item in lst:
        page = requests.get("https://www.immobilienscout24.de"+item)
        soup = BeautifulSoup(page.text, 'html.parser')

        try:
            type_of_house = soup.find(class_= 'is24qa-typ grid-item three-fifths').text.strip()
        except:
            type_of_house = ''
        try:
            living_space = soup.find(class_='is24qa-wohnflaeche-ca').text.strip()
        except:
            living_space = ''
        try:
            number_of_rooms = int(soup.find(class_='is24qa-zimmer grid-item three-fifths').text.strip())
        except:
            number_of_rooms = ''
        try:
            rent = soup.find(class_='is24qa-gesamtmiete').text.strip()
        except:
            rent = ''
        try:
            construction_year = soup.find(class_='is24qa-baujahr').text.strip()
        except:
            construction_year = ''
        try:
            street = soup.find(class_='block font-nowrap print-hide').text.strip().rstrip(',')
        except:
            street = ''
        try:
            zip_region = soup.find(class_='zip-region-and-country').text.strip()
            zipcode = re.sub('[^\d]+', '', zip_region).strip()
            region = re.sub('[\d]+', '', zip_region).strip()
        except:
            zipcode = ''
            region = ''

        living_space = int(re.sub('[^\d,]+','',living_space).split(",")[0])
        rent = int(re.sub('[^\d,]+', '', rent).split(",")[0])

        new_list = [type_of_house, living_space, number_of_rooms, rent, construction_year, street, zipcode, region, item]
        result.append(new_list)

    with open("data.csv", "w", newline="") as f:
        writer = csv.writer(f)
        writer = writer.writerows(result)

page_spider()

import requests 
import urllib.parse
import pandas as pd 
from time import sleep

df = pd.read_csv("data.csv", nrows = 2450)
URL1 = 'https://api.opencagedata.com/geocode/v1/json?q='
URL3 = '&key=71b9900ab09246f99610ef8cfb212c2e&language=en&pretty=1'
lst_lat = []
lst_lng = []

for index, row in df.iterrows():
    query = str(row['street']) +  ", " + str(row['zipcode']) + ", " + str(row['region'])
    URL2 = urllib.parse.quote(query)
    r = requests.get(URL1+URL2+URL3)
    data = r.json()
    try: 
        latitude = data['results'][0]['geometry']['lat']
        longitude = data['results'][0]['geometry']['lng']
    except: 
        latitude = ''
        longitude = ''
    lst_lat.append(latitude)
    lst_lng.append(longitude)
    sleep(1)
df["latitude"] = lst_lat
df["longitude"] = lst_lat
df
