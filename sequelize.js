const Sequelize = require('sequelize')
const PostModel = require('./Models/Post')

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

const Post = PostModel(sequelize, Sequelize)

sequelize.sync()

module.exports = {
  Post,
  sequelize
}

// Post.sync({ force: true }).then(async () => {
//     await Post.create({
//       type_of_house: 'Etagenwohnung',
//       living_space: 62,
//       number_of_rooms: 2.0,
//       rent: 1350,
//       construction_year: 2011,
//       street: 'Fritzlarer Strasse 9',
//       zipcode: 60487,
//       region: 'Frankfurt am Main, Bockenheim',
//       tag: '/expose/114435895',
//       latitude: 50.11552,
//       longitude: 50.11552
//     })
//     Post.findAll().then(post => {
//       console.log('All posts:', JSON.stringify(post, null, 4))
//     })
//   })
