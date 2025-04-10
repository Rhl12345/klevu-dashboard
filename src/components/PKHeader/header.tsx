"use client";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import Image from "@/components/Image/Image";
import { WithoutLabel } from "@/components/Input/Input.stories";
import { useEffect, useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        event.target &&
        "closest" in (event.target as Element) &&
        !(event.target as Element).closest(".dropdown-container")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSignOut = () => {
    // Add sign out logic
  };

  return (
    <header className="fixed top-0 bg-white border-b border-neutral-200 h-fit w-full shadow-hb z-30">
      <div className="px-4 sm:px-4 lg:px-4">
        <div className="flex items-center justify-between h-16 -mb-px">
          <a className="inline-block min-w-[100px] ml-2" href="/">
            <Image
              className="max-h-[48px]"
              src={process.env.NEXT_PUBLIC_HEADER_LOGO_URL || "/logo.png"}
              alt="logo"
              width={115}
              height={115}
            />
          </a>
          <div className="flex items-center space-x-3">
            <div>
              <div className="flex gap-2 items-center">
                <div className="w-[120px]">Order Search :</div>
                <div>
                  <Dropdown
                    aria-label="order search"
                    id="order-search"
                    className="w-44"
                    options={[
                      {
                        label: "Order No",
                        value: "OrderNo",
                      },
                      { label: "Name", value: "name" },
                      {
                        label: "Customer Id",
                        value: "CustomerId",
                      },
                      {
                        label: "Name",
                        value: "Name",
                      },
                      {
                        label: "Zip Code",
                        value: "ZipCode",
                      },
                      { label: "Product Name", value: "ProductName" },
                    ]}
                  />
                </div>
                <div>
                  <WithoutLabel
                    name="search"
                    placeholder="Search..."
                    className="block w-64 bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg rounded-md"
                  />
                </div>
                <div>
                  <Button className="btn bg-indigo-500 hover:bg-indigo-600 text-white rounded-md leading-loose">
                    Search
                  </Button>
                </div>
              </div>
            </div>
            <hr className="w-px h-6 bg-slate-200" />
            <div className="relative inline-flex">
              <div
                className="relative inline-flex"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Button
                  className="inline-flex justify-center items-center group"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  <div className="h-10 w-10 flex items-center justify-center overflow-hidden rounded-full">
                    <Image src="/images/user.png" alt="User" />
                  </div>
                  <div className="flex items-center truncate">
                    <span className="truncate ml-2 text-sm font-medium group-hover:text-gray-800">
                      Hello User 😊
                    </span>
                    <svg
                      className="w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400"
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </Button>
                <div
                  className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 enter-done"
                  style={{ display: isOpen ? "block" : "none" }}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <div>
                    <ul>
                      <li>
                        <a
                          className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                          href=""
                        >
                          Profile
                        </a>
                      </li>
                      <li>
                        <a
                          className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                          href=""
                        >
                          User
                        </a>
                      </li>
                      <li>
                        <a
                          className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                          href=""
                        >
                          System Logs
                        </a>
                      </li>
                      <li className="mt-1 pt-1 border-t border-neutral-200">
                        <span className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3 cursor-pointer">
                          Sign Out
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
