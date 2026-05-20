const express = require('express')

const controller = require('../controllers/main_controller.js')

const router = express.Router()

const auth = require("../middleware/auth_middleware.js")
const mid = require('../middleware/main_middleware.js')

//Routes
router.get("/", controller.index_render)
router.get("/findData", mid.addNavItems('search'), controller.findData_render)
router.get("/rdf", controller.rdf_render)
router.get('/oversikt/:name', mid.dbReject503, controller.overview_render);
router.get('/detaljer/:name', mid.dbReject503, controller.details_render);


module.exports = router