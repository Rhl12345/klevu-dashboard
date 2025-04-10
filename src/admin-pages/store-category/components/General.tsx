"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Loader from "@/components/common/Loader";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import UploadImage from "@/components/UploadImage/UploadImage";
import { getStoreCategories } from "@/services/store-categories/storeCategories.service";
import dynamic from "next/dynamic";
import StoreCategoryValidationSchema from "@/utils/validations/storeCategory.validation";
import { ICategory } from "@/types/store-category/storeCategory.type";

const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor/RichTextEditor"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

/**
 * EditCategory component allows users to edit an existing store category.
 *
 * Props:
 * - storeType: The type of the store.
 * - storeName: The name of the store.
 * - categoryId: The ID of the category being edited.
 *
 * This component fetches the category data based on the categoryId,
 * initializes the form with the fetched data, and handles form submission.
 */
const General = ({ categoryId }: { categoryId: number }) => {
  const [data, setData] = useState<ICategory>();

  const INITIAL_VALUES = {
    categoryName: data?.title || "",
    displayOrder: data?.displayOrder || "",
    description: data?.description || "",
    recStatus: data?.recStatus === "A" ? "active" : "inactive",
    bannerImage: data?.bannerImage || "",
    parentCategory: data?.parentCategory || "",
    // customCollectionUrl: data?.customCollectionUrl,
    // seName: data?.seName,
    // parentCategoryName: data?.parentCategoryName,
  };
  const getCategoryData = async () => {
    try {
      const response = await getStoreCategories();
      const data = response.storeCategoryList.find(
        (item) => item.id === categoryId.toString()
      );
      setData(data as ICategory);
    } catch (error) {}
  };

  useEffect(() => {
    getCategoryData();
  }, []);
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={INITIAL_VALUES}
        validationSchema={StoreCategoryValidationSchema}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue, errors }) => {
          return (
            <Form>
              <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 py-4">
                <div className="w-full ">
                  <div className="flex flex-wrap gap-4 lg:gap-6">
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
                                value={values?.categoryName}
                                errorMessage={errors.categoryName}
                              />
                            </div>
                            <div className="lg:w-6/12">
                              <Input
                                label="Display Order"
                                name="displayOrder"
                                placeholder="Enter Display Order"
                                id="displayOrder"
                                asterisk
                                value={values?.displayOrder}
                                errorMessage={errors.displayOrder}
                              />
                            </div>
                          </div>
                          <div className="w-full ">
                            <Dropdown
                              label="Category"
                              name="parentCategory"
                              placeholder="Select..."
                              id="parentCategory"
                              options={[]}
                              asterisk
                              value={values?.parentCategory}
                              errorMessage={errors.parentCategory}
                            />
                          </div>
                          <div className="w-full">
                            <div className="col-span-6">
                              <UploadImage
                                label="Banner Image"
                                aspectRatio="auto"
                                maxImages={1}
                                onUpload={(files) => {
                                  setFieldValue("bannerImage", files);
                                }}
                              />
                            </div>
                          </div>
                          <div className="w-full">
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

export default General;
