"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Loader from "@/components/common/Loader";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import ProductList from "@/admin-pages/store-category/components/ProductList";
import Seo from "@/admin-pages/store-category/components/Seo";
import { IDropdownOption } from "@/components/Table/types";
import { getStoreCategories } from "@/services/store-categories/storeCategories.service";
import dynamic from "next/dynamic";
import StoreCategoryValidationSchema from "@/utils/validations/storeCategory.validation";
import STATUS_OPTIONS from "@/mock-data/DimensionActive.json";
import { ICategory } from "@/types/store-category/storeCategory.type";
import ContentPageHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";
import General from "@/admin-pages/store-category/components/General";
import PromotionalProduct from "@/admin-pages/store-category/components/PromotionalProduct";
import MyTabs from "@/components/Tab/Tab";
import { STORE_CATEGORY_EDIT_TABS } from "@/utils/constants";

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
const EditCategory = ({
  categoryId,
  backUrl,
}: {
  storeType: string;
  storeName: string;
  categoryId: number;
  backUrl: string;
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const onTabClick = (index: number) => {
    setActiveTab(index);
  };

  const [data, setData] = useState<ICategory>();

  const INITIAL_VALUES = {
    categoryName: data?.title || "",
    displayOrder: data?.displayOrder || "",
    description: data?.description || "",
    recStatus: data?.recStatus === "A" ? "active" : "inactive",
    bannerImage: data?.bannerImage || "",
    parentCategory: data?.parentCategory || "",
    showBorder: data?.showBorder || false,
    showProductName: data?.showProductName || false,
    showSplitProducts: data?.showSplitProducts || false,
    showButton: data?.showButton || false,
    showPrice: data?.showPrice || false,
    showBrandLogo: data?.showBrandLogo || false,
    

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

  const tabComponents = [
    <General categoryId={categoryId} backUrl={backUrl} />,
    <PromotionalProduct data={data}/>,
  ];
  const ActiveComponent = tabComponents[activeTab];
  return (
    <>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={StoreCategoryValidationSchema}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue, validateForm, errors }) => {
          return (
            <Form>
              <CreatePageHeader
                module={`${categoryId ? "Edit" : "Create"} Category`}
                buttonType="submit"
                navigateUrl={backUrl}
                validateForm={validateForm}
              />
              <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4">
                <div className="w-full lg:w-7/12 xl:w-10/12">
                  <MyTabs
                    options={STORE_CATEGORY_EDIT_TABS}
                    activeTab={activeTab}
                    onTabClick={onTabClick}
                    isListPage={false}
                    usedInsideModal={true}
                  />
                  {ActiveComponent}

                  {categoryId ? (
                    <>
                      <div className="border border-gray-light dark:border-gray-dark">
                        <ContentPageHeader name="Products" />
                        {<ProductList id={categoryId} />}
                      </div>
                      <div className="border border-gray-light dark:border-gray-dark mt-8">
                        <ContentPageHeader name="SEO" />
                        {<Seo id={categoryId} />}
                      </div>
                    </>
                  ) : null}
                    <>
                      <div className="border border-gray-light dark:border-gray-dark">
                        <ContentPageHeader name="Products" />
                        {<ProductList id={categoryId} />}
                      </div>
                      <div className="border border-gray-light dark:border-gray-dark mt-8">
                        <ContentPageHeader name="SEO" />
                        {<Seo id={categoryId} />}
                      </div>
                    </>
                  )}
                </div>

                <div className="w-full lg:w-5/12 xl:w-2/12 py-4 border rounded-none border-gray-light dark:border-gray-dark">
                  <div className="relative border-b border-gray-light dark:border-gray-dark pb-6  px-4">
                    <Dropdown
                      id="recStatus"
                      asterisk
                      label="Category Status"
                      name="recStatus"
                      isFormikField
                      options={STATUS_OPTIONS}
                      value={STATUS_OPTIONS.find(
                        (item) => item.value == values.recStatus
                      )}
                      onChange={(event) => {
                        setFieldValue(
                          "recStatus",
                          (event as IDropdownOption).value
                        );
                      }}
                    />
                  </div>

                  <div className="flex flex-col p-4 gap-4 lg:gap-6">
                    <Input
                      label="Custom Collection URL"
                      name="customCollectionUrl"
                      placeholder="Enter Custom Collection URL"
                      id="customCollectionUrl"
                    />
                    <Input
                      label="SE Name"
                      name="seName"
                      placeholder="Enter SE Name"
                      id="seName"
                      disabled
                    />
                    <ToggleButton
                      label="Change Display Order Logic"
                      name="isFeatured"
                      id="isFeatured"
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

export default EditCategory;
