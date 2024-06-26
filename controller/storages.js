const fs = require("fs");
const { response, request } = require("express");
const { storagesModels } = require("../model/index");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../helpers/handleError");
const { matchedData } = require("express-validator");
const { signToken } = require("../helpers/handleJwt");

// const PUBLIC_URL = process.env.PUBLIC_URL;
const PATH = `${__dirname}/../storage`;

const getItems = async (req = request, res = response) => {
  try {
    // const data = await storagesModels.findAllData({});
    const data = await storagesModels.find({});
    res.send({
      data,
      ok: true,
      message: "Has obtenido la lista de las imagenes",
    });
  } catch (error) {
    res.send("Error en la peticion getAll", error);
  }
};

const getItem = async (req = request, res = response) => {
  try {
    const { id } = matchedData(req);
    const data = await storagesModels.findById(id);
    res.send({
      data,
      ok: true,
      message: "Has obtenido la imagen",
    });
  } catch (error) {
    res.send("Error en la peticion getItem", error);
  }
};


const createItem = async (req, res) => {
  try {
    const { user } = req;
    const { body, file } = req;
    const fileData = {
      filename: file.filename,
      url: file.path,
      // usuario: user,
    };
    const data = await storagesModels.create(fileData);
    res.send({
      data,
      ok: true,
      message: "Se subio la imagen",
    });
  } catch (error) {
    handleErrorResponse(res, "Error al subir archivo", 404);
  }
};

const deleteItem = async (req = request, res = response) => {
  try {
    const { id } = matchedData(req);
    const dataFile = await storagesModels.findById(id);
    const { filename } = dataFile;
    await storagesModels.delete({ _id: id });
    const PATH_FILE = `${PATH}/${filename}`;

    // fs.unlinkSync(PATH_FILE);
    const data = {
      dataFile,
      // deleted: true,
    };
    res.send({
      data,
      ok: true,
      message: "Has eliminado la imagen",
    });
  } catch (error) {
    res.send("Error en la peticion delete", error);
  }
};

module.exports = { getItems, createItem, deleteItem, getItem };
