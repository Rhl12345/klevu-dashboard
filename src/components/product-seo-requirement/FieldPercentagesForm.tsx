"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import productFields from "@/mock-data/product-requirement/productFields.json";
import {
  IFieldData,
  IFieldPercentagesFormProps,
} from "@/types/product-seo-requirement/productSeoRequirement.type";
import { getErrorMessage } from "@/utils/common.util";

/**
 * @param {number} maxPercentage - The maximum percentage value allowed.
 * @param {IProductSeoRequirementReadinessDetail[]} readinessDetail - The readiness detail data.
 * @returns {JSX.Element} - The FieldPercentagesForm component.
 */

const FieldPercentagesForm = ({
  maxPercentage,
  readinessDetail,
}: IFieldPercentagesFormProps) => {
  const [fields, setFields] = useState<Array<IFieldData>>([
    { id: "1", fieldName: "", percentage: "", fieldId: 0 },
  ]);

  useEffect(() => {
    setFields(
      readinessDetail.map((rd) => ({
        id: String(rd.id),
        fieldName: rd.name!,
        percentage: rd.fieldPercentage.toString(),
        fieldId: rd.id,
      }))
    );
  }, [readinessDetail]);

  const getAvailableFields = useCallback(
    (currentFieldId: string) => {
      const selectedFields = fields
        .filter((f) => f.id !== currentFieldId) // Exclude current field's selection
        .map((f) => f.fieldId)
        .filter(Boolean); // Remove empty selections

      return productFields.filter(
        (field) => !selectedFields.includes(field.value)
      );
    },
    [fields, productFields]
  );

  const handleFieldChange = useCallback(
    (id: string, fieldName: string, fieldId: number) => {
      setFields((prev) =>
        prev.map((field) =>
          field.id === id ? { ...field, fieldName, fieldId } : field
        )
      );
    },
    []
  );

  const handlePercentageChange = useCallback((id: string, value: string) => {
    // Only allow whole numbers
    const wholeNumber = getWholeNumber(value);

    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, percentage: wholeNumber } : field
      )
    );
  }, []);

  const getWholeNumber = useCallback((value: string): string => {
    return value.includes(".") ? value.split(".")[0] : value;
  }, []);

  const handleAddField = useCallback(() => {
    const availableFields = getAvailableFields("");
    if (availableFields.length === 0) {
      toast.error("No more fields available to add");
      return;
    }

    setFields((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        fieldName: "",
        percentage: "",
        fieldId: 0,
      },
    ]);
  }, [getAvailableFields]);

  const handleRemoveField = useCallback((id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  }, []);

  const totalPercentage = useMemo(() => {
    return fields.reduce((sum, field) => {
      const percentage = Number(field.percentage) || 0;
      return sum + percentage;
    }, 0);
  }, [fields]);

  const validateFields = useCallback(() => {
    // Check if any field is empty
    const hasEmptyFields = fields.some(
      (field) => !field.fieldName || !field.percentage
    );
    if (hasEmptyFields) {
      toast.error("Please fill all fields and percentages");
      return false;
    }

    // Check for decimal values
    const hasDecimal = fields.some((field) => field.percentage.includes("."));
    if (hasDecimal) {
      toast.error("Percentage values must be whole numbers");
      return false;
    }

    // Check if percentage is a negative number
    const hasNegative = fields.some((field) => Number(field.percentage) < 0);
    if (hasNegative) {
      toast.error("Percentage values must be positive");
      return false;
    }

    // Check total percentage
    if (totalPercentage > maxPercentage) {
      toast.error(`Total percentage cannot exceed ${maxPercentage}%`);
      return false;
    }

    return true;
  }, [fields, maxPercentage, totalPercentage]);

  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      const fieldPercentages = fields.map((field) => ({
        fieldName: field.fieldName,
        percentage: Number(field.percentage),
      }));

      // TODO: API call to save field percentages
      toast.success("Field percentages saved successfully");
    } catch (error) {
      toast.error(getErrorMessage(error, "Error saving field percentages"));
    }
  };

  return (
    <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
      <table className="table w-full">
        <thead className="text-base font-semibold text-quaternary-dark dark:text-quaternary-light border-b border-gray-light dark:border-gray-dark">
          <tr>
            <th className="pb-4 px-2">
              <div className="text-left w-32 max-w-sm flex items-center">
                <span>Name</span>
              </div>
            </th>
            <th className="pb-4 px-2">
              <div className="text-left w-32 max-w-sm flex items-center">
                <span>Percentage</span>
              </div>
            </th>
            <th className="pb-4 px-2">
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleSave}
                  variant="primary"
                  size="sm"
                  className="max-sm:!px-1"
                >
                  Save Field Percentage
                </Button>
              </div>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-light dark:divide-gray-dark">
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td className="px-2 py-4">
                <div className="w-full relative pr-7">
                  <Dropdown
                    id={`field-${field.id}`}
                    name={`field-${field.id}`}
                    placeholder="Select..."
                    options={getAvailableFields(field.id)}
                    value={productFields.find(
                      (option) => option.value === field.fieldId
                    )}
                    onChange={(option: any) =>
                      handleFieldChange(field.id, option.label, option.value)
                    }
                  />
                </div>
              </td>
              <td className="px-2 first:pl-8 py-3">
                <div className="w-full relative pr-7">
                  <div className="font-bold absolute right-2 top-2.5">%</div>
                  <Input
                    type="number"
                    value={field.percentage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handlePercentageChange(field.id, e.target.value)
                    }
                    placeholder="0"
                    formik={false}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      // Prevent decimal point
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                    // Force step to 1 to only allow whole numbers
                    step="1"
                  />
                </div>
              </td>
              <td className="px-2 first:pl-5 py-3">
                <div className="relative gap-2 text-right flex justify-end">
                  {index === fields.length - 1 && (
                    <Button
                      type="button"
                      onClick={handleAddField}
                      variant="default"
                      icon={<SvgIcon name="plus" width={24} height={24} />}
                    />
                  )}
                  <Button
                    type="button"
                    onClick={() => handleRemoveField(field.id)}
                    variant="default"
                    icon={<SvgIcon name="Trash" width={24} height={24} />}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot className="text-sm font-bold uppercase text-quaternary-dark dark:text-quaternary-light border-t-2 border-gray-light dark:border-gray-dark">
          <tr>
            <td className="px-2  py-3">
              <div>Total</div>
            </td>
            <td className="px-2  py-3">
              <div>{totalPercentage}%</div>
            </td>
            <td className="px-2 py-3"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default FieldPercentagesForm;
