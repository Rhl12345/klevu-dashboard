"use client";
import { PageRoutes } from "@/admin-pages/routes";
import Button from "@/components/Button/Button";
import ListPageLayout from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { paginationDetails, RecStatusValuebyName } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";
import Link from "next/link";
import { useCallback, useState } from "react";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusModal from "@/components/Modal/StatusModal";
import role from "@/mock-data/role.json";
import { IRoleData } from "@/types/role/role.type";
const RolesListPage = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "activeInactive" | "createModal" | "clone" | null;
  }>({ isOpen: false, type: null });
  const [roleList, setRoleList] = useState<IRoleData[]>([]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: role.data.length,
  });

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const getroleList = useCallback(async () => {
    // API call implementation
    setRoleList(role.data as IRoleData[]);
  }, []);

  const COLUMNS: ITableColumn<IRoleData>[] = [
    {
      id: "roleName",
      accessorKey: "roleName",

      cell: (props) => (
        <>
          <Link href={`${PageRoutes.ROLES.EDIT}/25`}>
            <div className="whitespace-pre">{props.getValue()}</div>
          </Link>
        </>
      ),
    },
    {
      id: "createdDate",
      accessorKey: "createdDate",
      header: "CREATED DATE",
      cell: ({ row }) => {
        return row?.original?.createdDate ? (
          <>
            <div>{getFormatDate(row?.original?.createdDate)?.date} </div>
            <div className="text-xs font-normal">
              {getFormatDate(row?.original?.createdDate)?.time}
            </div>
          </>
        ) : null;
      },
    },
    { id: "createdBy", accessorKey: "createdBy", header: "CREATED BY" },
    { id: "updatedBy", accessorKey: "updatedBy", header: "UPDATED BY" },
    {
      id: "updatedDate",
      accessorKey: "updatedDate",
      header: "UPDATED DATE",
      cell: ({ row }) => {
        return row?.original?.updatedDate ? (
          <>
            <div>{getFormatDate(row?.original?.updatedDate)?.date} </div>
            <div className=" text-xs font-normal">
              {getFormatDate(row?.original?.updatedDate)?.time}
            </div>
          </>
        ) : null;
      },
    },

    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      filterFn: "arrIncludesSome",
      cell: (props: { getValue: () => string | null }) => (
        <Status
          type={
            props.getValue() === "A"
              ? RecStatusValuebyName.Active
              : RecStatusValuebyName.Inactive
          }
        />
      ),
    },
    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: (props) => {
        const RolesList = props.row.original;
        return (
          <>
            <TableActionPanel
              edit={{
                show: true,
                url: `${PageRoutes.ROLES.EDIT}25`,
              }}
              remove={{
                show: true,
                onClick: () => handleModalOpen("delete"),
              }}
              status={{
                show: true,
                status: RolesList.status === "A" ? "active" : "inactive",
                onClick: () => handleModalOpen("activeInactive"),
              }}
              clone={{
                show: true,
                onClick: () => handleModalOpen("clone"),
              }}
            />
          </>
        );
      },
    },
  ];

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
  };
  const handleModalOpen = (
    type: "delete" | "activeInactive" | "createModal" | "clone"
  ) => {
    setIsModalOpen({ isOpen: true, type });
  };
  return (
    <>
      <ListPageLayout
        name="Add Roles"
        moduleName="Roles"
        navigateUrl={PageRoutes.ROLES.CREATE}
      />

      <ReactTable
        DATA={roleList}
        COLUMNS={COLUMNS}
        fetchData={getroleList}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        showFilter={false}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        totalCount={paginationData.totalCount}
      />

      {/* Active/Inactive Modal */}
      {isModalOpen.isOpen && isModalOpen.type === "activeInactive" && (
        <StatusModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          onConfirm={() => {}}
          currentRowData={{
            recStatus: "inactive",
            recordName: "Roles",
          }}
          title="Change Status"
          message="Do you want to change the status of this Roles?"
        />
      )}
      {/* clone Modal */}
      {isModalOpen.isOpen && isModalOpen.type === "clone" && (
        <Modal
          isOpen={true}
          onClose={handleModalClose}
          header="Role and Permissions"
          contentClassName="p-6 overflow-y-auto text-sm"
          content={
            <>
              <Input
                formik={false}
                label="Name"
                asterisk
                name="roleName"
                defaultValue=""
                maxLength={255}
                inputClassName=""
                labelClassName=""
              />
            </>
          }
          footer={
            <>
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
              <Button size="sm" variant="primary" onClick={handleModalClose}>
                Clone
              </Button>
            </>
          }
        />
      )}
      {/* delete Modal */}
      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          title="Delete"
          onDelete={() => {}}
        />
      )}
    </>
  );
};

export default RolesListPage;
