import React, { useState } from "react";
import Button from "../shared/Button";
import InputField from "../shared/InputField";

const ShippingAddress = ({ onContinue, user }: { onContinue: () => void; user: any }) => {
   
  const [isLoggedIn] = useState(!!user);
  console.log(user.address)

  return (
    <div className="mx-auto">
      <h2 className="text-[22px] text-[#383838] font-medium pb-[20px]">
        Shipping Address
      </h2>
      {isLoggedIn ? (
        <div className="space-y-[20px]">
          <InputField label="Saved Address" value={user.address?.address || ""} readOnly />
          <InputField label="Country" value={user.address?.country || ""} readOnly />
          <InputField label="Address" placeholder="Enter your address" />

          <div className="flex gap-3">
            <InputField label="City" placeholder="Enter city" className="w-1/2" />
            <InputField label="Postal Code" placeholder="Enter postal code" className="w-1/2" />
          </div>

          <InputField label="Phone" value={user.address?.phone || ""} readOnly />

          <label className="flex items-center gap-2 text-[#383838] text-[14px]">
            <input type="checkbox" className="w-4 h-4 border-[#D9D9D9]" />
            The recipient is not me
          </label>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-3">
            <InputField label="First Name" placeholder="Enter first name" className="w-1/2" />
            <InputField label="Last Name" placeholder="Enter last name" className="w-1/2" />
          </div>
          <InputField label="Country" placeholder="Enter country" />
          <InputField label="Address" placeholder="Enter your address" />

          <div className="flex gap-3">
            <InputField label="City" placeholder="Enter city" className="w-1/2" />
            <InputField label="Postal Code" placeholder="Enter postal code" className="w-1/2" />
          </div>

          <InputField label="Phone"  placeholder="Enter phone number" />
        </div>
      )}

      <div className="pt-[40px]">
        <Button
          className="max-w-[285px] w-full py-[12px] px-[33px] text-white font-semibold font-[16px] hover:bg-black hover:text-white"
          onClick={onContinue} 
        >
          Continue to Shipping
        </Button>
      </div>
    </div>
  );
};

export default ShippingAddress;
