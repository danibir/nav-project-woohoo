const express = require('express')
const controller = require("../controllers/auth_controller.js")
const router = express.Router()

const mid = require('../middleware/main_middleware.js')

router.get('/log-out', controller.log_out)
router.get("/sign-in", mid.dbReject503, controller.sign_in_render);
router.post("/sign-in", mid.dbReject503, controller.sign_in);
router.get("/sign-up", mid.dbReject503, controller.sign_up_render);
router.post("/sign-up", mid.dbReject503, controller.sign_up);

module.exports = router