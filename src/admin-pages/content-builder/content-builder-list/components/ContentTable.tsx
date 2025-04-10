import { PageRoutes } from "@/admin-pages/routes";
import TableActionPanel from "@/components/common/TableActionPanel";
import Status from "@/components/DisplayStatus/Status";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { fetchWebsitePageList } from "@/services/content-management/content-builder/websitePage.service";
import {
  IPrimarySelectGroupProduct,
} from "@/types/primary-selection-group/primarySelectionGroup.type";
import { paginationDetails, RecStatusValuebyName } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";
import { WEBSITE_PAGE,LANDING_PAGE, BLOG } from "@/utils/Dummy";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchBlogList } from "@/services/content-management/content-builder/blog.service";
import { fetchLandingPageList } from "@/services/content-management/content-builder/landingPage.service";
import { IContentModalType,IContentPageListRequest, IContentPage } from "@/types/content-management/content-builder/contentBuilder.type";
import { MODAL_TYPES } from "@/mock-data/formBuilder";
import Link from "next/link";

const ContentTable = ({tabName}:{tabName: string}) => {
  const [filteringOptions, setColumnFilteringOptions] = useState<any[]>([]);
  const [contentData, setContentData] = useState<
    IPrimarySelectGroupProduct[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "storeName",
      direction: 0,
      priority: 0,
    },
  ]);
  const [deleteConformationError, setDeleteConformationError] = useState("");
  const [deleteInput, setDeleteInput] = useState("");
  const [selectedContent, setSelectedContent] =
    useState<IContentPage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: IContentModalType | null;
  }>({ isOpen: false, type: null });

  const handleModalOpen = useCallback(
    (type: IContentModalType, selectedContent: IContentPage) => {
      setSelectedContent(selectedContent);
      setIsModalOpen({ isOpen: true, type });
    },
    []
  );

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedContent(null);
  };

  const handleStatusChange = async () => {
    try {
      toast.success("Content Builder status updated successfully");
      handleModalClose();
    } catch (error) {
      console.error("Error updating content builder status:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (deleteInput !== "delete") {
        setDeleteConformationError(
          "Please type 'delete' to verify that you want to delete this record."
        );
        return;
      }
      handleModalClose();
    } catch (error) {
      console.error("Error deleting content builder:", error);
    }
  };

  const COLUMNS: ITableColumn<IContentPage>[] = [
    {
      id: "title",
      header: "NAME AND URL",
      accessorKey: "title",
      cell: ({ row }) => (
        <Link href={`${PageRoutes.CONTENT_MANAGEMENT.EDIT}/${row.original.id}`}>
          <div className="text-sm">{row.original.title}</div>
          <div className="text-xs">{row.original.slug}</div>
        </Link>
      ),
    },
    {
      id: "status",
      header: "PUBLISH STATUS",
      accessorKey: "status",
      cell: ({ row }) => <Status type={row.original.status || ""} />,
    },
    {
        id: "updatedAT",
        accessorKey: "updatedAT",
        header: "Updated Date",
        filterFn: "customDateFilter",
        cell: ({ getValue }: { getValue: () => string | null }) => {
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
      id: "modifiedName",
      header: "UPDATED BY",
      accessorKey: "modifiedName",
      cell: ({ row }) => <div className="text-sm">{row.original.modifiedName}</div>,
    },
    {
      id: "domainName",
      header: "DOMAIN",
      accessorKey: "domainName",
    },
    {
        id: "action",
        accessorKey: "action",
        header: "Action",
        cell: (props: any) => {
          const couponCode = props.row.original;
          return (
            <TableActionPanel
              edit={{
                show: true,
                url: `${PageRoutes.CONTENT_MANAGEMENT.EDIT}/${props.row.original.id}`,
              }}
              remove={{
                show: true,
                onClick: () => handleModalOpen("delete", couponCode),
              }}
              clone={{
                show: true,
                onClick: () => handleModalOpen("clone", couponCode),
              }}
            />
          );
        },
      },
  ];

    const fetchContentList = useCallback(
      async (pageIndex = 0): Promise<void> => {
        try {
          let responseData: any;
          setIsLoading(true);
          const request: IContentPageListRequest = {
          pageIndex,
          pageSize: paginationData.pageSize,
          sortingOptions: [],
        };
        if(tabName === WEBSITE_PAGE){
          responseData = await fetchWebsitePageList(request);
        }else if(tabName === LANDING_PAGE){
          responseData = await fetchLandingPageList(request);
        }else if(tabName === BLOG){
          responseData = await fetchBlogList(request);
        }
        setContentData(responseData.items);
        setPaginationData((prevState) => ({
          ...prevState,
          pageIndex: responseData?.pageIndex,
          pageSize: responseData?.pageSize,
          totalCount: responseData?.totalCount,
          totalPages: responseData?.totalPages,
          hasPreviousPage: responseData?.hasPreviousPage,
          hasNextPage: responseData?.hasNextPage,
        }));
      } catch (error) {
        toast.error("Failed to fetch content list");
        console.error("Error fetching content list:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [paginationData.pageSize]
  );

  useEffect(() => {
    fetchContentList();
  }, [fetchContentList]);

  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  const updatePaginationData = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <div>
      <ReactTable
        DATA={contentData}
        COLUMNS={COLUMNS}
        fetchData={fetchContentList}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          updatePaginationData("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        checkboxSelection={false}
        showMoreFilters={false}
        showFilter
        showEditColumns
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        loading={isLoading}
      />

      {/* Delete Modal */}
      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          title="Delete"
          itemName="Content Builder"
          onDelete={handleDelete}
        />
      )}

      {isModalOpen.isOpen &&
        isModalOpen.type === MODAL_TYPES.ACTIVE_INACTIVE && (
          <StatusChangeModel
            isOpen={isModalOpen.isOpen}
            onClose={handleModalClose}
            onConfirm={handleStatusChange}
            currentRowData={{
              recStatus:
                  selectedContent?.status === RecStatusValuebyName.Active
                  ? "active"
                  : "inactive",
              quantityName: "Content Builder",
              recordName: "Content Builder",
            }}
            title={`${selectedContent?.status === RecStatusValuebyName.Active ? "Inactive" : "Active"} Status`}
            message={`Are you sure you want to ${selectedContent?.status === RecStatusValuebyName.Active ? "inactive" : "active"} this content builder?`}
          />
        )}
    </div>
  );
};

export default ContentTable;
