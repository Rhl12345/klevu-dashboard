"use client";
import { Label } from "@/components/Label/Label";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import React from "react";

const Notes = () => {
  return (
    <>
      <div className="lg:gap-8 lg:py-8 xl:px-8 py-4 px-4 justify-center items-center">
        <ul>
          <li>
            <div className="relative flex flex-col gap-4 lg:gap-6 p-4 border border-gray-light dark:border-gray-dark">
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-gray-selected dark:bg-gray-dark flex items-center justify-center">
                    <SvgIcon name="Avatar" className="h-6 w-6" />
                  </span>
                </div>
                <div className="min-w-0 flex-1 flex justify-between items-center">
                  <Label size="medium">Test</Label>
                  <div className="text-right text-sm whitespace-nowrap text-quaternary-dark dark:text-quaternary-light">
                    <time dateTime="2023-06-30">June 30, 2023</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Notes;
