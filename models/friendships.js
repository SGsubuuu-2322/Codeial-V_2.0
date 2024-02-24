const mongoose = require("mongoose");

const friendshipSchema = new mongoose.Schema(
  {
    fromUser: {
      types: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    toUser: {
      types: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const FriendShip = mongoose.model("FriendShip", friendshipSchema);
module.exports = friendshipSchema;
