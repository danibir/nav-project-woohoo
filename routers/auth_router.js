const router = require("express").Router();
const controller = require("../controllers/auth_controller.js")
router.get("/sign-in", controller.sign_in_render);

router.post("/sign-in", controller.sign_in);




module.exports = router