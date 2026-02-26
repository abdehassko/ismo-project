const multer = require("multer");
const path = require("path");

const announcementStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/announcements/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadAnnouncement = multer({ storage: announcementStorage });
const uploadUser = multer({ storage: userStorage });

module.exports = { uploadAnnouncement, uploadUser };
