// Importing mongoose  library to work with MongoDB
const mongoose = require("mongoose");
// Importing multer  for handling file uploads
const multer = require("multer");
// Importing path  module to get the directory of the uploaded files
const path = require("path");
// Joining the paths of current file to avatars folder
const AVATAR_PATH = path.join("/uploads/users/avatars");

// Creating the schema  for user model using mongoose
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },

    name: {
      type: String,
      require: true,
    },

    avatar: {
      type: String,
    },

    friendships: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

//  Configuring multer for storing the uploaded  images in a specified folder and unique name
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

// Defining  the upload middleware to handle image uploads, and it should be single image.
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
userSchema.statics.avatarPath = AVATAR_PATH;

// Defining user model using userSchema
const User = mongoose.model("User", userSchema);

// Finally, exporting it for further usecases...
module.exports = User;
