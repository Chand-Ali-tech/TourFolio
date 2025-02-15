const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "./../.env" });

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email, 
    subject: options.subject, 
    // text: options.message,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border-radius: 8px; background: #f4f4f4;">
        <div style="background: #007bff; padding: 10px; text-align: center; border-radius: 5px;">
          <h2 style="color: white; margin: 0;">${options.subject}</h2>
        </div>
        <div style="background: white; padding: 20px; border-radius: 5px; margin-top: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
          <p style="font-size: 16px; color: #333;">${options.message.replace(/\n/g, "<br>")}</p>
        </div>
        <footer style="text-align: center; margin-top: 15px; font-size: 14px; color: #555;">
          <p>Best regards,<br><strong>TourFolio Team</strong></p>
        </footer>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;