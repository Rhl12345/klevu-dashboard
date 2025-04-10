import Button from "@/components/Button/Button";
import AddEditAttributes from "@/components/common/product/AddEditAttributes";
import Text from "@/components/Text/Text";
import { IAttribute, IAttributesDropdown } from "@/types/product/product.type";
import { getErrorMessage } from "@/utils/common.util";
import { useState } from "react";
import { toast } from "react-toastify";

/**
 * AttributeOptionSection Component
 *
 * A component that manages product attributes and their options. It allows users to:
 * - View existing attributes
 * - Add new attributes from available options
 * - Edit existing attributes
 * - Remove attributes
 *
 * @component
 * @example
 * ```tsx
 * <AttributeOptionSection
 *   availableAttributes={availableAttributesList}
 *   attributesData={currentAttributes}
 *   setAttributesData={handleAttributesUpdate}
 * />
 * ```
 */
const AttributeOptionSection = ({
  availableAttributes,
  attributesData = [],
  setAttributesData,
}: {
  availableAttributes: IAttributesDropdown[];
  attributesData?: IAttribute[];
  setAttributesData: (attributes: IAttribute[]) => void;
}) => {
  // Track which attribute is currently being edited
  const [isEditing, setIsEditing] = useState("");

  /**
   * Handles saving attribute changes
   * @param attribute - The modified attribute to save
   */
  const handleSaveAttributes = (attribute: IAttribute) => {
    try {
      const filteredAttributes = attributesData.filter(
        (a) => a.id !== attribute.id
      );
      setAttributesData([
        ...filteredAttributes,
        ...(attribute?.options?.length ? [attribute] : []),
      ]);
      toast.success("Attribute saved successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  /**
   * Handles adding a new attribute from available options
   * Finds the first available attribute that hasn't been added yet
   */
  const handleAddAttribute = () => {
    const newAttribute = availableAttributes.find(
      (attribute) => !attributesData.find((a) => a.id === attribute.value)
    );
    if (newAttribute) {
      setAttributesData([
        ...attributesData,
        {
          name: newAttribute.label,
          id: newAttribute.value,
          isRequired: false,
          options: [],
        },
      ]);
    }
  };

  return (
    <div className="border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark flex flex-col gap-4 lg:gap-6">
      <div className="flex justify-between items-center">
        <Text size="lg">Attributes</Text>
      </div>
      {attributesData?.length > 0 ? (
        attributesData?.map((attribute) => (
          <div
            className="flex flex-col gap-4 border-b border-gray-light dark:border-gray-dark pb-4"
            key={attribute.id}
          >
            <AddEditAttributes
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              availableAttributes={availableAttributes}
              attributeData={attribute}
              handleSaveAttributes={handleSaveAttributes}
            />
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-4 border-b border-gray-light dark:border-gray-dark pb-4">
          <AddEditAttributes
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            key="no-attributes"
            availableAttributes={availableAttributes}
            handleSaveAttributes={handleSaveAttributes}
          />
        </div>
      )}

      {attributesData.length < availableAttributes.length ? (
        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={() => handleAddAttribute()}
            disabled={!attributesData.length}
          >
            Add Attribute
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default AttributeOptionSection;
