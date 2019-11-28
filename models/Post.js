module.exports = (sequelize, type) => {
  return sequelize.define(
    'houses',
    {
      type_of_house: type.STRING,
      living_space: type.INTEGER,
      number_of_rooms: type.FLOAT,
      rent: type.INTEGER,
      construction_year: type.INTEGER,
      street: type.STRING,
      zipcode: type.INTEGER,
      region: type.STRING,
      tag: type.STRING,
      latitude: type.FLOAT,
      longitude: type.FLOAT
    },
    { timestamps: false }
  )
}
