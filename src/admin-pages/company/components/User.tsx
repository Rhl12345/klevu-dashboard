import React, { useState } from "react";

import ReactTable from "@/components/Table/ReactTable";
import { paginationDetails } from "@/utils/constants";
import Button from "@/components/Button/Button";

import { IUser, ModalState } from "@/types/company/company.type";
import { ITableColumn } from "@/components/Table/types";
import { getFormatDate } from "@/utils/date.util";
import TableActionPanel from "@/components/common/TableActionPanel";
import { PageRoutes } from "@/admin-pages/routes";
import { useRouter } from "next/navigation";
import DeleteModal from "@/components/Modal/DeleteModal";
import Image from "@/components/Image/Image";
import userData from "@/mock-data/user.json";

const User = () => {
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>(userData as unknown as IUser[]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<ModalState>({
    isOpen: false,
    type: null,
    selectedCompany: null,
  });

  const [filteringOptions, setColumnFilteringOptions] = useState<any[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sortingOptions, setSortingOptions] = useState<any[]>([]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: 1,
  });

  const USER_TABLE_COLUMNS: ITableColumn<IUser>[] = [
    {
      id: "customerName",
      accessorKey: "customerName",
      header: "Customer Name",
    },
    {
      id: "storeLogoUrl",
      accessorKey: "storeLogoUrl",
      header: "Store Logo",
      cell: (props) => {
        return (
          <div className="flex items-center w-20 h-20">
            <Image
              src={props.row.original.storeLogoUrl}
              alt={`${props.row.original.customerName} logo`}
              height={30}
              width={30}
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
      id: "isRegistered",
      accessorKey: "isRegistered",
      header: "Registered",
    },
    {
      id: "customerType",
      accessorKey: "customerType",
      header: "Customer Type",
    },
    {
      id: "email",
      accessorKey: "email",
      header: "CUSTOMER EMAIL ",
    },
    {
      id: "tags",
      accessorKey: "tags",
      header: "Tags ",
    },

    {
      id: "revenue",
      accessorKey: "revenue",
      header: "Revenue",
    },

    {
      id: "orders",
      accessorKey: "orders",
      header: "Orders",
    },
    {
      id: "sessions",
      accessorKey: "sessions",
      header: "Sessions",
    },
    {
      id: "lastActive",
      accessorKey: "lastActive",
      header: "Last Active",
      cell: ({ row }) => {
        return row?.original?.lastActive ? (
          <>
            <div>{getFormatDate(row?.original?.lastActive).date}</div>
            <div className=" text-xs">
              {getFormatDate(row?.original?.lastActive).time}
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
      cell: (props) => {
        const user = props.row.original;
        return (
          <TableActionPanel
            edit={{
              show: true,
              url: `${PageRoutes.CUSTOMER.EDIT}/${user.id}`,
            }}
            remove={{
              show: true,
              onClick: () => handleModalOpen("delete", user),
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
  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleModalOpen = (
    type: "delete" | "activeInactive" | "viewHistory",
    user: IUser
  ) => {
    setSelectedUser(user);
    setIsModalOpen({ isOpen: true, type, selectedCompany: null });
  };

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null, selectedCompany: null });
    setSelectedUser(null);
  };

  return (
    <>
      <div className="w-full lg:py-8 xl:px-8 py-4 px-4">
        <div className="border border-gray-light dark:border-gray-dark flex flex-col py-4 lg:py-6">
          <div className="flex flex-wrap justify-end space-x-2 px-4 lg:px-6 ">
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  router.push(PageRoutes.CUSTOMER.CREATE);
                }}
              >
                Add User
              </Button>
            </div>
          </div>

          <ReactTable
            DATA={users}
            COLUMNS={USER_TABLE_COLUMNS}
            fetchData={() => {}}
            sortingOptions={sortingOptions}
            pageIndex={paginationData.pageIndex}
            pageSize={paginationData.pageSize}
            setTablePageSize={(value) => {
              setPaginationDataFunc("pageSize", value);
            }}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            filteringOptions={filteringOptions}
            setColumnFilteringOptions={setColumnFilteringOptions}
            totalCount={users.length}
            hasPreviousPage={paginationData.hasPreviousPage}
            setSortingOptionHandler={setSortingOptionHandler}
            hasNextPage={paginationData.hasNextPage}
            displaySearch="left"
            isListPage={false}
          />

          <DeleteModal
            isOpen={isModalOpen.isOpen && isModalOpen.type === "delete"}
            onClose={handleModalClose}
            title="Delete"
            itemName="Vendor"
            onDelete={() => {}}
          />
        </div>
      </div>
    </>
  );
};

export default User;
