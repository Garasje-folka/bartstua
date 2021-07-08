import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 25,
  auth: {
    user: "apikey",
    pass: "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",
  },
});

export const emailSender = () => {
  const mailOptions = {
    from: "le.william.h@outlook.com",
    to: "mottakersepost",
    subject: "Bartstua Ordre",
    // eslint-disable-next-line max-len
    html: "<b>Hei! Betalingen gikk gjennom og her er koden din:</b>",
  };

  return transporter.sendMail(mailOptions, (err:any, info:any) => {
    if (err) {
      console.log(err);
    }
  });
};



