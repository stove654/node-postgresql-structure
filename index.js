require('dotenv').config();
var express = require("express");
var app = express();
var morgan = require("morgan");
var config = require("./config/config");
var path = require("path");
var QRCode = require("qrcode");
var fs = require("fs");
var dir = "./uploads";
var socketService = require("./services/socket");
var aws = require("aws-sdk");
aws.config.update(config.s3Aws);

const Sentry = require('@sentry/node');

Sentry.init({ dsn: 'https://47002f4ead4948d5bef5993c28355a33@sentry.io/1457297' });

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
// set port
var port = process.env.PORT || 8080;

// Connect to database


var server = require("http").createServer(app);

socketService.init(app, server);
socketService.getSocket();

// use morgan to log requests to the console
if (config.env == "develop") {
  app.use(morgan("dev"));
}

// enable for static folder public
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

require("./config/express")(app);
require("./routes")(app);

app.get("/", function(request, response) {
  response.send("Hello World!");
});

app.use(Sentry.Handlers.errorHandler());
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + '\n');
});
server.listen(port, function() {
  console.log("Aha Slides server listening on port: ", port);
});
