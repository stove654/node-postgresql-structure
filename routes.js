/**
 * Main application routes
 */

"use strict";

module.exports = function(app) {
  app.use("/api/users", require("./api/user"));
  // app.use("/api/upload/", require("./api/upload"));

  app.route("/:url(api|auth)/*").get(function(req, res) {
    res.json({
      message: "Ahaslide hello!!!"
    });
  });

  app.route("/*").get(function(req, res) {
    res.json({
      message: "Ahaslide hello!!!"
    });
  });
};
