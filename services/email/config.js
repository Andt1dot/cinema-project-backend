const nodemailer = require("nodemailer");
const inlineBase64 = require("nodemailer-plugin-inline-base64");

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.EMAIL_PORT,
  ignoreTLS: false,
  secure: false,
  auth: {
    user: process.env.EMAIL_PROFILE,
    pass: process.env.EMAIL_PASSWORD,
  },
});
transporter.use("compile", inlineBase64());

module.exports = transporter;
