const API_BASE_URL = "http://localhost:3000/api/admin";
let currentUser = null;

function switchTab(tab) {
	const signupSection = document.querySelector(".form-section.signup");
	const loginSection = document.querySelector(".form-section.login");

	if (tab === "signup") {
		signupSection.classList.add("active");
		loginSection.classList.remove("active");
		document.querySelectorAll(".tab-btn")[0].classList.add("active");
		document.querySelectorAll(".tab-btn")[1].classList.remove("active");
	} else {
		signupSection.classList.remove("active");
		loginSection.classList.add("active");
		document.querySelectorAll(".tab-btn")[0].classList.remove("active");
		document.querySelectorAll(".tab-btn")[1].classList.add("active");
	}
}

function showAuthForm() {
	document.getElementById("authContainer").classList.remove("hidden");
	document.getElementById("authContainer").style.display = "flex";
	document.getElementById("dashboardSection").classList.remove("active");
}

function showDashboard() {
	document.getElementById("authContainer").style.display = "none";
	document.getElementById("dashboardSection").classList.add("active");

	if (currentUser) {
		const userInfoHTML = `
			<p>Name: <strong>${currentUser.name}</strong></p>
			<p>Email: <strong>${currentUser.email}</strong></p>
			<p>Role: <strong>${currentUser.role.replace("_", " ").toUpperCase()}</strong></p>
		`;
		document.getElementById("userInfo").innerHTML = userInfoHTML;
		document.getElementById("randomStats").textContent =
			Math.floor(Math.random() * 50) + 1;
	}
}

function showMessage(elementId, message, type) {
	const messageEl = document.getElementById(elementId);
	messageEl.textContent = message;
	messageEl.className = `message ${type} show`;
	setTimeout(() => {
		messageEl.classList.remove("show");
	}, 5000);
}

async function handleSignup(event) {
	event.preventDefault();

	const name = document.getElementById("signupName").value;
	const email = document.getElementById("signupEmail").value;
	const password = document.getElementById("signupPassword").value;
	const role = document.getElementById("signupRole").value;
	const department = document.getElementById("signupDepartment").value;

	try {
		const response = await fetch(`${API_BASE_URL}/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				password,
				role,
				department: department || null,
			}),
		});

		const data = await response.json();

		if (response.ok) {
			showMessage(
				"signupMessage",
				"✓ Sign up successful! You can now login.",
				"success",
			);
			document.getElementById("signupForm").reset();
			setTimeout(() => {
				switchTab("login");
			}, 1500);
		} else {
			const errorMsg = data.message || "Sign up failed";
			showMessage("signupMessage", `✗ ${errorMsg}`, "error");

			if (data.errors) {
				const errorDetails = data.errors
					.map((err) => `${err.field}: ${err.message}`)
					.join("\n");
				console.log("Validation Errors:", errorDetails);
			}
		}
	} catch (error) {
		showMessage("signupMessage", `✗ Error: ${error.message}`, "error");
		console.error("Sign up error:", error);
	}
}

async function handleLogin(event) {
	event.preventDefault();

	const email = document.getElementById("loginEmail").value;
	const password = document.getElementById("loginPassword").value;

	try {
		const response = await fetch(`${API_BASE_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				email,
				password,
			}),
		});

		const data = await response.json();

		if (response.ok) {
			showMessage(
				"loginMessage",
				`✓ Login successful! Welcome, ${data.admin.name}`,
				"success",
			);
			currentUser = data.admin;
			console.log("Login Response:", data);
			document.getElementById("loginForm").reset();

			setTimeout(() => {
				showDashboard();
			}, 1500);
		} else {
			const errorMsg = data.message || "Login failed";
			showMessage("loginMessage", `✗ ${errorMsg}`, "error");
		}
	} catch (error) {
		showMessage("loginMessage", `✗ Error: ${error.message}`, "error");
		console.error("Login error:", error);
	}
}

async function handleLogout() {
	try {
		const response = await fetch(`${API_BASE_URL}/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		const data = await response.json();

		if (response.ok) {
			showMessage(
				"logoutMessage",
				"✓ Logout successful! Redirecting to login...",
				"success",
			);
			currentUser = null;

			setTimeout(() => {
				showAuthForm();
				switchTab("login");
				document.getElementById("logoutMessage").classList.remove("show");
			}, 1500);
		} else {
			const errorMsg = data.message || "Logout failed";
			showMessage("logoutMessage", `✗ ${errorMsg}`, "error");
		}
	} catch (error) {
		showMessage("logoutMessage", `✗ Error: ${error.message}`, "error");
		console.error("Logout error:", error);
	}
}
