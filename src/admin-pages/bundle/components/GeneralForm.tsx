import DynamicField from "@/components/common/DynamicField";
import Loader from "@/components/common/Loader";
import {
  BUNDLE_COMMON_FIELDS,
  BUNDLE_FIELDS_ORDER,
  STORE_BUNDLE_FIELDS,
} from "@/constants/bundle/fields.constant";
import { PRODUCT_TYPE_OPTIONS } from "@/constants/product-database/fields.constant";
import dimensionData from "@/mock-data/DimensionList.json";
import { IBundleCommonFormProps } from "@/types/bundle/bundle.type";
import {
  STORE_TYPES,
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
const GeneralForm = ({
  initialData,
  onFormChange,
  setIsFormValid,
  storeType,
  onClose,
  setIsDirty,
}: IBundleCommonFormProps) => {
  const [isLoader, setIsLoader] = useState(true);

  const [formFields, setFormFields] = useState<TDynamicFields>({});

  useEffect(() => {
    constructFormFieldWithOptions();
  }, []);

  const getCommonFieldOptions = () => ({
    productType: PRODUCT_TYPE_OPTIONS,
    searchDimensionTemplate: dimensionData?.items?.map((dimension) => ({
      label: dimension.name,
      value: dimension.id.toString(),
    })),
  });

  const constructFormFieldWithOptions = () => {
    try {
      setIsLoader(true);
      const bundleFormFields = {
        ...BUNDLE_COMMON_FIELDS,
        ...(storeType !== STORE_TYPES.FORM_BUILDER ? STORE_BUNDLE_FIELDS : {}),
      };
      const updatedFields = updateFieldsWithCustomOptions(bundleFormFields, {
        ...getCommonFieldOptions(),
        category: parentCategoryOptions,
      });
      setFormFields(getFieldsInOrder(updatedFields, BUNDLE_FIELDS_ORDER));
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoader(false);
    }
  };

  const validationSchema = useMemo(() => {
    return getValidationSchema([formFields]);
  }, [formFields]);

  const generalFormikBag = useFormik({
    initialValues: {
      ...getInitialValuesFromMultipleFields({
        ...formFields,
      }),
      ...initialData,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      try {
        toast.success(
          initialData
            ? "Bundle updated successfully"
            : "Bundle created successfully"
        );
        if (storeType === STORE_TYPES.FORM_BUILDER) {
          onClose?.();
        }
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
