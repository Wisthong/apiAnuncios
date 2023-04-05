const { sign, verify } = require("jsonwebtoken");

const signToken = async (user) => {
  return sign(
    {
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
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
