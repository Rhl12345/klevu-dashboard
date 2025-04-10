import ProductTierTable from "@/admin-pages/product-tier/create/components/ProductTierTable";
import ContentPageHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { IStoreOption } from "@/types/contact-us/contactUs.type";
import { IProductTierFormProps } from "@/types/product-tier/productTier.type";
import { storeOptions } from "@/utils/Dummy";
import React from "react";

const ProductTierForm: React.FC<IProductTierFormProps> = ({ formik }) => {
  const {
    errors,
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    touched,
    setFieldTouched,
  } = formik;

  const handleStoreChange = React.useCallback(
    (option: IStoreOption | null) => {
      setFieldValue("storeName", option?.value);
    },
    [setFieldValue]
  );

  return (
    <div className="w-full" role="form">
      <div className="flex flex-wrap gap-4 lg:gap-8">
        
        <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
          <div className="font-semibold text-secondary-dark dark:text-secondary-light">
            <div className="gap-4 lg:gap-6 grid grid-cols-1">
              <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                <div className="lg:w-6/12">
                  <Dropdown
                    id="storeName"
                    name="storeName"
                    label="Store Name"
                    asterisk
                    value={storeOptions.find(
                      (option) => option.label === values?.storeName
                    )}
                    options={storeOptions}
                    onChange={(newValue) =>
                      handleStoreChange(newValue as IStoreOption)
                    }
                    onBlur={() => setFieldTouched("storeName", true)}
                    placeholder="Select Store Name"
                    errorMessage={
                      errors?.storeName && touched?.storeName
                        ? (errors?.storeName as string)
                        : undefined
                    }
                    aria-label="Store Name"
                    aria-invalid={touched.storeName && !!errors.storeName}
                  />
                </div>
                <div className="lg:w-6/12">
                  <Input
                    id="tierName"
                    name="tierName"
                    label="Tier Name"
                    placeholder="Enter Tier Name"
                    value={values.tierName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    asterisk
                  />
                </div>
              </div>

              <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                <div className="lg:w-6/12">
                  <Input
                    id="tier"
                    name="tier"
                    label="Tier"
                    placeholder="Enter Tier"
                    value={values.tier}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    asterisk
                  />
                </div>
                <div className="lg:w-6/12" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
          <ContentPageHeader name="Product Tier" />
          <ProductTierTable />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductTierForm);
