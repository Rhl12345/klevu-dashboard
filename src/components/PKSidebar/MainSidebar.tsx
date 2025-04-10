"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import Button from "@/components/Button/Button";
import Image from "@/components/Image/Image";
import { Label } from "@/components/Label/Label";
import { RecursiveMenuItem } from "@/components/PKSidebar/MenuItems";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import SvgIcon from "@/components/SvgIcons/SvgIcon";

import { MenuList } from "@/utils/Dummy";

import {
  getThemeFromLocalStorage,
  setThemeInLocalStorage,
} from "@/utils/localStorage.utlis";

import { TTheme } from "@/types/common/common.type";
import { usePathname } from "next/navigation";
import { MenuItem } from "../Sidebar/types";
import { PageRoutes } from "@/admin-pages/routes";

const MainSidebar = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [isSideBarOpen, setSideBarOpen] = useState<boolean>(true);
  const [isUserMenuOpen, setUserMenuOpen] = useState<boolean>(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<TTheme>("light");

  const handleToggleExpand = useCallback((itemId: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  }, []);

  const memoizedMenuList = useMemo(() => MenuList, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    const html = document.documentElement;

    if (newTheme === "light") {
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
    }

    setTheme(newTheme);
    setThemeInLocalStorage(newTheme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = getThemeFromLocalStorage();
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const userMenu = document.getElementById("user-menu");
      if (userMenu && !userMenu.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const pathname = usePathname();

  // This function is used to check if the current pathname is a subitem of the current item
  // If it is, it will set the selected item and the expanded items accordingly
  const recursivellyCheckSubItems = (items: MenuItem[]) => {
    if (items) {
      for (const item of items) {
        if (pathname === item.href) {
          setSelectedItem(item.id);
          return item;
        } else if (item.subItems) {
          const hasSelectedItem = recursivellyCheckSubItems(item.subItems);
          if (hasSelectedItem) {
            if (hasSelectedItem?.subItems?.length)
              setExpandedItems((prev) => {
                const next = new Set(prev);
                next.add(hasSelectedItem?.id);
                return next;
              });
            return item;
          }
        }
      }
    }
    return null;
  };

  useEffect(() => {
    const hasSelectedItem = recursivellyCheckSubItems(MenuList);
    if (hasSelectedItem) {
      setExpandedItems((prev) => {
        const next = new Set(prev);
        next.add(hasSelectedItem?.id);
        return next;
      });
    }
  }, []);

  return (
    <>
      <Sidebar
        isSideBarOpen={isSideBarOpen}
        setSideBarOpen={setSideBarOpen}
        contentWrapperClassName="flex relative transition-all duration-500 lg:pl-0"
        content={(menuItems) => (
          <>
            <div className="relative max-lg:flex hidden w-full z-50 border-b border-gray-light dark:border-gray-dark">
              <div className="flex w-full gap-16 px-5 py-2 items-center justify-between">
                <div className="flex h-16 shrink-0 items-center">
                  <a href="dashboard.html">
                    <Label className="sr-only">Redefine Solutions</Label>
                    <Image
                      src={
                        theme === "light"
                          ? "/images/redefineFullLogoLight.png"
                          : "/images/redefineFullLogoDark.png"
                      }
                      alt="Redefine"
                      className="md:w-40 w-32 h-auto !bg-transparent"
                    />
                  </a>
                </div>
                <Button
                  id="SlideNavToggle"
                  variant="default"
                  className="inline-flex"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  icon={<SvgIcon name="Hamburger" />}
                >
                  <Label className="sr-only">Toggle sidebar</Label>
                </Button>
              </div>
            </div>

            <div
              className="relative z-50 max-lg:hidden lg:fixed lg:top-0 lg:bottom-0 lg:z-50 lg:flex lg:!w-[296px] lg:flex-col border-r border-gray-light dark:border-gray-dark"
              aria-label="Main navigation"
              style={{
                display: isMobileMenuOpen ? "flex" : "",
              }}
            >
              <div
                className="max-lg:fixed max-lg:inset-0 max-lg:bg-black/80"
                aria-hidden="true"
              ></div>
              <div className="max-lg:fixed max-lg:inset-0 max-lg:flex h-full">
                <div
                  id="left-block"
                  className="relative bg-body-light dark:bg-body-dark max-lg:mr-16 flex w-full max-w-xs flex-1 h-full"
                >
                  <div className="absolute left-full top-0 max-lg:flex hidden justify-center pt-5">
                    <Button
                      type="button"
                      variant="default"
                      className="-mt-2.5 p-2.5"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setUserMenuOpen(false);
                      }}
                      icon={<SvgIcon name="CrossIcon_Sidebar" />}
                    >
                      <Label className="sr-only">Close sidebar</Label>
                    </Button>
                  </div>

                  <div className="w-full flex grow flex-col gap-y-6">
                    <div className="flex shrink-0 items-center px-5 pt-6">
                      <Image
                        src={
                          theme === "light"
                            ? "/images/redefineFullLogoLight.png"
                            : "/images/redefineFullLogoDark.png"
                        }
                        alt="Redefine"
                        className="md:w-40 w-32 h-auto !bg-transparent"
                      />
                    </div>
                    <nav className="flex w-full flex-1 flex-col overflow-y-auto">
                      <ul
                        id="topiclinks"
                        role="list"
                        className="space-y-1 menu"
                      >
                        {menuItems.map((item) => (
                          <RecursiveMenuItem
                            key={item.id}
                            item={item}
                            expandedItems={expandedItems}
                            selectedItem={selectedItem}
                            onItemSelect={setSelectedItem}
                            onToggleExpand={handleToggleExpand}
                            setIsMobileMenuOpen={setIsMobileMenuOpen}
                          />
                        ))}
                      </ul>
                    </nav>

                    <div className="relative">
                      <div className="cursor-pointer">
                        <div
                          className="w-full flex rounded-none border-t border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark items-center p-3"
                          id="user-menu-button"
                          onClick={() => setUserMenuOpen(!isUserMenuOpen)}
                        >
                          <div className="size-10 rounded-full relative">
                            <div className="size-10 border p-1 rounded-full bg-body-light dark:bg-secondary-dark border-gray-light dark:border-gray-dark">
                              <Image
                                src={"/images/redefine.png"}
                                alt="Redefine"
                                className="!bg-transparent"
                              />
                            </div>
                          </div>
                          <span className="w-full justify-between flex lg:items-center text-quaternary-dark dark:text-quaternary-light">
                            <span
                              className="ml-2 mr-3 text-sm [&.active]:font-semibold text-quaternary-dark dark:text-quaternary-light truncate max-w-24 w-auto"
                              aria-hidden="true"
                            >
                              Hello User 😊
                            </span>
                            <SvgIcon name="TableSortIcon" />
                          </span>
                        </div>
                      </div>
                      <div
                        id="user-menu"
                        className="z-50 absolute w-full right-0 lg:bottom-10 lg:-right-64"
                        style={{ display: isUserMenuOpen ? "" : "none" }}
                      >
                        <div className="">
                          <div className="z-50 max-md:flex max-md:flex-wrap w-full max-md:mx-2 rounded-none bg-white border border-gray-light dark:border-gray-dark dark:bg-dark-body-bg py-2 pb-0 shadow-lg ring-1 ring-gray-900/5 focus:outline-none m-0.5 overflow-hidden">
                            <div className="block w-full relative my-0 px-3 pr-10 py-1 text-sm/6 text-quaternary-dark dark:text-quaternary-light font-semibold border-b border-gray-light dark:border-gray-dark pb-2">
                            Hello User 😊
                              <Button
                                type="button"
                                variant="default"
                                className="absolute gap-0 flex w-10 h-10 right-2 top-1 justify-center items-center border !border-gray-light dark:!border-gray-dark !bg-white dark:!bg-gray-dark rounded-none font-semibold z-50"
                                onClick={toggleTheme}
                                icon={
                                  <SvgIcon
                                    name={
                                      theme === "light"
                                        ? "LightTheme"
                                        : "DarkTheme"
                                    }
                                  />
                                }
                              >
                                <Label className="sr-only">Appearance</Label>
                              </Button>
                            </div>
                            <Link
                              href={""}
                              replace
                              className="w-full border-t border-gray-light dark:border-gray-dark block px-3 py-1.5 text-sm/6 text-quaternary-dark dark:text-quaternary-light hover:text-primary-light dark:hover:text-quaternary-dark hover:bg-gray-pointer"
                              onClick={() => {
                                document.cookie =
                                  "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                localStorage.clear();
                                window.location.href = PageRoutes.LOGIN;
                              }}
                            >
                              Sign out
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        menuItems={memoizedMenuList}
      />
    </>
  );
};

export default MainSidebar;
