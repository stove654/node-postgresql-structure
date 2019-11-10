"use strict";

var crypto = require("crypto");
var config = require("../config/config-env");

var ENCRYPTION_KEY = config.encryptKey; // Must be 256 bytes (32 characters)
var IV_LENGTH = 16; // For AES, this is always 16


function encrypt(text) {
  if (!text) {
    return null;
  }
  let iv = crypto.randomBytes(IV_LENGTH);

  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );

  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text) {
  if (!text) {
    return null;
  }
  let textParts = text.split(":");
  let iv = Buffer.from(textParts.shift(), "hex");
  let encryptedText = Buffer.from(textParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

function generateKeyWorkshop(text) {
  return crypto.randomBytes(2).toString("hex");
}

function encryptPassword (password, salt) {
  if (!password) return "";
  var salt = Buffer.from(salt, "base64");
  return crypto
    .pbkdf2Sync(password, salt, 200000, 64, "sha512")
    .toString("base64");
}

// function comparePassword(password,salt) {
//   if (!password) return "";
//   var salt = Buffer.from(salt, "base64");
//   return password == pbkdf2(password, salt, 200000, 64, "sha512");
// }

function makeSalt() {
  return crypto.randomBytes(16).toString("base64");
}

function userAuthenticate (plainText, hashedPassword, salt) {
  return this.encryptPassword(plainText, salt) === hashedPassword;
}

function makeUniqueAccessCode(length) {
  length = length || 10;
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


module.exports = { decrypt, encrypt, generateKeyWorkshop, encryptPassword, makeSalt, userAuthenticate, makeUniqueAccessCode };
