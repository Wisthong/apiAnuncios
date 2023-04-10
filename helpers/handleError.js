const handleHttpError = (res, error) => {
  res.status(500);
  res.send({ error });
};

const handleErrorResponse = (res, message, code) => {
  res.status(code);
  res.send({
    ok: false,
    message,
    code,
  });
};

module.exports = { handleErrorResponse, handleHttpError };
