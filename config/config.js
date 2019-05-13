module.exports = {
  env: process.env.ENV,
  secret: process.env.SECRET,
  database: {
    name: process.env.DATABASE || null,
    user: process.env.DATABASEUSER || null,
    password: process.env.DATABASEUPASSWORD
  },
  encryptKey: process.env.ENCRYPTKEY,
  s3Aws: {
    secretAccessKey: process.env.AWSSECRETACCESSKEY,
    accessKeyId: process.env.AWSACCESSKEYID,
    region: process.env.AWSREGION,
    s3Bucket: process.env.AWSBUCKET
  }
};
