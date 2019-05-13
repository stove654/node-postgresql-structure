"use strict";

var crypto = require("crypto");
var config = require("../config/config");

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
  return crypto.randomBytes(5).toString("hex");
}
module.exports = { decrypt, encrypt, generateKeyWorkshop };
