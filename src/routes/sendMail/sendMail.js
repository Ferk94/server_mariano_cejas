const express = require("express");
const router = express.Router();

const transporter = require("../../services/mailer/mailer");
const { MAILER_EMAIL_DEV } = process.env;

router.post("/", (req, res, next) => {
  const { to, password } = req.body;
  const emailOptions = {
    from: MAILER_EMAIL_DEV,
    to,
    subject: "Contraseña para ingresar a su book",
    text: `La contraseña para ingresar a su book es ${password}.
               Muchas gracias`,
  };

  transporter
    .sendMail(emailOptions)
    .then(() => res.send("enviado correctamente"))
    .catch((err) => next(err));
});

module.exports = router;
