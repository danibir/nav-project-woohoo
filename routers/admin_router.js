const express = require('express')
const controller = require('../controllers/admin_controller.js')
const router = express.Router()

const auth = require("../middleware/auth_middleware.js")
const mid = require('../middleware/main_middleware.js')


//Routes
router.use(auth.authRestrain)
router.use(mid.dbReject503)
router.get('/', controller.index_get)
router.get('/create', controller.create_get)
router.post('/create', controller.create_post)

module.exports = router