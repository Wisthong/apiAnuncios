const { check } = require("express-validator");
const { validateResult } = require("../helpers/handleValidator");

const validatorPost = [
  check("archive", "Debes ingresar archive").exists().notEmpty(),
  check("information", "Debes ingresar information").exists().notEmpty(),
  check("category", "Debes ingresar category").exists().notEmpty(),
  check("description", "Debes ingresar contraseña de minimo 8 caracteres")
    .exists()
    .notEmpty()
    .isLength({ min: 5, max: 50 }),
  check("item", "Debes ingresar el item").exists().notEmpty(),
  check("line", "Debes ingresar la linea").exists().notEmpty(),
  check("line2", "Debes ingresar la linea segundo nivel").exists().notEmpty(),
  check("priceClient", "Debes ingresar el precio del producto para Clientes")
    .exists()
    .notEmpty(),
  check("priceMayorista", "Debes ingresar el precio del producto mayorista")
    .exists()
    .notEmpty(),
  check("priceSuper", "Debes ingresar el precio del producto para Clientes")
    .exists()
    .notEmpty(),
  check("price14", "Debes ingresar el precio del producto P14")
    .exists()
    .notEmpty(),
  check("status", "Debes ingresar el status").default(false),
  // check("title", "Debes ingresar el titulo").exists().notEmpty(),
  // check("porcentage", "Debes ingresar el titulo").exists({ checkNull: false }),
  // check("infoDesc", "Debes ingresar el titulo").exists({ checkNull: false }),
  // check("valid", "Debes ingresar el titulo").exists({ checkNull: false }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validatorGetPost = [
  check("id", "Debes ingresar un id valido").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validatorPost, validatorGetPost };
