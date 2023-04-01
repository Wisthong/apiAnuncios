const { Schema, model } = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const StorageSchema = new Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
StorageSchema.plugin(mongoose_delete, { overrideMethods: "all" });
module.exports = model("storages", StorageSchema);
