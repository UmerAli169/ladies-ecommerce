import React from "react";
import OrderItem from "./OrderItem";
import Button from "./Button";

interface OrderSummaryProps {
  orders: {
    items: {
      id: any;
      name: string;
      quantity: number;
      price: number;
      image: string;
    }[];
  }[];
  shipping: number;
}
const OrderSummary: React.FC<OrderSummaryProps> = ({
  orders,
  shipping = 5.0,
}: any) => {
  const subtotal = orders.reduce(
    (acc: any, item: any) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + shipping;

  return (
    <div className=" p-[20px] rounded-[6px] bg-[#FFFFFF]">
      <p className="text-[20px] font-medium text-[#383838]  ">Your Order</p>
      <div className="space-y-3">
        {orders.map((order: any) =>
          order.items.map((item: any) => (
            <OrderItem key={item.id} item={item} />
          ))
        )}
      </div>
      <div className="mt-4 flex flex-col gap-[10px] font-normal text-[16px] leading-[18px] text-[#B0A6BD]">
        <p>
          Subtotal: <span className="float-right">$122</span>
        </p>
        <p>
          Shipping: <span className="float-right">${shipping.toFixed(2)}</span>
        </p>
        <p className="font-medium text-[16px] leading-[18px] text-[#383838]">
          Estimated Total: <span className="float-right">$284</span>
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
