const { sign, verify } = require("jsonwebtoken");

const signToken = async (user) => {
  return sign(
    {
      _id: user._id,
      nombre: user.nombre,
      apellido: user.apellido,
      documento: user.documento,
      orreo_electronico: user.orreo_electronico,
      role: user.role,
    },
    process.env.SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const verifiyToken = async (token) => {
  return verify(token, process.env.SECRET);
};

module.exports = { signToken, verifiyToken };
