"use client";

import React, { useState } from "react";
import Button from "../shared/Button";
import ShippingOption from "./ShippingOption";
import ContactInfo from "../shared/ContactInfo";
import { useAuthStore } from "@/store/authStore"; // Import Zustand store

interface ShippingProps {
  onBack: () => void;
  onProceedToPayment: () => void;
}

const Shipping: React.FC<ShippingProps> = ({ onBack, onProceedToPayment }) => {
  const { user } = useAuthStore();
  const email = user?.email || "guest@example.com";
  const address = user?.address
    ? `${user.address.address}, ${user.address.city}, ${user.address.country}, ${user.address.postalCode}`
    : "No address available";

  const [selectedShipping, setSelectedShipping] = useState("fast");

  return (
    <div className="mx-auto flex flex-col gap-[40px]">
      <ContactInfo email={email} address={address} isLoggedIn={!!user} method={null} />

      <div className="flex flex-col gap-[20px]">
        <h2 className="text-[20px] text-[#383838] font-medium">Shipping Method</h2>
        <ShippingOption
          value="courier"
          label="Courier at home"
          description="Can be delivered today"
          price="$5.00"
          selected={selectedShipping}
          onSelect={setSelectedShipping}
        />
        <ShippingOption
          value="fast"
          label="Fast delivery by Nova Poshta"
          description="Will be delivered within one day"
          price="$2.00"
          selected={selectedShipping}
          onSelect={setSelectedShipping}
        />
      </div>

      <div className="flex gap-[40px]">
        <Button
          onClick={onProceedToPayment}
          className="max-w-[362px] w-full text-[#FFFFFF] text-[16px] font-semibold py-[10px] hover:bg-black hover:text-white"
        >
          Continue to payment
        </Button>
        <div className="flex items-center gap-[4px]">
          <Button
            onClick={onBack}
            className="max-w-[173px] bg-[#FFFFFF] text-[16px] text-[#B0A6BD] font-normal "
          >
            Return to Information
          </Button>
          <img
            src="/explore.svg"
            alt=""
            className="ml-[8px] w-[12px] fill-current text-[#B0A6BD]"
          />
        </div>
      </div>
    </div>
  );
};

export default Shipping;
