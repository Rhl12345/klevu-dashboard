import React from "react";
import { Formik, Form } from "formik";

import Button from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker";
import { Label } from "@/components/Label/Label";
import Text from "@/components/Text/Text";

import {
  ICustomerReportListProps,
  ICustomerReportValues,
} from "@/types/form-builder/formReport.type";
import OrderDetails from "@/admin-pages/form-builder/form-report/components/customer-report/OrderDetails";
import customerReportData from "@/mock-data/form-builder/form-report/customerReport.json";

const DATA: ICustomerReportValues[] =
  (customerReportData && customerReportData?.data) || [];
const DATA_FLAT = DATA && DATA.flatMap((item: any) => item.orders);

const CustomerReport = ({ data }: ICustomerReportListProps) => {
  return (
    <div>
      <div className="w-full lg:py-6 lg:px-6 py-4 px-4 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col w-full gap-4 lg:gap-6">
          <Formik
            initialValues={{
              startDate: new Date(), // Initialize with a date
              endDate: new Date(),
              includeProductArtwork: false,
            }}
            onSubmit={() => {}}
          >
            {({ resetForm, setFieldValue }) => (
              <>
                <Form className="flex flex-col gap-4">
                  <div className="w-full">
                    <Label>Customer Report</Label>
                  </div>
                  <div className="w-full flex gap-2 items-center">
                    <Label>Total Quantity Of Products:</Label>{" "}
                    <Text>
                      {DATA.reduce((acc, curr) => acc + curr.totalQuantity, 0)}
                    </Text>
                  </div>
                  <div className="w-full flex gap-2">
                    <Label>Total Number Of Orders:</Label>{" "}
                    <Text>
                      {DATA.reduce((acc, curr) => acc + curr.totalOrders, 0)}
                    </Text>
                  </div>

                  <div className="flex flex-col w-full gap-4 lg:gap-6 items-center">
                    <div className="flex w-full flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                      <div className="w-full lg:w-1/2">
                        <DatePicker
                          name="startDate"
                          label="From"
                          onChange={(date: any) =>
                            setFieldValue("startDate", date)
                          }
                        />
                      </div>
                      <div className="w-full lg:w-1/2">
                        <DatePicker
                          name="endDate"
                          label="To"
                          onChange={(date: any) =>
                            setFieldValue("endDate", date)
                          }
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap w-full gap-4">
                      <Button variant="primary" size="sm" type="submit">
                        Search
                      </Button>
                      <Button variant="primary" size="sm">
                        Export
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => {
                          resetForm();
                        }}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </Form>
              </>
            )}
          </Formik>

          {DATA_FLAT &&
            DATA_FLAT.map((order: any) => (
              <OrderDetails key={order.orderId} order={order} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReport;
