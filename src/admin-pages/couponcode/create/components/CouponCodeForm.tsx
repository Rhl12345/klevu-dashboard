import React, { useState, memo } from "react";
import { FieldArray, useFormikContext } from "formik";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import RadioGroup from "@/components/RadioGroup/RadioGroup";
import Checkbox from "@/components/Checkbox/Checkbox";
import { Label } from "@/components/Label/Label";
import {
  brandOptions,
  categoryOptions,
  customerOptions,
  productOptions,
  storeOptions,
} from "@/utils/Dummy";
import { IDropdownOption } from "@/types/common/common.type";
import { ICouponFormValues } from "@/types/promotions/promotions.type";
import Text from "@/components/Text/Text";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { toast } from "react-toastify";
import DatePicker from "@/components/DatePicker/DatePicker";

const CouponCodeForm = () => {
  const [generatedCode, setGeneratedCode] = useState("");
  const {
    errors,
    values,
    setFieldValue,
    setFieldError,
    touched,
    setFieldTouched,
  } = useFormikContext<ICouponFormValues>();

  const allowOnlyNumbers = (value: string) => {
    return value.replace(/[^0-9]/g, "");
  };
  const generateDiscountCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setGeneratedCode(code);
    setFieldValue("discountCode", code);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4 lg:gap-8">
        {/* Discount Name Section */}
        <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
          <div className="font-semibold text-secondary-dark dark:text-secondary-light">
            <div className="gap-4 grid grid-cols-1">
              <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                <div className="lg:w-6/12">
                  <Input
                    value={values?.discountName}
                    label="Discount Name"
                    name="discountName"
                    placeholder="Enter Discount Name"
                    asterisk={true}
                    error={!!errors.discountName && touched.discountName}
                    onChange={(e) =>
                      setFieldValue("discountName", e.target.value)
                    }
                    errorMessage={errors.discountName}
                  />
                </div>
                <div className="lg:w-6/12">
                  <Dropdown
                    label="Store"
                    name="store"
                    asterisk={true}
                    onBlur={() => setFieldTouched("store", true)}
                    value={storeOptions.find(
                      (option) => option.label === values?.store
                    )}
                    options={storeOptions}
                    onChange={(option: any) =>
                      setFieldValue("store", option?.value)
                    }
                    placeholder="Select Store"
                    errorMessage={
                      !!errors?.store && touched?.store
                        ? errors?.store
                        : undefined
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discount Code Section */}
        <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
          <div className="font-semibold text-secondary-dark dark:text-secondary-light flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Label required>Discount Code</Label>
              <Button
                type="button"
                size="sm"
                variant="primary"
                onClick={generateDiscountCode}
              >
                Generate Code
              </Button>
            </div>
            <Input
              name="discountCode"
              placeholder="Enter Discount Code"
              value={values.discountCode}
              onChange={(e) => {
                const value = e.target.value;
                setFieldValue("discountCode", value);
                setGeneratedCode(value);
              }}
              error={!!errors.discountCode && touched.discountCode}
              errorMessage={errors.discountCode}
            />
          </div>
        </div>

        {/* Type Section */}
        <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
          <Label>Type</Label>
          <div className="space-y-4 mt-4">
            <RadioGroup
              label="Percentage"
              name="percentage"
              value="isPercentage"
              onChange={() => setFieldValue("promotionType", "isPercentage")}
              checked={values.promotionType === "isPercentage"}
            />
            <RadioGroup
              label="Fixed Amount"
              name="fixedAmount"
              value="isFixedAmount"
              onChange={() => setFieldValue("promotionType", "isFixedAmount")}
              checked={values.promotionType === "isFixedAmount"}
            />
            <RadioGroup
              label="Free Shipping"
              name="freeShipping"
              value="isFreeShipping"
              onChange={() => setFieldValue("promotionType", "isFreeShipping")}
              checked={values.promotionType === "isFreeShipping"}
            />
            <RadioGroup
              label="Range"
              name="range"
              value="isRange"
              onChange={() => setFieldValue("promotionType", "isRange")}
              checked={values.promotionType === "isRange"}
            />
          </div>
        </div>

        {/* Values Section */}
        {values.promotionType !== "isFreeShipping" && (
          <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
            <Label>Values</Label>
            <div className="space-y-4 mt-4">
              {values.promotionType === "isRange" ? (
                <FieldArray name="rangeDetails">
                  {({ push, remove }) => (
                    <div className="space-y-6 ">
                      <Button
                        type="button"
                        size="sm"
                        variant="primary"
                        onClick={() => {
                          const lastRange =
                            values.rangeDetails[values.rangeDetails.length - 1];

                          // Validate range before adding new one
                          if (
                            Number(lastRange.rangeTo) <=
                            Number(lastRange.rangeFrom)
                          ) {
                            setFieldError(
                              "rangeDetails",
                              "Range To must be greater than Range From"
                            );
                            return;
                          }

                          if (Number(lastRange.discountValue) <= 0) {
                            setFieldError(
                              "rangeDetails",
                              "Discount value must be greater than 0"
                            );
                            return;
                          }

                          // If validation passes, add new range
                          push({
                            rangeFrom: Number(lastRange.rangeTo) + 1,
                            rangeTo: "",
                            discountValue: "",
                            usePercentage: false,
                          });
                          toast.success("Range added successfully");
                        }}
                      >
                        <div className="flex items-center gap-1">
                          <SvgIcon name="PlusIcon" />
                          Add Range
                        </div>
                      </Button>

                      {values.rangeDetails.map((range, index) => {
                        const isFirstRange = index === 0;
                        const isLastRange =
                          index === values.rangeDetails.length - 1;
                        const previousRangeTo = isFirstRange
                          ? 0
                          : Number(values.rangeDetails[index - 1].rangeTo);
                        const isCompleted =
                          !isLastRange &&
                          !!range.rangeTo &&
                          !!range.discountValue; // Range is complete if it's not last and has values

                        // Show delete button only for first range or completed ranges that are last in the sequence
                        const showDeleteButton =
                          values.rangeDetails.length > 1 &&
                          (isFirstRange ||
                            (isCompleted &&
                              index ===
                                values.rangeDetails.findIndex(
                                  (r) => !r.rangeTo || !r.discountValue
                                ) -
                                  1));

                        return (
                          <div
                            key={index}
                            className={`flex items-start space-x-4 p-4 transition-all duration-200 ${
                              isCompleted
                                ? "bg-gray-pointer opacity-75 dark:bg-gray-dark/80"
                                : "bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark"
                            }`}
                          >
                            <div className="grid grid-cols-12 gap-4 w-full items-center">
                              <div className="col-span-3">
                                <Input
                                  formik={false}
                                  label="Range From"
                                  name={`rangeDetails.${index}.rangeFrom`}
                                  value={
                                    !isFirstRange
                                      ? previousRangeTo + 1
                                      : range.rangeFrom
                                  }
                                  disabled={!isFirstRange || isCompleted}
                                  onChange={(e) => {
                                    const value = allowOnlyNumbers(
                                      e.target.value
                                    );
                                    setFieldValue(
                                      `rangeDetails.${index}.rangeFrom`,
                                      value
                                    );
                                  }}
                                />
                              </div>
                              <div className="col-span-3">
                                <Input
                                  formik={false}
                                  label="Range To"
                                  name={`rangeDetails.${index}.rangeTo`}
                                  value={range.rangeTo}
                                  disabled={isCompleted}
                                  onChange={(e) => {
                                    const value = allowOnlyNumbers(
                                      e.target.value
                                    );
                                    setFieldValue(
                                      `rangeDetails.${index}.rangeTo`,
                                      value
                                    );
                                  }}
                                />
                              </div>
                              <div className="col-span-4">
                                <div className="relative">
                                  {/* TODO: TO BE REMOVED When the input field with prefix will be implemented */}
                                  <Input
                                    formik={false}
                                    type="number"
                                    label="Discount Value"
                                    name={`rangeDetails.${index}.discountValue`}
                                    value={range.discountValue}
                                    disabled={isCompleted}
                                    onChange={(e) => {
                                      const value = allowOnlyNumbers(
                                        e.target.value
                                      );
                                      setFieldValue(
                                        `rangeDetails.${index}.discountValue`,
                                        value
                                      );
                                    }}
                                    className="pl-8"
                                  />
                                  {/* TODO: TO BE REMOVED When the input field with prefix will be implemented */}
                                  <Text size="base" className="absolute left-3 top-10 font-bold">
                                    {range.usePercentage ? "%" : "$"}
                                  </Text>
                                </div>
                              </div>
                              <div className="flex gap-4 pt-8">
                                <Checkbox
                                  id={`rangeDetails.${index}.usePercentage`}
                                  label="%"
                                  name={`rangeDetails.${index}.usePercentage`}
                                  checked={!!range.usePercentage}
                                  disabled={isCompleted}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `rangeDetails.${index}.usePercentage`,
                                      e.target.checked
                                    );
                                  }}
                                />
                                {showDeleteButton && (
                                  <div className="col-span-1">
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="default"
                                      onClick={() => remove(index)}
                                    >
                                      <SvgIcon name="Trash" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {typeof errors.rangeDetails === "string" && (
                        <div className="text-red-500 mt-2">
                          {errors.rangeDetails}
                        </div>
                      )}
                    </div>
                  )}
                </FieldArray>
              ) : (
                <div className="space-y-4">
                  <div className="relative w-full max-w-xs">
                    {/* TODO: TO BE REMOVED When the input field with prefix will be implemented */}
                    <Input
                      formik={false}
                      label="Discount Value"
                      name="discountValue"
                      value={values.discountValue}
                      className="pl-8" //* TODO: TO BE REMOVED When the input field with prefix will be implemented */
                      onChange={(e) => {
                        const value = allowOnlyNumbers(e.target.value);
                        setFieldValue("discountValue", value);
                      }}
                    />
                    {/* TODO: TO BE REMOVED When the input field with prefix will be implemented */}
                    <Text size="base" className="absolute left-3 top-10 font-bold">
                      {values.promotionType === "isFixedAmount" ? "$" : "%"}
                    </Text>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Applies To Section */}
        <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
          <Label>Applies To</Label>
          <div className="space-y-4 mt-4">
            <RadioGroup
              label="All Products"
              name="allProducts"
              value="isAllProduct"
              onChange={() => setFieldValue("appliesTo", "isAllProduct")}
              checked={values.appliesTo === "isAllProduct"}
            />
            <div>
              <RadioGroup
                label="Brands"
                name="brands"
                value="isBrand"
                onChange={() => setFieldValue("appliesTo", "isBrand")}
                checked={values.appliesTo === "isBrand"}
              />
              {values.appliesTo === "isBrand" && (
                <div className="mt-3 ml-8">
                  <Dropdown
                    id="brands"
                    isMulti
                    options={brandOptions}
                    onChange={(options) => {
                      setFieldValue(
                        "selectedBrands",
                        options
                          ? (options as IDropdownOption[]).map(
                              (opt) => opt.value
                            )
                          : []
                      );
                    }}
                    placeholder="Select Brands"
                  />
                </div>
              )}
            </div>
            <div>
              <RadioGroup
                label="Category"
                name="categories"
                value="isCategory"
                onChange={() => setFieldValue("appliesTo", "isCategory")}
                checked={values.appliesTo === "isCategory"}
              />
              {values.appliesTo === "isCategory" && (
                <div className="mt-3 ml-8">
                  <Dropdown
                    id="categories"
                    isMulti
                    options={categoryOptions}
                    onChange={(options) => {
                      setFieldValue(
                        "selectedCategories",
                        options
                          ? (options as IDropdownOption[]).map(
                              (opt) => opt.value
                            )
                          : []
                      );
                    }}
                    placeholder="Select Categories"
                  />
                </div>
              )}
            </div>
            <div>
              <RadioGroup
                label="Specific Products"
                name="specificProducts"
                value="isSpecificProduct"
                onChange={() => setFieldValue("appliesTo", "isSpecificProduct")}
                checked={values.appliesTo === "isSpecificProduct"}
              />
              {values.appliesTo === "isSpecificProduct" && (
                <div className="mt-3 ml-8">
                  <Dropdown
                    id="products"
                    isMulti
                    options={productOptions}
                    onChange={(options) => {
                      setFieldValue(
                        "selectedProducts",
                        options
                          ? (options as IDropdownOption[]).map(
                              (opt) => opt.value
                            )
                          : []
                      );
                    }}
                    placeholder="Select Products"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Minimum Requirements Section */}
        <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
          <Label>Minimum requirements</Label>
          <div className="space-y-4 mt-4">
            <RadioGroup
              label="None"
              name="none"
              value="isNoneMinimum"
              onChange={() => {
                setFieldValue("minimumRequirements", "isNoneMinimum");
                setFieldValue("minimumPurchaseAmount", "");
                setFieldValue("minimumQuantity", "");
              }}
              checked={values.minimumRequirements === "isNoneMinimum"}
            />
            <div>
              <RadioGroup
                label="Minimum purchase amount($)"
                name="minimumPurchaseAmount"
                value="isAmountMinimum"
                onChange={() =>
                  setFieldValue("minimumRequirements", "isAmountMinimum")
                }
                checked={values.minimumRequirements === "isAmountMinimum"}
              />
              {values.minimumRequirements === "isAmountMinimum" && (
                <div className="mt-3 ml-8">
                  <div className="relative w-full max-w-xs flex flex-col gap-1">
                    {/* TODO: TO BE REMOVED When the input field with prefix will be implemented */}
                    <Input
                      formik={false}
                      name="minimumPurchaseAmount"
                      value={values.minimumPurchaseAmount}
                      onChange={(e) => {
                        const value = allowOnlyNumbers(e.target.value);
                        setFieldValue("minimumPurchaseAmount", value);
                      }}
                      className="pl-8"
                    />
                    {/* TODO: TO BE REMOVED When the input field with prefix will be implemented */}
                    <Text size="base" className="absolute left-3 top-2 font-bold ">
                      $
                    </Text>
                    <Text size="sm">Applies to all products</Text>
                  </div>
                </div>
              )}
            </div>
            <div>
              <RadioGroup
                label="Minimum quantity of items"
                name="minimumQuantity"
                value="isQuantityMinimum"
                onChange={() =>
                  setFieldValue("minimumRequirements", "isQuantityMinimum")
                }
                checked={values.minimumRequirements === "isQuantityMinimum"}
              />
              {values.minimumRequirements === "isQuantityMinimum" && (
                <div className="mt-3 ml-8">
                  <div className="w-full max-w-xs flex flex-col gap-1">
                    <Input
                      formik={false}
                      name="minimumQuantity"
                      value={values.minimumQuantity}
                      onChange={(e) => {
                        const value = allowOnlyNumbers(e.target.value);
                        setFieldValue("minimumQuantity", value);
                      }}
                    />
                    <Text size="sm">Applies to all products</Text>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Customer Eligibility Section */}
        <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
          <Label>Customer eligibility</Label>
          <div className="space-y-4 mt-4">
            <RadioGroup
              label="Everyone"
              name="everyone"
              value="isEveryone"
              onChange={() => {
                setFieldValue("customerEligibility", "isEveryone");
                setFieldValue("selectedCustomers", []);
              }}
              checked={values.customerEligibility === "isEveryone"}
            />
            <div>
              <RadioGroup
                label="Specific Customers"
                name="specificCustomers"
                value="SpecificCustomers"
                onChange={() =>
                  setFieldValue("customerEligibility", "SpecificCustomers")
                }
                checked={values.customerEligibility === "SpecificCustomers"}
              />
              {values.customerEligibility === "SpecificCustomers" && (
                <div className="mt-3 ml-8">
                  <Dropdown
                    id="customers"
                    isMulti
                    options={customerOptions}
                    onChange={(options) => {
                      setFieldValue(
                        "selectedCustomers",
                        options
                          ? (options as IDropdownOption[]).map(
                              (opt) => opt.value
                            )
                          : []
                      );
                    }}
                    placeholder="Select Customers"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Usage Limits Section */}
        <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
          <Label>Usage limits</Label>
          <div className="space-y-4 mt-4">
            <div>
              <Checkbox
                id="isLimitNoOfTimes"
                label="Limit number of times this discount can be used in total"
                name="isLimitNoOfTimes"
                checked={values.isLimitNoOfTimes}
                onChange={(e) => {
                  setFieldValue("isLimitNoOfTimes", e.target.checked);
                  if (!e.target.checked) {
                    setFieldValue("totalUsageLimit", "");
                  }
                }}
              />
              {values.isLimitNoOfTimes && (
                <div className="mt-3 ml-8">
                  <div className="w-full max-w-xs flex flex-col gap-1">
                    <Input
                      formik={false}
                      name="totalUsageLimit"
                      value={values.totalUsageLimit}
                      onChange={(e) => {
                        const value = allowOnlyNumbers(e.target.value);
                        setFieldValue("totalUsageLimit", value);
                      }}
                    />
                    <Text size="sm">Applies to all products</Text>
                  </div>
                </div>
              )}
            </div>
            <div>
              <Checkbox
                id="isLimitOneUser"
                label="Limit to one use per customer"
                name="isLimitOneUser"
                checked={values.isLimitOneUser}
                onChange={(e) =>
                  setFieldValue("isLimitOneUser", e.target.checked)
                }
              />
            </div>
          </div>
        </div>

        {/* Active Dates Section */}
        <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
          <Label>Active dates</Label>
          <div className="font-semibold text-secondary-dark dark:text-secondary-light">
            <div className="gap-4 grid grid-cols-1">
              <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                <div className="lg:w-6/12 flex flex-col mt-4 gap-2">
                  <DatePicker
                    label="Start Date"
                    name="startDate"
                    defaultDate={
                      values.startDate ? new Date(values.startDate) : null
                    }
                    onChange={(e:any) => setFieldValue("startDate", e.target.value)}
                    asterisk={true}
                  />
                </div>
                <div className="lg:w-6/12 flex flex-col !mt-4 gap-2">
                  <DatePicker
                    label="End Date"
                    name="endDate"
                    defaultDate={
                      values.endDate ? new Date(values.endDate) : null
                    }
                    onChange={(date:Date) => setFieldValue("endDate", date)}
                    asterisk={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CouponCodeForm);
