(function () {
  function updateFormData() {
    let updateForm = $("#update-form");

    updateForm.submit((e) => {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: $(updateForm).prop("action"),
        data: updateForm.serialize(),
        success: function (data) {
          $("#user-name").text(`Heyy!!! ${data.data.user.name}`);
          $("#user-email").text(`Your email is :  ${data.data.user.email}`);
        },
        error: function (err) {
          console.log("Error: ", err.responseText);
        },
      });
    });
  }

  updateFormData();
})();
