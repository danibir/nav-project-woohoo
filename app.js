const express = require('express')
const mongoose = require('mongoose')

const cookieParser = require("cookie-parser");

const os = require('os')
const db = require('./handlers/mongoDbHandler')

const default_router = require('./routers/main_router')

const auth_router = require("./routers/auth_router")

const app = express()

require("dotenv").config();

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.json())

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))

db.connectToMongoDb()
.then(()=>{
  app.use(default_router)

  app.use(auth_router)

  app.listen(3000, () => {
    console.log('Server is running on port 3000 and on', os.hostname())
  })
})