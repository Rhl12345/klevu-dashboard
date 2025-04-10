"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Status from "@/components/DisplayStatus/Status";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { paginationDetails } from "@/utils/constants";
import { ColumnFiltersState } from "@tanstack/react-table";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import { PageRoutes } from "@/admin-pages/routes";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusModal from "@/components/Modal/StatusModal";
import { data, statusValues } from "@/mock-data/userData";
import Clone from "@/admin-pages/user/components/Clone";
import { IUser } from "@/types/user/user.type";
import Image from "@/components/Image/Image";
import DateCell from "@/components/common/DateCell";

const List = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [cloneModal, setCloneModal] = useState(false);
  const [pagination, setPagination] = useState({ ...paginationDetails });
  const [filteringOptions, setColumnFilteringOptions] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<ColumnFiltersState[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "activeInactive" | null;
  }>({ isOpen: false, type: null });

  const moreFilterOption = useMemo(
    () => [
      {
        columnName: "recStatus",
        name: "Status",
        type: "radio",
        options: statusValues,
      },
    ],
    [statusValues]
  );

  // Modal handling functions
  const handleModalOpen = (type: "delete" | "activeInactive", user: IUser) => {
    setSelectedUser(user);
    setIsModalOpen({ isOpen: true, type });
  };

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedUser(null);
  };

  const columns: ITableColumn<IUser>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => {
        const value = row?.original?.name;
        return (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10">
              <Image
                src={row?.original?.image}
                alt={`${row?.original?.image}'s avatar`}
                height={10}
                width={10}
                aspectRatio="landscape"
                objectFit="contain"
                rounded="sm"
                variant="next"
              />
            </div>

            <div className="flex flex-col">
              <Link
                href={`${PageRoutes.PROFILE.MY_ACCOUNT}/${row?.original?.id}`}
              >
                <div className="text-sm font-semibold">{value}</div>
                <div className="text-xs">{row.original.email || "-"}</div>
              </Link>
            </div>
          </div>
        );
      },
    },
    {
      id: "role",
      header: "Role",
      accessorKey: "role",
      cell: ({ row }) => {
        const value = row?.original?.role;
        return value ?? "";
      },
    },
    {
      id: "lastLoginTime",
      header: "Last Login Time",
      accessorKey: "lastLoginTime",
      cell: ({ getValue }) => <DateCell date={getValue()} />,
    },
    {
      id: "createdDate",
      header: "Create date",
      accessorKey: "createdDate",
      cell: ({ getValue }) => <DateCell date={getValue()} />,
    },
    {
      id: "createdBy",
      header: "Created By",
      accessorKey: "createdName",
    },
    {
      id: "updatedDate",
      header: "UPDATED date",
      accessorKey: "modifiedDate",
      cell: ({ getValue }) => <DateCell date={getValue()} />,
    },
    {
      id: "updatedBy",
      header: "Updated By",
      accessorKey: "modifiedName",
    },

    {
      id: "recStatus",
      accessorKey: "recStatus",
      header: "Status",
      cell: ({ getValue }: { getValue: () => string }) => {
        const value = getValue();
        return value !== undefined ? <Status type={value} /> : "";
      },
    },

    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <TableActionPanel
            edit={{
              show: true,
              url: `${PageRoutes.PROFILE.MY_ACCOUNT}/${row?.original?.id}`,
            }}
            remove={{
              show: true,
              onClick: () => handleModalOpen("delete", user),
            }}
            status={{
              show: true,
              status: user?.recStatus === "A" ? "active" : "inactive",
              onClick: () => handleModalOpen("activeInactive", user),
            }}
            clone={{
              show: true,
              onClick: () => handleCloneClick(user),
            }}
          />
        );
      },
    },
  ];

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

  const handleCloneClick = (user: IUser) => {
    setSelectedUser(user);
    setCloneModal(true);
  };

  return (
    <>
      <ListPageHeader
        name={"Add Users"}
        moduleName={"Users"}
        navigateUrl={PageRoutes.USERS.CREATE}
      />
      <ReactTable
        COLUMNS={columns}
        DATA={data}
        checkboxSelection
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
        totalCount={data.length}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
        moreFilterOption={moreFilterOption}
        showEditColumns={false}
      />

      {cloneModal && (
        <Clone
          isOpen={cloneModal}
          onClose={() => {
            setCloneModal(false);
            setSelectedUser(null);
          }}
          data={selectedUser}
          userId={selectedUser?.id}
        />
      )}

      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          title="Delete"
          itemName="User"
          onDelete={() => {}}
        />
      )}

      {isModalOpen.isOpen && isModalOpen.type === "activeInactive" && (
        <StatusModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          onConfirm={() => {}}
          currentRowData={selectedUser}
          title="Change Status"
          message="Do you want to change the status of this user?"
        />
      )}
    </>
  );
};

export default List;
