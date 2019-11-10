let defaultPresentation = [];
if (process.env.ENV == "local") {
  defaultPresentation = [13, 33]
} else if (process.env.ENV == "develop") {
  defaultPresentation = [12, 13]
} else {
  defaultPresentation = [87, 88]
}

module.exports = {
  env: process.env.ENV,
  secret: process.env.SECRET,
  database: {
    name: process.env.DATABASE || null,
    user: process.env.DATABASEUSER || null,
    password: process.env.DATABASEUPASSWORD,
    host: process.env.DATABASEHOST || 'localhost'
  },
  encryptKey: process.env.ENCRYPTKEY,
  roles: ["master", "admin"],
};


