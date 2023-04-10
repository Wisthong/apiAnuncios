const { connect, set } = require("mongoose");

const connectionDB = () => {
  try {
    connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexion exitosa");
  } catch (error) {
    console.log("Error de conexion");
    //     process.exit();
  }
};

set("strictQuery", false);
module.exports = { connectionDB };