import React from "react";
import Collapsible from "@/components/Collapsible/Collapsible";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Link from "next/link";
import { Form, Formik } from "formik";

// Define types for props
interface NavigationLink {
  label: string;
  href: string;
}

interface ProfileOption {
  label: string;
  href: string;
  isSignOut?: boolean; // Optional for sign-out flag
}

interface User {
  name: string;
  role: string;
}

interface HeaderProps {
  navigationLinks: NavigationLink[];
  profileOptions: ProfileOption[];
  user: User;
  handleNavigation: (path: string) => void;
  handleBurgerMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  navigationLinks = [],
  profileOptions = [],
  user,
  handleNavigation,
  handleBurgerMenuClick,
  ...props
}) => {
  return (
    <div className="sticky top-0 z-40 flex py-6 lg:px-6 px-5 shrink-0 items-center gap-x-4 border-b border-gray-light dark:border-gray-dark bg-neutral-50 dark:bg-dark-body-bg sm:gap-x-6">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-16 items-center">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="javascript:void(0);">
              <SvgIcon name="CompanyLogo" />
            </Link>
          </div>

          <Button
            size="sm"
            variant="default"
            onClick={handleBurgerMenuClick}
            icon={
              <SvgIcon
                name="BurgerMenu"
                className="fill-quaternary-light dark:fill-quaternary-dark absolute top-0 right-0"
              />
            }
            className="hidden lg:block border bg-secondary-light dark:bg-gray-dark border-gray-light dark:border-gray-dark rounded-full w-8 h-8 relative"
          />
          
        </div>

        <div className="flex gap-16 items-center special_width">
          <div className="hidden xl:block">
            <ul className="flex gap-6 m-0 p-0">
              {navigationLinks.map((link: NavigationLink, index: number) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-tertiary-dark dark:text-tertiary-light text-xs font-semibold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative md:w-full w-36">
            <Formik
              initialValues={{ ['with-icon-button']: '' }}
              onSubmit={(values) => console.log(values)}
            >
              <Form>
                <Input
                  name="input-with-icon"
                  placeholder="Type and clear..."
                  className="w-full font-semibold py-2.5 px-8 rounded-lg border bg-secondary-light dark:bg-secondary-dark border-gray-light dark:border-gray-dark text-xs text-default-light dark:text-default-dark focus:outline-none border-none outline-none"
                />
                <Button
                  type="button"
                  onClick={() => alert('Icon clicked!')}
                  className="absolute left-2.5 top-3"
                >
                  <SvgIcon name="SearchIcon" />
                </Button>
              </Form>
            </Formik>
          </div>
        </div>

        <div className="">
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <div className="relative">
              <Collapsible
                className="relative"
                contentClassName="absolute top-10 right-0"
                trigger={
                  <div className="cursor-pointer admin_click">
                    <div
                      className="-m-1.5 flex items-center p-1.5"
                      id="user-menu-button"
                    >
                      <div className="size-10 rounded-full relative">
                        <div className="size-10 border p-1 rounded-full bg-secondary-light dark:bg-secondary-dark border-gray-light dark:border-gray-dark">
                          <SvgIcon name="CompanyShortLogo" />
                        </div>
                      </div>
                      <span className="hidden xl:flex lg:items-center">
                        <span
                          className="ml-5 mr-3 text-xs/6 font-bold text-quaternary-light dark:text-quaternary-dark truncate max-w-24 w-auto"
                          aria-hidden="true"
                        >
                          {user.name}
                        </span>
                        <SvgIcon name="ArrowDown" />
                      </span>
                    </div>
                  </div>
                }
                triggerClassName="cursor-pointer focus:outline-none"
              >
                <div className="">
                  <div className="">
                    <div className="z-10 w-40 rounded-md bg-white border border-gray-light dark:border-gray-dark dark:bg-dark-body-bg py-2 pb-0 shadow-lg ring-1 ring-gray-900/5 focus:outline-none m-0.5 overflow-hidden">
                      <div className="block px-3 py-1 text-sm/6 text-secondary-dark dark:text-tertiary-light font-bold border-b border-gray-light dark:border-gray-dark pb-2">
                        {user?.name}
                        <span className="text-gray-500 dark:text-tertiary-light text-xs block font-normal">
                          {user?.role}
                        </span>
                      </div>

                      {profileOptions.map(
                        (option: ProfileOption, index: number) => (
                          <Link
                            key={index}
                            href={option.href}
                            className={`block px-3 py-1.5 text-sm/6 text-tertiary-dark dark:text-tertiary-light ${option.isSignOut
                              ? "border-t border-gray-light dark:border-gray-dark"
                              : ""
                              } hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark`}
                          >
                            {option.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </Collapsible>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
