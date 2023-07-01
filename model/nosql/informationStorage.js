const { Schema, model, Types } = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const InformationSchema = new Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
    usuario: {
      type: Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

InformationSchema.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: "users", //TODO: Desde donde
        localField: "usuario", //TODO: Campo de referencia en el modelo actual
        foreignField: "_id", //TODO: Campo de referencia para el join tabla a juntar
        as: "userAdmin", //TODO: Apodo
      },
    },
    {
      $unwind: "$usuario",
    },
  ]);
  return joinData;
};

InformationSchema.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    {
      $match: {
        _id: Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "users", //TODO: Desde donde
        localField: "usuario", //TODO: Campo de referencia en el modelo actual
        foreignField: "_id", //TODO: Campo de referencia para el join tabla a juntar
        as: "userAdmin", //TODO: Apodo
      },
    },
    {
      $unwind: "$userAdmin",
    },
  ]);
  return joinData;
};

InformationSchema.plugin(mongoose_delete, { overrideMethods: "all" });
module.exports = model("informationstorages", InformationSchema);
