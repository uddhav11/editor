const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const PendingVerification = require("../models/pendingVerificationModel");
const generateTokenAndSetCookies = require("../middleware/generateCookie");
const generateOTP = require("../utills/generateotp");
const generateUserCode = require("../utills/generatecode");
const sendEmail = require("../utills/sendEmail");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCode = await generateUserCode();
    const otp = generateOTP();

    // Remove existing pending verifications for that email (if any)
    await PendingVerification.deleteOne({ email });

    const newPending = new PendingVerification({
      username,
      email,
      password: hashedPassword,
      userCode,
      otp,
      type: "register",
    });

    await newPending.save();

    await sendEmail(
      email,
      `Your Verification Code`,
      `Your verification code is ${userCode}. Please verify your email to complete the registration.`,
      otp
    );

    return res
      .status(200)
      .json({ message: "Verification code sent to your email" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error in register" });
  }
};

const verifyRegister = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    console.log("this is email and otp", email, otp);
    const pendingVerification = await PendingVerification.findOne({
      email,
      type: "register",
    });

    console.log("this is pending verification", pendingVerification);

    if (!pendingVerification) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification request" });
    }

    // Check if OTP is older than 10 minutes
    const now = new Date();
    const createdAt = new Date(pendingVerification.createdAt);
    const diffInMinutes = (now - createdAt) / (1000 * 60);

    if (diffInMinutes > 5) {
      await PendingVerification.deleteOne({ email }); // Clean up expired entry
      return res
        .status(400)
        .json({ message: "OTP has expired. Please register again." });
    }

    if (pendingVerification.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const newUser = new User({
      username: pendingVerification.username,
      email: pendingVerification.email,
      password: pendingVerification.password,
      userCode: pendingVerification.userCode,
      googleid: "",
      profilepic: "",
      isAdmin: false,
    });

    await newUser.save();
    await PendingVerification.deleteOne({ email });

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error in verifyRegister:", error);
    return res.status(500).json({ message: "Server error in verifyRegister" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const otp = generateOTP();

    await PendingVerification.deleteOne({ email });

    const newPending = new PendingVerification({
      email,
      otp,
      type: "login",
      userCode: existingUser.userCode,
    });

    await newPending.save();

    await sendEmail(
      email,
      "Your Login OTP",
      `Your login OTP is ${otp}. Please use it in the login verification and do not share it with anyone.`,
      otp
    );

    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Server error in login" });
  }
};

const verifyLogin = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const pendingVerification = await PendingVerification.findOne({
      email,
      type: "login",
    });

    if (!pendingVerification) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification request" });
    }

    if (pendingVerification.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "User not found" });
    }

    const token = generateTokenAndSetCookies(existingUser._id, res);

    await PendingVerification.deleteOne({ email });

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
        userCode: existingUser.userCode,
      },
      token,
    });
  } catch (error) {
    console.error("Error in verifyLogin:", error);
    return res.status(500).json({ message: "Server error in verifyLogin" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "User Logout successfully" });
  } catch (error) {
    console.log("error in the user logout", error);
    res.ststus(500).json({ message: "Internal server error at logout" });
  }
};

const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized, user not found" });
    }

    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log("error in the get userProfile", error);
    return res
      .status(500)
      .json({ message: "Internal server error in getProfile" });
  }
};









module.exports = {
  register,
  verifyRegister,
  login,
  verifyLogin,
  logout,
  getProfile,
};
