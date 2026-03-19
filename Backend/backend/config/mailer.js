const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends a contact notification email.
 * @param {Object} contactDetails - The details of the contact.
 * @param {string} contactDetails.name - The name of the person contacting.
 * @param {string} contactDetails.email - The email address of the person contacting.
 * @param {string} contactDetails.message - The message from the person contacting.
 */
const sendContactNotification = async ({ name, email, message }) => {
  const mailOptions = {
    from: `"REYOTECH LABS Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // sends to reyotechlabs@gmail.com
    subject: `New Contact Message from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr />
      <small>This message was sent from the REYOTECH LABS portfolio contact form.</small>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendContactNotification };