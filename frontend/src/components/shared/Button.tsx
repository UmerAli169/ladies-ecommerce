import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string; 
}

const Button: React.FC<ButtonProps> = ({ children, className, href, ...props }) => {
  const baseStyles = "w-full bg-[#F5A3B7]  lg:text-[16px] text-[14px] font-normal rounded-[4px]";
  
  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${className || ""} inline-block text-center py-[8px] px-[10px]`}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={`${baseStyles} ${className || ""} `}>
      {children}
    </button>
  );
};

export default Button;
