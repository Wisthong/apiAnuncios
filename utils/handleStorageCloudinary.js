const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    allowed_formats: ["jpg", "png", "jpeg"],
    // public_id: (req, file) => "computed-filename-using-request",
    // public_id: (req, file) => {
    //   const ext = file.originalname.split(".").pop();
    //   const filename = `file-${Date.now()}.${ext}`;
    //   // console.log(file);
    // },
  },
});

const uploadMiddleware = multer({ storage });
module.exports = { uploadMiddleware };
