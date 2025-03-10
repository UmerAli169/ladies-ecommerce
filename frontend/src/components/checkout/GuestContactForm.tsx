"use client";

import React from "react";
import InputField from "../shared/InputField";
import Button from "../shared/Button";
import Link from "next/link";
import ContactInfo from "../shared/ContactInfo";

interface GuestContactFormProps {
  email?: string;
  isLoggedIn: boolean;
  onLogout: () => void;
  onEmailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GuestContactForm: React.FC<GuestContactFormProps> = ({
  email,
  isLoggedIn,
  onLogout,
  onEmailChange,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center pb-[20px]">
        <h2 className="text-[20px] text-[#383838] font-medium">
          Contact Information
        </h2>
        {!isLoggedIn && (
          <p className="text-[#697586] text-[16px] font-normal">
            Do you already have an account? <Link href="">Login</Link>
          </p>
        )}
      </div>

      {isLoggedIn ? (
        <ContactInfo 
          email={email || ""}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout} method={undefined}        />
      ) : (
        <InputField
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={onEmailChange}
        />
      )}

      <div className="mt-2">
        <label className="flex items-center gap-2 text-[14px] font-normal text-[#697586]">
          <input type="checkbox" className="w-4 h-4" />
          Yes, I want to subscribe to the newsletter.
        </label>
      </div>
    </div>
  );
};

export default GuestContactForm;
