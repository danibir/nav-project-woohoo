const express = require('express')
const mongoose = require('mongoose')
const os = require('os')

const router = require('./routers/main_router')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(3000, () => {
  console.log('Server is running on port 3000 and on', os.hostname())
})