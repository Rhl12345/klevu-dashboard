import Dropdown from "@/components/DropDown/DropDown";
import { Label } from "@/components/Label/Label";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor/RichTextEditor"),
  {
    ssr: false,
  }
);
import SizeChartData from "@/mock-data/EditProductSizeChart.json";
import SizeChartTable from "@/components/common/product/SizeChartTable";
import {
  IProductSizeChart,
  ISizeChartDropDownOption,
  ISizeChartFormValues,
} from "@/types/product/product.type";
import { ICommonFormTabProps } from "@/types/products-database/productDatabase.type";
import { FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

/*
    This component is used to create and edit the size chart for the product. 
    It uses the SizeChartData to get the size chart data for the selected product.
    It uses the Formik to create the form for the size chart.
    It uses the RichTextEditor to create the size chart template description.
    It uses the SizeChartTable to display the size chart.
    It uses the Dropdown to select the product for which the size chart is to be created or edited.

    @param onFormChange - A function that is called when the form is changed.
    @param setIsFormValid - A function that is called to set the validity of the form.  

    @returns A component that allows the user to create and edit the size chart for the product.
*/

const SizeChart = ({
  onFormChange,
  setIsFormValid,
  setIsDirty,
}: ICommonFormTabProps) => {
  const sizeChartValidationSchema = Yup.object({
    sizeChartTemplateDescription: Yup.string().required(
      "Size Chart Template Description is required"
    ),
  });

  const handleSubmit = (values: ISizeChartFormValues) => {
    toast.success("Size Chart Template Description updated successfully");
  };

  const sizeChartFormikBag = useFormik<ISizeChartFormValues>({
    initialValues: {
      sizeChartTemplateDescription: "",
    },
    validationSchema: sizeChartValidationSchema,
    onSubmit: handleSubmit,
  });

  const [dropDownData] = useState<ISizeChartDropDownOption[]>([
    {
      value: "2",
      label: "Adidas Mens Tops",
    },
    {
      value: "3",
      label: "Adidas Womens Tops",
    },
    {
      value: "277",
      label: "adidas Men's Size Chart",
    },
    {
      value: "278",
      label: "adidas Women's Size Chart",
    },
    {
      value: "306",
      label: "One size",
    },
    {
      value: "380",
      label: "Tet Size  Chart",
    },
  ]);

  const [selectedDropDownData, setSelectedDropDownData] =
    useState<ISizeChartDropDownOption>(dropDownData[0]);

  const [sizeChartObj, setSizeChartObj] = useState<{
    distinctX: string[];
    distinctY: string[];
    sizeChartViewdata: any[];
  }>({
    distinctX: [],
    distinctY: [],
    sizeChartViewdata: [],
  });

  const [data, setData] = useState<IProductSizeChart>();

  const getNewLabelData = (value: ISizeChartDropDownOption) => {
    setSelectedDropDownData(value);
    setSizeChartObj({
      distinctX: [],
      distinctY: [],
      sizeChartViewdata: [],
    });
  };

  useEffect(() => {
    try {
      const distinctX: string[] = [];
      const distinctY: string[] = [];

      const response = SizeChartData[
        selectedDropDownData.label as keyof typeof SizeChartData
      ] as IProductSizeChart;

      if (response) {
        setData({
          ...response,
          sizeChartView: JSON.parse(response.sizeChartView),
        });
        let Range: string[] = response.sizeChartRange.split(",");
        let mesurment: string[] = response.measurements.split(",");
        distinctY.push(...mesurment);
        distinctX.push(...Range);
        setSizeChartObj((prev) => {
          return {
            ...prev,
            distinctY: distinctY,
            distinctX: distinctX,
            sizeChartViewdata: JSON.parse(response.sizeChartView),
          };
        });
      }
    } catch (error) {
      toast.error("Failed to load size chart data");
    }
  }, [selectedDropDownData]);

  useEffect(() => {
    if (onFormChange && sizeChartFormikBag.dirty) {
      onFormChange();
    }

    if (Object.keys(sizeChartFormikBag.errors).length === 0) {
      setIsFormValid?.(true);
      setIsDirty?.(false);
    } else {
      setIsFormValid?.(false);
    }
  }, [sizeChartFormikBag.dirty, onFormChange, sizeChartFormikBag.errors]);

  return (
    <>
      <div className="border border-gray-light dark:border-gray-dark  bg-body-light dark:bg-body-dark  p-4 lg:p-6">
        <div className="flex flex-col gap-4">
          <Dropdown
            options={dropDownData}
            onChange={(value) =>
              getNewLabelData(value as ISizeChartDropDownOption)
            }
            value={selectedDropDownData}
            placeholder="Select Product"
            label="Add Size Chart to Product"
          />

          <div className="flex flex-col gap-2">
            <Label>Size Chart Preview</Label>
            <SizeChartTable
              sizeChartObj={sizeChartObj}
              data={data && data?.sizeChartView}
              chartId={(data && data?.id.toString()) ?? ""}
            />
          </div>

          <form onSubmit={sizeChartFormikBag.handleSubmit}>
            <FormikProvider value={sizeChartFormikBag}>
              <RichTextEditor
                label="Size Chart Template Description"
                initialData={
                  sizeChartFormikBag.values.sizeChartTemplateDescription
                }
                onChange={(data) =>
                  sizeChartFormikBag.setFieldValue(
                    "sizeChartTemplateDescription",
                    data
                  )
                }
                placeholder="Enter size chart"
              />
            </FormikProvider>
          </form>
        </div>
      </div>
    </>
  );
};

export default SizeChart;
