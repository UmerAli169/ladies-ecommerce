import { ReactNode } from "react";
import Sidebar from "../shared/Sidebar";
import Wrapper from "@/app/wrapper";

const AccountLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="py-[40px]">
      <Wrapper>
        <div className="flex md:flex-row flex-col gap-[20px]">
          <div className="lg:w-[250px] w-full max-h-[80vh] overflow-y-auto">
            <Sidebar
              title="Account"
              links={[
                {
                  label: "Contact Information",
                  href: "/Account/contactinformation",
                },
                { label: "Change Password", href: "/Account/changepassword" },
                { label: "Addresses", href: "/Account/addresses" },
              ]}
              collapsibleSections={[
                {
                  key: "orders",
                  title: "Orders",
                  href: "/Account/orders",
                  items: [
                    { label: "All period", href: "/account/orders?filter=all" },
                    {
                      label: "For this month",
                      href: "/account/orders?filter=this-month",
                    },
                    {
                      label: "Last month",
                      href: "/account/orders?filter=last-month",
                    },
                    {
                      label: "This year",
                      href: "/account/orders?filter=this-year",
                    },
                    {
                      label: "Last year",
                      href: "/account/orders?filter=last-year",
                    },
                  ],
                },
                {
                  key: "wishlist",
                  title: "Wishlist",
                  href: "/Account/wishlist",
                  items: [],
                },
              ]}
            />
          </div>

          <div className="flex-1 bg-white rounded-lg px-[20px] py-[40px]">
            {children}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default AccountLayout;
