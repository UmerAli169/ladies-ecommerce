import express from "express";
import User from "../models/User";
import authenticateUser from "../utils/authMiddleware";
import {
  registerUser,
  loginUser,
  resetPassword,
  recoverPassword,
} from "../controllers/authController";
import {
  registerValidation,
  loginValidation,
} from "../validators/validateRequest";
import passport from "passport";

const router = express.Router();

router.post("/register", registerValidation, registerUser); 
router.post("/login", loginValidation, loginUser);
router.post("/recover-password", recoverPassword);
router.post("/reset-password/:token", resetPassword);


router.get("/me", authenticateUser, async (req: any, res: any) => {
  const authReq = req as any; 

  try {
    const user = await User.findById(authReq.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000/");
  }
);

export default router;
