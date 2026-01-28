const router = require("express").Router();
const controller = require("../controllers/auth_controller.js")
router.get("/sign-in", controller.sign_in_render);

router.post("/sign-in", controller.sign_in);

router.get("/sign-up", controller.sign_up_render);

router.post("/sign-up", controller.sign_up);




module.exports = router