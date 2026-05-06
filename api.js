//Requirered Modules
const express = require('express')
const mongoose = require('mongoose')
const os = require('os')
const app = express()
const morgan = require('morgan')
require("dotenv").config()

//Handlers
const db = require('./handlers/mongoDbHandler')

//Routes
const router_api = require('./routers/api_router')

//Middleware
const middleware = require('./middleware/main_middleware')
const handler = require('./handlers/helperware')

//Options config
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//stuff idk
const Data = require('./models/main_model')

//Connecting to MongoDb and Starting server!!
db.connectToMongoDb()
.then(()=> {
    app.use(middleware.dbSetStatus(true))
})
.catch((err)=> {
    console.log(err)
    app.use(middleware.dbSetStatus(false))
    app.use((req, res) => {
        res.status(503).write('Database inaccessible')
    })
})
.finally(()=>{
    app.use('/', router_api)

    app.listen(3000, () => {
        console.log('Server is running on port 3000 and on', os.hostname())
    })  
})