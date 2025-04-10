import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import {
  getProductAllVendors,
  getProductVendors,
  getVendorSkuMappingData,
} from "@/services/product/productVendor.service";
import { IDropdownOption } from "@/types/common/common.type";
import { IVendorSku } from "@/types/product/product.type";
import { getErrorMessage } from "@/utils/common.util";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const VendorSkuMapping = ({ productId }: { productId: string }) => {
  const [mappingData, setMappingData] = useState<IVendorSku[]>([]);

  const [loadingStates, setLoadingStates] = useState({
    isLoading: false,
    addVendor: false,
    fetchVendor: false,
  });

  const [selectedVendorToAdd, setSelectedVendorToAdd] =
    useState<IDropdownOption | null>(null);
  const [productAllVendors, setProductAllVendors] = useState<IDropdownOption[]>(
    []
  );

  const [selectedVendor, setSelectedVendor] = useState<IDropdownOption | null>(
    null
  );
  const [productVendors, setProductVendors] = useState<IDropdownOption[]>([]);

  const renderInputCell = useCallback(
    ({ row, field }: { row: any; field: keyof IVendorSku }) => {
      const value = row.original[field] || "";
      const isParentRow = row.getCanExpand();
      if (field === "vendorSku" || field === "referenceName") {
        if (selectedVendor?.value === "all" || !isParentRow) {
          return isParentRow ? value : "";
        }
      }

      if (field === "ourSubSku") {
        return isParentRow ? "" : value;
      }

      if (field === "mpn" && isParentRow) {
        return "";
      }

      if (selectedVendor?.value === "all") {
        return value || "";
      }

      return (
        <Input
          name={`${field}-${row.original.id}`}
          value={row.original[field] || ""}
          onChange={(e) => {
            const newValue = e.target.value;
            setMappingData((prevData) =>
              prevData.map((item) => {
                if (item.id === row.original.id) {
                  return { ...item, [field]: newValue };
                }
                if (item.subRows) {
                  return {
                    ...item,
                    subRows: item.subRows.map((subRow) =>
                      subRow.id === row.original.id
                        ? { ...subRow, [field]: newValue }
                        : subRow
                    ),
                  };
                }
                return item;
              })
            );
          }}
          formik={false}
        />
      );
    },
    [selectedVendor]
  );

  const columns: ITableColumn<IVendorSku>[] = useMemo(
    () => [
      {
        id: "vendorName",
        accessorKey: "vendorName",
        header: "VENDOR / PRODUCT NAME",
        enableSorting: false,
        cell: ({ row }: { row: any }) =>
          row.getCanExpand() ? row.original.vendorName : "",
      },
      {
        id: "vendorSku",
        accessorKey: "vendorSku",
        header: "VENDOR SKU",
        enableSorting: false,
        cell: (props: any) => renderInputCell({ ...props, field: "vendorSku" }),
      },
      {
        id: "referenceName",
        accessorKey: "referenceName",
        header: "REFERENCE NAME",
        enableSorting: false,
        cell: (props: any) =>
          renderInputCell({ ...props, field: "referenceName" }),
      },
      {
        id: "ourSubSku",
        accessorKey: "ourSubSku",
        header: "OUR SUB SKU",
        enableSorting: false,
        cell: (props: any) => renderInputCell({ ...props, field: "ourSubSku" }),
      },
      {
        id: "mpn",
        accessorKey: "mpn",
        header: "MPN",
        enableSorting: false,
        cell: (props: any) => renderInputCell({ ...props, field: "mpn" }),
      },
      {
        id: "isDefault",
        accessorKey: "isDefault",
        header: "DEFAULT VENDOR",
        enableSorting: false,
        cell: ({ row }: { row: any }) =>
          row.getCanExpand() ? (
            <ToggleButton
              id={`isDefault-${row.original.id}`}
              defaultValue={row.original.isDefaultVendor}
              onChange={() => {
                setMappingData((prevData) =>
                  prevData.map((item) => {
                    if (item.id === row.original.id) {
                      return {
                        ...item,
                        isDefaultVendor: !item.isDefaultVendor,
                      };
                    }
                    return { ...item, isDefaultVendor: false };
                  })
                );
              }}
              disabled={selectedVendor?.value !== "all"}
            />
          ) : (
            ""
          ),
      },
    ],
    [selectedVendor, renderInputCell]
  );

  const fetchAllProductVendors = async () => {
    try {
      const response = await getProductAllVendors(productId);
      setProductAllVendors(response);
    } catch (error) {
      toast.error(getErrorMessage(error, "Error fetching all product vendors"));
    } finally {
      setLoadingStates((prev) => ({ ...prev, fetchVendor: false }));
    }
  };

  const fetchProductVendors = async () => {
    try {
      setLoadingStates((prev) => ({ ...prev, fetchVendor: true }));
      const response = await getProductVendors(productId);
      setSelectedVendor({
        label: "All Vendors",
        value: "all",
      });
      setProductVendors(response);
    } catch (error) {
      toast.error(getErrorMessage(error, "Error fetching product vendors"));
    } finally {
      setLoadingStates((prev) => ({ ...prev, fetchVendor: false }));
    }
  };

  const fetchVendorSkuMappingData = async (vendorId = "all") => {
    try {
      setLoadingStates((prev) => ({ ...prev, fetchVendor: true }));
      const response = await getVendorSkuMappingData(productId, vendorId);
      setMappingData(response);
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Error fetching vendor sku mapping data")
      );
    } finally {
      setLoadingStates((prev) => ({ ...prev, fetchVendor: false }));
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchInitialData = async () => {
      try {
        setLoadingStates((prev) => ({ ...prev, isLoading: true }));
        if (mounted) {
          await Promise.all([
            fetchAllProductVendors(),
            fetchProductVendors(),
            fetchVendorSkuMappingData(),
          ]);
        }
      } catch (error) {
        if (mounted) {
          toast.error(getErrorMessage(error, "Error fetching initial data"));
        }
      } finally {
        if (mounted) {
          setLoadingStates((prev) => ({ ...prev, isLoading: false }));
        }
      }
    };

    fetchInitialData();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSave = async () => {
    try {
      // Handle save logic here
      toast.success("Vendor sku mapping saved successfully");
    } catch (error) {
      toast.error(getErrorMessage(error, "Error saving vendor sku mapping"));
    }
  };

  const handleAddVendor = async () => {
    try {
      setLoadingStates((prev) => ({ ...prev, addVendor: true }));
      if (!selectedVendorToAdd) {
        toast.error("Please select a vendor to add");
        return;
      }

      setProductVendors([...productVendors, selectedVendorToAdd]);
      setSelectedVendorToAdd(null);
      setProductAllVendors((prev) =>
        prev.filter((vendor) => vendor.value !== selectedVendorToAdd.value)
      );

      setSelectedVendor({ label: "All Vendors", value: "all" });
    } catch (error) {
      toast.error(getErrorMessage(error, "Error adding vendor"));
    } finally {
      setLoadingStates((prev) => ({ ...prev, addVendor: false }));
    }
  };

  return (
    <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
      <div className="flex flex-col gap-4 p-4 lg:p-6 !pb-0">
        <div className="flex flex-wrap md:flex-nowrap items-end gap-4">
          <div className="flex-1 min-w-48">
            <Dropdown
              name="selectedVendor"
              label="All Vendors"
              options={productAllVendors}
              onChange={(selected: any) => {
                setSelectedVendorToAdd(selected);
              }}
              value={selectedVendorToAdd}
              placeholder="Select Vendor"
              isLoading={loadingStates.fetchVendor}
            />
          </div>

          <Button
            variant="primary"
            size="md"
            type="button"
            onClick={handleAddVendor}
          >
            Add Vendor
          </Button>

          <Dropdown
            name="filterVendor"
            options={productVendors}
            placeholder="Select Vendor"
            value={selectedVendor}
            onChange={(selected: any) => {
              setSelectedVendor(selected);
              fetchVendorSkuMappingData(selected?.value);
            }}
            isLoading={loadingStates.addVendor || loadingStates.fetchVendor}
          />
        </div>

        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>

      <ReactTable
        COLUMNS={columns}
        DATA={mappingData}
        isListPage={false}
        showFilter={false}
        showPagination={false}
        displaySearch={false}
        getRowCanExpand={(row) => row.original.subRows?.length > 0}
        loading={loadingStates.isLoading}
      />
    </div>
  );
};

export default VendorSkuMapping;
