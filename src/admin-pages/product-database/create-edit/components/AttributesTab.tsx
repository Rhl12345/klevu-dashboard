import Loader from "@/components/common/Loader";
import AttributeCombinationSection from "@/components/common/product/AttributeCombinationSection";
import AttributeImagesSection from "@/components/common/product/AttributeImagesSection";
import AttributeOptionSection from "@/components/common/product/AttributeOptionSection";
import {
  getAttributeCombinationData,
  getAttributesData,
  getAttributesImageData,
  getAvailableAttributes,
} from "@/services/product/productAttributes.service";
import {
  IAttribute,
  IAttributeCombination,
  IAttributeImageOption,
  IAttributesDropdown,
} from "@/types/product/product.type";
import {
  PRODUCT_FEEDS,
  STORE_TYPES,
} from "@/types/products-database/productDatabase.type";
import { getErrorMessage } from "@/utils/common.util";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

/**
 * AttributesTab Component
 *
 * This component handles the display and management of product attributes including:
 * - Available attribute options
 * - Attribute images
 * - Attribute combinations
 *
 * The component fetches and displays four main types of data:
 * 1. Available attributes that can be added to the product
 * 2. Currently selected attributes and their values
 * 3. Attribute images configuration
 * 4. Attribute combinations for variant products
 *
 * @param {PRODUCT_FEEDS} props.type - Type of product feed
 * @param {string} props.productId - Unique identifier of the product
 *
 * @returns {JSX.Element} Rendered AttributesTab component
 */
const AttributesTab = ({
  type,
  productId,
}: {
  type: PRODUCT_FEEDS | STORE_TYPES;
  productId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [availableAttributes, setAvailableAttributes] = useState<
    IAttributesDropdown[]
  >([]);

  const [attributesData, setAttributesData] = useState<IAttribute[]>([]);

  const [attributesImageData, setAttributesImageData] = useState<
    IAttributeImageOption[]
  >([]);

  const [attributeCombinationData, setAttributeCombinationData] = useState<
    IAttributeCombination[]
  >([]);

  /**
   * Fetches available attribute options that can be added to the product
   */
  const fetchAvailableAttributesOptions = async () => {
    try {
      const attributes = await getAvailableAttributes(productId);
      setAvailableAttributes(attributes);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  /**
   * Fetches currently configured attributes data for the product
   */
  const fetchAttributesData = async () => {
    try {
      const attributes = await getAttributesData(productId);
      setAttributesData(attributes);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  /**
   * Fetches attribute images configuration data
   */
  const fetchAttributesImageData = async () => {
    try {
      const attributes = await getAttributesImageData(productId);
      setAttributesImageData(attributes);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  /**
   * Fetches attribute combinations data for variant products
   */
  const fetchAttributeCombinationData = async () => {
    try {
      const attributeCombinationRes =
        await getAttributeCombinationData(productId);
      setAttributeCombinationData(attributeCombinationRes);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  /**
   * Fetches all initial data required for the attributes tab
   */
  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      await Promise.allSettled([
        fetchAvailableAttributesOptions(),
        fetchAttributesData(),
        fetchAttributesImageData(),
        fetchAttributeCombinationData(),
      ]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [productId]);

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Attribute Option Section */}
          <AttributeOptionSection
            availableAttributes={availableAttributes}
            attributesData={attributesData}
            setAttributesData={setAttributesData}
          />

          {/* Attribute Images Section */}
          <AttributeImagesSection attributesImageData={attributesImageData} />

          {/* Attribute Combination Section */}
          <AttributeCombinationSection
            feedType={type}
            attributeCombinationData={attributeCombinationData}
          />
        </>
      )}
    </div>
  );
};

export default AttributesTab;
