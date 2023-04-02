const fs = require("fs");
const { response, request } = require("express");
const { storagesModels } = require("../model/index");

const PUBLIC_URL = process.env.PUBLIC_URL;
const PATH = `${__dirname}/../storage`;

const getItems = async (req = request, res = response) => {
  try {
    const data = await storagesModels.find({});
    res.send({
      data,
      ok: true,
      message: "Has obtenido la lista de las imagenes",
    });
  } catch (error) {
    res.send("ERROR NO SE PUDIERON OBTENER LOS ARCHIVOS");
  }
};

const getItem = async (req = request, res = response) => {
  try {
    const { id } = matchedData(req);
    const data = await storagesModels.findById(id);
    res.send({ data });
  } catch (error) {
    res.send("Error");
  }
};

const createItem = async (req = request, res = response) => {
  try {
    const { body, file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storagesModels.create(fileData);
    res.send({
      data,
      ok: true,
      message: "Se subio la imagen",
    });
  } catch (error) {
    res.send("Error");
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
      deleted: true,
    };
    res.send({ data });
  } catch (error) {
    res.send("Error");
  }
};

module.exports = { getItems, createItem, deleteItem, getItem };
