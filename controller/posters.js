const fs = require("fs");
const { response, request } = require("express");
const { postersModel } = require("../model/index");
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
    // const data = await postersModel.find({});
    const data = await postersModel.findAllData({});

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
    res.status(500).send({
      error,
      ok: false,
      message: "Error interno del servidor al procesar la petición",
    });
  }
};

const getItem = async (req = request, res = response) => {
  try {
    const { id } = matchedData(req);
    const data = await postersModel.findOneData(id);
    // const data = await postersModel.findById(id);
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
    res.status(500).send({
      error,
      ok: false,
      message: "Error interno del servidor al procesar la petición",
    });
  }
};

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
    res.status(500).send({
      error,
      ok: false,
      message: "Error interno del servidor al procesar la petición",
    });
  }
};

const deleteItem = async (req = request, res = response) => {
  try {
    const { id } = matchedData(req);
    const query = await postersModel.findById(id);

    if (!query) {
      return res.status(404).send({
        ok: false,
        message: "El id de no existe en la DB",
      });
    }

    const query1 = await postersModel.deleteById({ _id: id });

    return res.send({
      ok: true,
      message: "Se elimino correctamente",
      data: query1,
    });
  } catch (error) {
    res.status(500).send({
      error,
      ok: false,
      message: "Error interno del servidor al procesar la petición",
    });
  }
};

const updateItem = async (req = request, res = response) => {
  try {
    const { id, ...body } = matchedData(req);

    const query = await postersModel.findById(id);

    if (!query) {
      return res.status(404).send({
        ok: false,
        message: "El id de no existe en la DB",
      });
    }

    // TODO: query1 ejecuta la funcion de actualizar === put
    const query1 = await postersModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!query1) {
      return res.status(404).send({
        ok: false,
        message: "No se pudo actualizar el post",
      });
    }
    return res.send({
      ok: true,
      message: "Actualización del post de manera exitosa",
      data: query1,
    });
  } catch (error) {
    res.status(500).send({
      error,
      ok: false,
      message: "Error interno del servidor al procesar la petición",
    });
  }
};

module.exports = { getItems, createItem, deleteItem, getItem, updateItem };
