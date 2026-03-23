const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContactNotification = async ({ name, email, subject, message }) => {
  const mailOptions = {
    from: `"REYOTECH LABS Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `[${subject}] New Message from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr />
      <small>This message was sent from the REYOTECH LABS portfolio contact form.</small>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendContactNotification };