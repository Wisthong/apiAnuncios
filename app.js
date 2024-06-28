require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connectionDB } = require("./db/mongo");
const { address } = require("ip");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

connectionDB();

app.listen(process.env.PORT, () => {
  console.log(`http://${address()}:${process.env.PORT}/api/`);
});

app.use("/api", require("./routes"));
