import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import Status from "@/components/DisplayStatus/Status";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import InputNumber from "@/components/Input/InputNumber";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Text from "@/components/Text/Text";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import Tooltip from "@/components/Tooltip/Tooltip";
import {
  IAttribute,
  IAttributeOption,
  IAttributesDropdown,
} from "@/types/product/product.type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

/**
 * AddEditAttributes Component
 *
 * A component for managing product attributes and their options. It allows adding, editing,
 * and removing attribute options with various properties like value, suffix, and display order.
 *
 * @component
 * @param {Object} props
 * @param {IAttributesDropdown[]} props.availableAttributes - List of available attributes to choose from
 * @param {IAttribute} [props.attributeData] - Existing attribute data for editing mode
 * @param {(attribute: IAttribute) => void} props.handleSaveAttributes - Callback function to save attribute changes
 * @param {(isEditing: string) => void} props.setIsEditing - Function to set which attribute is being edited
 * @param {string} props.isEditing - ID of the currently editing attribute
 *
 * @example
 * ```tsx
 * <AddEditAttributes
 *   availableAttributes={attributes}
 *   attributeData={existingAttribute}
 *   handleSaveAttributes={handleSave}
 *   setIsEditing={setEditingId}
 *   isEditing={editingId}
 * />
 * ```
 */
