const { validationResult } = require("express-validator");
const Message = require("../models/Message");
const { sendContactNotification } = require("../config/mailer");

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  const { name, email, message } = req.body;

  try {
    // Save message to database
    const newMessage = await Message.create({ name, email, message });

    // Send email notification to REYOTECH LABS
    try {
      await sendContactNotification({ name, email, message });
    } catch (emailError) {
      // Email failure should not block the response
      console.error("Email notification failed:", emailError.message);
    }

    res.status(201).json({
      success: true,
      message: "Your message has been received. We will get back to you soon!",
      data: newMessage,
    });
  } catch (error) {
    console.error("Contact Form Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Could not submit your message.",
    });
  }
};

module.exports = { submitContact };