"use client";
import { PageRoutes } from "@/admin-pages/routes";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusModal from "@/components/Modal/StatusModal";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import TableActionPanel from "@/components/common/TableActionPanel";
import { thirdPartyData } from "@/mock-data/adminThemeThirdParty";
import { getFormatDate } from "@/utils/date.util";
import Link from "next/link";
import { useCallback, useState } from "react";

const ThirdPartyServicesList = () => {
  const [modalState, setModalState] = useState<{
    type: "delete" | "status" | null;
    isOpen: boolean;
    data?: any;
  }>({ type: null, isOpen: false });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentRowData, setCurrentRowData] = useState<any>(null);

  // Columns defined here as they contain JSX elements and need access to component state
  const COLUMNS: ITableColumn[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      cell: (cell: any) => (
        <Link
          href={`${PageRoutes.THIRD_PARTY_SERVICE.EDIT}/${cell.row.original.id}`}
        >
          {cell.getValue()}
        </Link>
      ),
    },
    {
      id: "serviceName",
      header: "Third Party Services",
      accessorKey: "serviceName",
    },
    {
      id: "storeName",
      header: "Store Name",
      accessorKey: "storeName",
    },
    {
      id: "createdDate",
      header: "Created Date",
      accessorKey: "createdDate",
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
    },
    {
      id: "createdBy",
      header: "Created By",
      accessorKey: "createdBy",
    },
    {
      id: "updatedDate",
      header: "Updated Date",
      accessorKey: "updatedDate",
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
    },
    {
      id: "updatedBy",
      header: "Updated By",
      accessorKey: "updatedBy",
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "recStatus",
      cell: (cell: any) => {
        const status = cell.getValue()?.toLowerCase() === "active";
        return <Status type={status ? "A" : "I"} />;
      },
    },
    {
      id: "action",
      header: "Action",
      accessorKey: "id",
      cell: (cell: any) => (
        <TableActionPanel
          edit={{
            show: true,
            url: `${PageRoutes.THIRD_PARTY_SERVICE.EDIT}/${cell.row.original.id}`,
          }}
          remove={{
            show: true,
            onClick: () => {
              setSelectedId(cell.getValue());
              setModalState({ type: "delete", isOpen: true });
            },
          }}
          status={{
            show: true,
            status: cell.row.original.recStatus.toLowerCase(),
            onClick: () => {
              setCurrentRowData(cell.row.original);
              setModalState({ type: "status", isOpen: true });
            },
          }}
        />
      ),
    },
  ];

  const handleDelete = useCallback(() => {
    // Handle delete logic here
    console.log("Deleting id:", selectedId);
  }, [selectedId]);

  const handleStatusChange = useCallback(() => {
    // Handle status change logic here
    console.log("Changing status for:", currentRowData);
  }, [currentRowData]);

  return (
    <div>
      <ListPageHeader
        name={"Add Services"}
        moduleName={"Third Party Services"}
        navigateUrl={PageRoutes.THIRD_PARTY_SERVICE.CREATE}
      />

      <ReactTable
        COLUMNS={COLUMNS}
        DATA={thirdPartyData}
        showFilter={true}
        showEditColumns={true}
        displaySearch="left"
        pageSize={25}
        totalCount={thirdPartyData.length}
        showMoreFilters={true}
        hasPageSize={true}
      />

      {modalState.type === "delete" && (
        <DeleteModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ type: null, isOpen: false })}
          onDelete={handleDelete}
          title="Delete Third Party Service"
          itemName="third party service"
        />
      )}

      {modalState.type === "status" && (
        <StatusModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ type: null, isOpen: false })}
          message="Do you want to change the status of this Third Party Connection?"
          onConfirm={handleStatusChange}
          currentRowData={currentRowData}
        />
      )}
    </div>
  );
};

export default ThirdPartyServicesList;
