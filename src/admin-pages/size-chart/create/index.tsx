"use client";
import { PageRoutes } from "@/admin-pages/routes";
import Button from "@/components/Button/Button";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import {
  ICreateEditSizeChart,
  ISizeChartInitalValue,
} from "@/types/size-chart/sizeChart.type";
import { RecStatusValuebyName } from "@/utils/constants";
import { Form, Formik } from "formik";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import SizeChart from "@/admin-pages/size-chart/components/SizeChart";
import { sizeChartsValidationSchema } from "@/utils/validations/sizeCharts.validation";
import sizeCharts from "@/mock-data/size-charts/sizeCharts.json";
import { IBrandNameOption } from "@/types/size-chart/sizeChart.type";
import { STATUS_OPTIONS } from "@/utils/Dummy";

const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor/RichTextEditor"),
  { ssr: false },
);

const CreateEditSizeChart: React.FC<ICreateEditSizeChart> = ({ id }) => {
  const [data, setData] = useState<ISizeChartInitalValue>();
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const isAddMode = !id;

  const initializeSizeChartView = (
    measurements: string,
    sizeChartRange: string,
  ) => {
    const measurementsArray = measurements.split(",").map((m) => m.trim());
    const sizeRangeArray = sizeChartRange.split(",").map((s) => s.trim());
    const initialView: Record<string, string> = {};

    measurementsArray.forEach((measurement) => {
      sizeRangeArray.forEach((size) => {
        initialView[measurement + size] = "0";
      });
    });

    return initialView;
  };

  const initialValues: ISizeChartInitalValue = {
    sizeChartName: id ? data?.sizeChartName || "sample-1" : "",
    brandId: id ? data?.brandId || "1" : "",
    sizeChartView: id ? data?.sizeChartView || {} : {},
    sizeChartRange: id ? data?.sizeChartRange || "" : "",
    description: data?.description || "",
    measurements: id ? data?.measurements || "" : "",
    recStatus: id ? data?.recStatus || RecStatusValuebyName.Active : "",
    rowVersion: id ? data?.rowVersion || null : null,
  };

  return (
    <>
      <Formik
        onSubmit={() => {}}
        initialValues={initialValues}
        validationSchema={sizeChartsValidationSchema}
      >
        {({ errors, touched, setFieldValue, values, validateForm }) => {
          const handlePreviewClick = () => {
            if (values.measurements && values.sizeChartRange) {
              const initializedView = initializeSizeChartView(
                values.measurements,
                values.sizeChartRange,
              );
              setFieldValue("sizeChartView", initializedView);
              setShowPreview(true);
            }
          };

          return (
            <Form>
              <CreatePageHeader
                navigateUrl={PageRoutes.SIZE_CHART.LIST}
                module={`${isAddMode ? "Create" : "Edit"} Size Carts`}
                validateForm={validateForm}
                buttonType='submit'
              />
              <div className='w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4'>
                <div className='w-full lg:w-7/12 xl:w-10/12'>
                  <div className='flex flex-col gap-4 lg:gap-6 w-full border border-gray-light bg-body-light dark:bg-body-dark dark:border-gray-dark p-4 lg:p-6'>
                    <div className='w-full'>
                      <div className='w-full py-2 pt-0'>
                        <Input
                          type='text'
                          asterisk={true}
                          label='Size Chart Template Name'
                          name='sizeChartName'
                          id='sizeChartName'
                          errorMessage={errors.sizeChartName || ""}
                        />
                      </div>
                    </div>
                    <div className='w-full'>
                      <div>
                        <Dropdown
                          label='Brand Name'
                          asterisk={true}
                          isMulti={false}
                          name='brandId'
                          id='brandId'
                          placeholder={"Search..."}
                          options={sizeCharts.brandNameOptions}
                          onChange={(newValue: unknown) => {
                            const selectedOption = newValue as {
                              value: string;
                              label: string;
                            } | null;
                            setFieldValue(
                              "brandId",
                              selectedOption?.value || "",
                            );
                          }}
                          value={
                            sizeCharts.brandNameOptions.find(
                              (option: IBrandNameOption) =>
                                option.value === values.brandId,
                            ) || ""
                          }
                          error={!!errors.brandId && !!touched.brandId}
                          errorMessage={errors.brandId || ""}
                        />
                      </div>
                    </div>
                    <div className='w-full'>
                      <div className='w-full flex flex-col gap-2'>
                        <Label className='block'>Description</Label>
                        <RichTextEditor
                          onChange={(content: string) => {
                            setFieldValue("description", content);
                          }}
                          initialData={
                            typeof values.description === "string"
                              ? values.description
                              : ""
                          }
                          placeholder='Type your content here...'
                        />
                      </div>
                    </div>
                    <div className='w-full'>
                      <div className='flex items-center'></div>
                      <div className='w-full'>
                        <Input
                          type='text'
                          asterisk={true}
                          label='Size Chart Range'
                          placeholder='Enter sizes (e.g., S,M,L,XL,2XL,3XL)'
                          name='sizeChartRange'
                          id='sizeChartRange'
                          errorMessage={errors.sizeChartRange || ""}
                          onChange={(e) => {
                            setFieldValue("sizeChartRange", e.target.value);
                            // Reset sizeChartView when size range changes
                            setFieldValue("sizeChartView", {});
                          }}
                        />
                        <Label size='small'>
                          Insert the sizes separated by comma
                        </Label>
                      </div>
                    </div>
                    <div className='w-full flex gap-4 lg:gap-6 last:mb-0'>
                      <div className='w-full'>
                        <Input
                          disabled={!values.sizeChartRange}
                          type='text'
                          asterisk={true}
                          placeholder='Enter measurements (e.g., Chest,Shoulder,Length)'
                          label='Measurements'
                          name='measurements'
                          id='measurements'
                          error={!!errors.measurements && touched.measurements}
                          errorMessage={errors.measurements || ""}
                          onChange={(e) => {
                            setFieldValue("measurements", e.target.value);
                            // Reset sizeChartView when measurements change
                            setFieldValue("sizeChartView", {});
                          }}
                        />
                        <Label size='small'>
                          Insert the measurement names separated by comma
                        </Label>
                      </div>
                    </div>
                    <div className='w-full flex gap-4 lg:gap-6'>
                      <div className='relative w-full'>
                        <Button
                          disabled={
                            !values.measurements || !values.sizeChartRange
                          }
                          onClick={handlePreviewClick}
                          variant='primary'
                          type='button'
                        >
                          Preview & Edit Value
                        </Button>

                        {showPreview &&
                          values.measurements &&
                          values.sizeChartRange && (
                            <SizeChart
                              measurements={values.measurements
                                .split(",")
                                .map((item) => item.trim())}
                              sizeChartRange={values.sizeChartRange
                                .split(",")
                                .map((item) => item.trim())}
                              onDataChange={(updatedData) => {
                                console.log(
                                  "Updating size chart view:",
                                  updatedData,
                                );
                                const newSizeChartView = {
                                  ...values.sizeChartView,
                                  [updatedData.field]: updatedData.value,
                                };
                                setFieldValue(
                                  "sizeChartView",
                                  newSizeChartView,
                                );
                              }}
                              isEditable={true}
                              data={values.sizeChartView}
                            />
                          )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='w-full lg:w-5/12 xl:w-2/12 py-4 border border-gray-light dark:border-gray-dark'>
                  <div className='relative border-b border-gray-light dark:border-gray-dark pb-6 px-4'>
                    <Dropdown
                      label='Size Master status'
                      aria-label='Size Master status'
                      defaultValue={values.recStatus}
                      asterisk
                      name='recStatus'
                      id='recStatus'
                      options={STATUS_OPTIONS}
                      onChange={(e: any) => {
                        setFieldValue("recStatus", e.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CreateEditSizeChart;
