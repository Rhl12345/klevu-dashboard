"use client";
import React, { useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import Button from "@/components/Button/Button";
import ContentHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";
import Status from "@/components/DisplayStatus/Status";
import TableActionPanel from "@/components/common/TableActionPanel";
import StatusChangeModel from "@/components/Modal/StatusModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import { toast } from "react-toastify";
import FAQModal from "@/components/common/product/customer-faq-tab/FAQModal";
import { IFAQData } from "@/types/product-faq/productFaq.types";
import { FAQ_DATA } from "@/mock-data/productFaq";
import { ITableColumn } from "@/components/Table/types";

const CustomerFAQ = () => {
  // State for FAQ data
  const [faqData] = useState<IFAQData[]>(FAQ_DATA);

  // Update the modalState type to include 'create' and 'edit' types
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "status" | "delete" | "create" | "edit" | "";
    selectedRow: IFAQData | null;
  }>({
    isOpen: false,
    type: "",
    selectedRow: null,
  });

  // Handle FAQ submission (create/edit)
  const handleFAQSubmit = (data: { question: string; answer: string }) => {
    if (modalState.type === "create") {
      // Adding FAQ
      toast.success("FAQ created successfully");
    } else if (modalState.type === "edit" && modalState.selectedRow) {
      // Updating FAQ
      toast.success("FAQ updated successfully");
    }
    setModalState({ isOpen: false, type: "", selectedRow: null });
  };

  const handleAction = (modalType: string) => {
    if (modalType === "status") {
      toast.success("Status changed successfully");
    } else if (modalType === "delete") {
      toast.success("FAQ deleted successfully");
    }
  };

  // Define table columns
  const COLUMNS: ITableColumn<IFAQData>[] = [
    {
      id: "question",
      header: "Questions",
      accessorKey: "question",
      cell: (info: any) => info.getValue(),
    },
    {
      id: "answer",
      header: "Answers",
      accessorKey: "answer",
      cell: (info: any) => info.getValue(),
    },
    {
      id: "createdDate",
      header: "CREATED Date",
      accessorKey: "createdDate",
      cell: (info: any) => (
        <div>
          <div>{info.row.original.createdDate}</div>
          <div className="text-xs font-normal">
            {info.row.original.createdTime}
          </div>
        </div>
      ),
    },
    {
      id: "createdBy",
      header: "Created BY",
      accessorKey: "createdBy",
      cell: (info: any) => info.getValue(),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => <Status type="A" />,
    },
    {
      id: "action",
      header: "Action",
      accessorKey: "action",
      cell: (info: any) => (
        <TableActionPanel
          status={{
            show: true,
            status: info.row.original.status.toLowerCase(),
            onClick: () =>
              setModalState({
                isOpen: true,
                type: "status",
                selectedRow: info.row.original,
              }),
          }}
          edit={{
            show: true,
            onClick: () =>
              setModalState({
                isOpen: true,
                type: "edit",
                selectedRow: info.row.original,
              }),
          }}
          remove={{
            show: true,
            onClick: () =>
              setModalState({
                isOpen: true,
                type: "delete",
                selectedRow: info.row.original,
              }),
          }}
        />
      ),
    },
  ];

  return (
    <div className="border border-gray-light dark:border-gray-dark xl:p-2 bg-body-light dark:bg-body-dark">
      <div className="flex flex-col gap-4 dark:border-gray-dark">
        <ContentHeader name="Customer FAQ">
          <Button
            type="button"
            variant="primary"
            onClick={() =>
              setModalState({ isOpen: true, type: "create", selectedRow: null })
            }
          >
            Add Question
          </Button>
        </ContentHeader>

        <ReactTable
          COLUMNS={COLUMNS}
          DATA={faqData}
          pageIndex={1}
          pageSize={25}
          totalCount={faqData.length}
          isListPage={false}
          showPagination={true}
          showFilter={true}
          displaySearch="left"
          sortingOptions={[]}
        />

        {/* Add Modals */}
        <StatusChangeModel
          isOpen={modalState.isOpen && modalState.type === "status"}
          onClose={() =>
            setModalState({ isOpen: false, type: "", selectedRow: null })
          }
          onConfirm={() => handleAction(modalState.type)}
          currentRowData={{
            recStatus: modalState.selectedRow?.status || "active",
            recordName: "FAQ",
          }}
        />

        <DeleteModal
          isOpen={modalState.isOpen && modalState.type === "delete"}
          onClose={() =>
            setModalState({ isOpen: false, type: "", selectedRow: null })
          }
          onDelete={() => handleAction(modalState.type)}
        />

        <FAQModal
          isOpen={
            modalState.isOpen &&
            (modalState.type === "create" || modalState.type === "edit")
          }
          onClose={() =>
            setModalState({ isOpen: false, type: "", selectedRow: null })
          }
          onSubmit={handleFAQSubmit}
          initialData={
            modalState.type === "edit"
              ? {
                  question: modalState.selectedRow?.question || "",
                  answer: modalState.selectedRow?.answer || "",
                }
              : undefined
          }
          mode={modalState.type === "create" ? "create" : "edit"}
        />
      </div>
    </div>
  );
};

export default CustomerFAQ;
