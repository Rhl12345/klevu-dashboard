"use client";
import React, { useCallback, useMemo, useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import Button from "@/components/Button/Button";
import Status from "@/components/DisplayStatus/Status";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import { paginationDetails, userNameValues } from "@/utils/constants";
import { ITableColumn } from "@/components/Table/types";
import { getFormatDate } from "@/utils/date.util";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusModal from "@/components/Modal/StatusModal";
import FixChargesTempData from "@/mock-data/fixCharges.json";
import FixChargesCreateModal from "@/admin-pages/fix-charges/components/CreateModal";
import {
  IEnhancedICellProps,
  IFixChargeFormList,
  IModalType,
} from "@/types/fix-charges/fixCharges.type";
import { IPaginationState } from "@/types/special-request/specialRequest.type";
import { getErrorMessage } from "@/utils/common.util";
import { toast } from "react-toastify";
import { IModalState } from "@/types/admin-stores/storeForm.types";
import { customerOptions } from "@/utils/Dummy";

const FixChargesList = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [modalState, setModalState] = useState<IModalState>({
    isOpen: false,
    type: null,
  });
  const [error, setError] = useState<string | null>(null);

  const [fixChargesList, setFixChargesList] = useState<IFixChargeFormList[]>(
    []
  );

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "fixCharge",
      direction: 0,
      priority: 0,
    },
  ]);
  const [paginationData, setPaginationData] = useState<IPaginationState>({
    ...paginationDetails,
  });

  const [filteringOptions, setColumnFilteringOptions] = useState<
    { filter: string; name: string }[]
  >([]);
  const getFixCharges = useCallback(async () => {
    try {
      setError(null);
      // API call implementation
      setFixChargesList(
        FixChargesTempData.fixChargesTempData as IFixChargeFormList[]
      );
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }, []);

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  const handleModalOpen = useCallback((type: IModalType["type"]) => {
    setModalState({ isOpen: true, type: type as IModalType["type"] });
  }, []);
  const handleModalClose = () => {
    setModalState({ isOpen: false, type: null });
    setEditId(null);
  };
  const moreFilterOption = [
    {
      columnName: "fixCharge",
      name: "Name",
      type: "checkbox",
      options: customerOptions,
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
      options: userNameValues,
      conditionalSearch: true,
    },
    {
      columnName: "modifiedby",
      name: "Updated By",
      type: "checkbox",
      options: userNameValues,
      conditionalSearch: true,
    },
  ];
  const COLUMNS: ITableColumn<IFixChargeFormList>[] = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "NAME",
        cell: (props: IEnhancedICellProps) => (
          <Button
            variant="default"
            size="md"
            className="!font-normal"
            onClick={() => {
              setEditId(props.row.original.id);
              handleModalOpen("edit");
            }}
          >
            {props.getValue()}
          </Button>
        ),
      },
      { id: "	charges", accessorKey: "charges", header: "Charges ($)" },
      { id: "store_name", accessorKey: "store_name", header: "STORE NAME" },
      {
        id: "created_date",
        accessorKey: "created_date",
        header: "Created Date",
        cell: (props: IEnhancedICellProps) => (
          <div>
            {props.getValue() ? (
              <>
                <div>{getFormatDate(props.getValue()).date} </div>
                <div className="text-xs font-normal">
                  {getFormatDate(props.getValue()).time}
                </div>
              </>
            ) : (
              "-"
            )}
          </div>
        ),
      },
      { id: "created_by", accessorKey: "created_by", header: "CREATED BY" },
      {
        id: "updated_date",
        accessorKey: "updated_date",
        header: "UPDATED DATE",
        filterFn: "customDateFilter",
        cell: (props: IEnhancedICellProps) => (
          <div>
            {props.getValue() ? (
              <>
                <div>{getFormatDate(props.getValue()).date} </div>
                <div className="text-xs font-normal">
                  {getFormatDate(props.getValue()).time}
                </div>
              </>
            ) : (
              "-"
            )}
          </div>
        ),
      },

      { id: "updated_by", accessorKey: "updated_by", header: "UPDATED BY" },
      {
        id: "recStatus",
        accessorKey: "recStatus",
        header: "STATUS",
        filterFn: "arrIncludesSome",
        cell: (props: IEnhancedICellProps) => {
          const status = props.getValue();
          if (status === undefined || status === null) return null;
          return <Status type={status} />;
        },
      },
      {
        id: "action",
        accessorKey: "action",
        header: "Action",
        cell: (props: IEnhancedICellProps) => {
          const fixChargeTemplate = props.row.original;
          return (
            <>
              <TableActionPanel
                edit={{
                  show: true,
                  onClick: () => {
                    setEditId(fixChargeTemplate.id);
                    handleModalOpen("edit");
                  },
                }}
                remove={{
                  show: true,
                  onClick: () => handleModalOpen("delete"),
                }}
                status={{
                  show: true,
                  status: fixChargeTemplate.recStatus as
                    | "inactive"
                    | "active"
                    | "pending"
                    | "rejected"
                    | "approved"
                    | "draft",
                  onClick: () => handleModalOpen("activeInactive"),
                }}
              />
            </>
          );
        },
      },
    ],
    [fixChargesList]
  );

  return (
    <>
      <ListPageHeader name={"Fix Charges"} moduleName={"Fixed Charges"}>
        <Button
          size="md"
          variant="primary"
          onClick={() => setModalState({ isOpen: true, type: "createModal" })}
        >
          <span className="ml-1">Add Fix Charges</span>
        </Button>
      </ListPageHeader>

      <ReactTable
        DATA={fixChargesList}
        COLUMNS={COLUMNS}
        fetchData={getFixCharges}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        showEditColumns
        showFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={moreFilterOption}
      />
      <FixChargesCreateModal
        isOpen={
          modalState.isOpen &&
          (modalState.type === "createModal" || modalState.type === "edit")
        }
        handleModalClose={handleModalClose}
        editId={editId}
      />
      <DeleteModal
        isOpen={modalState.isOpen && modalState.type === "delete"}
        onClose={handleModalClose}
        title="Delete"
        onDelete={() => {}}
      />
      <StatusModal
        isOpen={modalState.isOpen && modalState.type === "activeInactive"}
        onClose={handleModalClose}
        onConfirm={() => {}}
        currentRowData={{
          recStatus: "inactive",
          recordName: "Fix Charges",
        }}
        title="Inactive this Fix Charges"
        message="Do you want to Inactive this Fix Charges?"
      />
    </>
  );
};

export default FixChargesList;
