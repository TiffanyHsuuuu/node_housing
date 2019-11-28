import { useState, useEffect } from 'react'
import api from '../utils/api'

export default () => {
  const [type_of_house, set_type_of_house] = useState([])
  const [living_space, set_living_space] = useState([])
  const [number_of_rooms, set_number_of_rooms] = useState([])
  const [rent, set_rent] = useState([])
  const [construction_year, set_construction_year] = useState([])
  const [street, set_street] = useState([])
  const [zipcode, set_zipcode] = useState([])
  const [region, set_region] = useState([])
  const [latitude, set_latitude] = useState([])
  const [longitude, set_longitude] = useState([])

  useEffect(() => {
    api.get('/')
  })

  return [
    type_of_house,
    living_space,
    number_of_rooms,
    rent,
    construction_year,
    street,
    zipcode,
    region,
    latitude,
    longitude
  ]
}
