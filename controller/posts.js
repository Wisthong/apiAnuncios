const { response, request } = require("express");
const { postModel } = require("../model/index");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../helpers/handleError");
const { matchedData } = require("express-validator");
const { signToken } = require("../helpers/handleJwt");

const createPost = async (req = request, res = response) => {
  try {
    const { user } = req;
    const body = matchedData(req);
    const token = await signToken(user);
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

const getPosts = async (req = request, res = response) => {
  try {
    // const data = await deviceModel.find();
    const data = await postModel.findAllData();
    // data.set("userAdmin", undefined, { strict: false });
    if (!data) {
      return handleErrorResponse(
        res,
        "No se pudo obtener la lista de dispositivos",
        401
      );
    }
    res.send({
      data,
      ok: true,
      message: "Has obtenido la lista de los dispositivos",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

module.exports = { createPost, getPosts };
