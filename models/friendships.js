const mongoose = require("mongoose");

const friendshipSchema = new mongoose.Schema(
  {
    from_user: {
      types: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    to_user: {
      types: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Friendship = mongoose.model("Friendship", friendshipSchema);
module.exports = friendshipSchema;
