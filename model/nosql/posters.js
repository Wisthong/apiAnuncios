const { Schema, model, Types } = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const PostersSchema = new Schema(
  {
    imagen: {
      type: Types.ObjectId,
    },
    descripcion: {
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

PostersSchema.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: "storages", //TODO: Desde donde
        localField: "imagen", //TODO: Campo de referencia en el modelo actual
        foreignField: "_id", //TODO: Campo de referencia para el join tabla a juntar
        as: "imagenRelacional", //TODO: Apodo
      },
    },
    {
      $unwind: "$imagenRelacional",
    },
    {
      $project: {
        imagen: 1,
        descripcion: 1,
        categoria: 1,
        item: 1,
        createdAt: 1,
        updatedAt: 1,
        "imagenRelacional._id": 1,
        "imagenRelacional.url": 1,
        "imagenRelacional.filename": 1,
      },
    },
  ]);
  return joinData;
};

PostersSchema.statics.findOneData = function (_id) {
  return this.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(_id),
      },
    },
    {
      $lookup: {
        from: "storages",
        localField: "imagen",
        foreignField: "_id",
        as: "imagenRelacional",
      },
    },
    {
      $unwind: "$imagenRelacional",
    },
    {
      $project: {
        imagen: 1,
        descripcion: 1,
        categoria: 1,
        item: 1,
        createdAt: 1,
        updatedAt: 1,
        "imagenRelacional._id": 1,
        "imagenRelacional.url": 1,
        "imagenRelacional.filename": 1,
      },
    },
    {
      $limit: 1, // Asegura que solo obtengas un resultado, aunque normalmente debería ser uno solo con el _id único
    },
  ]).then((results) => {
    if (results.length === 0) {
      return null; // Manejar caso donde no se encontró ningún resultado
    }
    return results[0]; // Devolver el primer (y debería ser único) documento del array
  });
};

PostersSchema.plugin(mongoose_delete, { overrideMethods: "all" });
module.exports = model("posters", PostersSchema);
