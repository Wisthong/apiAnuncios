const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    role: {
      type: ["user", "admin"],
      default: ["user"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("users", UserSchema);
