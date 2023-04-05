const { handleErrorResponse } = require("../helpers/handleError");
/**
 * TODO: Array con roles permitidos
 * @param {*} roles
 * @returns
 */
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    // console.log({ user });
    const rolesByUser = user.role;

    const checkValueRole = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    );

    if (!checkValueRole) {
      handleErrorResponse(res, "Usuario no tiene permisos", 404);
      return;
    }

    // console.log(roles);

    next();
  } catch (error) {
    handleErrorResponse(res, "Error rol no permitido para esta operacion", 500);
  }
};

module.exports = { checkRol };
