import { ITableColumn } from "@/components/Table/types";
import { IOrderLogo, IOrderLogoCellProps } from "@/types/orders/orders.type";
import { paginationDetails } from "@/utils/constants";
import { useCallback, useState } from "react";
import OrderData from "@/mock-data/OrdersEditData.json";
import { toast } from "react-toastify";
import ReactTable from "@/components/Table/ReactTable";
import Status from "@/components/DisplayStatus/Status";
import Image from "@/components/Image/Image";
import Link from "next/link";
import { Textarea } from "@/components/Textarea/Textarea";
import Button from "@/components/Button/Button";
import { getFormatDate } from "@/utils/date.util";
import Dropdown from "@/components/DropDown/DropDown";
import { DecorationTypeOptions } from "./OrderLineItemRow";
import Modal from "@/components/Modal/Modal";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import OrderUploadLogo from "@/admin-pages/orders/edit/components/OrderUploadLogo";
const OrderLogoTable = ({
  setShowOrderLogoTable,
  showOrderLogoTable,
}: {
  setShowOrderLogoTable: (show: boolean) => void;
  showOrderLogoTable: boolean;
}) => {
  const updateLogoNotes = (notes: string, id: string) => {
    toast.success("Logo notes updated successfully");
  };
  const [showUploadLogo, setShowUploadLogo] = useState(false);
  const [item, setItem] = useState<any>(null);

  const approveCustomerLogo = (id: string) => {
    toast.success("Logo approved successfully");
  };

  const handleUploadLogo = (item: any) => {
    setShowUploadLogo(true);
    setItem(item);
  };
  const COLUMNS: ITableColumn<IOrderLogo>[] = [
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (props: IOrderLogoCellProps) => {
        return props.row.original.status &&
          props.row.original.status.toLowerCase().includes("waiting") ? (
          <div
            className={`text-xs inline-block font-medium text-center py-1 w-28`}
          >
            Waiting For Approval
          </div>
        ) : (
          <div>
            <Status type={props.row.original.status} />
          </div>
        );
      },
    },
    {
      id: "logo",
      header: "Logo",
      accessorKey: "logo",
      cell: (props: IOrderLogoCellProps) => {
        return (
          <>
            <div className="flex flex-col gap-2 ">
              <div className="group flex items-center relative overflow-hidden w-full">
                <Image
                  src={`https://storagemedia.corporategear.com/${props.row.original?.logo}`}
                  className="w-20"
                />
                {props.row.original?.logo && (
                  <Link
                    className={`w-20 bg-gray-50 opacity-80 h-full transition transform translate-y-8 ease-in-out invisible absolute group-hover:visible group-hover:translate-y-0  cursor-pointer flex justify-center items-center`}
                    href={`${props.row.original?.logo}`}
                  >
                    <SvgIcon
                      name="download-01"
                      width={24}
                      height={24}
                      fill="red"
                      className="items-center"
                    />
                  </Link>
                )}
              </div>

              <div className=" flex justify-between items-center">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleUploadLogo(props.row.original)}
                >
                  Upload Logo
                </Button>
              </div>
            </div>
          </>
        );
      },
    },
    {
      id: "logoNumber",
      header: "Logo Number",
      accessorKey: "logoNumber",
    },
    {
      id: "logoLocation",
      header: "Logo Location",
      accessorKey: "logoLocationImage",
      cell: (props: IOrderLogoCellProps) => {
        return (
          <div className="flex flex-col gap-2 w-[200px]">
            <div>{`Decoration Location : ${props.row.original?.logoLocation}`}</div>

            <div className="flex items-center">
              <Image
                src={`https://storagemedia.corporategear.com/${props.row.original?.logoLocationImage}`}
                className="w-20"
              />
            </div>

            <div>Decoration Type:</div>
            <div className="flex items-center gap-2">
              <DecorationTypeDropdown
                DecorationTypeOptions={DecorationTypeOptions}
                row={props.row.original}
              />
            </div>
          </div>
        );
      },
    },
    {
      id: "logoNotes",
      header: "Notes",
      accessorKey: "logoNotes",
      cell: (props: IOrderLogoCellProps) => {
        return (
          <LogoNoteInput
            row={props.row.original}
            updateLogoNotes={updateLogoNotes}
          />
        );
      },
    },
    {
      id: "prodURL",
      header: "Prod URL",
      accessorKey: "prodURL",
      cell: (props: IOrderLogoCellProps) => {
        return props.row.original?.prodURL ? (
          <div className="w-36">
            <Link
              target="_blank"
              className="btn shadow-none text-indigo-500 hover:text-indigo-600 font-semibold mb-2"
              href={`${props.row.original?.prodURL}`}
            >
              <SvgIcon
                name="download-01"
                width={24}
                height={24}
                fill="red"
                className="items-center"
              />
            </Link>
          </div>
        ) : (
          ""
        );
      },
    },
    {
      id: "sewOutURL",
      header: "Sew Out URL",
      accessorKey: "sewOutURL",
      cell: (props: IOrderLogoCellProps) => {
        return (
          <>
            <div className="group flex items-center relative overflow-hidden w-full">
              <Image src={props.row.original?.sewOutURL} className="w-20" />
              {props.row.original?.sewOutURL && (
                <Link
                  className={`w-20 bg-gray-50 opacity-80 h-full transition transform translate-y-8 ease-in-out invisible absolute group-hover:visible group-hover:translate-y-0  cursor-pointer flex justify-center items-center`}
                  target="_blank"
                  href={`${props.row.original?.sewOutURL}`}
                >
                  <SvgIcon
                    name="download-01"
                    width={24}
                    height={24}
                    fill="red"
                    className="items-center"
                  />
                </Link>
              )}
            </div>
          </>
        );
      },
    },
    {
      id: "runSheetURL",
      header: "Run Sheet URL",
      accessorKey: "runSheetURL",
      cell: (props: IOrderLogoCellProps) => {
        return (
          <>
            <div className="group flex items-center relative overflow-hidden w-full">
              <Image src={props.row.original?.runSheetURL} className="w-20" />
              {props.row.original?.runSheetURL && (
                <Link
                  className={`w-20 bg-gray-50 opacity-80 h-full transition transform translate-y-8 ease-in-out invisible absolute group-hover:visible group-hover:translate-y-0  cursor-pointer flex justify-center items-center`}
                  target="_blank"
                  href={`${props.row.original?.runSheetURL}`}
                >
                  <SvgIcon
                    name="download-01"
                    width={24}
                    height={24}
                    fill="red"
                    className="items-center"
                  />
                </Link>
              )}
            </div>
          </>
        );
      },
    },
    {
      id: "logoStatus",
      header: "Logo Status",
      accessorKey: "logoStatus",
      cell: (props: IOrderLogoCellProps) => {
        return props.row.original?.logoStatus
          ? props.row.original?.logoStatus
          : "";
      },
    },
    {
      id: "uploadDate",
      header: "Upload Date",
      accessorKey: "uploadDate",
      cell: (props: IOrderLogoCellProps) => {
        return props.row.original?.uploadDate ? (
          <>
            <div>{getFormatDate(props.row.original?.uploadDate).date} </div>
            <div className="  text-xs font-normal">
              {getFormatDate(props.row.original?.uploadDate).time}
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "approvedDate",
      header: "Approved Date",
      accessorKey: "approvedDate",
      cell: (props: IOrderLogoCellProps) => {
        return props.row.original?.approvedDate ? (
          <>
            <div>{getFormatDate(props.row.original?.approvedDate).date} </div>
            <div className="  text-xs font-normal">
              {getFormatDate(props.row.original?.approvedDate).time}
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "id",
      header: "",
      accessorKey: "id",
      cell: (props: IOrderLogoCellProps) => {
        return (
          <>
            {props.row.original?.status !== "Approved" && (
              <Button
                variant="primary"
                size="md"
                disabled={
                  props.row.original?.logo &&
                  props.row.original?.logoLocation &&
                  props.row.original?.itemDecorationID
                    ? false
                    : true
                }
                onClick={() => {
                  approveCustomerLogo(
                    props.row.original?.customerLogoId.toString()
                  );
                }}
              >
                Approve
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [filteringOptions, setColumnFilteringOptions] = useState([]);

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "createdDate",
      direction: 1,
      priority: 0,
    },
  ]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  const getOrderLogoData = useCallback(
    async (pageIndex = 1): Promise<void> => {
      try {
        setLoading(true);
        // Simulating API call with mock data
        const response = new Promise<any>((resolve) => {
          setTimeout(() => {
            const startIndex = (pageIndex - 1) * paginationData.pageSize;
            const endIndex = startIndex + paginationData.pageSize;
            const paginatedItems = OrderData.orderLogoLocation.items.slice(
              startIndex,
              endIndex
            );

            resolve({
              items: paginatedItems,
              pageIndex: pageIndex,
              pageSize: paginationData.pageSize,
              totalCount: OrderData.orderLogoLocation.items.length,
              totalPages: Math.ceil(
                OrderData.orderLogoLocation.items.length /
                  paginationData.pageSize
              ),

              hasPreviousPage: pageIndex > 1,
              hasNextPage: endIndex < OrderData.orderLogoLocation.items.length,
            });
          }, 1000);
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
        toast.error("Error fetching abandoned cart list");
      } finally {
        setLoading(false);
      }
    },
    [paginationData.pageSize]
  );
  return (
    <>
      <Modal
        isOpen={showOrderLogoTable}
        onClose={() => setShowOrderLogoTable(false)}
        header={"Order Logo"}
        size="7xl"
        content={
          <ReactTable
            isListPage={false}
            COLUMNS={COLUMNS}
            DATA={Data}
            {...paginationData}
            fetchData={getOrderLogoData}
            sortingOptions={sortingOptions}
            hasPreviousPage={paginationData.hasPreviousPage}
            hasNextPage={paginationData.hasNextPage}
            showEditColumns={false}
            showMoreFilters={false}
            usedInsideModal={true}
            displaySearch={false}
            showFilter={false}
            // tablePadding={true}
          />
        }
      />
      {showUploadLogo && (
        <OrderUploadLogo
          item={item}
          setShowUploadLogo={setShowUploadLogo}
          showUploadLogo={showUploadLogo}
        />
      )}
    </>
  );
};

export default OrderLogoTable;

const DecorationTypeDropdown = ({
  DecorationTypeOptions,
  row,
}: {
  DecorationTypeOptions: { value: string; label: string }[];
  row: IOrderLogo;
}) => {
  const [selectedDecorationType, setSelectedDecorationType] = useState<{
    value: string;
    label: string;
  }>(
    DecorationTypeOptions.filter(
      (decorationType) => decorationType.value === row.decorationTypeName
    )[0]
  );
  return (
    <>
      <Dropdown
        options={DecorationTypeOptions}
        onChange={(value) =>
          setSelectedDecorationType(value as { value: string; label: string })
        }
        value={selectedDecorationType}
        placeholder="Select"
      />
      <Button variant="primary" size="md">
        Save
      </Button>
    </>
  );
};

const LogoNoteInput = ({
  row,
  updateLogoNotes,
}: {
  row: IOrderLogo;
  updateLogoNotes: (notes: string, id: string) => void;
}) => {
  const [notes, setNotes] = useState(row.logoNotes);
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="w-full">
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <div>
          <Button
            variant="primary"
            size="md"
            onClick={() => updateLogoNotes(notes, row.logo)}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};
