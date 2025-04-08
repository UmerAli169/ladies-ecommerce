import React, { useState } from "react";
import Button from "../shared/Button";
import InputField from "../shared/InputField";
import toast from "react-hot-toast"; // Add toast for notifications
import { updateAddress } from "../../services/internal"; // Import your API function
import { AnyCnameRecord } from "dns";

const ShippingAddress = ({ onContinue, user, setUser }: { onContinue: () => void; user: any; setUser: (user: any) => void }):AnyCnameRecord => {
  const [isLoggedIn] = useState(!!user);
  const [formData, setFormData] = useState({
    address: user?.address?.address || "",
    country: user?.address?.country || "",
    city: user?.address?.city || "",
    postalCode: user?.address?.postalCode || "",
    phone: user?.address?.phone || "",
    recipientNotMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (isLoggedIn) {
        // Update the address using the API call
        const updatedAddress = await updateAddress(formData); // Make sure updateAddress API works accordingly
        setUser({ ...user, address: updatedAddress }); // Update user state with the new address
      } else {
        toast.error("Please log in to update the address.");
      }
      onContinue(); // Move to the next step after successful submission
    } catch (error) {
      toast.error("Failed to update shipping address.");
    }
  };

  return (
    <div className="mx-auto">
      <h2 className="text-[22px] text-[#383838] font-medium pb-[20px]">Shipping Address</h2>
      {isLoggedIn ? (
        <div className="space-y-[20px]">
          <InputField label="Saved Address" value={user.address?.address || ""} readOnly />
          <InputField label="Country" value={user.address?.country || ""} readOnly />
          <InputField label="Address" name="address" value={formData.address} onChange={handleChange} />

          <div className="flex gap-3">
            <InputField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-1/2"
            />
            <InputField
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-1/2"
            />
          </div>

          <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} readOnly />

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

          <InputField label="Phone" placeholder="Enter phone number" />
        </div>
      )}

      <div className="pt-[40px]">
        <Button
          className="max-w-[285px] w-full py-[12px] px-[33px] text-white font-semibold font-[16px] hover:bg-custom-gradienthover:text-white"
          onClick={handleSubmit} // Call the handleSubmit function
        >
          Continue to Shipping
        </Button>
      </div>
    </div>
  );
};

export default ShippingAddress;
