import express from 'express';

import controller from '../controllers/main_controller.js';

const router = express.Router();

router.get("/",controller.index_render)

export default router;