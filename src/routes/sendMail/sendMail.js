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
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <p>Este es el body de mi html</p>
    </body>
    </html>`
  };

  transporter
    .sendMail(emailOptions)
    .then(() => res.send("enviado correctamente"))
    .catch((err) => next(err));
});

module.exports = router;
