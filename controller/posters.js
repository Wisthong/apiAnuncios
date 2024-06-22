const fs = require("fs");
const { response, request } = require("express");
const { postersModel } = require("../model/index");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../helpers/handleError");
const { matchedData } = require("express-validator");
const { signToken } = require("../helpers/handleJwt");

const PUBLIC_URL = process.env.PUBLIC_URL;
const PATH = `${__dirname}/../storage`;

const getItems = async (req = request, res = response) => {
  try {
    const data = await postersModel.find({});
    // const data = await postersModel.findAllData({});

    if (data.length > 0) {
      return res.send({
        data,
        ok: true,
        message: "Has obtenido la lista de poster",
      });
    } else {
      return res.send({
        data,
        ok: false,
        message: "No hay post",
      });
    }
  } catch (error) {
    res.send("Error en la peticion getAll_posters", error);
  }
};

const getItem = async (req = request, res = response) => {
  try {
    const { id } = matchedData(req);
    const data = await postersModel.findById(id);
    if (!data) {
      return res.send({
        data,
        ok: false,
        message: "No aparece en nuestra base de datos el id que buscas",
      });
    }
    return res.send({
      data,
      ok: true,
      message: "Has obtenido el detalle del post",
    });
  } catch (error) {
    res.send("Error en la peticion getItem", error);
  }
};

// const createItem = async (req = request, res = response) => {
//   try {
//     const { user } = req;
//     const token = await signToken(user);
//     const { body, file } = req;
//     const fileData = {
//       filename: file.filename,
//       url: `${PUBLIC_URL}/${file.filename}`,
//       usuario: user,
//       usuario: user,
//     };
//     const data = await postersModel.create(fileData);
//     res.send({
//       data,
//       ok: true,
//       message: "Se subio la imagen",
//     });
//   } catch (error) {
//     res.send("Error en la peticion create", error);
//   }
// };

const createItem = async (req, res) => {
  try {
    const { user } = req;
    const { body } = req;

    const data = await postersModel.create(body);
    if (!data) {
      return res.send({
        ok: false,
        message: "No ha sido posible hacer el registro",
      });
    }
    return res.send({
      data,
      ok: true,
      message: "Se registro el post de manera exitosa",
    });
  } catch (error) {
    handleErrorResponse(res, "Error en la peticion", 404);
  }
};

const deleteItem = async (req = request, res = response) => {
  try {
    const { id } = matchedData(req);
    const dataFile = await postersModel.findById(id);

    if (!dataFile) {
      return res.send({
        ok: false,
        message: "No hemos encontrado el id del post",
      });
    }

    const { filename } = dataFile;
    const datos = await postersModel.delete({ _id: id });
    const PATH_FILE = `${PATH}/${filename}`;

    // fs.unlinkSync(PATH_FILE);
    const data = {
      dataFile,
      // deleted: true,
    };
    return res.send({
      data,
      ok: true,
      message: "Has eliminado la imagen",
    });
  } catch (error) {
    res.send("Error en la peticion delete", error);
  }
};

module.exports = { getItems, createItem, deleteItem, getItem };
