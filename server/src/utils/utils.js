const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const createFolder = async (folderName) => {
  try {
    if (!fs.existsSync(path.join(__dirname, "..", folderName))) {
      await fsPromises.mkdir(path.join(__dirname, "..", folderName));
    }
  } catch (error) {
    console.log({ "logEvents error ": error });
  }
};

const generateOTP = (length) => {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const generatePassword = (length) => {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += digits[Math.floor(Math.random() * 62)];
  }
  return password;
};

const formattedDateWithTZ = (date) => {
  const originDate = new Date(date + "T00:00:00Z"); // UTC time
  // Convert to ISO string with time zone
  const _formattedDateWithTZ = originDate.toISOString().replace("Z", "+00:00");
  return _formattedDateWithTZ;
};
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "object" && Object.entries(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

module.exports = {
  generatePassword,
  generateOTP,
  createFolder,
  formattedDateWithTZ,
  isEmpty,
};
