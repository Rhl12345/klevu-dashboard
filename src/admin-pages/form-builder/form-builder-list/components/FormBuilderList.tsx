"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

import ReactTable from "@/components/Table/ReactTable";
import Button from "@/components/Button/Button";
import Status from "@/components/DisplayStatus/Status";
import { ITableColumn, ISortingOption } from "@/components/Table/types";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import SvgIcon from "@/components/SvgIcons/SvgIcon";

import { getErrorMessage } from "@/utils/common.util";
import { paginationDetails, RecStatusValuebyName } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";

import {
  IPaginationData,
  IFormBuilderValues,
} from "@/types/form-builder/formBuilder.type";
import { STORE_TYPES } from "@/types/products-database/productDatabase.type";

import { moreFilterOptions } from "@/mock-data/formBuilder";
import { MODAL_TYPES } from "@/mock-data/formBuilder";

import { PageRoutes } from "@/admin-pages/routes";
import FormBuilderCloneModal from "@/admin-pages/form-builder/form-builder-list/components/FormBuilderCloneModal";

const FormBuilderListPage = ({
  storeName,
  formbuilderData,
}: {
  storeName: string;
  formbuilderData: IFormBuilderValues[];
}) => {
  const router = useRouter();
  const [selectedFormBuilder, setSelectedFormBuilder] =
    useState<IFormBuilderValues | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES] | null;
  }>({ isOpen: false, type: null });

  const [paginationData, setPaginationData] = useState<IPaginationData>({
    ...paginationDetails,
    totalCount: formbuilderData.length,
  });
  const [sortingOptions, setSortingOptions] = useState<ISortingOption[]>([]);
  const [filteringOptions, setColumnFilteringOptions] = useState<
    Array<{
      field: string;
      operator: string;
      value: string | number | boolean;
    }>
  >([]);

  // Memoize handlers
  const setSortingOptionHandler = useCallback(() => {
    try {
      setSortingOptions([]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, []);

  // Memoize pagination handler
  const setPaginationDataFunc = useCallback(
    (
      key: keyof typeof paginationData,
      value: (typeof paginationData)[keyof typeof paginationData]
    ) => {
      setPaginationData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Modal handling functions
  const handleModalOpen = (
    type: (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES],
    formBuilder: IFormBuilderValues
  ) => {
    setSelectedFormBuilder(formBuilder);
    setModalState({ isOpen: true, type });
  };

  const handleModalClose = () => {
    setModalState({ isOpen: false, type: null });
    setSelectedFormBuilder(null);
  };

  const handleDelete = async () => {
    try {
      toast.success("Form Builder deleted successfully");
      handleModalClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleStatusChange = async () => {
    try {
      toast.success("Form Builder status changed successfully");
      handleModalClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleClone = () => {
    try {
      toast.success("Form Builder cloned successfully");
      handleModalClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const COLUMNS: ITableColumn<IFormBuilderValues>[] = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "FORM NAME",
        cell: ({ row, getValue }) => (
          <Link
            href={`${PageRoutes.STORE.STORE}/${STORE_TYPES.FORM_BUILDER}/${storeName}/store/${row.original.id}/edit`}
          >
            {getValue()}
          </Link>
        ),
      },
      {
        id: "url",
        accessorKey: "url",
        header: "DOMAIN",
        cell: ({ row, getValue }) => (
          <>
            <Button
              onClick={() => {
                router.push(row.original.url);
              }}
              variant="default"
            >
              {getValue()}
            </Button>
          </>
        ),
      },
      {
        id: "customerContact",
        accessorKey: "customerContact",
        header: "Customer Contact",
      },
      {
        id: "openDate",
        header: "Open Date",
        accessorKey: "openDate",
        filterFn: "customDateFilter",
        cell: ({ row }) => {
          const openDate = row.original.openDate;
          if (!openDate) return null;

          const { date, time } = getFormatDate(openDate);
          return (
            <>
              <div>{date}</div>
              <div className="text-xs font-normal">{time}</div>
            </>
          );
        },
      },
      {
        id: "closeDate",
        header: "Close Date",
        accessorKey: "closeDate",
        cell: ({ row }) => {
          const closeDate = row.original.closeDate;
          if (!closeDate) return null;

          const { date, time } = getFormatDate(closeDate);
          return (
            <>
              <div>{date}</div>
              <div className="text-xs font-normal">{time}</div>
            </>
          );
        },
      },
      {
        id: "parentStoreName",
        accessorKey: "parentStoreName",
        header: "Parent Store",
      },
      {
        id: "createdDate",
        accessorKey: "createdDate",
        header: "CREATED DATE",
        filterFn: "customDateFilter",
        cell: ({ row }) => {
          const createdDate = row.original.createdDate;
          if (!createdDate) return null;

          const { date, time } = getFormatDate(createdDate);
          return (
            <>
              <div>{date}</div>
              <div className="text-xs font-normal">{time}</div>
            </>
          );
        },
      },
      { id: "createdName", accessorKey: "createdName", header: "CREATED BY" },
      {
        id: "modifiedDate",
        accessorKey: "modifiedDate",
        header: "UPDATED DATE",
        filterFn: "customDateFilter",
        cell: ({ row }) => {
          const modifiedDate = row.original.modifiedDate;
          if (!modifiedDate) return null;

          const { date, time } = getFormatDate(modifiedDate);
          return (
            <>
              <div>{date}</div>

              <div className="text-xs font-normal">{time}</div>
            </>
          );
        },
      },
      { id: "modifiedName", accessorKey: "modifiedName", header: "UPDATED BY" },
      {
        id: "recStatus",
        accessorKey: "recStatus",
        header: "STATUS",
        filterFn: "arrIncludesSome",
        cell: ({ getValue }) => {
          const value = getValue();
          return value ? <Status type={value} /> : null;
        },
      },
      {
        id: "action",
        accessorKey: "action",
        header: "Action",
        cell: (props) => {
          const formBuilder = props.row.original;
          return (
            <TableActionPanel
              edit={{
                show: true,
                url: `${PageRoutes.STORE.STORE}/${STORE_TYPES.FORM_BUILDER}/${storeName}/store/${formBuilder.id}/edit`,
              }}
              remove={{
                show: true,
                onClick: () => handleModalOpen(MODAL_TYPES.DELETE, formBuilder),
              }}
              status={{
                show: true,
                status:
                  formBuilder.recStatus === RecStatusValuebyName.Active
                    ? "active"
                    : "inactive",
                onClick: () =>
                  handleModalOpen(MODAL_TYPES.ACTIVE_INACTIVE, formBuilder),
              }}
              clone={{
                show: true,
                onClick: () => handleModalOpen(MODAL_TYPES.CLONE, formBuilder),
              }}
              extraAction={
                <>
                  <Button
                    variant="default"
                    size="sm"
                    className="!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0"
                    icon={
                      <SvgIcon
                        name="PlusIconWithRoundedCircle"
                        width={24}
                        height={24}
                      />
                    }
                  >
                    Publish
                  </Button>

                  <Button
                    variant="default"
                    size="sm"
                    className="!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0"
                    icon={<SvgIcon name="EyeOpen" width={24} height={24} />}
                  >
                    View From Data
                  </Button>
                </>
              }
            />
          );
        },
      },
    ],
    []
  );

  return (
    <div>
      <ReactTable
        DATA={formbuilderData}
        COLUMNS={COLUMNS}
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
        totalCount={formbuilderData.length}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={moreFilterOptions}
      />

      {/* Delete Modal */}
      {modalState.isOpen && modalState.type === MODAL_TYPES.DELETE && (
        <DeleteModal
          isOpen={modalState.isOpen}
          onClose={handleModalClose}
          title="Delete"
          itemName="Form Builder data"
          onDelete={handleDelete}
        />
      )}

      {/* Active/Inactive Modal */}
      {modalState.isOpen && modalState.type === MODAL_TYPES.ACTIVE_INACTIVE && (
        <StatusChangeModel
          isOpen={modalState.isOpen}
          onClose={handleModalClose}
          onConfirm={handleStatusChange}
          currentRowData={{
            recStatus:
              selectedFormBuilder?.recStatus === "A" ? "active" : "inactive",
            quantityName: "formBuilder",
            recordName: "formBuilder",
          }}
          title={`${selectedFormBuilder?.recStatus === "A" ? "Inactive" : "Active"} Status`}
          message={`Are you sure you want to ${selectedFormBuilder?.recStatus === "A" ? "inactive" : "active"} this form builder?`}
        />
      )}

      {/* Clone Modal */}
      {modalState.isOpen && modalState.type === MODAL_TYPES.CLONE && (
        <FormBuilderCloneModal
          isOpen={modalState.isOpen}
          onClose={handleModalClose}
          editId={Number(selectedFormBuilder?.id) || null}
          onSubmit={handleClone}
          formbuilderData={formbuilderData}
        />
      )}
    </div>
  );
};

export default FormBuilderListPage;
