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
          // console.log(data);
          let newPost = showPostOnDom(data.data.post);
          $(".post-lists").prepend(newPost);
          $("#text-area").val("");
          deletePost($(" .delete-post-button", newPost));
          showFlashNotification(data.message, "success");
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };

  let showPostOnDom = function (post) {
    return $(` 
    <li id="post-${post._id}">
    <p>
      <small><a class="delete-post-button" href="/posts/destroy/${post._id}">X</a></small>
     ${post.content}
      <br />
      <small> - ${post.user.name}</small>
    </p>
  
    <div class="post-comments">

      <form action="/comments/create" method="post" class="new-comment-form">
        <input
          type="text"
          name="content"
          placeholder="Type here to add comment..."
          required
        />
        <input type="hidden" name="post" value="${post._id}" />
        <button type="submit">Add Comment</button>
      </form>

  
      <div class="post-comments-list">
        <ul id="post-comment-${post._id}">
         
        </ul>
      </div>
    </div>
  </li>
  
    `);
  };

  let deletePost = function (deleteLink) {
    deleteLink.click((e) => {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          // console.log(data);
          $(`#post-${data.data.post_id}`).remove();
          showFlashNotification(data.message, "error");
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };

  let showFlashNotification = function (message, type) {
    new Noty({
      theme: "relax",
      text: message,
      type: type,
      layout: "topRight",
      timeout: 1500,
    }).show();
  };

  createPostForm();
}
