"use client";

import React from "react";
import { FaCcVisa, FaGooglePay, FaPaypal } from "react-icons/fa";
import Button from "../shared/Button";
import PaymentOption from "./PaymentOption";
import ContactInfo from "../shared/ContactInfo";
import TextInput from "../shared/InputField"; // Importing the pure input component

interface PaymentProps {
  email: string;
  address: string;
  method: string;
  isLoggedIn: boolean;
  onBack: () => void;
  onPayNow: () => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

const Payment: React.FC<PaymentProps> = ({
  email,
  address,
  isLoggedIn,
  onBack,
  onPayNow,
  paymentMethod,
  setPaymentMethod,
  method,
}) => {
  return (
    <div className="mx-auto flex flex-col gap-[40px]">
      <ContactInfo
        email={email}
        address={address}
        isLoggedIn={isLoggedIn}
        method={method}
      />

      <div className="">
        <div className="text-[20px] text-[#383838] font-medium">
          Payment Method
        </div>
        <PaymentOption
          value="credit-card"
          label="Credit Card"
          icon={<img src="/svgs/payment/visa.svg" alt="" />}
          selected={paymentMethod}
          onSelect={setPaymentMethod}
        />
        <PaymentOption
          value="gpay"
          label="Google Pay"
          icon={<img src="/svgs/payment/gpay.svg" alt="" />}
          selected={paymentMethod}
          onSelect={setPaymentMethod}
        />
        <PaymentOption
          value="paypal"
          label="PayPal"
          icon={<img src="/svgs/payment/paypal.svg" alt="" />}
          selected={paymentMethod}
          onSelect={setPaymentMethod}
        />
      </div>

      {(paymentMethod === "credit-card" ||
        paymentMethod === "gpay" ||
        paymentMethod === "paypal") && (
        <div className="mt-4 space-y-3">
          <TextInput placeholder="Card Number" />
          <TextInput placeholder="Card Name" />
          <div className="flex flex-col sm:flex-row gap-2">
            <TextInput
              placeholder="Expiration Date (MM/YY)"
              className="w-full sm:w-5/4"
            />
            <TextInput
              placeholder="Security Code"
              className="w-full sm:w-5/4"
            />
          </div>
        </div>
      )}

      <div className=" flex gap-[40px]">
        <Button
          onClick={onPayNow}
          className=" max-w-[362px] w-full text-[#FFFFFF] text-[16px] font-semibold py-[10px]  "
        >
          Pay Now
        </Button>
        <div className="flex items-center gap-[4px]">
          <Button
            onClick={onBack}
            className="max-w-[173px] bg-[#FFFFFF] text-[16px] text-[#B0A6BD] font-normal"
          >
            Return to Shopping
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

export default Payment;
