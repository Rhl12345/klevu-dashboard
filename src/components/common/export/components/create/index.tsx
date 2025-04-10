"use client";
import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import Dropdown from "@/components/DropDown/DropDown";
import { IDropdownOption } from "@/components/Table/types";
import { ICreateExportProps } from "@/types/export/export.type";
import {
  PRODUCT_FEEDS,
  STORE_TYPES,
} from "@/types/products-database/productDatabase.type";
import {
  PRODUCT_DISCONTINUE_OPTIONS,
  PRODUCT_SUB_TYPE_OPTIONS,
} from "@/utils/constants";
import { STATUS_OPTIONS } from "@/utils/Dummy";
import {
  getMultiSelectFilteredData,
  getSingleSelectFilteredData,
} from "@/utils/helpers";
import { Form, Formik } from "formik";
import React, { useMemo, useState } from "react";

const CommonCreateExport = (props: ICreateExportProps) => {
  const [showFields, setShowFields] = useState(true);
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({
    all: false,
  });

  const handleShowFields = () => {
    setShowFields(!showFields);
  };

  const handleAllCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fields: string[]
  ) => {
    const isChecked = event.target.checked;

    setCheckboxes({
      all: isChecked,
      ...Object.fromEntries(fields.map((field) => [field, isChecked])),
    });
  };

  const handleCheckboxChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      setCheckboxes((prev) => ({
        ...prev,
        [field]: isChecked,
        all: Object.values(prev).every((value) => value === isChecked),
      }));
    };

  const exportTypeFields = useMemo(() => {
    switch (props.type) {
      case PRODUCT_FEEDS.CORE_PRODUCT_FEED:
        return {
          optionProductStatus: [
            "OptionProduct",
            "Inventory",
            "UPC",
            "ProductColorWithStores",
            "ProductWithOptionDiscontinue",
          ],
          productDiscontinue: [
            "Product",
            "OptionProduct",
            "Inventory",
            "ProductWithOptionDiscontinue",
            "ProductColorWithStores",
          ],
          optionProductDiscontinue: [
            "OptionProduct",
            "ProductWithOptionDiscontinue",
          ],
          productSubType: ["Inventory"],
        };
      case STORE_TYPES.ECOMMERCE:
        return {
          optionProductStatus: ["OptionProduct", "StoreOptionProduct"],
          productDiscontinue: ["OptionProduct", "StoreOptionProduct"],
          optionProductDiscontinue: ["OptionProduct", "StoreOptionProduct"],
          productSubType: ["StoreProduct", "StoreOptionProduct"],
        };
      case STORE_TYPES.CORPORATE:
        return {
          optionProductStatus: ["OptionProduct", "StoreOptionProduct"],
          productDiscontinue: ["OptionProduct", "StoreOptionProduct"],
          optionProductDiscontinue: ["OptionProduct", "StoreOptionProduct"],
          productSubType: ["StoreProduct", "StoreOptionProduct"],
        };
      default:
        break;
    }
  }, [props.type]);

  return (
    <Formik
      initialValues={props.initialValues}
      enableReinitialize
      onSubmit={props.onSubmit}
      validationSchema={props.validationSchema}
    >
      {({ values, setFieldValue }) => {
        const fields =
          props?.checkBoxFields?.[
            values.exportType as keyof typeof props.checkBoxFields
          ] || [];

        return (
          <Form>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
              <div className="grid grid-cols-12 gap-4 lg:gap-8 border border-gray-light dark:border-gray-dark ">
                <div className="bg-body-light dark:bg-body-dark col-span-full p-6">
                  <div className="w-full flex flex-wrap lg:grid lg:grid-cols-2 gap-6 mb-6">
                    <div className="w-full">
                      <Dropdown
                        id="brand"
                        label="Brand Name"
                        name="brand"
                        isMulti
                        options={props.brandOptions}
                        value={getMultiSelectFilteredData(
                          props.brandOptions,
                          values.brand
                        )}
                        onChange={(event) => {
                          setFieldValue(
                            "brand",
                            (event as IDropdownOption[])?.map(
                              (brand) => brand.value
                            )
                          );
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <Dropdown
                        id="vendor"
                        label="Vendor Name"
                        name="vendor"
                        isMulti
                        value={getMultiSelectFilteredData(
                          props.vendorOptions,
                          values.vendor
                        )}
                        options={props.vendorOptions}
                        onChange={(event) => {
                          setFieldValue(
                            "vendor",
                            (event as IDropdownOption[]).map(
                              (item) => item.value
                            )
                          );
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <Dropdown
                        id="exportType"
                        asterisk
                        label="Export Type"
                        name="exportType"
                        value={getSingleSelectFilteredData(
                          props.exportTypeOptions,
                          values.exportType
                        )}
                        onChange={(event) => {
                          setFieldValue(
                            "exportType",
                            (event as IDropdownOption)?.value
                          );
                          setCheckboxes({ all: false });
                        }}
                        options={props.exportTypeOptions}
                        displayError
                        isFormikField
                      />
                    </div>
                    <div className="w-full">
                      <Dropdown
                        id="Status#"
                        label="Status"
                        value={getSingleSelectFilteredData(
                          props?.statusOptions || [],
                          values.status
                        )}
                        name="status"
                        onChange={(event) => {
                          setFieldValue(
                            "status",
                            (event as IDropdownOption)?.value
                          );
                        }}
                        options={props.statusOptions}
                        displayError
                        defaultValue="all"
                        isFormikField
                      />
                    </div>
                    {exportTypeFields?.optionProductStatus?.includes(
                      values.exportType
                    ) && (
                      <div className="w-full">
                        <Dropdown
                          id="optionProductStatus"
                          asterisk
                          label="Option Product Status"
                          value={getSingleSelectFilteredData(
                            STATUS_OPTIONS,
                            values.optionProductStatus
                          )}
                          name="optionProductStatus"
                          onChange={(event) => {
                            setFieldValue(
                              "optionProductStatus",
                              (event as IDropdownOption)?.value
                            );
                          }}
                          options={STATUS_OPTIONS}
                          displayError
                          isFormikField
                        />
                      </div>
                    )}
                    {exportTypeFields?.productDiscontinue?.includes(
                      values.exportType
                    ) && (
                      <div className="w-full">
                        <Dropdown
                          id="productDiscontinue"
                          asterisk
                          label="Product Discontinue"
                          value={getSingleSelectFilteredData(
                            PRODUCT_DISCONTINUE_OPTIONS,
                            values.productDisContinue
                          )}
                          name="productDisContinue"
                          onChange={(event) => {
                            setFieldValue(
                              "productDisContinue",
                              (event as IDropdownOption)?.value
                            );
                          }}
                          options={PRODUCT_DISCONTINUE_OPTIONS}
                          displayError
                          isFormikField
                        />
                      </div>
                    )}
                    {exportTypeFields?.optionProductDiscontinue?.includes(
                      values.exportType
                    ) && (
                      <div className="w-full">
                        <Dropdown
                          id="optionProductDiscontinue"
                          asterisk
                          label="Product Option Discontinue"
                          value={getSingleSelectFilteredData(
                            PRODUCT_DISCONTINUE_OPTIONS,
                            values.optionProductDiscontinue
                          )}
                          name="optionProductDiscontinue"
                          onChange={(event) => {
                            setFieldValue(
                              "optionProductDiscontinue",
                              (event as IDropdownOption)?.value
                            );
                          }}
                          options={PRODUCT_DISCONTINUE_OPTIONS}
                          displayError
                          isFormikField
                        />
                      </div>
                    )}
                    {exportTypeFields?.productSubType?.includes(
                      values.exportType
                    ) && (
                      <div className="w-full">
                        <Dropdown
                          id="productSubType"
                          asterisk
                          label="Product Sub Type"
                          value={getSingleSelectFilteredData(
                            PRODUCT_SUB_TYPE_OPTIONS,
                            values.productSubType
                          )}
                          name="productSubType"
                          onChange={(event) => {
                            setFieldValue(
                              "productSubType",
                              (event as IDropdownOption)?.value
                            );
                          }}
                          options={PRODUCT_SUB_TYPE_OPTIONS}
                          displayError
                          isFormikField
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-6">
                    {props?.checkBoxFields &&
                      Object.keys(props.checkBoxFields).includes(
                        values.exportType
                      ) && (
                        <div className="w-24">
                          <Button
                            id="showFields"
                            variant="primary"
                            type="button"
                            onClick={handleShowFields}
                          >
                            {showFields ? "Hide Fields" : "Show Fields"}
                          </Button>
                        </div>
                      )}

                    <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2">
                      {props?.checkBoxFields &&
                        Object.keys(props.checkBoxFields).includes(
                          values.exportType
                        ) &&
                        showFields && (
                          <>
                            <Checkbox
                              id="all"
                              label="All"
                              name="all"
                              checked={checkboxes.all || false}
                              onChange={(event) => {
                                handleAllCheckboxChange(event, fields);
                                fields.forEach((field) => {
                                  setFieldValue(field, event.target.checked);
                                });
                              }}
                            />
                            {fields.map((field) => (
                              <Checkbox
                                key={field}
                                id={field}
                                label={field}
                                name={field}
                                checked={checkboxes[field] || false}
                                onChange={(event) => {
                                  handleCheckboxChange(field)(event);
                                  setFieldValue(field, event.target.checked);
                                }}
                              />
                            ))}
                          </>
                        )}
                    </div>
                  </div>

                  <div className="flex w-full justify-end">
                    <Button variant="primary" type="submit">
                      Download Data
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CommonCreateExport;
