import sgMail from "@sendgrid/mail";

const { MAILER_PASS_DEV } = process.env;

sgMail.setApiKey(MAILER_PASS_DEV);

export default sgMail;
