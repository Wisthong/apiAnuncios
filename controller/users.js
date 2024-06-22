const { response, request } = require("express");
const { userModel } = require("../model/index");
const { matchedData } = require("express-validator");
const { encryptPassword, comparePassword } = require("../helpers/handleBcrypt");
const { signToken } = require("../helpers/handleJwt");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../helpers/handleError");

const userRegister = async (req = request, res = response) => {
  try {
    const body = matchedData(req);
    let { correo_electronico, contrasena } = body;

    const validacionEmail = await userModel.find({
      correo_electronico: correo_electronico,
    });
    // todo: si es > 0 existe email en db
    if (validacionEmail.length > 0) {
      return res.status(401).send({
        ok: false,
        message:
          "Ya existe un registro en nuestra DB con esta dirección de correo electronico",
      });
    }

    contrasena = await encryptPassword(contrasena);
    const dataUser = { ...body, contrasena };
    const query = await userModel.create(dataUser);
    query.set("contrasena", undefined, { strict: false });
    const token = await signToken(query);

    res.send({
      ok: true,
      message: "Registro de usuario exitoso",
      data: query,
      token,
    });
  } catch (error) {
    res.send({
      ok: false,
      message: error,
    });
  }
};

const userLogin = async (req = request, res = response) => {
  try {
    const body = matchedData(req);
    let { correo_electronico, contrasena } = body;

    const validacionEmail = await userModel.findOne({ correo_electronico });
    // todo: si es > 0 existe email en db
    if (!validacionEmail) {
      return handleErrorResponse(res, "No existe el email en nuestra DB", 401);
    }

    const verificaContrasena = await comparePassword(
      contrasena,
      validacionEmail.contrasena
    );

    if (!verificaContrasena) {
      return handleErrorResponse(
        res,
        "Contraseña incorrecta, por favor intenta nuevamente",
        401
      );
    }

    const token = await signToken(validacionEmail);

    validacionEmail.set("contrasena", undefined, { strict: false });

    res.send({
      ok: true,
      message: "Inicio de sesión exitoso",
      data: validacionEmail,
      token,
    });
  } catch (error) {
    res.send({
      ok: false,
      message: error,
    });
  }
};

const renewSesion = async (req = request, res = response) => {
  try {
    const { user } = req;
    const token = await signToken(user);
    res.send({
      ok: true,
      token,
      message: "Renovacion de token exitoso",
    });
  } catch (error) {
    handleHttpError(res, error);
  }
};

const getAllUser = async (req = request, res = response) => {
  try {
    const query = await userModel.find();
    res.send({
      ok: true,
      message: "Usuarios",
      data: query,
    });
  } catch (error) {
    res.send({
      ok: false,
      message: error,
    });
  }
};

//
const updatePassword = async (req = request, res = response) => {
  try {
    const { id, ...body } = matchedData(req);
    let { contrasena, newcontrasena } = body;

    // todo: query busquedad validad que usuario exista
    const query1 = await userModel.findById({ _id: id });
    if (!query1) {
      return res.status(404).send({
        ok: false,
        message: "El usuario no existe en nuestro sistema",
      });
    }

    // todo: compara la contraseña anterior, para poder crear una nueva para su cambio
    const verificaContrasena = await comparePassword(
      contrasena,
      query1.contrasena
    );

    if (!verificaContrasena) {
      return handleErrorResponse(
        res,
        "Contraseña incorrecta, por favor intenta nuevamente",
        401
      );
    }

    // todo: a la variable newcontrasena, le asignas la encriptacion

    contrasena = await encryptPassword(newcontrasena);
    const dataUser = { ...body, contrasena };
    const query = await userModel.findByIdAndUpdate(id, dataUser, {
      new: true,
    });
    const token = await signToken(query);

    res.send({
      ok: true,
      message: "Actualización de contrasena de manera exitosa",
      // data: query,
      // token,
    });
  } catch (error) {
    res.send({
      ok: false,
      message: error,
    });
  }
};

//todo: actualizacion de datos personales
const userUpdateDatosPersonales = async (req = request, res = response) => {
  try {
    // todo: valido que el usuario exista

    const { id, ...body } = matchedData(req);

    // todo: query busquedad
    const query1 = await userModel.findById({ _id: id });
    if (!query1) {
      return res.status(404).send({
        ok: false,
        message: "El usuario no existe en nuestro sistema",
      });
    }

    const query = await userModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    res.send({
      ok: true,
      message: "Actualización de datos personales de usuario de manera exitosa",
      data: query,
    });
  } catch (error) {
    res.send({
      ok: false,
      message: error,
    });
  }
};

const getOneUser = async (req = request, res = response) => {
  try {
    const { id } = matchedData(req);
    const query = await userModel.findById({ _id: id });

    if (!query) {
      return res.status(404).send({
        ok: false,
        message: "El usuario no existe en nuestra DB",
      });
    }
    return res.send({
      ok: true,
      message: "Información del usuario",
      data: query,
    });
  } catch (error) {
    res.status(404).send({
      ok: false,
      message: error,
    });
  }
};

const deleteTicket = async (req = request, res = response) => {
  try {
    const { id } = matchedData(req);
    const verifyID = await userModel.findById({ _id: id });
    const { estado } = verifyID;

    if (!verifyID) {
      return res.status(404).send({
        ok: false,
        message:
          "El id del ticket es invalido, por favor comunicarse con el dev",
      });
    }

    if (estado != "espera de asignación") {
      return res.status(403).send({
        ok: false,
        message: "No se puede eliminar porque ya ha sido tomado",
      });
    } else {
      const query = await userModel.deleteOne({ _id: id });
      res.send({
        ok: true,
        message: "Se ha eliminado el ticket de manera exitosa",
        data: query,
      });
    }
  } catch (error) {
    res.status(404).send({
      ok: false,
      message: error,
    });
  }
};

const deleteAllTicket = async (req = request, res = response) => {
  try {
    const query = await userModel.deleteMany();
    res.send({
      ok: true,
      message: "Se ha eliminado el ticket de manera exitosa",
      data: query,
    });
  } catch (error) {
    res.status(404).send({
      ok: false,
      message: error,
    });
  }
};

module.exports = {
  userRegister,
  userLogin,
  renewSesion,
  getAllUser,
  userUpdateDatosPersonales,
  getOneUser,
  updatePassword,
};
