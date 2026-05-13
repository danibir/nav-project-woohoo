const express = require('express')
const controller = require("../controllers/auth_controller.js")
const router = express.Router()

const mid = require('../middleware/main_middleware.js')

router.get('/log-out', controller.log_out)
router.get("/sign-in", mid.dbReject503, controller.login_get)
router.post("/sign-in", mid.dbReject503, controller.login_post)
router.get("/sign-up", mid.dbReject503, controller.signup_get)
router.post("/sign-up", mid.dbReject503, controller.signup_post)

module.exports = router