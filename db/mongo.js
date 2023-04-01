const { connect, set } = require("mongoose");

const connectionDB = () => {
  connect(
    process.env.URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (!err) {
        console.log("***Conexion exitosa***");
      } else {
        throw new Error("***Error de conexion***");
      }
    }
  );
};

set("strictQuery", false);
module.exports = { connectionDB };
