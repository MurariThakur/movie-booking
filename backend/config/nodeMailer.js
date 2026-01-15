import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, subject, body) => {
  const message = await transport.sendMail({
    from: process.env.SENDER_EMAIL,
    to: to,
    subject: subject,
    html: body,
  });
  return message;
};

export default sendEmail;
