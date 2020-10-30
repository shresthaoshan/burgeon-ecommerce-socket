const express = require('express')
const next = require('next')
const http = require('http')

// initiate and config NextJs
const nextServer = next({
    dir: './client/', // relative to root directory 🤷‍♂️
    dev: process.env.NODE_ENV != 'production'
})
const handle = nextServer.getRequestHandler()

// initiate ExpressJs server
const app = express()

// routes
const api = require('./routes/api')

// middleware defs
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = http.createServer(app)

// some configs
app.use(express.static('public'))

// route defs
app.use('/api', api)

// make use of NextJs
nextServer.prepare().then(() => {
    app.get('*', (req, res) => handle(req, res))
})

module.exports = server