import { ProductListImageCell } from "@/admin-pages/product-database/core-product-feed/components/ProductListImageCell";
import Button from "@/components/Button/Button";
import DateCell from "@/components/common/DateCell";
import TableActionPanel from "@/components/common/TableActionPanel";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import Image from "@/components/Image/Image";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import ViewHistoryModal from "@/components/Modal/ViewHistoryModal";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { fetchAdditionalSelectionGroupList } from "@/services/form-builder/additional-selection-group/additionalSelectionFroup.service";
import { IModalType } from "@/types/company/company.type";
import { IAdditionalSelectionGroupRowData } from "@/types/form-builder/additionalSelectionGroup.type";
import { getErrorMessage } from "@/utils/common.util";
import {
  CURRENCY_SYMBOLS_BY_CODE,
  defaultImage,
  paginationDetails,
  RecStatusValuebyName,
} from "@/utils/constants";
import { DUMMY_VIEW_HISTORY_DATA } from "@/utils/Dummy";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreateEditBundleModal from "./bundle/CreateEditBundleModal";

// Main component for managing additional selection groups
const AdditionalSelectionGroup = () => {
  // State variables for managing data and UI states
  const [bundleListData, setBundleListData] = useState<
    IAdditionalSelectionGroupRowData[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const [sortingOptions, setSortingOptions] = useState([
    { field: "name", direction: 0, priority: 0 },
  ]);
  const [selectedBundle, setSelectedBundle] =
    useState<IAdditionalSelectionGroupRowData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: IModalType | null;
  }>({ isOpen: false, type: null });

  const [createEditBundleModal, setCreateEditBundleModal] = useState<{
    isOpen: boolean;
    bundleId: string | null;
  }>({
    isOpen: false,
    bundleId: null,
  });

  // Function to open a modal with a specific type and selected bundle
  const handleModalOpen = useCallback(
    (type: IModalType, selectedBundle: IAdditionalSelectionGroupRowData) => {
      setSelectedBundle(selectedBundle);
      setIsModalOpen({ isOpen: true, type });
    },
    []
  );

  // Function to close the modal and reset selected bundle
  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedBundle(null);
  };

  // Function to handle status change with error handling
  const handleStatusChange = async () => {
    try {
      toast.success("Bundle status updated successfully");
      handleModalClose();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update bundle status"));
    }
  };

  // Function to handle deletion of a bundle with error handling
  const handleDelete = async () => {
    try {
      toast.success("Bundle deleted successfully");
      handleModalClose();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to delete bundle"));
    }
  };

  // Table columns definition with custom cell rendering
  const COLUMNS: ITableColumn<IAdditionalSelectionGroupRowData>[] = [
    {
      id: "productImage",
      header: "IMAGES",
      accessorKey: "productImage",
      cell: ({ row }) =>
        renderProductImage(row.original?.productImage, row.original.id),
    },
    {
      id: "name",
      header: "NAME",
      accessorKey: "name",
    },
    {
      id: "ourSKU",
      header: "SKU",
      accessorKey: "ourSKU",
    },
    {
      id: "upc",
      header: "UPC",
      accessorKey: "upc",
    },
    {
      id: "quantity",
      header: "QUANTITY",
      accessorKey: "quantity",
    },
    {
      id: "ourCost",
      header: `OUR COST (${CURRENCY_SYMBOLS_BY_CODE.USD})`,
      accessorKey: "ourCost",
    },
    {
      id: "msrp",
      header: `MSRP (${CURRENCY_SYMBOLS_BY_CODE.USD})`,
      accessorKey: "msrp",
    },
    {
      id: "imap",
      header: `IMAP (${CURRENCY_SYMBOLS_BY_CODE.USD})`,
      accessorKey: "imap",
    },
    {
      id: "salePrice",
      header: `SALE PRICE (${CURRENCY_SYMBOLS_BY_CODE.USD})`,
      accessorKey: "salePrice",
    },
    {
      id: "category",
      header: "CATEGORY",
      accessorKey: "category",
    },
    {
      id: "createdDate",
      header: "CREATED DATE",
      accessorKey: "createdDate",
      cell: (props) => <DateCell date={props.row.original.createdDate} />,
    },
    {
      id: "createdName",
      header: "CREATED BY",
      accessorKey: "createdName",
    },
    {
      id: "modifiedDate",
      header: "MODIFIED DATE",
      accessorKey: "modifiedDate",
      cell: (props) => <DateCell date={props.row.original.modifiedDate} />,
    },
    {
      id: "modifiedName",
      header: "MODIFIED BY",
      accessorKey: "modifiedName",
    },
    {
      id: "recStatus",
      accessorKey: "recStatus",
      header: "STATUS",
      cell: ({ row }) => <Status type={row.original.recStatus} />,
    },
    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: (props) => renderActionCell(props),
    },
  ];

  // Fetch additional selection group data with pagination and sorting
  const fetchAdditionalSelectionGroup = useCallback(
    async (pageIndex = 0): Promise<void> => {
      try {
        setIsLoading(true);
        const request = {
          pageIndex,
          pageSize: paginationData.pageSize,
          sortingOptions,
          filteringOptions: [],
        };
        const responseData = await fetchAdditionalSelectionGroupList(request);
        setBundleListData(responseData.items);
        setPaginationData((prevState) => ({
          ...prevState,
          pageIndex: responseData?.data?.pageIndex,
          pageSize: responseData?.data?.pageSize,
          totalCount: responseData?.data?.totalCount,
          totalPages: responseData?.data?.totalPages,
          hasPreviousPage: responseData?.data?.hasPreviousPage,
          hasNextPage: responseData?.data?.hasNextPage,
        }));
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
    [paginationData.pageSize, sortingOptions]
  );

  // Fetch data on component mount
  useEffect(() => {
    fetchAdditionalSelectionGroup();
  }, [fetchAdditionalSelectionGroup]);

  // Determine if a row can be expanded based on subRows presence
  const getRowCanExpand = (row: any) => {
    return row.original.subRows && row.original.subRows.length > 0;
  };

  // Update sorting options for the table
  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([{ field: column, direction, priority: 0 }]);
  };

  // Update pagination data dynamically
  const updatePaginationData = (key: string, value: any) => {
    setPaginationData((prevState) => ({ ...prevState, [key]: value }));
  };

  // Render product image cell with fallback to default image
  const renderProductImage = (productImage: string | string[], id: number) => {
    if (Array.isArray(productImage)) {
      return ProductListImageCell(productImage, id);
    } else {
      return (
        <div className="h-14 w-14 flex items-center justify-center overflow-hidden box-content rounded-full border bg-white">
          <Image
            src={
              `${"https://storagemedia.corporategear.com/"}${productImage}` ||
              defaultImage
            }
            width={56}
            height={56}
            objectFit="cover"
            alt={`${id}`}
          />
        </div>
      );
    }
  };

  // Render action cell with options for edit, delete, status change, and view history
  const renderActionCell = (props: any) => {
    if (props.row.original.subRows) {
      return (
        <TableActionPanel
          edit={{
            show: true,
            onClick: () =>
              setCreateEditBundleModal({
                isOpen: true,
                bundleId: props.row.original.id,
              }),
          }}
          remove={{
            show: true,
            onClick: () => handleModalOpen("delete", props.row.original),
          }}
          status={{
            show: true,
            status:
              props.row.original.recStatus === RecStatusValuebyName.Active
                ? "active"
                : "inactive",
            onClick: () =>
              handleModalOpen("activeInactive", props.row.original),
          }}
          viewHistory={{
            show: true,
            onClick: () => handleModalOpen("viewHistory", props.row.original),
          }}
        />
      );
    }
  };

  return (
    <div>
      <ListPageHeader
        moduleName={""}
        name={""}
        navigateUrl={""}
        showBackButton={false}
      >
        <Button
          type="button"
          variant="primary"
          onClick={() =>
            setCreateEditBundleModal({
              isOpen: true,
              bundleId: null,
            })
          }
        >
          Create Bundles
        </Button>
      </ListPageHeader>
      <ReactTable
        DATA={bundleListData}
        COLUMNS={COLUMNS}
        fetchData={fetchAdditionalSelectionGroup}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        getRowCanExpand={getRowCanExpand}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          updatePaginationData("pageSize", value);
        }}
        checkboxSelection={false}
        showFilter={false}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        loading={isLoading}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "delete"}
        onClose={handleModalClose}
        title="Delete"
        itemName="Bundle"
        onDelete={handleDelete}
      />

      {/* Status Change Modal */}
      <StatusChangeModel
        isOpen={isModalOpen.isOpen && isModalOpen.type === "activeInactive"}
        onClose={handleModalClose}
        onConfirm={handleStatusChange}
        currentRowData={{
          recStatus:
            selectedBundle?.recStatus === RecStatusValuebyName.Active
              ? "active"
              : "inactive",
          recordName: "bundle",
        }}
        title={`${selectedBundle?.recStatus === RecStatusValuebyName.Active ? "Inactive" : "Active"} Status`}
        message={`Are you sure you want to ${selectedBundle?.recStatus === RecStatusValuebyName.Active ? "inactive" : "active"} this bundle?`}
      />

      {/* View History Modal */}
      <ViewHistoryModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "viewHistory"}
        onClose={handleModalClose}
        historyData={DUMMY_VIEW_HISTORY_DATA}
        recordName="bundle"
      />

      {createEditBundleModal.isOpen && (
        <CreateEditBundleModal
          isOpen={createEditBundleModal.isOpen}
          bundleId={createEditBundleModal.bundleId}
          onClose={() =>
            setCreateEditBundleModal({ isOpen: false, bundleId: null })
          }
        />
      )}
    </div>
  );
};

export default AdditionalSelectionGroup;
