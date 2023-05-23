const { Schema, model, Types } = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const PostSchema = new Schema(
  {
    archive: {
      type: Types.ObjectId,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    item: {
      type: String,
    },
    line: {
      type: String,
    },
    line2: {
      type: String,
    },
    priceClient: {
      type: Number,
    },
    priceSuper: {
      type: Number,
    },
    title: {
      type: String,
    },
    porcentage: {
      type: String,
    },
    infoDesc: {
      type: String,
    },
    valid: {
      type: String,
    },

    status: {
      type: Boolean,
      default: false,
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
        _id: new Types.ObjectId(id),
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
      $unwind: "$archive",
    },
  ]);
  return joinData;
};

PostSchema.plugin(mongoose_delete, { overrideMethods: "all" });
module.exports = model("Posts", PostSchema);
