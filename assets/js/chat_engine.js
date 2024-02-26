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
        user_email: this.userEmail,
        chat_room: "Codeial",
      });

      self.socket.on("user_joined", function (data) {
        console.log("User Joined: ", data);
      });
    });

    // CHANGE :: send a message on clicking the send message button
    $("#send-message").click(function () {
      let msg = $("#chat-message-input").val();

      if (msg != "") {
        self.socket.emit("send_message", {
          message: msg,
          user_email: self.userEmail,
          chatroom: "codeial",
        });
      }
    });
  }
}
