const { Schema, model, Types } = require("mongoose");
const mongoose_delete = require("mongoose-delete");

// filename: {
//   type: String,
// },
const Posters = new Schema(
  {
    descripcion: {
      type: String,
    },
    url: {
      type: String,
    },
    categoria: {
      type: String,
    },
    item: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


// Posters.statics.findAllData = function () {
//   const joinData = this.aggregate([
//     {
//       $lookup: {
//         from: "users", //TODO: Desde donde
//         localField: "usuario", //TODO: Campo de referencia en el modelo actual
//         foreignField: "_id", //TODO: Campo de referencia para el join tabla a juntar
//         as: "userAdmin", //TODO: Apodo
//       },
//     },
//     {
//       $unwind: "$usuario",
//     },
//   ]);
//   return joinData;
// };

// Posters.statics.findOneData = function (id) {
//   const joinData = this.aggregate([
//     {
//       $match: {
//         _id: Types.ObjectId(id),
//       },
//     },
//     {
//       $lookup: {
//         from: "users", //TODO: Desde donde
//         localField: "usuario", //TODO: Campo de referencia en el modelo actual
//         foreignField: "_id", //TODO: Campo de referencia para el join tabla a juntar
//         as: "userAdmin", //TODO: Apodo
//       },
//     },
//     {
//       $unwind: "$userAdmin",
//     },
//   ]);
//   return joinData;
// };

Posters.plugin(mongoose_delete, { overrideMethods: "all" });
module.exports = model("posters", Posters);
