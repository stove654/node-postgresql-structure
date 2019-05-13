
var config = require("../config/config")

var sendNotification = function(data) {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Basic " + config.onSignal.key
    };
  
    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };
  
    var https = require("https");
    var req = https.request(options, function(res) {
      res.on("data", function(data) {
      });
    });
  
    req.on("error", function(e) {
      console.log("ERROR:");
      console.log(e);
    });
    req.on("success", function(e) {
      console.log("done:");
    });
    req.write(JSON.stringify(data));
    req.end();
  };

  module.exports = {
    sendNotification
  };
  