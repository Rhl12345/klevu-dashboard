import React, { useState, useCallback, useMemo } from "react";

import ReactTable from "@/components/Table/ReactTable";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/DropDown/DropDown";
import Status from "@/components/DisplayStatus/Status";

import { ICustomLogoData, IModalType } from "@/types/company/company.type";
import { ITableColumn } from "@/components/Table/types";
import { paginationDetails } from "@/utils/constants";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusModal from "@/components/Modal/StatusModal";
import Image from "@/components/Image/Image";
import customLogoData from "@/mock-data/customLogo.json";
import { IFilterOption } from "@/types/consultation.type";
import { IModalState } from "@/types/company/customeLogo";
import { Formik, Form as FormikForm } from "formik";
import { validation } from "@/utils/validations/comapny.validation";

const CustomLogo = () => {
  const [data, setData] = useState<ICustomLogoData[]>(
    customLogoData.customLogoData as unknown as ICustomLogoData[]
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedCustomLogo, setSelectedCustomLogo] =
    useState<ICustomLogoData | null>(null);
  const [modalState, setModalState] = useState<IModalState>({
    isOpen: false,
    type: null,
    selectedLogo: null,
  });
  const [filteringOptions, setColumnFilteringOptions] = useState<
    IFilterOption[]
  >([]);
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "logoName",
      direction: 0,
      priority: 0,
    },
  ]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: 1,
  });
  const [showUploadModal, setShowUploadModal] = useState(false);

  const setPaginationDataFunc = useCallback((key: string, value: number) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  const handleModalOpen = useCallback(
    (type: IModalType, logo: ICustomLogoData) => {
      setSelectedCustomLogo(logo);
      setModalState({ isOpen: true, type, selectedLogo: logo });
    },
    []
  );

  const handleModalClose = useCallback(() => {
    setModalState({ isOpen: false, type: null, selectedLogo: null });
    setSelectedCustomLogo(null);
    setShowUploadModal(false);
  }, []);

  const setSortingOptionHandler = useCallback(
    (column: string, direction: number) => {
      setSortingOptions([{ field: column, direction, priority: 0 }]);
    },
    []
  );

  const COLUMNS = useMemo<ITableColumn<ICustomLogoData>[]>(
    () => [
      {
        id: "logo",
        accessorKey: "logo",
        header: "Logo",
        cell: (props) => {
          return (
            <div className="flex items-center w-20 h-20">
              <Image
                src={props.row.original.logo}
                alt={`${props.row.original.logoName} logo`}
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
        id: "logoName",
        accessorKey: "logoName",
        header: "Logo Name",
      },
      {
        id: "decorationType",
        accessorKey: "decorationType",
        header: "	Decoration Type",
      },
      {
        id: "sewOut",
        accessorKey: "sewOut",
        header: "Sew Out",
        enableSorting: false,
        cell: (props) => {
          return (
            <div className="flex items-center w-20 h-20">
              <Image
                src={props.row.original.logo}
                alt={`${props.row.original.logoName} logo`}
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
        id: "dstFile",
        accessorKey: "dstFile",
        header: "DST File",
        enableSorting: false,
      },
      {
        id: "clientStatus",
        accessorKey: "clientStatus",
        header: "Status",
        filterFn: "arrIncludesSome",
        cell: (props) => {
          if (props.row.original.clientStatus !== undefined) {
            return <Status type={props.row.original.clientStatus} />;
          }
          return "";
        },
      },
      {
        id: "Approved",
        accessorKey: "Aproved",
        header: "Action",
        cell: (props) => {
          const handleApprove = () => {
            const updatedLogo = {
              ...props.row.original,
              clientStatus: "Approved",
            };
            setData((prevData) =>
              prevData.map((logo) =>
                logo.id === updatedLogo.id ? updatedLogo : logo
              )
            );
          };

          const handleDisapprove = () => {
            const updatedLogo = {
              ...props.row.original,
              clientStatus: "waiting for approved",
            };
            setData((prevData) =>
              prevData.map((logo) =>
                logo.id === updatedLogo.id ? updatedLogo : logo
              )
            );
          };

          return (
            <div>
              {props.row.original.clientStatus === "Approved" ? (
                <Button size="sm" variant="primary" onClick={handleDisapprove}>
                  Disapprove
                </Button>
              ) : (
                <Button size="sm" variant="primary" onClick={handleApprove}>
                  Approve
                </Button>
              )}
            </div>
          );
        },
      },
    ],
    [handleModalOpen]
  );

  return (
    <>
      <div className="w-full lg:py-8 xl:px-8 py-4 px-4">
        <div className="border border-gray-light dark:border-gray-dark flex flex-col py-4 lg:py-6">
          <div className="flex flex-wrap justify-end space-x-2 px-4 lg:px-6">
            <div className="flex justify-end gap-2">
          <Button size="sm" id="secondary-button" variant="primary">
            Import From BC
          </Button>

          <Button
            size="sm"
            id="secondary-button"
            variant="primary"
            onClick={() => setShowUploadModal(true)}
          >
            Upload Logo
          </Button>
        </div>
      </div>

      <ReactTable
        DATA={data}
        COLUMNS={COLUMNS}
        fetchData={() => {}}
        sortingOptions={sortingOptions}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        setSortingOptionHandler={setSortingOptionHandler}
        hasNextPage={paginationData.hasNextPage}
        displaySearch="left"
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        isListPage={false}        
      />

      {modalState.isOpen && modalState.type === "delete" && (
        <DeleteModal
          isOpen={modalState.isOpen}
          onClose={handleModalClose}
          title="Delete"
          itemName="Custom Logo"
          onDelete={() => {}}
        />
      )}

      {modalState.isOpen && modalState.type === "activeInactive" && (
        <StatusModal
          isOpen={modalState.isOpen}
          onClose={handleModalClose}
          onConfirm={() => {}}
          currentRowData={{ recStatus: "active", recordName: "customLogo" }}
          title="Change Status"
          message="Do you want to change the status of this custom logo?"
        />
      )}

      <CustomLogoFormModal
          isOpen={showUploadModal}
          onClose={handleModalClose}
        />
      </div>
      </div>
    </>
  );
};

export default CustomLogo;

const CustomLogoFormModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Add Custom Logo"
      size="xl"
      footer={
        <>
          <Button size="sm" variant="rounded-outline-primary" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" variant="primary" form="CustomLogo-form">
            Save
          </Button>
        </>
      }
      content={
        <>
          <Formik
            initialValues={{
              decorationType: "",
              logoFile: null,
              logoPosition: "",
            }}
            validationSchema={validation}
            onSubmit={() => {}}
          >
            {({ errors, setFieldValue, values }) => (
              <FormikForm id="CustomLogo-form">
                <Dropdown
                  aria-label="logoPosition"
                  defaultValue=""
                  id="logoPosition"
                  label="Select Logo Position"
                  asterisk
                  options={customLogoData.LOGO_POSITIONS}
                  placeholder="Select..."
                  onChange={(option: any) => {
                    setFieldValue("logoPosition", option.value);
                  }}
                  errorMessage={errors.logoPosition}
                />
                <Dropdown
                  aria-label="decorationType"
                  defaultValue=""
                  id="decorationType"
                  label="Decoration Type"
                  asterisk
                  options={customLogoData.DECORATION_TYPES}
                  placeholder="Select..."
                  onChange={(option: any) => {
                    setFieldValue("decorationType", option.value);
                  }}
                  errorMessage={errors.decorationType}
                />
                <Input
                  label="Logo File"
                  type="file"
                  name="logoFile"
                  id="logo_file"
                  formik={false}
                  errorMessage={errors.logoFile}
                />
              </FormikForm>
            )}
          </Formik>
        </>
      }
    />
  );
};
