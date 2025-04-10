import Button from "@/components/Button/Button";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Text from "@/components/Text/Text";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import {
  PRODUCT_FEEDS,
  STORE_TYPES,
} from "@/types/products-database/productDatabase.type";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import DiscountinuedSkuModal from "./DiscountinuedSkuModal";

const ProductFlags = ({
  productId,
  feedType,
}: {
  productId: string;
  feedType: PRODUCT_FEEDS | STORE_TYPES;
}) => {
  const [editDiscountinuedModal, setEditDiscountinuedModal] = useState<{
    isOpen: boolean;
    productId: string | null;
  }>({ isOpen: false, productId: null });

  const [productFlags, setProductFlags] = useState([
    {
      key: "dropShip",
      label: "Drop Ship Product?",
      value: true,
      hidden: false,
      disabled: false,
    },
    {
      key: "saleProduct",
      label: "Sale Product?",
      value: false,
      hidden: false,
      disabled: false,
    },
    {
      key: "featured",
      label: "Featured",
      value: true,
      hidden: false,
      disabled: false,
    },
    {
      key: "newArrival",
      label: "New Arrival",
      value: false,
      hidden: false,
      disabled: false,
    },
    {
      key: "ecoFriendly",
      label: "Eco-Friendly",
      value: false,
      hidden: false,
      disabled: false,
    },
    {
      key: "quickShip",
      label: "Quick Ship",
      value: false,
      hidden: false,
      disabled: false,
    },
    {
      key: "companion",
      label: "Companion",
      value: false,
      hidden: false,
      disabled: false,
    },
    {
      key: "highStock",
      label: "High Stock",
      value: false,
      disabled: true,
      hidden: false,
    },
    {
      key: "lowStock",
      label: "Low Stock",
      value: false,
      disabled: true,
      hidden: false,
    },
    {
      key: "discontinued",
      label: "Discontinued?",
      value: false,
      hidden: false,
      disabled: true,
    },
  ]);

  useEffect(() => {
    if (feedType === STORE_TYPES.FORM_BUILDER) {
      setProductFlags((prev) =>
        prev.map((flag) =>
          flag.key === "discontinued" ? { ...flag, hidden: true } : flag
        )
      );
    }
  }, [feedType]);

  const onFlagChange = async (key: string, newValue: boolean) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update local state
      setProductFlags((prev) =>
        prev.map((flag) =>
          flag.key === key ? { ...flag, value: newValue } : flag
        )
      );

      // Handle special cases
      if (key === "featured") {
        // Disable and set discontinued to true/false when featured is turned on/off
        setProductFlags((prev) =>
          prev.map((flag) =>
            flag.key === "discontinued"
              ? { ...flag, value: false, disabled: newValue }
              : flag
          )
        );
      } else if (key === "discontinued") {
        // Enable and set featured to true/false when discontinued is turned on/off
        setProductFlags((prev) =>
          prev.map((flag) =>
            flag.key === "featured"
              ? { ...flag, value: false, disabled: newValue }
              : flag
          )
        );
      }

      return true;
    } catch (error) {
      throw error;
    }
  };

  const handleToggle = useCallback(
    async (key: string, newValue: boolean) => {
      try {
        await toast.promise(onFlagChange(key, newValue), {
          pending: `Updating ${key} flag...`,
          success: `Successfully turned ${newValue ? "on" : "off"} ${key} flag`,
          error: `Failed to update ${key} flag`,
        });
      } catch (error) {
        toast.error(`Error updating ${key} flag`);
        throw error; // Re-throw the error to maintain the promise chain
      }
    },
    [onFlagChange]
  );

  return (
    <div className="p-4 flex flex-col gap-2">
      <Text size="lg">Product Flags</Text>
      <div className="flex flex-col gap-2">
        {productFlags.map(
          (flag) =>
            !flag.hidden && (
              <div className="flex gap-2" key={flag.key}>
                <ToggleButton
                  id={flag.key}
                  label={flag.label}
                  size="small"
                  defaultValue={flag.value}
                  disabled={flag.disabled}
                  onChange={(value) => handleToggle(flag.key, value)}
                  isInline
                  wrapperClassName="justify-between w-full xl:!flex-row lg:!flex-col"
                />
                {flag.key === "discontinued" && !flag.disabled && flag.value ? (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() =>
                      setEditDiscountinuedModal({ isOpen: true, productId })
                    }
                    icon={<SvgIcon name="Edit" />}
                  />
                ) : (
                  <div className="w-7">&nbsp;</div>
                )}
              </div>
            )
        )}
      </div>
      {editDiscountinuedModal.isOpen && (
        <DiscountinuedSkuModal
          productId={editDiscountinuedModal.productId!}
          isOpen={editDiscountinuedModal.isOpen}
          onClose={() =>
            setEditDiscountinuedModal({ isOpen: false, productId: null })
          }
        />
      )}
    </div>
  );
};

export default ProductFlags;
