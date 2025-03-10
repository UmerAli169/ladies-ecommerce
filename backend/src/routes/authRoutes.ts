import express from "express";
import { registerUser, loginUser, resetPassword, recoverPassword } from "../controllers/authController";
import { registerValidation, loginValidation } from "../validators/validateRequest";
import passport from "passport";

const router = express.Router();

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.post("/reset-password/:token", resetPassword);
router.post("/recover-password", recoverPassword);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback",passport.authenticate("google", { failureRedirect: "/" }),(req, res) => { res.redirect("/dashboard");});

export default router;
