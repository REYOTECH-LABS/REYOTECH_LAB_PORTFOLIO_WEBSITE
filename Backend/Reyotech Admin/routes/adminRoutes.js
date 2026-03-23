import express from "express";
import bcrypt from "bcrypt";
import Admin from "../models/admin.js";
import { validateSignup, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.post("/signup", validateSignup, handleValidationErrors, async (req, res) => {
	try {
		const { name, email, password, role, department } = req.body;

		// Check if admin already exists
		const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
		if (existingAdmin) {
			return res.status(409).json({
				success: false,
				message: "Admin with this email already exists",
			});
		}

		// Hash password
		const saltRounds = 12;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Create new admin
		const newAdmin = new Admin({
			name: name.trim(),
			email: email.toLowerCase().trim(),
			password: hashedPassword,
			role: role,
			department: department || null,
		});

		// Save admin
		await newAdmin.save();

		res.status(201).json({
			success: true,
			message: "Admin account created successfully",
			admin: {
				id: newAdmin._id,
				name: newAdmin.name,
				email: newAdmin.email,
				role: newAdmin.role,
				department: newAdmin.department,
				status: newAdmin.status,
				createdAt: newAdmin.createdAt,
			},
		});

	} catch (error) {
		console.error("Signup error:", error);

		// Handle duplicate key error
		if (error.code === 11000) {
			return res.status(400).json({
				success: false,
				message: "Admin with this email already exists",
			});
		}

		res.status(500).json({
			success: false,
			message: "Server error during signup",
		});
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Validate input
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Email and password are required",
			});
		}

		// Find admin by email
		const admin = await Admin.findOne({ email: email.toLowerCase() });
		if (!admin) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		// Compare password
		const isPasswordValid = await bcrypt.compare(password, admin.password);
		if (!isPasswordValid) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		res.status(200).json({
			success: true,
			message: "Login successful",
			admin: {
				id: admin._id,
				name: admin.name,
				email: admin.email,
				role: admin.role,
				department: admin.department,
				status: admin.status,
			},
		});

	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({
			success: false,
			message: "Server error during login",
		});
	}
});

export default router;