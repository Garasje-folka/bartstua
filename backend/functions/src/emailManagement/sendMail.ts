import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import { SentMessageInfo } from "nodemailer";

admin.initializeApp();

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 25,
  auth: {
    user: "apikey",
    pass: functions.config().sendgrid.key,
  },
});

export const sendMail = (
  sender: string,
  recipient: string,
  subject: string,
  html: string
) => {
  const mailOptions = {
    from: sender,
    to: recipient,
    subject: subject,
    html: html,
  };

  // TODO: How should errors be handled?
  return transporter.sendMail(
    mailOptions,
    (err: Error | null, info: SentMessageInfo) => {
      if (err) {
        console.log(err);
      }
    }
  );
};
