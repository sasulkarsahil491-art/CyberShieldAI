const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const BCRYPT_ROUNDS = 12;
const MIN_PASSWORD_LENGTH = 12;
const MAX_BCRYPT_PASSWORD_BYTES = 72;
const USER_ID_PATTERN = /^[a-z0-9][a-z0-9._-]{1,22}[a-z0-9]$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_SPECIAL_CHARACTERS = new Set([".", "*", "+", "?", "^", "$", "(", ")", "|", "{", "}", "[", "]", "\\"]);

const normalizeEmail = (email) => email.trim().toLowerCase();
const normalizeUserId = (userId) => userId.trim().toLowerCase();
const escapeRegex = (value) => Array.from(value, (character) =>
  REGEX_SPECIAL_CHARACTERS.has(character) ? "\\" + character : character
).join("");
const emailLookup = (email) => new RegExp("^" + escapeRegex(email) + "$", "i");

const registerUser = async (req, res) => {
  try {
    const { name, userId, email, password } = req.body || {};
    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanUserId = typeof userId === "string" ? normalizeUserId(userId) : "";
    const cleanEmail = typeof email === "string" ? normalizeEmail(email) : "";

    if (!cleanName || cleanName.length > 80) {
      return res.status(400).json({ success: false, message: "Enter a name of 1–80 characters." });
    }

    if (!USER_ID_PATTERN.test(cleanUserId)) {
      return res.status(400).json({
        success: false,
        message: "User ID must be 3–24 characters, start and end with a letter or number, and contain only letters, numbers, dots, underscores, or hyphens.",
      });
    }

    if (cleanEmail.length > 254 || !EMAIL_PATTERN.test(cleanEmail)) {
      return res.status(400).json({ success: false, message: "Enter a valid email address." });
    }

    if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({ success: false, message: "Password must be at least 12 characters." });
    }

    if (Buffer.byteLength(password, "utf8") > MAX_BCRYPT_PASSWORD_BYTES) {
      return res.status(400).json({ success: false, message: "Password must be 72 bytes or fewer." });
    }

    const existingUser = await User.findOne({
      $or: [
        { email: emailLookup(cleanEmail) },
        { userId: cleanUserId },
      ],
    }).select("userId email");

    if (existingUser) {
      const message = existingUser.userId === cleanUserId
        ? "That User ID is already taken."
        : "An account with that email already exists.";
      return res.status(409).json({ success: false, message });
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const user = await User.create({
      name: cleanName,
      userId: cleanUserId,
      email: cleanEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error?.code === 11000) {
      const duplicatedField = Object.keys(error.keyPattern || {})[0];
      const message = duplicatedField === "userId"
        ? "That User ID is already taken."
        : "An account with that email already exists.";
      return res.status(409).json({ success: false, message });
    }

    console.error("Registration failed:", error?.name || "UnknownError");
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const cleanEmail = typeof email === "string" ? normalizeEmail(email) : "";

    if (!cleanEmail || typeof password !== "string") {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(503).json({ success: false, message: "Authentication service is not configured." });
    }

    const user = await User.findOne({ email: emailLookup(cleanEmail) }).select("+password");
    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d", algorithm: "HS256" }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login failed:", error?.name || "UnknownError");
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser };