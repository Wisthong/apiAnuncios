const { response, request } = require("express");
const { postModel } = require("../model/index");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../helpers/handleError");
const { matchedData } = require("express-validator");
const { signToken } = require("../helpers/handleJwt");

const createItem = async (req = request, res = response) => {
  try {
    const { user } = req;
    const body = matchedData(req);
    const token = await signToken(user);
    console.log(body);
    const data = await postModel.create(body);
    res.send({
      data,
      ok: true,
      message: "Se creo el post",
    });
  } catch (error) {
    res.send("Error en la peticion create", error);
  }
};

module.exports = { createItem };
