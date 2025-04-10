"use client";
import Button from "@/components/Button/Button";
import Status from "@/components/DisplayStatus/Status";
import Image from "@/components/Image/Image";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Text from "@/components/Text/Text";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import LogoLocationData from "@/mock-data/EditProductLogoLocation.json";
import {
  ILogoLocation,
  ILogoLocationCellProps,
} from "@/types/product/product.type";
import { getErrorMessage } from "@/utils/common.util";
import { defaultImage, paginationDetails } from "@/utils/constants";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

const LogoLocation = ({
  isEditPage = false,
  handleTabChange,
  productId,
}: {
  isEditPage: boolean;
  handleTabChange?: (tab: number) => void;
  productId: string;
}) => {
  const [data, setData] = useState<ILogoLocation[]>(
    LogoLocationData.logoLocation
  );

  const changeStatus = (logoLocation: ILogoLocation) => {
    if (logoLocation.recStatus === "A") {
      const updatedData = data.map((item: ILogoLocation) =>
        item.logoLocationDetailId === logoLocation.logoLocationDetailId
          ? { ...item, recStatus: "I" }
          : item
      );
      setData(updatedData);
    } else {
      const updatedData = data.map((item: ILogoLocation) =>
        item.logoLocationDetailId === logoLocation.logoLocationDetailId
          ? { ...item, recStatus: "A" }
          : item
      );
      setData(updatedData);
    }
  };

  const COLUMNS: ITableColumn<ILogoLocation>[] = [
    {
      id: "status",
      header: "Status",
      accessorKey: "recStatus",
      enableSorting: isEditPage,
      cell: (props: ILogoLocationCellProps) => {
        return isEditPage ? (
          <ToggleButton
            defaultValue={props.row.original.recStatus === "A" ? true : false}
            size="small"
            id={props.row.original.logoLocationDetailId.toString()}
            name={props.row.original.name}
            onChange={() => {
              console.log(props.row.original);
              changeStatus(props.row.original);
            }}
          />
        ) : (
          <Status type={props.row.original.recStatus} />
        );
      },
    },
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      enableSorting: isEditPage,
    },
    {
      id: "imageUrl",
      header: "Location Image",
      accessorKey: "imageUrl",
      enableSorting: isEditPage,
      cell: (props: ILogoLocationCellProps) => {
        return (
          <>
            <div className="w-full max-w-24">
              <Image
                src={
                  props.row.original.imageUrl
                    ? `https://storagemedia.corporategear.com/${props.row.original.imageUrl}`
                    : defaultImage
                }
                objectFit="contain"
                width={100}
                height={100}
                variant="next"
                alt={"logoLocationImage"}
              />
            </div>
          </>
        );
      },
    },
    {
      id: "threeDImageUrl",
      header: "3D Image",
      accessorKey: "threeDImageURL",
      enableSorting: isEditPage,

      cell: (props: ILogoLocationCellProps) => {
        return (
          <>
            <div className="w-full max-w-24">
              <Image
                src={
                  props.row.original.threeDImageURL
                    ? `https://storagemedia.corporategear.com/${props.row.original.threeDImageURL}`
                    : "/noImage.png"
                }
                objectFit="contain"
                width={100}
                height={100}
                variant="next"
                alt={"threeDImage"}
              />
            </div>
          </>
        );
      },
    },
    {
      id: "logoLocationClass",
      header: "Logo location",
      accessorKey: "threeDLogoLocationClass",
      enableSorting: isEditPage,
    },
    {
      id: "ourCost",
      header: "Our Cost($)",
      accessorKey: "cost",
      enableSorting: isEditPage,

      cell: (props: ILogoLocationCellProps) => {
        return props.row.original.cost ? (
          <>
            <div>{props.row.original.cost.toFixed(2)}</div>
          </>
        ) : (
          "0.00"
        );
      },
    },
    {
      id: "ourPrice",
      header: "Our Price ($)",
      accessorKey: "price",
      enableSorting: isEditPage,

      cell: (props: ILogoLocationCellProps) => {
        return props.row.original.price ? (
          <>
            <div>{props.row.original.price.toFixed(2)}</div>
          </>
        ) : (
          "0.00"
        );
      },
    },
    {
      id: "brandGuidelines",
      header: "Brand Guidelines",
      accessorKey: "brandGuidelines",
      enableSorting: isEditPage,

      cell: (props: ILogoLocationCellProps) => {
        return props.row.original.brandGuidelines ? (
          <>
            {props.row.original.brandGuidelines && (
              <div>{`${props.row.original.brandGuidelines}`}</div>
            )}
          </>
        ) : (
          "-"
        );
      },
    },
  ];

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getLogoLocationData = useCallback(
    async (pageIndex = 1): Promise<void> => {
      try {
        // Simulating API call with mock data
        const response = new Promise<any>((resolve) => {
          setTimeout(() => {
            const startIndex = (pageIndex - 1) * paginationData.pageSize;
            const endIndex = startIndex + paginationData.pageSize;
            const paginatedItems = LogoLocationData.logoLocation.slice(
              startIndex,
              isEditPage ? endIndex : 3
            );

            resolve({
              items: paginatedItems,
              pageIndex: pageIndex,
              pageSize: paginationData.pageSize,
              totalCount: LogoLocationData.logoLocation.length,
              totalPages: Math.ceil(
                LogoLocationData.logoLocation.length / paginationData.pageSize
              ),
              hasPreviousPage: pageIndex > 1,
              hasNextPage: endIndex < LogoLocationData.logoLocation.length,
            });
          }, 500);
        });

        const result = await response;
        setData(result.items);
        setPaginationData((prevState) => ({
          ...prevState,
          pageIndex: result.pageIndex,
          pageSize: result.pageSize,
          totalCount: result.totalCount,
          totalPages: result.totalPages,
          hasPreviousPage: result.hasPreviousPage,
          hasNextPage: result.hasNextPage,
        }));
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    [paginationData.pageSize]
  );
  return (
    <div
      className={`${isEditPage ? "" : "border border-gray-light dark:border-gray-dark  bg-body-light dark:bg-body-dark  p-4 lg:p-6"}  `}
    >
      <div className="flex flex-col gap-4">
        {!isEditPage && handleTabChange && (
          <div className="flex justify-between items-center">
            <Text size="lg" className="font-semibold">
              Logo Location
            </Text>

            <Button
              variant="default"
              size="md"
              onClick={() => handleTabChange(8)}
              className="underline"
            >
              Edit
            </Button>
          </div>
        )}

        <ReactTable
          isListPage={false}
          usedInsideModal={true}
          COLUMNS={COLUMNS}
          DATA={data}
          {...paginationData}
          setTablePageSize={(value) => setPaginationDataFunc("pageSize", value)}
          fetchData={getLogoLocationData}
          sortingOptions={sortingOptions}
          hasPreviousPage={paginationData.hasPreviousPage}
          hasNextPage={paginationData.hasNextPage}
          showEditColumns={false}
          showMoreFilters={false}
          showPagination={isEditPage}
          displaySearch={false}
          showFilter={false}
        />
      </div>
    </div>
  );
};

export default LogoLocation;
