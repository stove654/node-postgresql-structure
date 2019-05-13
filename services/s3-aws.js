const config = require("../config/config.js");
const aws = require("aws-sdk");

aws.config.update(config.s3Aws);

const s3 = new aws.S3();
const myBucket = config.s3Aws.s3Bucket;
const signedUrlExpireSeconds = 60 * 60 * 24;
var getUrl = function(name) {
  if (!name) {
    return null;
  }
  if (name == "./assets/images/default-avatar.png") {
    return name;
  }
  const url = s3.getSignedUrl("getObject", {
    Bucket: myBucket,
    Key: name,
    Expires: signedUrlExpireSeconds
  });
  return url;
};


module.exports = {
  getUrl
};

