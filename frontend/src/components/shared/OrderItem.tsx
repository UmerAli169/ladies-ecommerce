import React from "react";

interface OrderItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  isCartView?: boolean;
  onUpdateQuantity?: (id: number, newQuantity: number) => void;
  onRemoveItem?: (id: number) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({
  item,
  isCartView = false,
  onUpdateQuantity,
  onRemoveItem,
}) => {

  return (
    <div className="flex items-center gap-4 border-b py-2">
      <img
        src={item.image || "/cart/cart1.png"}
        alt={item.name}
        className="w-[80px] h-[80px] object-cover rounded"
      />

      <div className="flex-1">
        <p className="text-[16px] leading-[24px] font-medium text-[#383838]">
          {item.name}
        </p>
        <p className="text-[#697586] text-[14px] leading-[20px]">
          {isCartView
            ? `$${item.price.toFixed(2)}`
            : item.quantity > 1
            ? `${item.quantity} Pcs`
            : ""}
        </p>
        <div className="flex items-center mt-2">
            <div className="border rounded-[4px] flex items-center">
              <button
                className="px-2 text-[14px] font-normal"
               
              >
                -
              </button>
              <span className="mx-2 text-[14px] font-normal">
                {item.quantity}
              </span>
              <button
                className="px-2 text-[14px] font-normal"
              >
                +
              </button>
            </div>
          </div>
        {isCartView && onUpdateQuantity && (
          <div className="flex items-center mt-2">
            <div className="border rounded-[4px] flex items-center">
              <button
                className="px-2 text-[14px] font-normal"
                onClick={() =>
                  onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
              >
                -
              </button>
              <span className="mx-2 text-[14px] font-normal">
                {item.quantity}
              </span>
              <button
                className="px-2 text-[14px] font-normal"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center">
        <p className="text-[#697586] text-[14px] font-normal">
          ${item.quantity * item.price}
        </p>

        {isCartView && onRemoveItem && (
          <button className="ml-4" onClick={() => onRemoveItem(item.id)}>
            <img
              src="/svgs/Shared/cross/cross.svg"
              alt="Remove"
              className="w-[12px]"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
