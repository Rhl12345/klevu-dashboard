"use client";
import React, { useState } from "react";
import { Form, Formik } from "formik";

import { Label } from "@/components/Label/Label";
import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import DatePicker from "@/components/DatePicker/DatePicker";
import Text from "@/components/Text/Text";

import ProductReportList from "@/admin-pages/form-builder/form-report/components/product-report/ProductReportList";
import {
  IProduct,
  IProductReportProps,
} from "@/types/form-builder/formReport.type";
import productReportData from "@/mock-data/form-builder/form-report/productReport.json";

const DATA: IProduct[] = productReportData?.data?.products || [];

const ProductReport: React.FC<IProductReportProps> = ({ products }) => {
  const [showProductArtwork, setShowProductArtwork] = useState<boolean>(false);

  return (
    <div>
      <div className="w-full lg:py-6 lg:px-6 py-4 px-4 bg-body-light dark:bg-body-dark ">
        <div className="flex flex-col w-full gap-4 lg:gap-6">
          <Formik
            initialValues={{
              startDate: new Date(), // Initialize with a date
              endDate: new Date(),
              includeProductArtwork: false,
            }}
            onSubmit={() => {}}
          >
            {({ resetForm, setFieldValue, values }) => (
              <>
                <Form className="flex flex-col gap-4">
                  <div className="w-full">
                    <Label>Product Report</Label>
                  </div>
                  <div className="w-full flex gap-2 items-center">
                    <Label>Total Quantity Of Products:</Label>{" "}
                    <Text>
                      {DATA.reduce(
                        (acc, product) => acc + product.quantity,
                        0
                      )}
                    </Text>
                  </div>

                  <div className="flex gap-2 justify-start">
                    <Checkbox
                      name="includeProductArtwork"
                      label="Include Product Artwork"
                      id="includeProductArtwork"
                      checked={values.includeProductArtwork}
                      onChange={() => {
                        const newValue = !values.includeProductArtwork;
                        setFieldValue("includeProductArtwork", newValue);
                        setShowProductArtwork(newValue); // Update local state
                      }}
                    />
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
                          setFieldValue("includeProductArtwork", false);
                          setShowProductArtwork(false);
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
            <ProductReportList
              showProductArtwork={showProductArtwork}
              DATA={DATA}
            />
          
        </div>
      </div>
    </div>
  );
};

export default ProductReport;
