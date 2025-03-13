"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { LoginModal } from "../modals/LoginModal";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const user = useAuthStore((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false); 

  useEffect(() => {
    setIsLoading(false);

    if (!user) {
      setIsLoginOpen(true);
    }
  }, [user]);

  if (isLoading) return null; 
  return user ? (
    <>{children}</>
  ) : (
    <LoginModal
      isOpen={isLoginOpen}
      onClose={() => setIsLoginOpen(false)}
      onRecoverPassword={() => console.log("Recover Password")}
      onCreateAccount={() => console.log("Create Account")}
    />
  );
};
