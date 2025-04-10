import React from "react";

import Button from "@/components/Button/Button";
import { Label } from "@/components/Label/Label";
import Text from "@/components/Text/Text";
import OrderReportList from "@/admin-pages/form-builder/form-report/components/order-report/OrderReportList";

const OrderReport = () => {
  return (
    <div>
      <div className="w-full flex flex-col lg:pt-6 pt-4 lg:px-6 px-4 bg-body-light dark:bg-body-dark gap-4 lg:gap-6">
        <div className="flex flex-col w-full">
          <div className="w-full  flex flex-col gap-4 lg:gap-6">
            <Label>Order Report</Label>
            <Text size="sm">
              This report generates a CSV file with detailed order information,
              separated by product and customer.
            </Text>
            <Text size="sm">
              NOTE: If a customer enters a player number with leading zeros,
              your spreadsheet application may remove the leading zeros (e.g.
              "00" could become "0"). please refers to the player Report to
              confirm the correct value.
            </Text>
            <div className="flex flex-wrap w-full gap-4 justify-start">
              <Button size="sm" variant="primary" type="button">
                Order Report
              </Button>
              <Button size="sm" variant="primary" type="button">
                Order Details Report
              </Button>
              <Button size="sm" variant="primary" type="submit">
                Generate Order Details Report Link
              </Button>
            </div>
            <div>
              <Text size="sm">
                Click{" "}
                <Button size="sm" variant="default" type="button">
                  here
                </Button>{" "}
                for the column-based version of the Order Report.
              </Text>
            </div>
          </div>
        </div>
      </div>
        <OrderReportList />
    </div>
  );
};

export default OrderReport;
