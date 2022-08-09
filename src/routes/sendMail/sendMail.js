const express = require("express");
const router = express.Router();

const userCreated = require("../../services/mailer/templates/userCreated");   
const transporter = require("../../services/mailer/mailer");
const { MAILER_EMAIL_DEV } = process.env;

router.post("/", (req, res, next) => {
  const { to, password } = req.body;
  let htmlContent = userCreated(password)
  console.log(htmlContent, 'contenido html')
  const emailOptions = {
    from: MAILER_EMAIL_DEV,
    to,
    subject: "Contraseña para ingresar a su book",
    content: [{ type: "text/html", value: htmlContent }]
  };

  transporter
    .sendMail(emailOptions)
    .then(() => res.send("enviado correctamente"))
    .catch((err) => next(err));
});

module.exports = router;
