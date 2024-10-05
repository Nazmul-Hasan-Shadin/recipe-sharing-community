import nodemailer from "nodemailer";
import config from "../app/config";
export const sendEmail = async (to: string, html: string) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.node_env === "production", // upgrade later with STARTTLS
    auth: {
      user: "nazmulhasanshadin000@gmail.com",
      pass: process.env.NODE_MAIIL_PASS as string,
    },
  });

  await transport.sendMail({
    from: "nazmulhasanshadin000@gmail.com", // sender address
    to, // list of receivers
    subject: "Reset your password ✔", // Subject line
    text: "Hey Legend You are asking for reset password for crucial security. hurry up", // plain text body
    html, // html body
  });
};
