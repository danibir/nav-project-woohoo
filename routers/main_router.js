const express = require('express')

const controller = require('../controllers/main_controller.js')

const router = express.Router()

const {auth}= require("../middleware/auth_middleware.js")

router.get("/",controller.index_render)
router.get("/findData",controller.findData_render)
router.get("/rdf",controller.rdf_render)
router.get('/info/:name', controller.info_render);

module.exports = router