import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import { validationResult } from "express-validator";
import sendEmail from "../utils/sendEmail";
import * as crypto from "crypto";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { firstName, lastName, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ firstName, lastName, email, password: hashedPassword });

    await user.save();

    // Generate JWT token for new user
    const token = jwt.sign({ userId: user._id }, " process.env.JWT_SECRET!", {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully",
      token, // Send token
      user,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user: any = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Generate a new token upon login
    const token = jwt.sign({ userId: user._id }, " process.env.JWT_SECRET!", {
      expiresIn: "7d",
    });

    res.json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    const decoded: any = jwt.verify(
      token,
      " process.env.JWT_SECRET!" as string
    );
    if (!decoded) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    const newToken = jwt.sign(
      { userId: user._id },
      " process.env.JWT_SECRET!",
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Password reset successful",
      token: newToken,
      user,
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const recoverPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;
    const user: any = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User with this email does not exist." });
      return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const resetTokenExpiry = Date.now() + 60 * 60 * 1000;

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    const message = `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" target="_blank">Reset Password</a>
      <p>This link is valid for 1 hour.</p>
    `;

    await sendEmail(user.email, "Password Reset Request", message);

    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error("Recover password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
