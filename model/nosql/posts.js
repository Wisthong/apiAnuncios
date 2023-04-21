const { Schema, model, Types } = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const PostSchema = new Schema(
  {
    item: {
      type: String,
    },
    description: {
      type: String,
    },
    line: {
      type: String,
    },
    category: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    archive: {
      type: Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

PostSchema.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: "storages", //TODO: Desde donde
        localField: "archive", //TODO: Campo de referencia en el modelo actual
        foreignField: "_id", //TODO: Campo de referencia para el join tabla a juntar
        as: "archiveJoin", //TODO: Apodo
      },
    },
    {
      $unwind: "$archive",
    },
  ]);
  return joinData;
};

PostSchema.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    {
      $match: {
        _id: Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "storages", //TODO: Desde donde
        localField: "archive", //TODO: Campo de referencia en el modelo actual
        foreignField: "_id", //TODO: Campo de referencia para el join tabla a juntar
        as: "archiveJoin", //TODO: Apodo
      },
    },
    {
      $unwind: "$archiveJoin",
    },
  ]);
  return joinData;
};

PostSchema.plugin(mongoose_delete, { overrideMethods: "all" });
module.exports = model("Posts", PostSchema);
