const { check } = require("express-validator");
const { validateResult } = require("../helpers/handleValidator");

const validatorPost = [
  check("item", "Debes ingresar el item").exists().notEmpty(),
  check("line", "Debes ingresar la linea").exists().notEmpty(),
  check("status", "Debes ingresar el status").default(false),
  check("category", "Debes ingresar category").exists().notEmpty(),
  check("archive", "Debes ingresar archive").exists().notEmpty(),
  check("description", "Debes ingresar contraseña de minimo 8 caracteres")
    .exists()
    .notEmpty()
    .isLength({ min: 5, max: 50 }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validatorPost };
