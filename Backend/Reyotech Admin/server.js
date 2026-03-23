import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// mongoSanitize is incompatible with Express 5.x - validation middleware handles sanitization
// app.use(mongoSanitize());

// Connect to database
connectDB();

// Routes
app.use("/api/admin", adminRoutes);

// Basic route for testing
app.get("/", (req, res) => {
	res.json({ message: "Reyotech Admin API is running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).json({
		success: false,
		message: err.message || "Something went wrong",
	});
});
