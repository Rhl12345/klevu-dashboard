import DynamicField from "@/components/common/DynamicField";
import Dropdown from "@/components/DropDown/DropDown";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import PricingList from "@/mock-data/PricingList.json";
import { STORE_FORM_PRICING_FORM_FIELD } from "@/constants/product-database/fields.constant";
import { IStoreFormTabProps } from "@/types/products-database/productDatabase.type";
import { getErrorMessage } from "@/utils/common.util";
import {
  getInitialValuesFromMultipleFields,
  getValidationSchema,
} from "@/utils/forms.util";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IPricingDiscount } from "@/types/product/product.type";
import Link from "next/link";
import { PageRoutes } from "@/admin-pages/routes";

// Add type for PricingList
type PricingListKeys = keyof typeof PricingList;

const dropDownOptions = [
  {
    value: "122",
    label: "adidas - Adidas Golf - Discount",
  },
  {
    value: "199",
    label: "adidas - Adidas Golf - Sale 45off",
  },
];

const PricingFormTab = ({
  type,
  storeName,
  initialData = {},
  onFormChange,
  setIsFormValid,
  setIsDirty,
}: IStoreFormTabProps) => {
  const [tableData, setTableData] = useState<IPricingDiscount[]>([]);
  const COLUMNS: ITableColumn[] = [
    {
      header: "Low Quantity",
      accessorKey: "lowQuantity",
      id: "lowQuantity",
      enableSorting: false,
    },
    {
      header: "High Quantity",
      accessorKey: "highQuantity",
      id: "highQuantity",
      enableSorting: false,
    },
    {
      header: "Discount Percent",
      accessorKey: "discountPercent",
      id: "discountPercent",
      enableSorting: false,
    },
  ];
  const [selectedDiscount, setSelectedDiscount] = useState<{
    value: string;
    label: string;
  }>(dropDownOptions[0]);

  const validationSchema = useMemo(() => {
    return getValidationSchema([STORE_FORM_PRICING_FORM_FIELD]);
  }, [type]);

  const pricingFormikBag = useFormik({
    initialValues: {
      ...getInitialValuesFromMultipleFields({
        ...STORE_FORM_PRICING_FORM_FIELD,
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

  const handleDiscountChange = (value: { value: string; label: string }) => {
    setSelectedDiscount(value);
  };

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

  useEffect(() => {
    if (selectedDiscount) {
      const discountData =
        PricingList[selectedDiscount.label as PricingListKeys];
      setTableData(discountData.items);
    }
  }, [selectedDiscount]);

  return (
    <div className="border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
      <form onSubmit={pricingFormikBag.handleSubmit}>
        <FormikProvider value={pricingFormikBag}>
          <div className="w-full grid grid-cols-4 gap-4">
            {Object.entries(STORE_FORM_PRICING_FORM_FIELD).map(
              ([key, field]) => (
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
              )
            )}
          </div>
        </FormikProvider>
      </form>{" "}
      <div className="w-full flex justify-between items-center py-4">
        <div className="w-4/6">
          <Dropdown
            options={dropDownOptions}
            onChange={(value) => handleDiscountChange(value as any)}
            value={selectedDiscount}
          />
        </div>

        <div className="w-2/6 flex justify-end">
          <Link
            className="btn-primary dark:btn-dark-primary btn-md"
            href={PageRoutes.DISCOUNT_TABLES.CREATE}
          >
            Add Quantity Discount
          </Link>
        </div>
      </div>
      <ReactTable
        COLUMNS={COLUMNS}
        DATA={tableData}
        isListPage={true}
        showFilter={false}
        usedInsideModal={true}
        showPagination={false}
        loading={false}
        showEditColumns={false}
        showMoreFilters={false}
        displaySearch={false}
      />
    </div>
  );
};

export default PricingFormTab;
