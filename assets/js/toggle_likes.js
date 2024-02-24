// class ToggleLike {
//   constructor(toggleElement) {
//     this.toggler = toggleElement;
//     this.toggleLike();
//   }

//   toggleLike() {
//     $(this.toggler).click(function (e) {
//       e.preventDefault();
//       let self = this;

//       $.ajax({
//         type: "Post",
//         url: $(self).attr("href"),
//       })
//         .done(function (data) {
//           let likesCount = parseInt($(self).attr("data-likes"));
//           if (data.data.deleted == true) {
//             likesCount--;
//           } else {
//             likesCount++;
//           }
//           console.log("Likes Count is: ", likesCount);

//           $(self).attr("data-likes", likesCount);
//           $(self).html(`${likesCount}Likes`);
//         })
//         .fail((err) => {
//           console.log("Error in completing the request...", err);
//           return;
//         });
//     });
//   }
// }
