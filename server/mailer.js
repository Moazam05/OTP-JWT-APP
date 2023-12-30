const nodemailer = require("nodemailer");
require("dotenv").config();
const Message = require("./models/messageModel");

// CREATE TRANSPORTER
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// FUNCTION TO SEND EMAIL
const sendEmail = async (email, name, message) => {
  try {
    const greetingMessage = "Hi there! Thank you for reaching out.";
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `Thank you for contacting me, ${name}!`,
      text: `${greetingMessage}\n\nFrom: ${email}\n\nMessage: ${message}`,
      html: `<p>${greetingMessage}</p><br><h1>From: ${email}</h1><p>${message}</p>`,
    });
    await Message.create({
      name,
      email,
      message,
    });
    console.log("Message sent: %s", info.messageId.bgMagenta);
  } catch (error) {
    console.error("Error while sending email: ", error);
  }
};

module.exports = sendEmail;
