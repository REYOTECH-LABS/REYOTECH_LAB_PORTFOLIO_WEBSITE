const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Project image URL is required"],
    },
    technologies: {
      type: [String],
      required: [true, "At least one technology is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);