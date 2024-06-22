const { Schema, model } = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const UserSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    documento: {
      type: Number,
      required: true,
    },
    correo_electronico: {
      type: String,
      unique: true,
      required: true,
    },
    contrasena: {
      type: String,
      required: true,
      // select: false,
    },
    role: {
      type: String,
      default: "user",
      // type: ["user", "admin", "master"],
      // default: ["user"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.toJSON = function () {
  const { contrasena, ...user } = this.toObject();
  return user;
};

UserSchema.plugin(mongoose_delete, { overrideMethods: "all" });
module.exports = model("users", UserSchema);
