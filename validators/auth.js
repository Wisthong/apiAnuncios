const { check } = require("express-validator");
const { validateResult } = require("../helpers/handleValidator");

const validatorUserRegister = [
  check("nombre", "El campo nombre es obligatorio")
    .exists()
    .notEmpty()
    .isLength({ max: 100 })
    .withMessage("Maximo 100 caracteres"),
  check("apellido", "El campo apellido es obligatorio")
    .exists()
    .notEmpty()
    .isLength({ max: 100 })
    .withMessage("Maximo 100 caracteres"),
  check("correo_electronico", "El campo correo_electronico es obligatorio")
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage("Debes introducir una dirección de correo valida"),
  check("documento", "El campo número de documento es obligatorio")
    .exists()
    .notEmpty()
    .isNumeric(),
  check("contrasena", "El campo contrasena es obligatorio")
    .exists()
    .notEmpty()
    .isLength({ min: 5, max: 40 })
    .withMessage("La contraseña debe tener min 5 caracteres, max 40 caracteres")
    .toLowerCase(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validatorUserLogin = [
  check("correo_electronico", "El campo correo_electronico es obligatorio")
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage("Debes introducir una dirección de correo valida"),
  check("contrasena", "El campo contrasena es obligatorio")
    .exists()
    .notEmpty()
    .isLength({ min: 5, max: 40 })
    .withMessage("La contraseña debe tener min 5 caracteres, max 40 caracteres")
    .toLowerCase(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validatorUserDatosPersonales = [
  check("nombre", "El campo nombre es obligatorio")
    .exists()
    .notEmpty()
    .isLength({ min: 5, max: 40 })
    .withMessage("Debes introducir un nombre por favor"),
  check("apellido", "El campo apellido es obligatorio")
    .exists()
    .notEmpty()
    .isLength({ min: 5, max: 40 })
    .withMessage(
      "La contraseña debe tener min 5 caracteres, max 40 caracteres"
    ),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validatorChangePassword = [
  check("contrasena", "El campo contrasena es obligatorio")
    .exists()
    .notEmpty()
    .isLength({ min: 5, max: 40 })
    .withMessage("La contraseña debe tener min 5 caracteres, max 40 caracteres")
    .toLowerCase(),
  check("newcontrasena", "El campo newcontrasena es obligatorio")
    .exists()
    .notEmpty()
    .isLength({ min: 5, max: 40 })
    .withMessage("La contraseña debe tener min 5 caracteres, max 40 caracteres")
    .toLowerCase(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validatorUserId = [
  check("id", "Debes ingresar un id valido").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validatorUserRegister,
  validatorUserLogin,
  validatorUserId,
  validatorChangePassword,
  validatorUserDatosPersonales,
};
