import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/UserModel"; 


dotenv.config();

// Define user type
interface User {
  googleId: string;
  name: string;
  email: string;
  photo: string;
}

passport.use(
  new GoogleStrategy(
    {
      clientID:'566898322531-0ka8vs2s22tf7vh7n0gdno9jvt1pas4c.apps.googleusercontent.com', //process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: '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',  //process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:5000/api/auth/google/callback",    },
    async (accessToken, refreshToken, profile:any, done:any) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            avatar: profile.photos?.[0]?.value,
          });

          await user.save(); 
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user as User);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user as User);
});

export default passport;
