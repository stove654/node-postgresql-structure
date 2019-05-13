"use strict";

const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
var config = require("../../config/config");
var auth = require("../../auth/auth.service");

aws.config.update(config.s3Aws);
const s3 = new aws.S3();
const myBucket = config.s3Aws.s3Bucket;
const signedUrlExpireSeconds = 60 * 5;
var express = require("express");


var router = express.Router();


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: myBucket,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      var str = file.originalname.split(".");
      cb(null, "user-" + Date.now() + "." + str[str.length - 1]);
    }
  })
});

const singleUpload = upload.single("file");

router.post("/", auth.isAuthenticated(), function(req, res) {
  singleUpload(req, res, function(err, some) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "Image Upload Error", detail: err.message }]
      });
    }
    const url = s3.getSignedUrl("getObject", {
      Bucket: myBucket,
      Key: req.file.key,
      Expires: signedUrlExpireSeconds
    });
    console.log("req.file.location", url);

    return res.status(200).json({
      file: req.file,
      url: url
    });
  });
});

module.exports = router;
