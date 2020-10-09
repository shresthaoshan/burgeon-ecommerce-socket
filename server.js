// load and prepare database connection
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false
    }).catch(error => {
        console.log("Error connecting database:\n", error)
        process.exit() // moving on w/o database connection does not make sense
    })

mongoose.connection.once('open',
    () => console.log("Database connected and ready."))

mongoose.connection.on('error',
    error => console.log("There was a problem with database:\n", error))

// load models and install
require('./src/models/User')

require('./src/models/Product')
require('./src/models/Category')
require('./src/models/Cart')
require('./src/models/Inventory')

// prepare and initiate server
const port = process.env.PORT || 3000

require('./src/app').listen(port,
    () => console.log(`Server active at port: ${port}\n`))
