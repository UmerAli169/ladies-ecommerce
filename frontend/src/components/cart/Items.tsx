interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
}
export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className="flex items-center justify-between border-b py-4">
      <img
        src={item.image || "/cart/cart1.png"}
        alt={item.name}
        className="w-16 h-16 object-cover"
      />
      <div className="flex-1 gap-[10px] ml-4">
        <h3 className="text-[16px] leading-[24px]  font-medium">{item.name}</h3>
        <h3 className="text-[14px] leading-[21px]  font-nomral ">{item.price }</h3>

        <div className="flex items-center mt-2">
          <div className="border rounded-[4px]">

          <button className="px-2  text-[14px] leading-[21px]  font-nomral">-</button>
          <span className="mx-2 text-[14px] leading-[21px]  font-nomral">{item.quantity || "12"}</span>
          <button className="mx-2 text-[14px] leading-[21px]  font-nomral">+</button>
          </div>
          <div className=" ml-[10px] filter invert w-[8px]">

          <img src="/svgs/Shared/cross/cross.svg" alt="" />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
