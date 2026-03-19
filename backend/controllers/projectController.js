const Project = require("../models/Project");

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("Get Projects Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Could not fetch projects.",
    });
  }
};

module.exports = { getProjects };