class chatEngine {
  constructor(chatBoxID, userEmail) {
    this.chatBox = $(`#${chatBoxID}`);
    this.userEmail = userEmail;

    this.socket = io.connect("http://localhost:5000");

    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  connectionHandler() {
    let self = this;
    this.socket.on("connect", function () {
      console.log("Socket Connection using sockets has been  established!");

      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chat_room: "Codeial",
      });

      self.socket.on("user_joined", function (data) {
        console.log("User has Joined the room: ", data.user_email);
      });
    });

    // CHANGE :: send a message on clicking the send message button
    $("#send-message").click(function () {
      let msg = $("#chat-message-input").val();

      if (msg != "") {
        self.socket.emit("send_message", {
          message: msg,
          user_email: self.userEmail,
          chat_room: "Codeial",
        });
      }
    });

    self.socket.on("receive_message", function (data) {
      console.log("Message received: ", data.message);

      let newMessage = $("<li>");

      let messageType = "other-message";

      if (data.user_email === self.userEmail) {
        messageType = "self-message";
      }

      newMessage.append(
        $("<span>", {
          html: data.message,
        })
      );
      // newMessage.append(
      //   $("<sub>", {
      //     html: data.user_email,
      //   })
      // );

      newMessage.addClass(messageType);

      $("#chat-messages-list").append(newMessage);
    });
  }
}
