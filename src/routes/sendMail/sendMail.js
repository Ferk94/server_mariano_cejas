const express = require("express");
const  userCreated  = require("../../services/mailer/templates/userCreated");   
const router = express.Router();

const transporter = require("../../services/mailer/mailer");
const { MAILER_EMAIL_DEV } = process.env;

router.post("/", (req, res, next) => {
  const { to, password } = req.body;
  const emailOptions = {
    from: MAILER_EMAIL_DEV,
    to,
    subject: "Contraseña para ingresar a su book",
    html: userCreated(password)
  };

  transporter
    .sendMail(emailOptions)
    .then(() => res.send("enviado correctamente"))
    .catch((err) => next(err));
});

module.exports = router;
