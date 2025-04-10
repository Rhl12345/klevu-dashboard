import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { twMerge } from "tailwind-merge";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Dropdown from "@/components/DropDown/DropDown";

import { PaginationOptions } from "@/utils/constants";

import { IPaginationProps } from "@/components/Table/types";

const TablePagination = ({
  totalCount,
  pageIndex,
  totalPages,
  pageSize,
  setTablePageSize,
  hasPreviousPage,
  hasNextPage,
  fetchData,
  hasPageSize,
  onGotoPage,
}: IPaginationProps) => {
  const [inputPage, setInputPage] = useState<string>("");

  const commonClassName =
    "inline-flex items-center justify-center px-4 max-md:px-2.5 h-10 overflow-hidden relative border border-gray-light dark:border-gray-dark leading-tight text-quaternary-dark dark:text-quaternary-light hover:text-primary-light dark:hover:text-quaternary-dark hover:bg-gray-pointer";

  useEffect(() => {
    setInputPage(pageIndex?.toString() || "");
  }, [pageIndex]);

  return (
    <>
      {totalCount && totalCount > 0 ? (
        <div className="w-full flex max-xl:flex-wrap p-4 items-center justify-between border border-t-0 border-gray-light dark:border-gray-dark gap-4">
          <div className="w-full flex flex-col xl:flex-row xl:w-2/6 items-center gap-2">
            {hasPageSize && (
              <>
                <div className="w-full xl:w-1/2 max-lg:flex max-lg:justify-center max-lg:mx-auto">
                  <Dropdown
                    name="pageSize"
                    options={PaginationOptions}
                    defaultValue={pageSize}
                    onChange={(value: any) => setTablePageSize?.(value.value)}
                    menuPlacement="auto"
                    wrapperClassName="gap-y-0 max-w-48"
                  />
                </div>
              </>
            )}
          </div>
          <div className="w-full xl:w-2/6 justify-center break-words">
            <p className="text-sm text-quaternary-dark dark:text-quaternary-light flex flex-wrap justify-center">
              Showing
              <span className="font-semibold px-1">
                &nbsp;
                {pageIndex &&
                  pageSize &&
                  (pageIndex === 1 ? 1 : (pageIndex - 1) * pageSize + 1)}
              </span>
              &nbsp;to
              <span className="font-semibold px-1">
                &nbsp;
                {pageIndex && pageSize && pageIndex * pageSize <= totalCount
                  ? pageIndex * pageSize
                  : totalCount}
              </span>
              &nbsp;of
              <span className="font-semibold px-1">&nbsp;{totalCount}</span>
              &nbsp;results
            </p>
          </div>

          <div className="flex w-full xl:w-4/6 gap-x-2 justify-center xl:justify-end max-xl:flex-col gap-2">
            <div className="flex justify-center">
              <ReactPaginate
                breakLabel="..."
                nextLabel={<SvgIcon name="ArrowRight" width={2} height={2} />}
                previousLabel={
                  <SvgIcon name="ArrowLeft" width={2} height={2} />
                }
                containerClassName="sm:mb-0 sm:order-1 flex max-md:flex-wrap max-md:mx-auto"
                previousLinkClassName={twMerge(commonClassName, "px-2")}
                nextLinkClassName={twMerge(commonClassName, "px-2")}
                disabledClassName="pagination-disabled"
                breakClassName={commonClassName}
                activeLinkClassName={
                  "inline-flex items-center justify-center px-4 overflow-hidden relative border border-gray-light dark:border-gray-dark leading-tight text-quaternary-dark dark:text-quaternary-light [&.active]:bg-gray-selected dark:[&.active]:bg-gray-dark [&.active]:text-white dark:[&.active]:text-white active"
                }
                pageLinkClassName={commonClassName}
                disableInitialCallback
                onPageChange={(pagenumber) =>
                  fetchData?.(pagenumber?.selected + 1)
                }
                pageRangeDisplayed={4}
                marginPagesDisplayed={1}
                pageCount={totalPages || 0}
                forcePage={pageIndex ? pageIndex - 1 : 0}
              />
            </div>

            <div className="flex justify-center">
              {onGotoPage && totalPages && totalPages > 1 && (
                <div className="flex items-center gap-x-2">
                  <div className="flex flex-col gap-x-2">
                    <Input
                      formik={false}
                      name="gotoPage"
                      type="number"
                      min={1}
                      max={totalPages}
                      value={inputPage}
                      className="block w-full h-10 bg-body-light dark:bg-body-dark placeholder-quaternary-dark dark:placeholder-quaternary-light border border-gray-light dark:border-gray-dark hover:border-gray-light dark:hover:border-gray-dark text-quaternary-dark dark:text-quaternary-light focus:ring-0 focus:shadow-none px-3 rounded-none dropDownElem_unique py-2"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "0" || Number(value) > totalPages) return;
                        setInputPage(value);
                      }}
                      placeholder={`${pageIndex}`}
                    />
                  </div>
                  <Button
                    variant="primary"
                    className="btn-md"
                    onClick={() => inputPage && fetchData?.(Number(inputPage))}
                  >
                    Go To Page
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default TablePagination;
