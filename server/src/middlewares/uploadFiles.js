const multer = require("multer");
const path = require("path");

const imgArray = ["image/png", "image/jpeg", "image/jpg"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (imgArray.includes(file?.mimetype?.toLowerCase()))
      cb(null, path.join(__dirname, "../files/", "images"));
  },
  filename: (req, file, cb) => {
    if (imgArray.includes(file?.mimetype?.toLowerCase()))
      cb(null, file?.originalname);
  },
});

const uploadImage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (imgArray.includes(file?.mimetype?.toLowerCase())) cb(null, true);
  },
});

module.exports = {
  upload: uploadImage,
};
