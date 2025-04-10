import React from "react";
import Link from "next/link";
import { IStoreCardProps } from "@/types/dashboard/dashboard.type";
import Text from "@/components/Text/Text";

const StoreCard = (props: IStoreCardProps) => {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark">
      <div className="text-center item-center block">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full text-center">
            <Link href={props.mainLink}>
              <div className="px-2 py-3 font-semibold text-quaternary-dark dark:text-quaternary-light border-b border-gray-light dark:border-gray-dark">
                <Text size="lg" align="center">
                  {props.title}
                </Text>
              </div>
            </Link>
            <div className="flex flex-col gap-4 justify-between p-2 lg:p-4">
              {props.links.map((link) => (
                <div
                  key={link.label}
                  className="text-quaternary-dark dark:text-quaternary-light font-semibold text-xs flex justify-between uppercase"
                >
                  <Link href={link.href}>{link.label}</Link>
                  {link.value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;