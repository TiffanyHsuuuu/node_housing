const express = require('express')
const app = express()
const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://localhost:5432/housing', {
  logging: false,
  dialect: 'postgres'
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established succefully!')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

const Post = sequelize.define('post', {
  type_of_house: {
    type: Sequelize.STRING
  },
  living_space: {
    type: Sequelize.INTEGER
  },
  number_of_rooms: {
    type: Sequelize.FLOAT
  },
  rent: {
    type: Sequelize.INTEGER
  },
  construction_year: {
    type: Sequelize.INTEGER
  },
  street: {
    type: Sequelize.STRING
  },
  zipcode: {
    type: Sequelize.INTEGER
  },
  region: {
    type: Sequelize.STRING
  },
  tag: {
    type: Sequelize.STRING
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  }
})

Post.sync({ force: true }).then(async () => {
  await Post.create({
    type_of_house: 'Etagenwohnung',
    living_space: 62,
    number_of_rooms: 2.0,
    rent: 1350,
    construction_year: 2011,
    street: 'Fritzlarer Strasse 9',
    zipcode: 60487,
    region: 'Frankfurt am Main, Bockenheim',
    tag: '/expose/114435895',
    latitude: 50.11552,
    longitude: 50.11552
  })
  Post.findAll().then(post => {
    console.log('All posts:', JSON.stringify(post, null, 4))
  })
})

const Port = 8000
app.listen(Port, () => {
  console.log('Running on port' + Port)
})
