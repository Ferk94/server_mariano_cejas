const express = require("express");
const router = express.Router();

const userCreated = require("../../services/mailer/templates/userCreated");   
const transporter = require("../../services/mailer/mailer");
const { MAILER_EMAIL_DEV } = process.env;

router.post("/", (req, res, next) => {
  const { to, password } = req.body;

  const html = userCreated(password);

  const emailOptions = {
    from: MAILER_EMAIL_DEV,
    to: to,
    subject: "Contraseña para ingresar a su book",
    html: '<strong>Este es mi html improvisado</strong>'
  };

  transporter
    .sendMail(emailOptions)
    .then(() => res.send("enviado correctamente"))
    .catch((err) => next(err));
});

module.exports = router;
