require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DATABASEUSER,
    "password": process.env.DATABASEUPASSWORD,
    "database": process.env.DATABASE,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "myuser",
    "password": "mypass",
    "database": "mydb",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DATABASEUSER,
    "password": process.env.DATABASEUPASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.DATABASEHOST,
    "dialect": "postgres"
  }
}
