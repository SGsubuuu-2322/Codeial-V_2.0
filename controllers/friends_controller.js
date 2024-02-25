const User = require("../models/user");
const Friendship = require("../models/friendships");

module.exports.toggleFriendship = async function (req, res) {
  try {
    let toRequestedUser = await User.findById(req.params.id);
    let fromRequestedUser = await User.findById(req.user.id);

    if (toRequestedUser) {
      //   console.log(userFriend.id);
      //   console.log(req.user.id);

      let existingRelationFrom = await Friendship.findOne({
        from_user: fromRequestedUser.id,
        to_user: toRequestedUser.id,
      });
      let existingRelationTo = await Friendship.findOne({
        from_user: toRequestedUser.id,
        to_user: fromRequestedUser.id,
      });

      if (existingRelationFrom || existingRelationTo) {
        if (existingRelationFrom) {
          await Friendship.findByIdAndDelete(existingRelationFrom.id);
          await User.findByIdAndUpdate(fromRequestedUser.id, {
            $pull: { friendships: toRequestedUser.id },
          });
          await User.findByIdAndUpdate(toRequestedUser.id, {
            $pull: { friendships: fromRequestedUser.id },
          });
        } else {
          await Friendship.findByIdAndDelete(existingRelationTo.id);
          await User.findByIdAndUpdate(fromRequestedUser.id, {
            $pull: { friendships: toRequestedUser.id },
          });
          await User.findByIdAndUpdate(toRequestedUser.id, {
            $pull: { friendships: fromRequestedUser.id },
          });
        }
      } else {
        await Friendship.create({
          from_user: fromRequestedUser.id,
          to_user: toRequestedUser.id,
        });

        await User.findByIdAndUpdate(fromRequestedUser.id, {
          $push: { friendships: toRequestedUser.id },
        });
        await User.findByIdAndUpdate(toRequestedUser.id, {
          $push: { friendships: fromRequestedUser.id },
        });
      }

      return res.redirect("back");
    }
  } catch (err) {
    if (err) {
      console.log("Error in toggling the friendship...", err);
      return;
    }
  }
};
