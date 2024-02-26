// class chatEngine {
//   constructor(chatBoxID, userEmail) {
//     this.chatBox = $(`#${chatBoxID}`);
//     this.userEmail = userEmail;

//     this.socket = io.connect("http://localhost:5000");

//     if (this.userEmail) {
//       this.connectionHandler();
//     }
//   }

//   connectionHandler() {
//     this.socket.on("connect", function () {
//       console.log("Socket Connection using sockets has been  established!");
//     });
//   }
// }
