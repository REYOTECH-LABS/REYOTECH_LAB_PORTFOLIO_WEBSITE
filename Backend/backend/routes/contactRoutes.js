const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const rateLimit = require("express-rate-limit");
const { submitContact } = require("../controllers/contactController");

// Rate limiter - max 5 submissions per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many messages submitted. Please try again later.",
  },
});

// Validation rules
const contactValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("subject")
    .optional()
    .trim()
    .isIn(["General Enquiry", "Project Request", "Partnership", "Career", "Other"])
    .withMessage("Invalid subject selected"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be between 10 and 2000 characters"),
];

// POST /api/contact - Public
router.post("/", contactLimiter, contactValidation, submitContact);

module.exports = router;