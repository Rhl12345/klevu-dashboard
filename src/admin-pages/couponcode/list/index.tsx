"use client";
import { PageRoutes } from "@/admin-pages/routes";
import TableActionPanel from "@/components/common/TableActionPanel";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import Dropdown from "@/components/DropDown/DropDown";
import MyTabs from "@/components/Tab/Tab";
import ReactTable from "@/components/Table/ReactTable";
import {
  moreFilterOption,
  popUpTableData,
  tabOptions,
} from "@/mock-data/couponCode";
import { ICouponCodeList } from "@/types/promotions/promotions.type";
import { paginationDetails } from "@/utils/constants";
import { DUMMY_VIEW_HISTORY_DATA, storeOptions } from "@/utils/Dummy";
import Link from "next/link";
import { useCallback, useState } from "react";
import { CouponCodeService } from "@/services/couponcode/couponcode.service";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import ViewHistoryModal from "@/components/Modal/ViewHistoryModal";
import { getFormatDate } from "@/utils/date.util";
import CuponCodeListViewModal from "@/admin-pages/couponcode/components/CuponCodeListViewModal";
import Button from "@/components/Button/Button";
import SvgIcon from "@/components/SvgIcons/SvgIcon";

const CouponCodeList = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "discountName",
      direction: 0,
      priority: 0,
    },
  ]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  const [filteringOptions, setColumnFilteringOptions] = useState<any[]>([]);
  const [couponList, setCouponList] = useState<ICouponCodeList[]>([]);
  const [deleteConformationError, setDeleteConformationError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [selectedCouponCode, setSelectedCouponCode] =
    useState<ICouponCodeList | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "activeInactive" | "viewHistory" | null;
  }>({ isOpen: false, type: null });
  // Add new state for store filter
  const [selectedStore, setSelectedStore] = useState<string>(
    storeOptions[0].value
  );
  // Add tab state
  const [activeTab, setActiveTab] = useState<number>(0);
  // Define tab status mapping
  const tabStatusMap: { [key: string]: string } = {
    all: "",
    active: "active",
    scheduled: "scheduled",
    expired: "expired",
    inactive: "inactive",
  };

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleModalOpen = (
    type: "delete" | "activeInactive" | "viewHistory",
    couponCode: ICouponCodeList
  ) => {
    setSelectedCouponCode(couponCode);
    setIsModalOpen({ isOpen: true, type });
  };

  const COLUMNS = [
    {
      id: "name",
      accessorKey: "name",
      header: "Discount Name",
      cell: (props: { row: { original: ICouponCodeList } }) => (
        <Link
          href={`/admin/promotions/couponcode/edit/${props.row.original.id}`}
        >
          {props.row.original.name}
        </Link>
      ),
    },
    {
      id: "storeName",
      accessorKey: "storeName",
      header: "Store",
    },
    {
      id: "discountCode",
      accessorKey: "discountCode",
      header: "Discount Code",
    },
    {
      id: "couponUsedCount",
      accessorKey: "couponUsedCount",
      header: "Users",
    },
    {
      id: "createdName",
      accessorKey: "createdName",
      header: "Created By",
    },
    {
      id: "modifiedDate",
      accessorKey: "modifiedDate",
      header: "Updated Date",
      filterFn: "customDateFilter",
      cell: ({ getValue }: { getValue: () => string | null }) => {
        return getValue() ? (
          <>
            <div>{getFormatDate(getValue()).date} </div>
            <div className="text-xs font-normal">
              {getFormatDate(getValue()).time}
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "modifiedName",
      accessorKey: "modifiedName",
      header: "Updated By",
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: (props: { row: { original: ICouponCodeList } }) => {
        return props.row.original.status ? (
          <Status type={props.row.original.status} />
        ) : (
          ""
        );
      },
    },
    {
      header: "view Orders",
      id: "viewOrders",
      accessorKey: "viewOrders",
      enableSorting: false,
      cell: () => (
        <Button
          className="underline"
          variant="default"
          size="md"
          onClick={() => {
            setShowModal(true);
          }}
        >
          View Orders
        </Button>
      ),
    },
    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: (props: any) => {
        const couponCode = props.row.original;
        return (
          <TableActionPanel
            edit={{
              show: true,
              url: `${PageRoutes.COUPON_CODE.EDIT}${couponCode.id}`,
            }}
            remove={{
              show: true,
              onClick: () => handleModalOpen("delete", couponCode),
            }}
            status={{
              show: true,
              status: couponCode.recStatus,
              onClick: () => handleModalOpen("activeInactive", couponCode),
            }}
            viewHistory={{
              show: true,
              onClick: () => handleModalOpen("viewHistory", couponCode),
            }}
          />
        );
      },
    },
  ];

  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  const getCouponCodeList = useCallback(
    async (
      pageIndex = 1,
      status: string = tabOptions[activeTab].label
    ): Promise<void> => {
      try {
        const response = await CouponCodeService.getCouponCodeList({
          pageIndex,
          pageSize: paginationData.pageSize,
          sortingOptions,
          filteringOptions,
          status: status !== "all" ? tabStatusMap[status] : undefined,
          store: selectedStore || undefined,
        });

        setCouponList(response.items);
        setPaginationData((prevState) => ({
          ...prevState,
          pageIndex: response.pageIndex,
          pageSize: response.pageSize,
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          hasPreviousPage: response.hasPreviousPage,
          hasNextPage: response.hasNextPage,
        }));
      } catch (error) {
        console.error("Error fetching coupon code list:", error);
      }
    },
    [
      paginationData.pageSize,
      tabOptions[activeTab].label,
      selectedStore,
      sortingOptions,
      filteringOptions,
    ]
  );

  const handleStoreChange = (value: any) => {
    setSelectedStore(value);
  };

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedCouponCode(null);
  };

  const handleStatusChange = async () => {
    try {
      if (selectedCouponCode) {
        const newStatus = selectedCouponCode.recStatus === "A" ? "I" : "A";
        await CouponCodeService.updateStatus(selectedCouponCode.id, newStatus);
        getCouponCodeList(
          paginationData.pageIndex,
          tabOptions[activeTab].label
        );
      }
      handleModalClose();
    } catch (error) {
      console.error("Error updating coupon code status:", error);
    }
  };

  const handleDeleteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteInput(e.target.value);
  };

  const handleDelete = async () => {
    try {
      if (deleteInput !== "delete") {
        setDeleteConformationError(
          "Please type 'delete' to verify that you want to delete this record."
        );
        return;
      }
      if (selectedCouponCode) {
        await CouponCodeService.deleteCouponCode(selectedCouponCode.id);
        getCouponCodeList(
          paginationData.pageIndex,
          tabOptions[activeTab].label
        );
      }
      handleModalClose();
    } catch (error) {
      console.error("Error deleting coupon code:", error);
    }
  };

  const onTabClick = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
      getCouponCodeList(1, tabOptions[index].label);
    }
  };

  return (
    <>
      <ListPageHeader
        name={"Add Coupon Code"}
        moduleName={"Coupon Code"}
        navigateUrl={PageRoutes.COUPON_CODE.CREATE}
      >
        <Dropdown
          className="w-60"
          options={storeOptions}
          value={storeOptions.find((option) => option.value === selectedStore)}
          placeholder="All Stores"
          onChange={handleStoreChange}
        />
      </ListPageHeader>

      <MyTabs
        options={tabOptions}
        activeTab={activeTab}
        onTabClick={onTabClick}
      />

      <ReactTable
        DATA={couponList}
        COLUMNS={COLUMNS}
        fetchData={(pageIndex: number) =>
          getCouponCodeList(pageIndex, tabOptions[activeTab].label)
        }
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
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={moreFilterOption}
      />

      {/* Delete Modal */}
      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          title="Delete"
          itemName="Category"
          onDelete={handleDelete}
        />
      )}

      {/* Active/Inactive Modal */}
      {isModalOpen.isOpen && isModalOpen.type === "activeInactive" && (
        <StatusChangeModel
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          onConfirm={handleStatusChange}
          currentRowData={{
            recStatus:
              selectedCouponCode?.recStatus === "A" ? "active" : "inactive",
            quantityName: "category",
            recordName: "category",
          }}
          title="Change Status"
          message="Do you want to change the status of this category ?"
        />
      )}
      <CuponCodeListViewModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalInformation={popUpTableData}
      />
      {/* View History Modal */}
      {isModalOpen.isOpen && isModalOpen.type === "viewHistory" && (
        <ViewHistoryModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          historyData={DUMMY_VIEW_HISTORY_DATA}
          recordName={selectedCouponCode?.name || ""}
        />
      )}
    </>
  );
};

export default CouponCodeList;
