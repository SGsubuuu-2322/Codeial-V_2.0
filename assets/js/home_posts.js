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
          let newPost = showPostOnDom(data.data.post);
          $(".post-lists").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));
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

  createPostForm();

  let deletePost = function (deleteLink) {
    deleteLink.click((e) => {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          console.log(data);
          $(`#post-${data.data.post_id}`).remove();
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };
}
