const { response, request } = require("express");
const { verifiyToken } = require("../helpers/handleJwt");
const {
  handleErrorResponse,
  handleHttpError,
} = require("../helpers/handleError");
const { userModel } = require("../model");

const checkAuth = async (req = request, res = response, next) => {
  try {
    if (!req.headers.authorization) {
      return handleErrorResponse(res, "No tienes permisos", 409);
    }
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifiyToken(token);

    if (!dataToken._id) {
      return handleErrorResponse(res, "Token invalido", 409);
    }

    const user = await userModel
      .findById(dataToken._id)
      .select("_id name lastname email role");
    req.user = user;
    next();
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = { checkAuth };
