(function () {
  const toggleFriendship = $(".toggle-friendship");
  const link = $("#link");

  toggleFriendship.click((e) => {
    e.preventDefault();

    $.ajax({
      type: "get",
      url: link.attr("href"),
    }).done(function (data) {
      let friendShip = data.data.isFriend;
      // console.log(friendShip);

      let friendBox = $(".friend-box");

      if (friendShip) {
        friendBox.html(`<span>Friend</span>`);
      } else {
        friendBox.html("");
      }
    });
  });
})();
