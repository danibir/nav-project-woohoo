const express = require('express')
const controller = require('../controllers/api_controller.js')
const router = express.Router()

router.get('/', controller.get_all)
router.get('/rdf', controller.get_all_rdf)

module.exports = router