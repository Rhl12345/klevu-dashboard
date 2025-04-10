"use client";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import ReactTable from "@/components/Table/ReactTable";
import { paginationDetails, RecStatusValuebyName } from "@/utils/constants";
import { useCallback, useState, useEffect } from "react";

import { ITableColumn } from "@/components/Table/types";

import { PageRoutes } from "@/admin-pages/routes";
import TableActionPanel from "@/components/common/TableActionPanel";
import Image from "@/components/Image/Image";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusModal from "@/components/Modal/StatusModal";
import CompanyConfigurationData from "@/mock-data/companyConfiguration.json";
import {
  ICompanyConfigurationOption,
  TModalType,
} from "@/types/company-configuration/companyConfiguration.type";
import { getErrorMessage } from "@/utils/common.util";
import { getFormatDate } from "@/utils/date.util";
import Link from "next/link";
import { toast } from "react-toastify";
import Status from "@/components/DisplayStatus/Status";
import Text from "@/components/Text/Text";

const CompanyConfigurationList = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [companyConfigurationList, setCompanyConfigurationList] = useState<
    ICompanyConfigurationOption[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: TModalType;
  }>({ isOpen: false, type: null });
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: CompanyConfigurationData.companyConfigurationData.length,
  });
  const [filteringOptions, setColumnFilteringOptions] = useState<
    { filter: string; name: string }[]
  >([]);
  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const gethandeleCompanyConfiguration = useCallback(async () => {
    setIsLoading(true);
    try {
      // API call implementation
      setCompanyConfigurationList(
        CompanyConfigurationData.companyConfigurationData as ICompanyConfigurationOption[]
      );
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    gethandeleCompanyConfiguration();
  }, [gethandeleCompanyConfiguration]);

  const handleModalOpen = useCallback((type: TModalType) => {
    setIsModalOpen({ isOpen: true, type });
  }, []);

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
  };
  const COLUMNS: ITableColumn<ICompanyConfigurationOption>[] = [
    {
      id: "logo",
      accessorKey: "logo",
      header: "logo",
      cell: (props) => (
        <Link
          href={`${PageRoutes.COMPANY_CONFIGURATION.EDIT}${props.row.original.id}`}
        >
          <Image
            src={props.row.original.logo}
            alt="No Image"
            className="max-h-16"
            width={24}
            height={24}
          />
        </Link>
      ),
    },
    {
      id: "company_name",
      accessorKey: "company_name",
      header: "Company Name",
      cell: (props) => (
        <Link
          href={`${PageRoutes.COMPANY_CONFIGURATION.EDIT}${props.row.original.id}`}
        >
          <div className="">{props.row.original.company_name}</div>
        </Link>
      ),
    },
    {
      id: "full_name",
      accessorKey: "full_name",
      header: "Full Name",
    },
    {
      id: "email",
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "phone",
      accessorKey: "phone",
      header: "Phone",
    },
    {
      id: "modules",
      accessorKey: "modules",
      header: "Modules",
      cell: ({ row }) => {
        return (
          <Text size="sm" weight="font-normal">
            {row.original.modules.join("  |  ")}{" "}
          </Text>
        );
      },
    },

    {
      id: "created_date",
      accessorKey: "created_date",
      header: "CREATED DATE",
      cell: ({ row }) => {
        return row?.original?.created_date ? (
          <>
            <div>{getFormatDate(row?.original?.created_date).date} </div>
            <div className="text-xs font-normal">
              {getFormatDate(row?.original?.created_date).time}
            </div>
          </>
        ) : null;
      },
    },
    { id: "created_by", accessorKey: "created_by", header: "CREATED BY" },
    {
      id: "updated_date",
      accessorKey: "updated_date",
      header: "UPDATED DATE",
      cell: ({ row }) => {
        return row?.original?.updated_date ? (
          <>
            <div>{getFormatDate(row?.original?.updated_date).date} </div>
            <div className=" text-xs font-normal">
              {getFormatDate(row?.original?.updated_date).time}
            </div>
          </>
        ) : null;
      },
    },
    { id: "updated_by", accessorKey: "updated_by", header: "UPDATED BY" },
    {
      id: "recStatus",
      accessorKey: "recStatus",
      header: "Status",
      cell: (props) => (
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
      cell: (props: any) => {
        const companyConfig = props.row.original;
        return (
          <>
            <TableActionPanel
              edit={{
                show: true,
                url: `${PageRoutes.COMPANY_CONFIGURATION.EDIT}${companyConfig.id}`,
              }}
              remove={{
                show: true,
                onClick: () => handleModalOpen("delete"),
              }}
              status={{
                show: true,
                status: companyConfig.recStatus,
                onClick: () => handleModalOpen("activeInactive"),
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <ListPageHeader
        name="Add Company Configuration"
        moduleName="Company Configuration"
        navigateUrl={PageRoutes.COMPANY_CONFIGURATION.CREATE}
      />
      <ReactTable
        DATA={companyConfigurationList}
        COLUMNS={COLUMNS}
        fetchData={gethandeleCompanyConfiguration}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        showFilter
        displaySearch="left"
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        totalCount={paginationData.totalCount}
        loading={isLoading}
      />
      <DeleteModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "delete"}
        onClose={handleModalClose}
        title="Delete"
        onDelete={() => {}}
      />
      <StatusModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "activeInactive"}
        onClose={handleModalClose}
        onConfirm={() => {}}
        currentRowData={{
          recStatus: "inactive",
          recordName: "Company Configuration",
        }}
        title="Change Status"
        message="Do you want to change the status of this Company Configuration?"
      />
    </>
  );
};

export default CompanyConfigurationList;
