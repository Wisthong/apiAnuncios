const { response, request } = require("express");
const { userModel } = require("../model");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../helpers/handleError");
const { matchedData } = require("express-validator");
const { encryptPassword, comparePassword } = require("../helpers/handleBcrypt");
const { signToken } = require("../helpers/handleJwt");

const login = async (req = request, res = response) => {
  try {
    let { email, password } = matchedData(req);
    const verifyEmail = await userModel.findOne({ email });
    if (!verifyEmail) {
      return handleErrorResponse(res, "No existe el email en nuestra DB", 401);
    }

    const verifyPassword = await comparePassword(
      password,
      verifyEmail.password
    );

    if (!verifyPassword) {
      return handleErrorResponse(
        res,
        "Contraseña incorrecta, por favor intenta nuevamente",
        401
      );
    }

    const token = await signToken(verifyEmail);

    res.send({
      ok: true,
      token,
      message: "Inicio de sesión exitoso",
    });
  } catch (error) {
    handleHttpError(res, error);
  }
};

const register = async (req = request, res = response) => {
  try {
    const body = matchedData(req);

    let { email, password } = body;
    const verifyEmail = await userModel.findOne({ email });

    if (verifyEmail) {
      return handleErrorResponse(res, "El email ya existe en nuestra DB", 401);
    }

    password = await encryptPassword(password);
    const dataUser = { ...body, password };
    const data = await userModel.create(dataUser);
    const token = await signToken(data);

    // console.log(dataUser);
    res.send({
      ok: true,
      token,
      message: "Registro de usuario exitoso",
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, error);
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

module.exports = { login, register, renewSesion };
