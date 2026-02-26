const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpg|jpeg|png/;
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowed.test(ext)) cb(null, true);
  else cb("Images only!");
};

module.exports = multer({
  storage,
  fileFilter,
});
