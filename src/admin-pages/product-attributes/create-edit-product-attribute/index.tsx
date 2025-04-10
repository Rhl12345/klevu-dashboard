"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form as FormikForm, FormikHelpers } from "formik";
import Input from "@/components/Input/Input";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import { PageRoutes } from "@/admin-pages/routes";
import ProductAttributesSidebar from "@/admin-pages/product-attributes/components/ProductAttributesSidebar";
import { productAttributesSchema } from "@/utils/validations/productAttributes.validation";
import { IProductAttributesFormValues } from "@/types/product-attributes/product-attributes.type";
import Dropdown from "@/components/DropDown/DropDown";
import { tempData } from "@/mock-data/productAttribute";
import { toast } from "react-toastify";

const CreateProductAttributesPage = ({ id }: { id: string }) => {
  const [initialValues, setInitialValues] =
    useState<IProductAttributesFormValues>({
      createdBy: "",
      displayOrder: "",
      name: "",
    });

  useEffect(() => {
    if (id) {
      const productAttributeValues = tempData.find(
        (value) => value?.id === Number(id)
      );
      if (productAttributeValues) {
        setInitialValues({
          createdBy: productAttributeValues.createdBy || "",
          displayOrder: productAttributeValues.displayOrder?.toString() || "",
          name: productAttributeValues.name,
        });
      }
    } else {
      setInitialValues({
        createdBy: "",
        displayOrder: "",
        name: "",
      });
    }
  }, [id]);

  const handleSubmit = (
    values: IProductAttributesFormValues,
    resetForm: () => void
  ) => {
    toast.success("handleSubmit");
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        onSubmit={(
          values: IProductAttributesFormValues,
          formikHelpers: FormikHelpers<IProductAttributesFormValues>
        ) => handleSubmit(values, formikHelpers.resetForm)}
        initialValues={initialValues}
        validationSchema={productAttributesSchema}
      >
        {({ values, setFieldValue, validateForm, errors }) => {
          return (
            <FormikForm>
              <CreatePageHeader
                navigateUrl={PageRoutes.PRODUCTATTRIBUTES.LIST}
                module={`${id ? "Edit" : "Add"} Product Attributes`}
                validateForm={validateForm}
                buttonType="submit"
              />
              <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4">
                <div className="w-full lg:w-7/12 xl:w-10/12">
                  <div className="flex flex-wrap gap-4 lg:gap-8">
                    <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
                      <div className="font-semibold text-secondary-dark dark:text-secondary-light">
                        <div className="gap-4 lg:gap-6 grid grid-cols-1">
                          <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                            <div className="lg:w-6/12">
                              <div>
                                <Input
                                  asterisk={true}
                                  label="Product Attributes Name"
                                  name="createdBy"
                                  onChange={(e) => {
                                    setFieldValue("createdBy", e.target.value);
                                  }}
                                  value={values.createdBy}
                                  error={!!errors.createdBy}
                                />
                              </div>
                            </div>
                            <div className="lg:w-6/12">
                              <div>
                                <Dropdown
                                  label="Control Type"
                                  id="ControlType"
                                  name="ControlType"
                                  placeholder="Select..."
                                  options={[
                                    { label: "Dropdown", value: "Dropdown" },
                                    { label: "Checkbox", value: "Checkbox" },
                                    { label: "Input", value: "Input" },
                                  ]}
                                  defaultValue={"Dropdown"}
                                  onChange={(option: any) =>
                                    setFieldValue("controlType", option.value)
                                  }
                                  asterisk
                                  error={!!errors.ControlType}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                            <div className="lg:w-6/12">
                              <div>
                                <Dropdown
                                  label="Text Prompt"
                                  id="ControlType"
                                  name="ControlType"
                                  placeholder="Select..."
                                  options={[
                                    { label: "Dropdown", value: "Dropdown" },
                                    { label: "Checkbox", value: "Checkbox" },
                                    { label: "Input", value: "Input" },
                                  ]}
                                  defaultValue={"Dropdown"}
                                  onChange={(option: any) =>
                                    setFieldValue("controlType", option.value)
                                  }
                                  asterisk
                                />
                              </div>
                            </div>
                            <div className="lg:w-6/12">
                              <div>
                                <Input
                                  asterisk={true}
                                  label="Display Order"
                                  name="name"
                                  onChange={(e) => {
                                    setFieldValue("TextPrompt", e.target.value);
                                  }}
                                  value={values.name}
                                  error={!!errors.name}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <ProductAttributesSidebar />
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default CreateProductAttributesPage;
