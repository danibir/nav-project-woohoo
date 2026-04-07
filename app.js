//Requirered Modules
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser");
const os = require('os');
const app = express()
const morgan = require('morgan')
require("dotenv").config();

//Handlers
const db = require('./handlers/mongoDbHandler')

//Routes
const default_router = require('./routers/main_router')
const auth_router = require("./routers/auth_router")
const admin_router = require("./routers/admin_router")

//Middleware
const auth = require('./middleware/auth_middleware')
const middleware = require('./middleware/main_middleware')
const handler = require('./handlers/helperware')

//Options config
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(middleware.setLocals)


//Connecting to MongoDb and Starting server!!
db.connectToMongoDb()
.then(()=> {
  app.use(middleware.dbSetStatus(true))
})
.catch(()=> {
  app.use(middleware.dbSetStatus(false))
})
.finally(()=>{
  app.use(auth.authCheck)
  app.use(default_router)
  app.use(auth_router)
  app.use('/admin', admin_router)
  app.use((req, res) => {
    handler.renderErrorPage(res, 404, 'Page not found.')
  })

  app.listen(3000, () => {
    console.log('Server is running on port 3000 and on', os.hostname())
  })
})