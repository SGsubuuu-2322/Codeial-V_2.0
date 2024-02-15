{
  let createPostForm = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit((e) => {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          console.log(data);
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };

  createPostForm();
}
