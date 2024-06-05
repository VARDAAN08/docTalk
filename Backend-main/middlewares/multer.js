const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`.replace(/ /g, "_"));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|png|jpg|jfif|webp)$/)) {
      return cb(new Error("Please upload image only"));
    }
    cb(undefined, true);
  },
});

module.exports = upload;
