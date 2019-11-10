require('dotenv').config()

const express = require('express')

const app = express()
const morgan = require('morgan')

const fs = require('fs')

const dir = './uploads'
const http = require('http')
const config = require('./config/config-env')
const routes = require('./routes')
const configExpress = require('./config/express')


if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}
// set port
const port = process.env.PORT || 3000

// Connect to database

const server = http.createServer(app)


// use morgan to log requests to the console
if (config.env === 'local' || config.env === 'develop') {
  app.use(morgan('dev'))
}

configExpress(app)
routes(app)

app.get('/', (request, response) => {
  response.send('Hello World!')
})

server.listen(port, () => {
  console.log('Stove server listening on port: ', port)
})
