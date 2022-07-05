const nodemailer = require("nodemailer");

const {
  MAILER_HOST_DEV,
  MAILER_PORT_DEV,
  MAILER_SECURE_DEV,
  MAILER_USER_DEV,
  MAILER_PASS_DEV,
  MAILER_HOST_PROD,
  MAILER_PORT_PROD,
  MAILER_SECURE_PROD,
  MAILER_USER_PROD,
  MAILER_PASS_PROD,
} = process.env;

const config =
  process.env.NODE_ENV === "production"
    ? {
        host: MAILER_HOST_PROD,
        port: MAILER_PORT_PROD,
        secure: MAILER_SECURE_PROD,
        user: MAILER_USER_PROD,
        pass: MAILER_PASS_PROD,
      }
    : {
        host: MAILER_HOST_DEV,
        port: MAILER_PORT_DEV,
        secure: MAILER_SECURE_DEV,
        user: MAILER_USER_DEV,
        pass: MAILER_PASS_DEV,
      };

// const config = {
//          host: MAILER_HOST_DEV,
//          port: MAILER_PORT_DEV,
//          secure: MAILER_SECURE_DEV,
//          user: MAILER_USER_DEV,
//          pass: MAILER_PASS_DEV,
// }
const transporter = nodemailer.createTransport({
  host: config.host,
  port: config.port,
  secure: config.secure,
  auth: {
    user: config.user,
    pass: config.pass,
  },
});
module.exports = transporter;
