class PostComments {
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${postId}`);
    this.newCommentForm = $(`#post-${postId}-comments-form`);

    this.createComment(postId);

    let self = this;
    $(" .delete-comment-button", this.postContainer).each(function () {
      self.deleteComment($(this));
    });
  }

  createComment(postId) {
    let pSelf = this;

    this.newCommentForm.submit((e) => {
      e.preventDefault();
      let self = this;

      $.ajax({
        type: "post",
        url: "/comments/create",
        data: this.newCommentForm.serialize(),
        success: function (data) {
          let newComment = pSelf.commentOnDom(data.data.comment);
          $(`#post-comments-${postId}`).prepend(newComment);
          $("#comment-text-area").val("");
          pSelf.deleteComment($(" .delete-comment-button", newComment));
          new ToggleLike($(" .toggle-like-button", newComment));
          pSelf.showFlashNotification(data.message, "success");
        },
        error: function (error) {
          console.log("Error: ", error.responseText);
        },
      });
    });
  }

  commentOnDom(comment) {
    return $(
      `
      <li id="comment-${comment._id}">
        <small>
          <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
        </small>
        ${comment.content}
        <br />
        <small>${comment.user.name}</small>

     
    </li>
    
      `
    );
  }

  deleteComment(deleteLink) {
    let self = this;
    $(deleteLink).click((e) => {
      e.preventDefault();
      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#comment-${data.data.commentId}`).remove();
          self.showFlashNotification(data.message, "error");
        },
        error: function (err) {
          console.log("Error: ", err.responseText);
        },
      });
    });
  }

  showFlashNotification(message, type) {
    new Noty({
      theme: "relax",
      text: message,
      type: type,
      layout: "topRight",
      timeout: 1500,
    }).show();
  }
}


{/* <small>              
<a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
    0 Likes
</a>           
</small> */}