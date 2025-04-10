"use client";
import TableActionPanel from "@/components/common/TableActionPanel";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { getErrorMessage } from "@/utils/common.util";
import { paginationDetails } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";
import Link from "next/link";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import BundleListData from "@/mock-data/BundleList.json";
import Image from "@/components/Image/Image";
import {
  IBundleItem,
  IStoreListBundleTableCellProps,
} from "@/types/bundle/bundle.type";
const BundleListPage = ({
  storeType,
  storeName,
}: {
  storeType: string;
  storeName: string;
}) => {
  const [selectedBundle, setSelectedBundle] = useState<IBundleItem | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(false);

  const [bundleList, setBundleList] = useState<IBundleItem[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "activeInactive" | "viewHistory" | null;
  }>({ isOpen: false, type: null });

  const handleModalOpen = useCallback(
    (
      type: "delete" | "activeInactive" | "viewHistory",
      bundle: IBundleItem
    ) => {
      setSelectedBundle(bundle);
      setIsModalOpen({ isOpen: true, type });
    },
    []
  );

  const handleModalClose = useCallback(() => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedBundle(null);
  }, []);

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getBundleListData = useCallback(
    async (pageIndex = 1): Promise<void> => {
      try {
        // Simulating API call with mock data
        const response = new Promise<any>((resolve) => {
          setTimeout(() => {
            const startIndex = (pageIndex - 1) * paginationData.pageSize;
            const endIndex = startIndex + paginationData.pageSize;
            const paginatedItems =
              BundleListData.bundleList.items.slice(startIndex);

            resolve({
              items: paginatedItems,
              pageIndex: pageIndex,
              pageSize: paginationData.pageSize,
              totalCount: BundleListData.bundleList.items.length,
              totalPages: Math.ceil(
                BundleListData.bundleList.items.length / paginationData.pageSize
              ),
              hasPreviousPage: pageIndex > 1,
              hasNextPage: endIndex < BundleListData.bundleList.items.length,
            });
          }, 500);
        });

        const result = await response;
        setBundleList(result.items);
        setPaginationData((prevState) => ({
          ...prevState,
          pageIndex: result.pageIndex,
          pageSize: result.pageSize,
          totalCount: result.totalCount,
          totalPages: result.totalPages,
          hasPreviousPage: result.hasPreviousPage,
          hasNextPage: result.hasNextPage,
        }));
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    [paginationData.pageSize]
  );

  const COLUMNS: ITableColumn<IBundleItem>[] = [
    {
      id: "images",
      header: "Images",
      accessorKey: "productImage",
      cell: (props: IStoreListBundleTableCellProps) => {
        return props.row.original.productImage &&
          props.row.original.productImage.length > 0 ? (
          <>
            <div
              className={`flex -space-x-9 items-center`}
              style={{ width: "160px" }}
            >
              {Array.isArray(props.row.original.productImage) ? (
                props.row.original.productImage.map((ProductMainImg, index) => {
                  return (
                    <Link
                      href={`/admin/stores/${storeType}/${storeName}/bundle/edit/${props.row.original.id}`}
                      key={index}
                    >
                      <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content rounded-full border bg-white">
                        <Image
                          src={`https://storagemedia.corporategear.com/${ProductMainImg}`}
                          className="max-h-full"
                          alt={props.row.original.name}
                        />
                      </div>
                    </Link>
                  );
                })
              ) : (
                <>
                  <Link
                    href={`/admin/stores/${storeType}/${storeName}/bundle/edit/${props.row.original.id}`}
                  >
                    <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content rounded-full border bg-white">
                      <Image
                        src={`https://storagemedia.corporategear.com/${props.row.original.productImage}`}
                        alt={props.row.original.name}
                        className="max-h-full"
                      />
                    </div>
                  </Link>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              href={`/admin/stores/${storeType}/${storeName}/bundle/edit/${props.row.original.id}`}
            >
              <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content rounded-full border">
                <Image src={"/noImage.png"} alt={props.row.original.name} />
              </div>
            </Link>
          </>
        );
      },
    },
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      cell: (props: IStoreListBundleTableCellProps) => {
        return props.row.original ? (
          <>
            <div className="w-full flex justify-start items-center group">
              <div>
                {props.row.original.id ? (
                  <Link
                    href={`/admin/stores/${storeType}/${storeName}/bundle/edit/${props.row.original.id}`}
                  >
                    <div className="font-semibold">
                      {props.row.original.name ? props.row.original.name : ""}
                    </div>
                  </Link>
                ) : (
                  <div className="font-semibold">
                    {props.row.original.name ? props.row.original.name : ""}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : null;
      },
    },
    {
      id: "sku",
      header: "SKU",
      accessorKey: "ourSKU",
      cell: (props: IStoreListBundleTableCellProps) => {
        if (!props.row.original.ourSKU) {
          return null;
        } else {
          return (
            <div className="" /* style={{ width: "160px" }} */>
              {props.row.original.ourSKU}
            </div>
          );
        }
      },
    },
    {
      id: "recStatus",
      header: "status",
      accessorKey: "recStatus",
      cell: (props: IStoreListBundleTableCellProps) => {
        return <Status type={props.row.original.recStatus} />;
      },
    },
    {
      id: "upc",
      header: "UPC",
      accessorKey: "upc",
      cell: (props: IStoreListBundleTableCellProps) => {
        if (!props.row.original.upc) {
          return null;
        } else {
          return props.row.original.upc;
        }
      },
    },
    {
      id: "quantity",
      header: "Quantity",
      accessorKey: "quantity",
      cell: (props: IStoreListBundleTableCellProps) => {
        if (!props.row.original.quantity) {
          return null;
        } else {
          return props.row.original.quantity;
        }
      },
    },
    {
      id: "ourCost",
      header: `our Cost $`,
      accessorKey: "ourCost",
      cell: (props: IStoreListBundleTableCellProps) => {
        return props.row.original.ourCost
          ? "$" + parseFloat(props.row.original.ourCost.toString()).toFixed(2)
          : "";
      },
    },
    {
      id: "msrp",
      header: `MSRP $`,
      accessorKey: "msrp",
      cell: (props: IStoreListBundleTableCellProps) => {
        return props.row.original.msrp
          ? "$" + parseFloat(props.row.original.msrp.toString()).toFixed(2)
          : "";
      },
    },
    {
      id: "imap",
      header: `IMAP $`,
      accessorKey: "imap",
      cell: (props: IStoreListBundleTableCellProps) => {
        return props.row.original.imap
          ? "$" + parseFloat(props.row.original.imap.toString()).toFixed(2)
          : "";
      },
    },
    {
      id: "salePrice",
      header: `Sale Price $`,
      accessorKey: "salePrice",
      cell: (props: IStoreListBundleTableCellProps) => {
        return props.row.original.salePrice
          ? "$" + parseFloat(props.row.original.salePrice.toString()).toFixed(2)
          : "";
      },
    },
    {
      id: "category",
      header: "Category",
      accessorKey: "category",
      cell: (props: IStoreListBundleTableCellProps) => {
        if (!props.row.original.category) {
          return "";
        } else {
          return props.row.original.category;
        }
      },
    },
    {
      id: "createdDate",
      header: "Created Date",
      accessorKey: "createdDate",
      cell: (props: IStoreListBundleTableCellProps) => {
        if (!props.row.original.createdDate) {
          return "";
        } else {
          return (
            <>
              <div>{getFormatDate(props.row.original.createdDate).date} </div>
              <div className="  text-xs font-normal">
                {getFormatDate(props.row.original.createdDate).time}
              </div>
            </>
          );
        }
      },
    },
    {
      id: "createdName",
      header: "Created By",
      accessorKey: "createdName",
    },
    {
      id: "UpdatedDate",
      header: "Updated Date",
      accessorKey: "modifiedDate",
      cell: (props: IStoreListBundleTableCellProps) => {
        if (!props.row.original.modifiedDate) {
          return "";
        } else {
          return (
            <>
              <div>{getFormatDate(props.row.original.modifiedDate).date} </div>
              <div className="  text-xs font-normal">
                {getFormatDate(props.row.original.modifiedDate).time}
              </div>
            </>
          );
        }
      },
    },
    {
      id: "updatedBy",
      header: "Updated By",
      accessorKey: "modifiedName",
    },
    {
      id: "action",
      header: "Action",
      accessorKey: "id",
      cell: (props: IStoreListBundleTableCellProps) => {
        return props.row.original ? (
          <>
            {(props.row.original.subRows === null ||
              props.row.original.subRows) && (
              <TableActionPanel
                edit={{
                  show: true,
                  url: `admin/stores/${storeType}/${storeName}/bundle/edit/${props.row.original.id}`,
                }}
                remove={{
                  show: true,
                  onClick: () => handleModalOpen("delete", props.row.original),
                }}
                status={{
                  show: true,
                  status: props.row.original.recStatus as "active" | "inactive",
                  onClick: () =>
                    handleModalOpen("activeInactive", props.row.original),
                }}
                viewHistory={{
                  show: true,
                  onClick: () =>
                    handleModalOpen("viewHistory", props.row.original),
                }}
              />
            )}
          </>
        ) : (
          ""
        );
      },
    },
  ];

  const handleDelete = async (): Promise<void> => {
    // Don't proceed if no bundle selected
    if (!selectedBundle?.id) {
      toast.error("No bundle selected for deletion");
      return;
    }
    try {
      toast.success("Bundle deleted successfully");
      handleModalClose();
      // Refresh the list to show updated data
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleStatusChange = async () => {
    // Don't proceed if no bundle selected
    if (!selectedBundle?.id) {
      toast.error("No bundle selected for status change");
      return;
    }

    try {
      // TODO: Implement API call to update bundle status
      // For now just show success message
      toast.success("Bundle status updated successfully");
      handleModalClose();
      // Refresh the list to show updated data
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const getRowCanExpand = (row: IBundleItem) => {
    return row.subRows && row.subRows.length > 0;
  };

  return (
    <>
      <ListPageHeader
        name={"Create Bundle"}
        moduleName={"Bundle Master"}
        navigateUrl={`/admin/stores/${storeType}/${storeName}/bundle/create`}
      />

      <ReactTable
        DATA={bundleList}
        COLUMNS={COLUMNS}
        fetchData={getBundleListData}
        sortingOptions={sortingOptions}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        loading={isLoading}
        getRowCanExpand={getRowCanExpand}
        showFilter={false}
      />
      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          title="Delete Bundle"
          itemName="Bundle"
          onDelete={handleDelete}
        />
      )}

      {/* Active/Inactive Modal */}
      {isModalOpen.isOpen && isModalOpen.type === "activeInactive" && (
        <StatusChangeModel
          isOpen={true} // No need to check isOpen again since we already check in condition
          onClose={handleModalClose}
          onConfirm={handleStatusChange}
          currentRowData={{
            recStatus:
              selectedBundle?.recStatus === "A" ? "active" : "inactive",
            quantityName: "bundle",
            recordName: "bundle",
          }}
          title={`${selectedBundle?.recStatus === "A" ? "Inactive" : "Active"} Status`}
          message={`Are you sure you want to ${selectedBundle?.recStatus === "A" ? "inactive" : "active"} this bundle?`}
        />
      )}
    </>
  );
};

export default BundleListPage;
