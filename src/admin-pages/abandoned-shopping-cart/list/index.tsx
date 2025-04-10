"use client";
import React, { useState, useMemo, useEffect } from "react";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { CURRENCY_SYMBOLS_BY_CODE, paginationDetails } from "@/utils/constants";
import { ColumnFiltersState } from "@tanstack/react-table";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Image from "@/components/Image/Image";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import { IReportsStore } from "@/types/reports/reports";
import ReportsData from "@/mock-data/reports.json";
import AbandonedShoppingCartData from "@/mock-data/abandonedShoppingCart.json";
import {
  IAbandonedCart,
  IFilterOption,
} from "@/types/abandoned-shopping-cart/abandonedShoppingCart.type";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import ViewAbandonedShoppingCart from "@/admin-pages/abandoned-shopping-cart/components/ViewAbandonedShoppingCart";
import EmailAbandonedShoppingModel from "@/admin-pages/abandoned-shopping-cart/components/EmailAbandonedShoppingModel";
import DateCell from "@/components/common/DateCell";

const AbandonedShoppingCartList = () => {
  const [store, setStore] = useState<IReportsStore>({ label: "", value: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ ...paginationDetails });
  const [filteringOptions, setColumnFilteringOptions] = useState<
    IFilterOption[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<ColumnFiltersState[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [selectedCart, setSelectedCart] = useState<IAbandonedCart | null>(null);
  const storeData = useMemo<IReportsStore[]>(() => ReportsData.storeData, []);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Add API integration
  const fetchProductData = async (storeId: string) => {
    try {
      // API call
      setIsLoading(true);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleStoreChange = (newStore: unknown) => {
    const isReportsStore = (value: unknown): value is IReportsStore => {
      return (
        typeof value === "object" &&
        value !== null &&
        "label" in value &&
        "value" in value
      );
    };
    if (isReportsStore(newStore)) {
      setStore({
        label: newStore.label,
        value: newStore.value,
      });
      fetchProductData(newStore.value);
    } else {
      setStore({ label: "", value: "" });
    }
  };

  const handleViewCart = (cart: IAbandonedCart) => {
    setSelectedCart(cart);
    setIsModalOpen(true);
  };
  const handleEmailCart = () => {
    setIsEmailModalOpen(true);
  };

  const columns: ITableColumn<IAbandonedCart>[] = [
    {
      id: "storeLogoUrl",
      header: "Store Image",
      accessorKey: "storeLogoUrl",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className="w-16 h-16">
            <Image
              src={row.original.storeLogoUrl}
              alt={`${row.original.storeLogoUrl}'s avatar`}
              height={10}
              width={10}
              aspectRatio="landscape"
              objectFit="contain"
              rounded="sm"
              variant="next"
            />
          </div>
        );
      },
    },
    {
      id: "storeName",
      header: "Store Name",
      accessorKey: "storeName",
    },
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
    },
    {
      id: "customerId",
      header: "Customer Id",
      accessorKey: "customerId",
    },
    {
      id: "shoppingCartId",
      header: "ShoppingCart Id",
      accessorKey: "shoppingCartId",
    },
    {
      id: "subTotal",
      header: `Order Total (${CURRENCY_SYMBOLS_BY_CODE.USD})`,
      accessorKey: "subTotal",
    },
    {
      id: "createdDate",
      header: "Create On",
      accessorKey: "createdDate",
      cell: ({ getValue }) => <DateCell date={getValue()} />,
    },
    {
      id: "viewCart",
      header: "View Cart",
      accessorKey: "viewCart",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <Button
            variant="default"
            onClick={() => handleViewCart(row.original)}
          >
            <SvgIcon name="EyeOpen" />
          </Button>
        );
      },
    },
    {
      id: "sendMail",
      header: "Send Mail",
      accessorKey: "sendMail",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <Button variant="default" onClick={() => handleEmailCart()}>
            <SvgIcon name="mail-01" height={20} width={20} />
          </Button>
        );
      },
    },
  ];

  const moreFilterOption = useMemo(
    () => [
      {
        columnName: "createdDate",
        name: "Created On",
        type: "date",
        options: [],
      },
    ],
    []
  );

  const setPaginationDataFunc = (
    key: keyof typeof paginationDetails,
    value: number
  ) => {
    setPagination((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getStoreList = async (pageIndex = 1) => {
    // No API call needed - data is already set
    return;
  };

  useEffect(() => {
    if (storeData.length > 0) {
      handleStoreChange(storeData[0] as IReportsStore);
    }
  }, [storeData]);

  return (
    <>
      <ListPageHeader
        name="Abandoned Shopping Cart"
        moduleName="Abandoned Shopping Cart"
      >
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            toast.success("Exported successfully");
          }}
          disabled={isloading}
        >
          Export
        </Button>
        <Dropdown
          options={storeData}
          onChange={handleStoreChange}
          defaultInputValue={store?.value}
          className="lg:w-48"
        />
      </ListPageHeader>
      <ReactTable
        COLUMNS={columns}
        DATA={AbandonedShoppingCartData.abandonedCarts}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        fetchData={getStoreList}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        setSelectedRows={setSelectedRows}
        setGlobalFilter={setGlobalFilter}
        selectedRows={selectedRows}
        globalFilter={globalFilter}
        totalCount={AbandonedShoppingCartData.abandonedCarts.length}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
        moreFilterOption={moreFilterOption}
      />
      <ViewAbandonedShoppingCart
        selectedCart={selectedCart}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
      <EmailAbandonedShoppingModel
        isEmailModalOpen={isEmailModalOpen}
        setIsEmailModalOpen={setIsEmailModalOpen}
      />
    </>
  );
};

export default AbandonedShoppingCartList;
