import React from "react";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Text from "@/components/Text/Text";
import { IFormShareReportProps } from "@/types/form-builder/formShareReport.type";

const ShareReportForm = ({
  setFieldValue,
  handleClear,
  isEditable,
}: IFormShareReportProps) => {
  return (
    <>
      <div className="w-full content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="font-semibold text-secondary-dark dark:text-secondary-light">
          <div className="flex flex-wrap ">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-6/12 flex flex-col gap-2 lg:gap-4">
              <Label>Share Report</Label>
              <Text>you can share any of this report with customer</Text>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-6/12 flex flex-col gap-4 lg:gap-6 justify-end">
              <Input
                label="Email"
                name="email"
                placeholder="Enter Email"
                type="email"
                asterisk
                onChange={(e) => setFieldValue("email", e.target.value)}
                disabled={!isEditable}
              />
              <Input
                label="Name"
                name="name"
                placeholder="Enter Name"
                onChange={(e) => setFieldValue("name", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="my-4" />
        <div className="flex flex-wrap w-full gap-4 justify-end">
          <Button
            size="sm"
            variant="outline-secondary"
            type="button"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button size="sm" variant="primary" type="button">
            Generate Link
          </Button>
          <Button size="sm" variant="primary" type="submit">
            Send
          </Button>
        </div>
      </div>
    </>
  );
};

export default ShareReportForm;
