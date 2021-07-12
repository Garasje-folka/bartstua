import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import { SentMessageInfo } from "nodemailer";

const sendMail = async (
  sender: string,
  recipient: string,
  subject: string,
  text: string,
  html: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 25,
    auth: {
      user: "apikey",
      pass: functions.config().sendgrid.key,
    },
  });

  await transporter.sendMail(
    {
      from: sender,
      to: recipient,
      subject: subject,
      text: text,
      html: html,
    },
    (err: Error | null, info: SentMessageInfo) => {
      console.error(err);
      console.error(info.messageId);
      console.error(info.envelope);
    }
  );
};

export { sendMail };
