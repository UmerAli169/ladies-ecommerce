import MenuItem from "./MetuItems";

const MobileMenu = ({ isMenuOpen, toggleMenu, mobileMenu, menuItems, icons }:any) => {
  if (!isMenuOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={toggleMenu} />
      <div className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-white">
        <div className="flex justify-between items-center p-4 bg-[#F5A3B7]">
          <span className="text-lg font-semibold text-white">MENU</span>
          {mobileMenu && (
            <img
              src="/svgs/Shared/cross/cross.svg"
              alt="Close Menu"
              onClick={toggleMenu}
              className="w-[14px] h-[14px] cursor-pointer"
            />
          )}
        </div>

        <div className="p-4 space-y-4">
          {icons
            .filter(({ label }:any) => label.toLowerCase() !== "cart")
            .map(({ img, label }:any) => (
              <div key={label} className="flex items-center p-2 text-[#383838]">
                <img src={img} alt={label} className="w-[24px] h-[24px] mr-2" />
                <span className="font-[poppins] text-[16px] font-normal">
                  {label.toUpperCase()}
                </span>
              </div>
            ))}

          <ul className="space-y-4">
            {menuItems.map((item:any) => (
              <MenuItem key={item.label} label={item.label} enabled={item.enabled} disableHover />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
