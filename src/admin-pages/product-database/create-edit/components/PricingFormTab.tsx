import DynamicField from "@/components/common/DynamicField";
import { PRICING_FORM_FIELD } from "@/constants/product-database/fields.constant";
import { ICommonFormTabProps } from "@/types/products-database/productDatabase.type";
import { getErrorMessage } from "@/utils/common.util";
import {
  getInitialValuesFromMultipleFields,
  getValidationSchema,
} from "@/utils/forms.util";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";

const PricingFormTab = ({
  type,
  initialData = {},
  onFormChange,
  setIsFormValid,
  setIsDirty,
}: ICommonFormTabProps) => {
  const validationSchema = useMemo(() => {
    return getValidationSchema([PRICING_FORM_FIELD]);
  }, [type]);

  const pricingFormikBag = useFormik({
    initialValues: {
      ...getInitialValuesFromMultipleFields({
        ...PRICING_FORM_FIELD,
      }),
      ...initialData,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        // TODO: Implement update API call
        toast.success(`Product Price updated successfully`);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
  });

  useEffect(() => {
    if (onFormChange && pricingFormikBag.dirty) {
      onFormChange();
    }

    if (Object.keys(pricingFormikBag.errors).length === 0) {
      setIsFormValid?.(true);
      setIsDirty?.(false);
    } else {
      setIsFormValid?.(false);
    }
  }, [pricingFormikBag.dirty, onFormChange, pricingFormikBag.errors]);

  return (
    <div className="border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
      <form onSubmit={pricingFormikBag.handleSubmit}>
        <FormikProvider value={pricingFormikBag}>
          <div className="w-full grid grid-cols-4 gap-4">
            {Object.entries(PRICING_FORM_FIELD).map(([key, field]) => (
              <div
                key={key}
                className={`${
                  field.fullWidth
                    ? "col-span-full"
                    : "col-span-full md:col-span-2 lg:col-span-1"
                }`}
              >
                <DynamicField key={key} fieldConfig={field} />
              </div>
            ))}
          </div>
        </FormikProvider>
      </form>{" "}
    </div>
  );
};

export default PricingFormTab;
