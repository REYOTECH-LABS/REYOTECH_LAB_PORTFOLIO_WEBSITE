const express = require("express");
const router = express.Router();
const { getProjects } = require("../controllers/projectController");

// GET /api/projects - Public
router.get("/", getProjects);

module.exports = router;