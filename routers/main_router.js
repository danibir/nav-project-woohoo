import express from 'express';

import controller from '../controllers/main_controller.js';

const router = express.Router();

router.get("/",controller.index_render);
router.get("/findData",controller.findData_render);
router.get("/rdf",controller.rdf_render)

export default router;