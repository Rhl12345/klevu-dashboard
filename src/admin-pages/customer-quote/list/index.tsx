"use client";

import { PageRoutes } from "@/admin-pages/routes";
import Button from "@/components/Button/Button";
import TableActionPanel from "@/components/common/TableActionPanel";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import Dropdown from "@/components/DropDown/DropDown";
import DeleteModal from "@/components/Modal/DeleteModal";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { CUSTOMER_QUOTE_LIST } from "@/mock-data/customerQuoteList";
import { getFormatDate } from "@/utils/date.util";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const CustomerQuoteList = () => {
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState("");
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    quoteId: string | null;
  }>({ isOpen: false, quoteId: null });

  const handleDelete = () => {
    // Add your delete logic here
    setDeleteModalState({ isOpen: false, quoteId: null });
  };

  const COLUMNS: ITableColumn[] = [
    {
      id: "quoteNumber",
      accessorKey: "quoteNumber",
      header: "Quote Number",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="cursor-pointer">
          <Link
            href={`${PageRoutes.CUSTOMER.QUOTE_EDIT}/${row.original.quoteNumber}`}
          >
            {row.original.quoteNumber}
          </Link>
        </div>
      ),
      enableSorting: true,
    },
    {
      id: "customerName",
      accessorKey: "firstName",
      header: "Customer Name",
      cell: (info: any) => (
        <div>
          <Link
            href={`${PageRoutes.CUSTOMER.QUOTE_VIEW}/${info.row.original.quoteNumber}`}
          >
            {`${info.row.original.firstName}
              ${info.row.original.lastName}`}
          </Link>
        </div>
      ),
      enableSorting: true,
    },
    {
      id: "email",
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
    },
    {
      id: "createdOn",
      accessorKey: "createdOn",
      header: "Created On",
      cell: ({ getValue }) => {
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
      enableSorting: true,
    },
    {
      id: "isFulfilled",
      accessorKey: "isFulfilled",
      header: "Is Fulfilled",
      cell: (info: any) => info.getValue() || "-",
      enableSorting: true,
    },
    {
      id: "recStatus",
      header: "Status",
      accessorKey: "recStatus",
      cell: (props) => {
        if (props.getValue() !== undefined) {
          return <Status type={props.getValue() === "Pending" ? "P" : "C"} />;
        } else {
          return null;
        }
      },
      enableSorting: true,
    },
    {
      id: "actions",
      accessorKey: "id",
      header: "Action",
      enableSorting: false,
      cell: (info: any) => (
        <TableActionPanel
          edit={{
            show: true,
            url: `${PageRoutes.CUSTOMER.QUOTE_EDIT}/${info.getValue()}`,
          }}
          clone={{
            show: true,
            onClick: () => {
              toast.success("Cloned successfully");
            },
          }}
          remove={{
            show: true,
            onClick: () => {
              setDeleteModalState({ isOpen: true, quoteId: info.getValue() });
            },
          }}
          extraAction={
            <Button
              variant="default"
              size="sm"
              className="!px-3 !py-2"
              icon={<SvgIcon name="EyeOpen" width={24} height={24} />}
              onClick={() => {
                router.push(
                  `${PageRoutes.CUSTOMER.QUOTE_VIEW}/${info.row.original.quoteNumber}`
                );
              }}
            >
              View
            </Button>
          }
        />
      ),
    },
  ];

  return (
    <>
      <ListPageHeader
        name="customerQuoteList"
        moduleName="Customer Quote"
        navigateUrl=""
      >
        <div className="flex space-x-4">
          <Dropdown
            options={[{ label: "Usaa Punchout", value: "usaa_punchout" }]}
            defaultValue="usaa_punchout"
          />
          <Button
            onClick={() => router.push(`${PageRoutes.CUSTOMER.QUOTE_CREATE}`)}
            variant="primary"
          >
            Add Customer Quote
          </Button>
        </div>
      </ListPageHeader>

      <ReactTable
        COLUMNS={COLUMNS}
        DATA={CUSTOMER_QUOTE_LIST}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        showEditColumns={true}
        showFilter={true}
        displaySearch="left"
        totalCount={3}
        pageSize={25}
        pageIndex={1}
        hasNextPage={false}
        hasPreviousPage={false}
      />

      <DeleteModal
        isOpen={deleteModalState.isOpen}
        onClose={() => setDeleteModalState({ isOpen: false, quoteId: null })}
        onDelete={handleDelete}
        title="Delete Customer Quote"
        itemName="customer quote"
      />
    </>
  );
};

export default CustomerQuoteList;
