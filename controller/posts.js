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
    handleHttpError(res, error);
  }
};

const getPosts = async (req = request, res = response) => {
  try {
    // const data = await postModel.find();
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
    handleHttpError(res, error);
  }
};

const deletePost = async (req = request, res = response) => {
  try {
    const { id } = matchedData(req);
    const { user } = req;
    const token = await signToken(user);
    const verifyPost = await postModel.findOne({ _id: id });
    if (!verifyPost) {
      return handleErrorResponse(
        res,
        "No existe post relacionado al ID, en nuestro sistema",
        404
      );
    }
    const data = await postModel.deleteMany({ _id: id });

    res.send({
      token,
      ok: true,
      message: "Post eliminado",
    });
  } catch (error) {
    handleHttpError(res, error);
  }
};

const updatePost = async (req = request, res = response) => {
  try {
    let { id, ...body } = matchedData(req);
    const { user } = req;
    const token = await signToken(user);

    const verifyPost = await postModel.findOne({ _id: id });
    if (!verifyPost) {
      return handleErrorResponse(
        res,
        "No existe este id en nuestro sistema ",
        401
      );
    }

    // const { item } = body;

    // const verifyItem = await postModel.findOne({
    //   item: { $eq: item },
    //   _id: { $ne: id },
    // });
    // console.log(verifyItem);

    // if (verifyItem) {
    //   return handleErrorResponse(
    //     res,
    //     "El item ya esta asignado a otro producto y/o articulo",
    //     401
    //   );
    // }

    const usuario = user._id;
    body = { ...body, usuario };
    const data = await postModel.findByIdAndUpdate(id, body);

    res.send({
      token,
      ok: true,
      message: "Has actualizado el post",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getPost = async (req = request, res = response) => {
  try {
    const { id } = matchedData(req);
    // console.log(id);
    // const data = await postModel.findOne({ _id: id });
    // const data = await postModel.findOne({ _id: id });
    const data = await postModel.findOneData(id);

    res.send({
      data,
      ok: true,
      message: "Has obtenido el post",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};


module.exports = { createPost, getPosts, deletePost, updatePost, getPost };
