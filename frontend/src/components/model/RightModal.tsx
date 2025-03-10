import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Import useRouter
import { CartItem } from "@/components/cart/Items";
import { SampleSelection } from "@/components/cart/sample";
import Button from "../shared/Button";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }[];
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
}) => {
  const router = useRouter(); // Initialize useRouter

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Function to handle checkout navigation
  const handleCheckout = () => {
    onClose(); // Close the cart modal
    router.push("/Checkout"); // Navigate to checkout page
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={onClose}
        />
      )}

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-6 z-50 flex flex-col"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[26px] leading-[36px] font-semibold text-[#383838]">
            Cart
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <img src="/svgs/cart/stright.svg" alt="" />

        <div className="flex-1 overflow-y-auto scrollbar-hidden">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
              <SampleSelection />
            </>
          ) : (
            <p className="text-[#B0A6BD]">Your cart is empty.</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full bg-white p-6 shadow-md">
            <div className="flex justify-between text-[#B0A6BD] font-normal leading-[18px] text-[16px]">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button onClick={handleCheckout} className="w-full text-white py-2 mt-4 rounded">
              Check Out
            </Button>
          </div>
        )}
      </motion.div>
    </>
  );
};
