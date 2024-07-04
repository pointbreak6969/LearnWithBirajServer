import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_HOST,
    pass: process.env.EMAIL_PASSWORD,
  },
});
const sendEmail = async ({ userEmail, resetToken }) => {
  const mailOptions = {
    from: process.env.EMAIL_HOST,
    to: userEmail,
    subject: "Password Reset",
    text:
      "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
      "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
      `${resetToken}` +
      "If you did not request this, please ignore this email and your password will remain unchanged.\n",
  };
  await transporter.sendMail(mailOptions);
};
export {sendEmail}