const AddEditAttributes = ({
  availableAttributes,
  attributeData,
  handleSaveAttributes,
  setIsEditing,
  isEditing,
}: {
  availableAttributes: IAttributesDropdown[];
  attributeData?: IAttribute;
  handleSaveAttributes: (attribute: IAttribute) => void;
  setIsEditing: (isEditing: string) => void;
  isEditing: string;
}) => {
  /** Selected attribute from available attributes list */
  const [selectedAttribute, setSelectedAttribute] =
    useState<IAttributesDropdown | null>(
      attributeData
        ? {
            label: attributeData.name,
            value: attributeData?.id,
          }
        : availableAttributes?.[0]
    );

  /** List of variant options available for selection */
  const [variantOptions, setVariantOptions] = useState<IAttributesDropdown[]>(
    []
  );

  /** Currently selected variant option */
  const [selectedVariantOption, setSelectedVariantOption] =
    useState<IAttributesDropdown | null>(null);

  /** Loading state for variant options fetch operation */
  const [loadingVariantOptions, setLoadingVariantOptions] = useState(false);

  /** List of attribute options for the selected attribute */
  const [attributeOptions, setAttributeOptions] = useState<IAttributeOption[]>(
    attributeData?.options || []
  );

  /** Available size options for the selected variant */
  const [variantSizeOptions, setVariantSizeOptions] = useState<
    (IAttributesDropdown & { variantId: number })[]
  >([]);

  /** Flag indicating if the attribute is required */
  const [isRequired, setIsRequired] = useState(false);

  const SIZE_VARIANT_TYPE_ID = "2";

  useEffect(() => {
    setSelectedAttribute(
      attributeData
        ? {
            label: attributeData.name,
            value: attributeData?.id,
          }
        : availableAttributes?.[0]
    );

    if (attributeData?.variationId) {
      fetchVariantOptions();
    }
  }, [attributeData, availableAttributes]);

  /**
   * Fetches variant options from the mock data
   * Sets the selected variant option if editing an existing attribute
   */
  const fetchVariantOptions = async () => {
    try {
      setLoadingVariantOptions(true);
      const response = await import(
        "@/mock-data/product-database/sizeVariantList.json"
      );
      if (attributeData?.variationId) {
        setSelectedVariantOption(
          response?.default.find(
            (item) => item.value?.toString() == attributeData?.variationId
          ) || null
        );
      } else {
        setVariantOptions(response?.default);
      }
    } catch (error) {
      toast.error("Error fetching variant options");
    } finally {
      setLoadingVariantOptions(false);
    }
  };

  useEffect(() => {
    if (selectedAttribute?.value == SIZE_VARIANT_TYPE_ID) {
      fetchVariantOptions();
    }
  }, [selectedAttribute]);

  /**
   * Fetches size options for the selected variant
   * Updates variantSizeOptions state with filtered options
   */
  const fetchVariantSizeOptions = async () => {
    try {
      const response = await import(
        "@/mock-data/product-database/variantSizeOptions.json"
      );
      setVariantSizeOptions(
        response?.default.filter(
          (item) => item.variantId?.toString() == selectedVariantOption?.value
        )
      );
    } catch (error) {
      toast.error("Error fetching variant size options");
    }
  };

  useEffect(() => {
    if (selectedVariantOption) {
      fetchVariantSizeOptions();
    }
  }, [selectedVariantOption]);

  /**
   * Adds a new attribute option to the list
   * Validates existing options before adding
   */
  const handleAddOption = () => {
    if (selectedAttribute?.value == SIZE_VARIANT_TYPE_ID) {
      const availableVariantSizeOptions = getAvailableVariantSizeOptions("");
      if (availableVariantSizeOptions.length === 0) {
        toast.error("No more variant size options available to add");
        return;
      }
    }

    const validOptions = attributeOptions.every(
      (option) => option.value && option.suffix && option.displayOrder
    );

    if (!validOptions) {
      toast.error("Each option must have a Value, Suffix, and DisplayOrder.");
      return;
    }

    // Check for unique values
    const values = attributeOptions.map((option) => option.value);
    const hasUniqueValues = new Set(values).size === values.length;

    if (!hasUniqueValues) {
      toast.error("Each value must be unique.");
      return;
    }

    setAttributeOptions([
      ...attributeOptions,
      {
        value: "",
        suffix: "",
        seasonalSKU: "",
        displayOrder: attributeOptions.length + 1,
        isActive: true,
        isDiscontinued: false,
      },
    ]);
  };

  /**
   * Removes an attribute option at the specified index
   * @param {number} index - Index of the option to remove
   */
  const handleRemoveOption = (index: number) => {
    const newOptions = [...attributeOptions];
    newOptions.splice(index, 1);
    setAttributeOptions(newOptions);
  };

  /**
   * Saves the current attribute configuration
   * Validates options before saving
   */
  const handleSave = () => {
    const validOptions = attributeOptions.every(
      (option) => option.value && option.suffix && option.displayOrder
    );

    if (!validOptions) {
      toast.error("Each option must have a Value, Suffix, and DisplayOrder.");
      return;
    }
    handleSaveAttributes({
      id: selectedAttribute?.value!,
      name: selectedAttribute?.label!,
      options: attributeOptions,
      isRequired: isRequired,
    });
    setIsEditing("");
  };

  /**
   * Gets available variant size options excluding already selected ones
   * @param {string} currentSizeValue - Currently selected size value to exclude from filtering
   * @returns {IAttributesDropdown[]} Available size options
   */
  const getAvailableVariantSizeOptions = (currentSizeValue: string) => {
    const selectedFields = attributeOptions
      .filter((f) => f.value !== currentSizeValue)
      .map((f) => f.value)
      .filter(Boolean);
    const res = variantSizeOptions.filter(
      (field) => !selectedFields.includes(field.value)
    );
    return res;
  };

  return isEditing != selectedAttribute?.value ? (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 flex items-center">
          <Text size="base">{attributeData?.name}</Text>
        </div>

        <div className="col-span-1 flex justify-end">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() =>
              !isEditing ? setIsEditing(selectedAttribute?.value!) : null
            }
            icon={
              !!isEditing ? (
                <Tooltip id="editTooltip">
                  Save Pending Changes For Other Attribute Options To Add Or
                  Edit This Attribute
                </Tooltip>
              ) : null
            }
          >
            Edit
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        {attributeOptions.map((option) => (
          <Text
            size="base"
            className="bg-gray-light dark:bg-gray-dark p-2 rounded-md"
            key={option.value}
          >
            {option.value}
          </Text>
        ))}
      </div>
    </>
  ) : (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <Dropdown
            label="Attribute name"
            options={availableAttributes}
            onChange={(option: any) => setSelectedAttribute(option)}
            placeholder="Select Attribute Option"
            value={selectedAttribute}
            isDisabled={
              !attributeOptions.length ||
              attributeData?.id == selectedAttribute?.value
            }
          />
        </div>

        <div className="col-span-1 ">
          <div></div>
          <div className="flex justify-end gap-4">
            {attributeData && attributeData?.options?.length > 0 && (
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setIsEditing("")}
              >
                Cancel
              </Button>
            )}
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={!attributeOptions?.length}
            >
              Save
            </Button>
          </div>
        </div>
      </div>

      {selectedAttribute?.value == SIZE_VARIANT_TYPE_ID ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <Dropdown
              label="Variant name"
              options={variantOptions}
              onChange={(option: any) => {
                setSelectedVariantOption(option);
                setAttributeOptions([]);
              }}
              placeholder="Select Variant Option"
              value={selectedVariantOption}
              isDisabled={!variantOptions.length || loadingVariantOptions}
              isLoading={loadingVariantOptions}
            />
          </div>
        </div>
      ) : null}

      <Checkbox
        id="required"
        label="Attribute Required"
        checked={isRequired}
        onChange={(e) => setIsRequired(e.target.checked)}
        inputSize="small"
        wrapperClassName="items-center"
      />

      <div className="flex flex-col gap-4 items-start">
        <Text size="base">Attribute Options</Text>
        {attributeOptions.map((option, index) => (
          <div
            key={`${selectedAttribute?.value}_${index}`}
            className="grid grid-cols-4 gap-4 items-center"
          >
            {selectedAttribute?.value !== SIZE_VARIANT_TYPE_ID ? (
              <div className="col-span-4 sm:col-span-2 md:col-span-1">
                <Input
                  name={`value-${index}`}
                  placeholder="Value"
                  value={option.value}
                  formik={false}
                  onChange={(e) => {
                    const newOptions = [...attributeOptions];
                    newOptions[index].value = e.target.value;
                    setAttributeOptions(newOptions);
                  }}
                />
              </div>
            ) : (
              <Dropdown
                options={getAvailableVariantSizeOptions(option.value)}
                onChange={(option: any) => {
                  const newOptions = [...attributeOptions];
                  newOptions[index].value = option.value;
                  setAttributeOptions(newOptions);
                }}
                placeholder="Select Variant Size"
                value={variantSizeOptions.find(
                  (item) => item.value == option.value
                )}
                isDisabled={!variantSizeOptions.length}
              />
            )}
            <div className="col-span-4 sm:col-span-2 md:col-span-1">
              <Input
                name={`suffix-${index}`}
                placeholder="Suffix"
                value={option.suffix}
                formik={false}
                onChange={(e) => {
                  const newOptions = [...attributeOptions];
                  newOptions[index].suffix = e.target.value;
                  setAttributeOptions(newOptions);
                }}
              />
            </div>
            {selectedAttribute?.value !== SIZE_VARIANT_TYPE_ID && (
              <div className="col-span-4 sm:col-span-2 md:col-span-1">
                <Input
                  name={`seasonalSKU-${index}`}
                  placeholder="Seasonal SKU"
                  value={option.seasonalSKU}
                  formik={false}
                  onChange={(e) => {
                    const newOptions = [...attributeOptions];
                    newOptions[index].seasonalSKU = e.target.value;
                    setAttributeOptions(newOptions);
                  }}
                />
              </div>
            )}
            <div className="col-span-4 sm:col-span-2 md:col-span-1">
              <InputNumber
                name={`displayOrder-${index}`}
                placeholder="Display Order"
                value={option.displayOrder}
                formik={false}
                onChange={(e) => {
                  const newOptions = [...attributeOptions];
                  newOptions[index].displayOrder = +e.target.value;
                  setAttributeOptions(newOptions);
                }}
              />
            </div>
            {selectedAttribute?.value !== SIZE_VARIANT_TYPE_ID && (
              <>
                <div className="col-span-4 sm:col-span-2 md:col-span-1">
                  <ToggleButton
                    id={`isActive-${index}`}
                    label="Discontinued"
                    defaultValue={option.isDiscontinued}
                    onChange={(value) => {
                      const newOptions = [...attributeOptions];
                      newOptions[index].isDiscontinued = value;
                      setAttributeOptions(newOptions);
                    }}
                  />
                </div>
                <div className="col-span-4 sm:col-span-2 md:col-span-1">
                  <Status type={option.isActive ? "A" : "I"} />
                </div>{" "}
              </>
            )}
            <div className="col-span-4 sm:col-span-2 md:col-span-1">
              <Button
                variant="default"
                size="sm"
                onClick={() => handleRemoveOption(index)}
                icon={<SvgIcon name="Trash" className="w-6 h-6" />}
              />
            </div>
          </div>
        ))}
        <Button
          variant="outline-primary"
          size="sm"
          onClick={handleAddOption}
          className="!self-start"
        >
          Add New
        </Button>
      </div>
    </>
  );
};

export default AddEditAttributes;
