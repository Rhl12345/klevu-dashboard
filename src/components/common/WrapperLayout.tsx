"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { BLANK_LAYOUT_ROUTES } from "@/admin-pages/routes";
import MainSidebar from "../PKSidebar/MainSidebar";

const WrapperLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const pathname = usePathname();

  const isBlankLayout = BLANK_LAYOUT_ROUTES.some((route) => {
    const normalizedRoute = route.replace(/\/:\w+/g, "");
    const normalizedPathname = pathname.replace(/\/\d+$/, "");
    return normalizedPathname.startsWith(normalizedRoute);
  });

  return (
    <>
      {!isBlankLayout && <MainSidebar />}
      <div
        id="RightContent"
        className={`w-full mx-auto transition-all duration-500 ${
          !isBlankLayout ? "lg:pl-[296px]" : ""
        }`}
      >
        <main>{children}</main>
      </div>
    </>
  );
};

export default WrapperLayout;
