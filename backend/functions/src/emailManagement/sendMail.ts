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

// Call emailSender() to send mail
export const sendMail = (sender: string, recipient: string) => {
  const mailOptions = {
    from: sender,
    to: recipient,
    subject: "Bartstua Ordre",
    // eslint-disable-next-line max-len
    html: "<b>Hei! Takk for din bestilling. Betalingen gikk gjennom!</b>",
  };

  return transporter.sendMail(
    mailOptions,
    (err: Error | null, info: SentMessageInfo) => {
      if (err) {
        console.log(err);
      }
    }
  );
};
