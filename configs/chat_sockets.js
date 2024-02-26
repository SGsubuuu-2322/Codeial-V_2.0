module.exports.chatSocket = function (socketServer) {
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: "http://localhost:8000",
      methods: ["GET", "POST"],
    },
  });

  io.sockets.on("connection", function (socket) {
    console.log("New connection has been established...", socket.id);

    socket.on("disconnect", function () {
      console.log("Socket has been disconnected...");
    });

    socket.on("join_room", function (data) {
      console.log("Joining request received...", data);

      socket.join(data.chat_room);

      io.in(data.chat_room).emit("user_joined", data);
    });
  });
};
