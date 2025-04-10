import DynamicField from "@/components/common/DynamicField";
import Loader from "@/components/common/Loader";
import {
  CATEGORY_FORM_FIELD,
  DECORATION_FORM_FIELD,
  DECORATION_OPTIONS,
  GENDER_FORM_FIELD,
  PRODUCT_AND_CORE_PRODUCT_FIELDS_ORDER,
  PRODUCT_DATABASE_COMMON_FIELDS,
  PRODUCT_TYPE_OPTIONS,
  SHORT_DESCRIPTION_FORM_FIELD,
  STATUS_FORM_FIELD,
} from "@/constants/product-database/fields.constant";
import {
  ICommonFormTabProps,
  PRODUCT_FEEDS,
  TDynamicFields,
} from "@/types/products-database/productDatabase.type";
import { getErrorMessage } from "@/utils/common.util";
import { parentCategoryOptions } from "@/utils/Dummy";
import {
  getFieldsInOrder,
  getInitialValuesFromMultipleFields,
  getValidationSchema,
  updateFieldsWithCustomOptions,
} from "@/utils/forms.util";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import brandData from "@/mock-data/BrandData.json";
import dimensionData from "@/mock-data/DimensionList.json";
import companionProducts from "@/mock-data/product-database/companionProducts.json";

const GeneralForm = ({
  type,
  initialData = {},
  statusFormField = STATUS_FORM_FIELD,
  onFormChange,
  setIsFormValid,
  setIsDirty,
}: ICommonFormTabProps) => {
  const [isLoader, setIsLoader] = useState(true);

  const [formFields, setFormFields] = useState<TDynamicFields>({});

  useEffect(() => {
    constructFormFieldWithOptions();
  }, [type]);

  const getCommonFieldOptions = () => ({
    brand: brandData?.brandListData?.map((brand) => ({
      label: brand.name,
      value: brand.id.toString(),
    })),
    vendor: brandData?.brandListData?.map((brand) => ({
      label: brand.vendorName.join(", "),
      value: brand.id.toString(),
    })),
    productType: PRODUCT_TYPE_OPTIONS,
    category: parentCategoryOptions,
    searchDimensionTemplate: dimensionData?.items?.map((dimension) => ({
      label: dimension.name,
      value: dimension.id.toString(),
    })),
    companionProduct: companionProducts?.map((product) => ({
      label: product.label,
      value: product.value,
    })),
  });

  const constructFormFieldWithOptions = () => {
    try {
      setIsLoader(true);

      if (type === PRODUCT_FEEDS.CORE_PRODUCT_FEED) {
        const productFormFields = {
          ...PRODUCT_DATABASE_COMMON_FIELDS,
          ...CATEGORY_FORM_FIELD,
          ...GENDER_FORM_FIELD,
          ...SHORT_DESCRIPTION_FORM_FIELD,
          ...DECORATION_FORM_FIELD,
        };
        const updatedFields = updateFieldsWithCustomOptions(productFormFields, {
          ...getCommonFieldOptions(),
          category: parentCategoryOptions,
          decoration: DECORATION_OPTIONS,
        });
        setFormFields(
          getFieldsInOrder(updatedFields, PRODUCT_AND_CORE_PRODUCT_FIELDS_ORDER)
        );
      } else {
        const productFormFields = PRODUCT_DATABASE_COMMON_FIELDS;
        const updatedFields = updateFieldsWithCustomOptions(productFormFields, {
          ...getCommonFieldOptions(),
        });
        setFormFields(
          getFieldsInOrder(updatedFields, PRODUCT_AND_CORE_PRODUCT_FIELDS_ORDER)
        );
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoader(false);
    }
  };

  const validationSchema = useMemo(() => {
    if (type === PRODUCT_FEEDS.CORE_PRODUCT_FEED) {
      return getValidationSchema([
        PRODUCT_DATABASE_COMMON_FIELDS,
        CATEGORY_FORM_FIELD,
        GENDER_FORM_FIELD,
        STATUS_FORM_FIELD,
        DECORATION_FORM_FIELD,
      ]);
    }
    return getValidationSchema([
      PRODUCT_DATABASE_COMMON_FIELDS,
      STATUS_FORM_FIELD,
    ]);
  }, [type]);

  const generalFormikBag = useFormik({
    initialValues: {
      ...getInitialValuesFromMultipleFields({
        ...formFields,
        ...statusFormField,
      }),
      ...initialData,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        toast.success("Product updated successfully");
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
  });
  useEffect(() => {
    if (onFormChange && generalFormikBag.dirty) {
      onFormChange();
    }

    if (Object.keys(generalFormikBag.errors).length === 0) {
      setIsFormValid?.(true);
      setIsDirty?.(false);
    } else {
      setIsFormValid?.(false);
    }
  }, [generalFormikBag.dirty, onFormChange, generalFormikBag.errors]);

  return (
    <div className="border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
      <form onSubmit={generalFormikBag.handleSubmit}>
        {isLoader ? (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        ) : (
          <FormikProvider value={generalFormikBag}>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {Object.entries(formFields).map(([key, field]) => (
                <div
                  key={key}
                  className={`${
                    field.fullWidth
                      ? "col-span-full"
                      : "col-span-full md:col-span-1"
                  }`}
                >
                  <DynamicField key={key} fieldConfig={field} />
                </div>
              ))}
            </div>
          </FormikProvider>
        )}
      </form>
    </div>
  );
};

export default GeneralForm;
