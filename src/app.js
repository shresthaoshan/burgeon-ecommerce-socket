const express = require('express')
const next = require('next')

// initiate and config NextJs
const nextServer = next({
    dir: './client/', // relative to root directory 🤷‍♂️
    dev: process.env.NODE_ENV != 'production'
})
const handle = nextServer.getRequestHandler()

// initiate ExpressJs server
const app = express()

// middleware defs
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// some configs
app.use(express.static('public'))

// route defs
app.use('/api', require('./routes/api'))

// make use of NextJs
nextServer.prepare().then(() => {
    app.get('*', (req, res) => handle(req, res))
})

module.exports = app
