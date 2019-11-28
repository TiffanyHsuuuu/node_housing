const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./Routes/routes')

app.use(cors())
app.use(bodyParser.json())
routes(app)

const Port = 8000
app.listen(Port, () => {
  console.log('Running on port' + Port)
})

module.exports = app
