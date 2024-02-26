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

      this.socket.emit("join_room", {
        user_email: this.userEmail,
        chat_room: "Codeial",
      });
    });
  }
}
