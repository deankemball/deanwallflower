import nodemailer from "nodemailer";

const email = process.env.GMAIL_EMAIL_ADDRESS;
const pass = process.env.GMAIL_APP_PASSWORD;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});
