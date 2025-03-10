"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Wrapper from "@/app/wrapper";
import footerData from "../../Data/footer/footer.json";

const Footer = () => {
  const socialLinks = [
    { href: "#", icon: "/svgs/Shared/footer/fb.svg" },
    { href: "#", icon: "/svgs/Shared/footer/p.svg" },
    { href: "#", icon: "/svgs/Shared/footer/twitter.svg" },
    { href: "#", icon: "/svgs/Shared/footer/instra.svg" },
    { href: "#", icon: "/svgs/Shared/footer/yo.svg" },
  ];

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setData(footerData);
  }, []);

  if (!data) return null;

  return (
    <footer className=" bg-custom-gradient ">
      <Wrapper>
        <div className="mx-auto ">
          <div className="flex justify-center gap-[18px]  py-[40px]">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="w-8 h-8 rounded-full  flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <img src={social.icon} alt="social icon" className="w-[30px] " />
              </Link>
            ))}
          </div>
          <div></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="space-y-[10px]">
              <p className="text-[#FFFFFF] text-[28px] leading-[42px] font-semibold">
                <span className="text-[#F5A3B7] ">
                  {data.brand.name.split(" ")[0]}{" "}
                </span>
                {data.brand.name.split(" ")[1]}
              </p>
              <p className="text-[#FFFFFF] text-[14px]  leading-[17px] font-normal font-[Montserrat]">
                {data.brand.description}
              </p>
              <div className="text-[#FFFFFF] text-[14px] space-y-[10px]  leading-[17px] font-normal font-[Montserrat] ">
                <p>{data.brand.contact.phone}</p>
                <p>{data.brand.contact.email}</p>
                <p>{data.brand.contact.location}</p>
              </div>
            </div>

            {data.sections.map((section: any) => (
              <div key={section.title} className="space-y-4 ">
                <p className="text-[#B0A6BD] text-[16px]  leading-[24px] font-medium">
                  {section.title}
                </p>
                <ul className="space-y-2 text-[#FFFFFF] text-[16px]  leading-[19px] font-medium font-[Montserrat]">
                  {section.links.map((link: any) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[#FFFFFF] text-[14px]  hover:text-gray-800"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="space-y-4">
              <h3 className="text-[#FFFFFF] text-[16px]  leading-[24px] font-medium">
                {data.newsletter.title}
              </h3>
              <p className="text-[#FFFFFF] text-[14px]  leading-[17px] font-regular">
                {data.newsletter.description}
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2  rounded-[4px] w-full max-w-[289px] focus:outline-none focus:ring-2 focus:ring-gray-200 text-[#FFFFFF] text-[14px] "
                />
              </div>
              <button className=" text-[#FFFFFF] rounded-r font-medium text-[16px] ">
                Subscribe →
              </button>
            </div>
          </div>

          <div className="mt-8 py-4 border-t border-gray-200 ">
            <div className="flex justify-between items-center ">
              <p className="text-[#FFFFFF] text-[14px] ">
                {data.bottom.copyright}
              </p>

              <div className="flex space-x-4">
                {data.bottom.policies.map((policy: any) => (
                  <Link
                    key={policy.label}
                    href={policy.href}
                    className="text-[#FFFFFF] text-[14px]  hover:text-gray-800"
                  >
                    {policy.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
