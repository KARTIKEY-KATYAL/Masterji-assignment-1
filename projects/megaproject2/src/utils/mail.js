import nodemailer from "nodemailer";
import Mailgen from "mailgen";

export const sendMail = async function (options) {
  const mailGenerator = new Mailgen({
    theme: "salted",
    product: {
      name: "Confrim your email",
      link: "https://mailgen.js/",
      // Custom copyright notice
      copyright: `Copyright © ${new Date().getFullYear()} Mailgen. All rights reserved.`,
    },
  });
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  const emailText = mailGenerator.generatePlaintext(options.MailgenContent);
  const email = mailGenerator.generate(options.MailgenContent);

  const info = await transporter.sendMail({
    from: "noreply@coder.com", // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: emailText, // plain text body
    html: email, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

const emailverificationMailGenerator = (username, verificationurl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to App! We're very excited to have you on board.",
      action: {
        instructions: "To get started with App, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your account",
          link: verificationurl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const emailresetMailGenerator = (username, resetPasswordurl) => {
  return {
    body: {
      name: username,
      intro: "This is the link to Reset Password",
      action: {
        instructions: "To Reset Password, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Reset Password",
          link: resetPasswordurl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

// This is How to send options

// const options = {
//     email : 'kartikey@xyz.com',
//     Subject : 'aaaa' ,
//     MailgenContent : emailverificationMailGenerator(
//         username,
//         'http://link.com'
//     )
// }
