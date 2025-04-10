"use client";
import { useCallback, useMemo, useState } from "react";
import { PageRoutes } from "@/admin-pages/routes";
import TableActionPanel from "@/components/common/TableActionPanel";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import Image from "@/components/Image/Image";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import ReactTable from "@/components/Table/ReactTable";
import { IFilterOption, ITableColumn } from "@/components/Table/types";
import { IBrandList, IModalState } from "@/types/brand/brand.types";
import { paginationDetails, RecStatusValuebyName } from "@/utils/constants";
import Link from "next/link";

import brandsData from "@/mock-data/BrandData.json";
import commonListData from "@/mock-data/CommonListData.json";
import { getFormatDate } from "@/utils/date.util";
import { IDropdownOption } from "@/types/common/common.type";
import { ISortingOption } from "@/types/size-chart/sizeChart.type";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/common/Loader";
import { getErrorMessage } from "@/utils/common.util";
import ViewHistoryModal from "@/components/Modal/ViewHistoryModal";
import { DUMMY_VIEW_HISTORY_DATA } from "@/utils/Dummy";

const BrandListPage = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [brandList, setBrandList] = useState<IBrandList[]>([]);
  const [vendorOptions, setVendorOptions] = useState<IDropdownOption[]>(
    commonListData.vendorOptions
  );
  const [sortingOptions, setSortingOptions] = useState<ISortingOption[]>([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<IModalState>({
    isOpen: false,
    type: null,
  });
  const [selectedBrand, setSelectedBrand] = useState<IBrandList | null>(null);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: 2,
  });

  const [filteringOptions, setColumnFilteringOptions] = useState<
    IFilterOption[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const moreFilterOption = useMemo(
    () => [
      {
        columnName: "vendorName",
        name: "Name",
        type: "checkbox",
        options: vendorOptions,
      },
      {
        columnName: "createddate",
        name: "Created Date",
        type: "date",
        options: null,
      },
      {
        columnName: "modifieddate",
        name: "Updated Date",
        type: "date",
        options: null,
      },
      {
        columnName: "createdby",
        name: "Created By",
        type: "checkbox",
        options: commonListData.userNameValues,
        conditionalSearch: true,
      },
      {
        columnName: "modifiedby",
        name: "Updated By",
        type: "checkbox",
        options: commonListData.userNameValues,
        conditionalSearch: true,
      },
    ],
    [vendorOptions]
  );

  const BRAND_COLUMNS: ITableColumn<IBrandList>[] = useMemo(
    () => [
      {
        id: "bandWLogoUrl",
        accessorKey: "bandWLogoUrl",
        header: "Image",
        enableSorting: false,
        cell: ({ row }) => (
          <>
            <Link href={`${PageRoutes.BRAND.EDIT}${row.original.id}`}>
              <div className="flex items-center" style={{ width: "100px" }}>
                <div className="h-24 w-40 p-2 flex justify-center items-center border border-gray-light dark:border-gray-dark">
                  <div className="flex justify-center items-center h-16">
                    <Image
                      src={
                        row?.original?.bandWLogoUrl
                          ? `https://redefinecommerce.blob.core.windows.net${row?.original?.bandWLogoUrl}`
                          : "/noImage.png"
                      }
                      alt="No Image"
                      className="max-h-16"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </>
        ),
      },
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <>
            <Link href={`${PageRoutes.BRAND.EDIT}${row.original.id}`}>
              <div>{row.original.name}</div>
            </Link>
          </>
        ),
      },
      {
        id: "productCount",
        accessorKey: "productCount",
        header: "# Of Products",
      },
      {
        id: "vendorName",
        accessorKey: "vendorName",
        header: "Vendors",
        cell: ({ row }) => (
          <>
            <div className="flex flex-wrap gap-1">
              {row?.original?.vendorName?.map((name: any, index: any) => {
                return name ? <div key={index}>{name}</div> : "";
              })}
            </div>
          </>
        ),
      },
      {
        id: "createdDate",
        accessorKey: "createdDate",
        header: "Created Date",
        filterFn: "customDateFilter",
        cell: ({ row }) => {
          const { date, time } = getFormatDate(row?.original?.createdDate);
          return date ? (
            <>
              <div>{date}</div>
              <div className="text-xs font-normal">{time}</div>
            </>
          ) : (
            ""
          );
        },
      },
      { id: "createdName", accessorKey: "createdName", header: "Created By" },
      {
        id: "modifiedDate",
        accessorKey: "modifiedDate",
        header: "Updated Date",
        filterFn: "customDateFilter",
        cell: ({ row }) => {
          const { date, time } = getFormatDate(row?.original?.modifiedDate);
          return date ? (
            <>
              <div>{date}</div>
              <div className="text-xs font-normal">{time}</div>
            </>
          ) : (
            ""
          );
        },
      },
      { id: "modifiedName", accessorKey: "modifiedName", header: "Updated By" },
      {
        id: "recStatus",
        accessorKey: "recStatus",
        header: "Status",
        filterFn: "arrIncludesSome",
        cell: ({ row }) => {
          const recStatus = row.original.recStatus;
          if (!recStatus) return null;
          return <Status type={recStatus} />;
        },
      },
      {
        id: "action",
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
          const currantBrand = row.original;
          return (
            <TableActionPanel
              edit={{
                show: true,
                url: `${PageRoutes.BRAND.EDIT}${currantBrand.id}`,
              }}
              remove={{
                show: true,
                onClick: () => handleModalOpen("delete", currantBrand),
              }}
              status={{
                show: true,
                status:
                  currantBrand.recStatus === RecStatusValuebyName.Active
                    ? "active"
                    : "inactive",
                onClick: () => handleModalOpen("activeInactive", currantBrand),
              }}
              viewHistory={{
                show: true,
                onClick: () => handleModalOpen("viewHistory", currantBrand),
              }}
            />
          );
        },
      },
    ],
    []
  );

  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  const getBrandList = useCallback(async () => {
    try {
      setIsLoading(true);
      // ... existing getBrandList logic ...
      setBrandList(brandsData.brandListData as IBrandList[]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [paginationData, filteringOptions, sortingOptions]);

  // Modal handling functions
  const handleModalOpen = (type: IModalState["type"], brand: IBrandList) => {
    setSelectedBrand(brand);
    setIsModalOpen({ isOpen: true, type });
  };

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedBrand(null);
  };

  const deleteBrand = async (brand: IBrandList) => {
    try {
      setIsLoading(true);
      // ... existing delete logic ...
      toast.success("Brand deleted successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      handleModalClose();
    }
  };

  const handleStatusChange = async (brand: IBrandList): Promise<void> => {
    try {
      setIsLoading(true);
      // ... existing status change logic ...
      toast.success("Brand status updated successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      handleModalClose();
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <ListPageHeader
        name="Add Brand Master"
        moduleName="Brand Master"
        navigateUrl={PageRoutes.BRAND.CREATE}
      />

      <ReactTable
        DATA={brandList}
        COLUMNS={BRAND_COLUMNS}
        fetchData={getBrandList}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        checkboxSelection
        showEditColumns
        showFilter
        showMoreFilters
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={moreFilterOption}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "delete"}
        onClose={handleModalClose}
        onDelete={() => deleteBrand(selectedBrand as IBrandList)}
        title="Delete"
        itemName="Brand"
      />

      {/* Status Change Modal */}
      <StatusChangeModel
        isOpen={isModalOpen.isOpen && isModalOpen.type === "activeInactive"}
        onClose={handleModalClose}
        onConfirm={() => handleStatusChange(selectedBrand as IBrandList)}
        currentRowData={{
          recStatus:
            selectedBrand?.recStatus === RecStatusValuebyName.Active
              ? "active"
              : "inactive",
          quantityName: "brand",
          recordName: "brand",
        }}
        title={`${selectedBrand?.recStatus === RecStatusValuebyName.Active ? "Inactive" : "Active"} Status`}
        message={`Are you sure you want to ${selectedBrand?.recStatus === RecStatusValuebyName.Active ? "inactive" : "active"} this brand?`}
      />

      {/* View History Modal */}
      <ViewHistoryModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "viewHistory"}
        onClose={handleModalClose}
        historyData={DUMMY_VIEW_HISTORY_DATA}
        recordName={selectedBrand?.name || ""}
      />
    </>
  );
};

export default BrandListPage;
