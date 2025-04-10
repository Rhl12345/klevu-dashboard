"use client";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";

import CategoryProductsList from "@/admin-pages/product-categories/components/CategoryProductsList";
import CategoryStoresList from "@/admin-pages/product-categories/components/CategoryStoresList";
import { PageRoutes } from "@/admin-pages/routes";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import {
  createCategory,
  getCategoryDetails,
  updateCategory,
} from "@/services/product-category/category.service";
import { ICategory } from "@/types/product-category/productCategory.type";
import { getErrorMessage } from "@/utils/common.util";
import { categoryStatusOptions, parentCategoryOptions } from "@/utils/Dummy";
import { CategorySchema } from "@/utils/validations/category.validation";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor/RichTextEditor"),
  {
    ssr: false,
  }
);

const INITIAL_VALUES = {
  categoryName: "",
  parentCategory: "",
  description: "",
  status: "",
};

const CreateEditProductCategory = ({ id }: { id?: string }) => {
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);

  const fetchCategoryDetails = async () => {
    try {
      const response = await getCategoryDetails(id!);
      setInitialValues(response);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    if (id) {
      fetchCategoryDetails();
    }
  }, [id]);

  const handleCreateCategory = async (
    values: ICategory,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await createCategory(values);
      resetForm();
      toast.success("Category created successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleUpdateCategory = async (values: ICategory) => {
    try {
      await updateCategory(id!, values);
      toast.success("Category updated successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CategorySchema}
      onSubmit={id ? handleUpdateCategory : handleCreateCategory}
      enableReinitialize
    >
      {({ values, errors, touched, setFieldValue, validateForm }) => (
        <Form>
          <CreatePageHeader
            module="Product Categories"
            navigateUrl={PageRoutes.PRODUCT_CATEGORY.LIST}
            buttonType="submit"
            validateForm={validateForm}
          />
          <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4">
            <div className="w-full lg:w-7/12 xl:w-10/12">
              <div className="flex flex-wrap gap-4 lg:gap-8">
                <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
                  <div className="font-semibold text-secondary-dark dark:text-secondary-light">
                    <div className="gap-4 lg:gap-6 grid grid-cols-1">
                      <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                        <div className="lg:w-6/12">
                          <Input
                            label="Category Name"
                            name="categoryName"
                            placeholder="Enter Category Name"
                            id="categoryName"
                            asterisk
                          />
                        </div>
                        <div className="lg:w-6/12">
                          <Dropdown
                            label="Parent Category"
                            id="parentCategory"
                            name="parentCategory"
                            placeholder="Select Parent Category"
                            options={[
                              { value: "", label: "Select..." },
                              ...parentCategoryOptions,
                            ]}
                            value={
                              parentCategoryOptions.find(
                                (item) => item.value === values.parentCategory
                              ) || null
                            }
                            onChange={(option: any) =>
                              setFieldValue("parentCategory", option.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="w-full ">
                        <RichTextEditor
                          label="Description"
                          initialData={values.description}
                          onChange={(data) =>
                            setFieldValue("description", data)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {id && <CategoryProductsList id={id} />}
              </div>
            </div>

            <div className="w-full lg:w-5/12 xl:w-2/12 py-4 border rounded-none border-gray-light dark:border-gray-dark">
              <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4">
                <Dropdown
                  label="Category Status"
                  id="status"
                  name="status"
                  options={categoryStatusOptions}
                  value={
                    categoryStatusOptions.find(
                      (item) => item.value === values.status
                    ) || null
                  }
                  onChange={(option: any) =>
                    setFieldValue("status", option.value)
                  }
                  asterisk
                  error={touched.status && !!errors.status}
                  errorMessage={errors.status}
                />
              </div>
              {id && <CategoryStoresList />}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateEditProductCategory;
