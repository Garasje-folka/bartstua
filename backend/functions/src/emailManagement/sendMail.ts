import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import {SentMessageInfo} from "nodemailer";

admin.initializeApp();

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 25,
  auth: {
    user: "apikey",
    pass: functions.config().sendgrid.key,
  },
});

// Call emailSender() and change "to" to send email
export const sendMail = () => {
  const mailOptions = {
    from: "le.william.h@outlook.com",
    to: "motakkerEpostHer",
    subject: "Bartstua Ordre",
    // eslint-disable-next-line max-len
    html: "<b>Hei! Betalingen gikk gjennom og her er koden din:</b>",
  };

  return transporter.sendMail(mailOptions, (
      err: Error | null, info: SentMessageInfo) => {
    if (err) {
      console.log(err);
    }
  });
};
