const  nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
    host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, text, otp) => {
  try {
    const mailOptions = {
      from: `Codax <${process.env.EMAIL_USERNAME}>`,
      to: to,
      subject: subject,
      text: text,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { text-align: center; color: #333; margin-bottom: 30px; }
            .code-box { background-color: #f8f9fa; border: 2px dashed #007bff; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
            .verification-code { font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="header">Email Verification</h1>
            <p>Hello!</p>
            <p>Please use the verification code below to complete your action:</p>

            <div class="code-box">
              <div class="verification-code">${otp}</div>
            </div>

            <p><strong>Important:</strong> This code will expire in 10 minutes for security reasons.</p>
            <p>If you didn't request this, please ignore this email.</p>

            <div class="footer">
              <p>Best regards,<br>The Codax Team</p>
              <p><em>This is an automated message, please do not reply to this email.</em></p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return info;

  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;















