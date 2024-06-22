const router = require("express").Router();

const { checkAuth } = require("../middlewares/authSesion");
const { checkRol } = require("../middlewares/rol");
const {
  userRegister,
  userLogin,
  renewSesion,
  getAllUser,
  getOneUser,
  updatePassword,
  userUpdateDatosPersonales,
} = require("../controller/users");
const {
  validatorUserRegister,
  validatorUserLogin,
  validatorUserId,
  validatorChangePassword,
  validatorUserDatosPersonales,
} = require("../validators/auth");

router.get("/", getAllUser);
router.get("/renew", [checkAuth], renewSesion);
router.get("/:id", [validatorUserId], getOneUser);
router.post("/login", [validatorUserLogin], userLogin);
router.post("/register", [validatorUserRegister], userRegister);
router.put(
  "/datospersonales/:id",
  [validatorUserId, validatorUserDatosPersonales],
  userUpdateDatosPersonales
);
router.put(
  "/changepassword/:id",
  [
    checkAuth,
    checkRol(["master", "sistemas", "user"]),
    validatorUserId,
    validatorChangePassword,
  ],
  updatePassword
);

module.exports = router;
