const { Router } = require("express");
const { register, login, renewSesion } = require("../controller/users");
const { validatorLogin, validatorRegister } = require("../validators/auth");
const { checkAuth } = require("../middlewares/authSesion");
const router = Router();

// router.post("/register", register);
router.post("/register", [validatorRegister], register);

router.post("/login", [validatorLogin], login);

router.get("/renew", [checkAuth], renewSesion);

module.exports = router;
