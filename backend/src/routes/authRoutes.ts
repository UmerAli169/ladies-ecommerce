import express from "express";
import { registerUser, loginUser, resetPassword, recoverPassword, saveGoogleUser } from "../controllers/authController";
import { registerValidation, loginValidation } from "../validators/validateRequest";
import passport from "passport";

const router = express.Router();

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.post("/recover-password", recoverPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/save-user", saveGoogleUser);

export default router;
