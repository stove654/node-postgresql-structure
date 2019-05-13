var socketio;
module.exports = {
  init: function(app, server) {
    socketio = require("socket.io")(server, {
      path: "/api/socket.io-client"
    });

    require("../config/socketio")(socketio, app);

    socketio.on("connection", function(socket) {
      console.log("socket.client.id", socket.client.id);
      // Call onDisconnect.
      socket.on("disconnect", function() {
        console.log("disconnect");
      });
    });
  },

  
  getSocket: function() {
    return socketio;
  }
};


