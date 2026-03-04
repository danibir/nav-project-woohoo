const express = require('express')
const controller = require('../controllers/admin_controller.js')
const router = express.Router()

const auth = require("../middleware/auth_middleware.js")


//Routes
router.use('/', controller.index_get)

module.exports = router