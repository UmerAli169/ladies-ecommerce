"use client";
import React, { useState } from "react";
import DeliveryMethod from "../../components/checkout/DeliveryMethod";
import ShippingAddress from "../../components/checkout/ShippingAddress";
import GuestContactForm from "../../components/checkout/GuestContactForm";
import Wrapper from "@/app/wrapper";
import Shipping from "../../components/checkout/Shipping";
import Payment from "../../components/checkout/Payment";
import OrderSummary from "@/components/shared/OrderSummary";
import { useAuthStore } from "@/store/authStore"; // Import Zustand auth store
import { useCartStore } from "@/store/cartStore";

const orders = [
  {
    items: [
      {
        id: "12348904321",
        name: "Soft Finish",
        quantity: 2,
        price: 19.6,
        image: "/cart/cart1.png",
      },
    ],
  },
  {
    items: [
      {
        id: "123489043421",
        name: "Soft Finish",
        quantity: 1,
        price: 19.6,
        image: "/cart/cart1.png",
      },
    ],
  },
];

const Checkout = () => {
  const handleBackToInfo = () => setShowShipping(false);
  const handleProceedToPayment = () => setShowPayment(true);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { cart } = useCartStore();
  const [deliveryMethod, setDeliveryMethod] = useState("ship");
  const [shippingCharge, setShippingCharge] = useState(5.0); // Default charge for shipping

  const [showShipping, setShowShipping] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [email, setEmail] = useState("");
  const userEmail = "MariannaThompson93@gmail.com (Marianna Thompson)";
  const formattedOrders = cart.map((order) => ({
    _id: order._id,
    name: order.name,
    quantity: order.quantity,
    price: order.price,
    image: order.image,
  }));
  const handleLogout = () => {
    logout();
  };
  const handleDeliveryMethodChange = (method: string) => {
    setDeliveryMethod(method);
    setShippingCharge(method === "ship" ? 5.0 : 0.0);
  };
  return (
    <Wrapper>
      <div className="flex flex-col lg:flex-row gap-[20px] py-[40px] ">
        <div className="flex-1 space-y-[40px] bg-white py-[20px] px-[30px] rounded-[6px]">
          {showPayment ? (
            <Payment
              onBack={() => setShowPayment(false)}
              onPayNow={() => console.log("Payment successful!")}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              email={userEmail}
              method={paymentMethod}
              address={"Maidan Nezalezhnosti 2, Kyiv, 01000, Ukraine"}
              isLoggedIn={false}
            />
          ) : showShipping ? (
            <Shipping
              email={userEmail}
              address="Maidan Nezalezhnosti 2, Kyiv, 01000, Ukraine"
              onBack={handleBackToInfo}
              onProceedToPayment={handleProceedToPayment}
              isLoggedIn={false}
            />
          ) : (
            <>
              <GuestContactForm
                user={isAuthenticated ? user.user : email}
                isLoggedIn={isAuthenticated}
                onLogout={handleLogout}
                onEmailChange={(e) => setEmail(e.target.value)}
              />

              <DeliveryMethod
                selectedMethod={deliveryMethod}
                onChange={handleDeliveryMethodChange}
                onEdit={() => setShowShipping(true)}
              />

              <ShippingAddress
                onContinue={() => setShowShipping(true)}
                user={isAuthenticated ? user : null}
              />
            </>
          )}
        </div>

        <div className="w-full lg:w-1/3">
          <OrderSummary orders={formattedOrders} shipping={shippingCharge} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Checkout;
