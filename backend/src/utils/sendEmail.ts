import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "cricketare1234@gmail.com", //process.env.EMAIL_USER,
      pass: "tdtt tkrv lqqc zvwc", //process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: "aumeralikhan@gmai.com", //process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};

export default sendEmail;
