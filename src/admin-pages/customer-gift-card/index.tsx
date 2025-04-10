"use client";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import { moreFilterOption } from "@/mock-data/sizeMaster";
import { ICustomeGiftCard } from "@/types/gift-card/giftCard.type";
import { paginationDetails } from "@/utils/constants";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import Dropdown from "@/components/DropDown/DropDown";
import { storeOptions } from "@/utils/Dummy";
import EditGiftCardModal from "@/admin-pages/customer-gift-card/components/EditGiftCard";
import { getGiftCards } from "@/services/gift-card/giftCard.service";
import { IDropdownOption } from "@/types/common/common.type";
import { toast } from "react-toastify";
import { getFormatDate } from "@/utils/date.util";
import ReactTable from "@/components/Table/ReactTable";
import TableActionPanel from "@/components/common/TableActionPanel";
import Button from "@/components/Button/Button";

const CustomerGiftCardList = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [giftCardList, setGiftCardList] = useState<ICustomeGiftCard[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>(
    storeOptions[0].value
  );
  const [editGiftCardModal, setEditGiftCardModal] = useState(false);
  const [editGiftCard, setEditGiftCard] = useState<ICustomeGiftCard | null>(
    null
  );
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

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnFilteringOptions, setColumnFilteringOptions] = useState<any[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const updatePaginationData = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleEditGiftCard = (giftCard: ICustomeGiftCard) => {
    setEditGiftCardModal(true);
    setEditGiftCard(giftCard);
  };

  const COLUMNS = [
    {
      id: "customerName",
      accessorKey: "customerName",
      header: "Customer Name",
      cell: (props: any) => {
        return (
          <Button
            variant="default"
            size="md"
            className="!font-normal"
            onClick={() => handleEditGiftCard(props.row.original)}
          >
            {props.row.original.customerName}
          </Button>
        );
      },
    },
    {
      id: "emailTo",
      accessorKey: "emailTo",
      header: "Email To",
    },
    {
      id: "serialNumber",
      accessorKey: "serialNumber",
      header: "Serial Number",
    },
    {
      id: "orderNumber",
      accessorKey: "orderNumber",
      header: "Order Number",
    },
    {
      id: "initialAmount",
      accessorKey: "initialAmount",
      header: "Initial Amount",
    },
    {
      id: "balance",
      accessorKey: "balance",
      header: "Available Balance",
    },
    {
      id: "createdDate",
      accessorKey: "createdDate",
      header: "Created Date",
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
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: (props: any) => {
        const giftCard = props.row.original;
        return (
          <TableActionPanel
            collapsible={false}
            edit={{
              show: true,
              onClick: () => handleEditGiftCard(giftCard),
            }}
          />
        );
      },
    },
  ];

  const fetchGiftCardList = useCallback(
    async (pageIndex = 1): Promise<void> => {
      setIsLoading(true);
      try {
        const result = await getGiftCards({
          pageIndex,
          pageSize: paginationData.pageSize,
          selectedStore,
        });

        if (result.items.length === 0) {
          toast.info("No gift cards found");
        }

        setGiftCardList(result.items);
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
        const errorMessage =
          "Failed to fetch gift card list. Please try again.";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [paginationData.pageSize, selectedStore]
  );

  const handleStoreSelect = (value: IDropdownOption) => {
    setSelectedStore(value.value);
    toast.info(`Filtering gift cards for ${value.label}`);
    // Add your filter logic here
  };

  const handleClose = () => {
    setEditGiftCardModal(false);
  };

  const handleSortingOptionChange = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  return (
    <>
      <ListPageHeader
        name={"Customer Gift Card"}
        moduleName={"Customer Gift Card"}
      >
        <Dropdown
          className="w-60"
          options={storeOptions}
          value={storeOptions.find((option) => option.value === selectedStore)}
          placeholder="All Stores"
          onChange={(newValue) =>
            handleStoreSelect(newValue as IDropdownOption)
          }
        />
      </ListPageHeader>

      <ReactTable
        DATA={giftCardList}
        COLUMNS={COLUMNS}
        fetchData={fetchGiftCardList}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={handleSortingOptionChange}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          updatePaginationData("pageSize", value);
        }}
        filteringOptions={columnFilteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        checkboxSelection
        showEditColumns
        showFilter={false}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={moreFilterOption}
        loading={isLoading}
      />

      {editGiftCardModal && (
        <EditGiftCardModal
          editGiftCard={editGiftCard as ICustomeGiftCard}
          setGiftCardList={setGiftCardList}
          selectedStore={selectedStore}
          isOpen={editGiftCardModal}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default CustomerGiftCardList;
