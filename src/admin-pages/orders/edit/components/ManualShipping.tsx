import React, { useCallback, useState } from "react";
import Modal from "@/components/Modal/Modal";
import manualShipping from "@/mock-data/manualShipping.json";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import {
  IManualShippingList,
  ManualShippingProps,
} from "@/types/manual-shipping/manualShipping.type";
import TableActionPanel from "@/components/common/TableActionPanel";
import { Formik, Form as FormikForm } from "formik";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/DropDown/DropDown";
import { Textarea } from "@/components/Textarea/Textarea";
import { shippingViaOptions } from "@/utils/Dummy";
import Button from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker";
import Image from "@/components/Image/Image";
import Text from "@/components/Text/Text";
import ManualShippingForm from "./ManualShippingForm";

const ManualShipping = ({
  isOpen,
  handleModalClose,
  orderDetail,
}: ManualShippingProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IManualShippingList | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const getManualShippingList = useCallback(async () => {
    // API call implementation
    setManualShippingList(manualShipping.data);
  }, []);
  const [filteringOptions, setColumnFilteringOptions] = useState<
    { filter: string; name: string }[]
  >([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [manualShippingList, setManualShippingList] = useState<
    IManualShippingList[]
  >([]);
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "vendorName",
      direction: 0,
      priority: 0,
    },
  ]);
  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };
  const COLUMNS: ITableColumn<IManualShippingList>[] = [
    {
      id: "product_name",
      accessorKey: "product_name",
      header: "Line Items",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <Image
              src={row.original.img}
              alt="dummayData"
              className="w-24 h-24"
            />
            <div className="">
              <Text size="sm">{row.original.product_name}</Text>
              <Text size="sm">{`Size:  ${row.original.size}    Qty:  ${row.original.quantity} $${row.original.price_per_item}/Qty`}</Text>
            </div>
          </div>
        );
      },
    },
    {
      id: "quantity",
      accessorKey: "quantity",
      header: "quantity",
      enableSorting: false,
    },

    {
      id: "shipped_items",
      accessorKey: "shipped_items",
      header: "shipped items",
      enableSorting: false,
    },
    {
      id: "tracking_number",
      accessorKey: "tracking_number",
      header: "tracking#",
      enableSorting: false,
    },
    {
      id: "shipped_on",
      accessorKey: "shipped_on",
      header: "shipped on",
      enableSorting: false,
    },
    {
      id: "shipped_note",
      accessorKey: "shipped_note",
      header: "shipped note",
      enableSorting: false,
    },
    {
      id: "shipped_via",
      accessorKey: "shipped_via",
      header: "shipped via",
      enableSorting: false,
    },
    {
      id: "shipped",
      accessorKey: "shipped",
      header: "shipped",
      enableSorting: false,
    },
    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: (props) => {
        return (
          <>
            <TableActionPanel
              collapsible={false}
              edit={{
                show: true,
                onClick: () => {
                  setSelectedRow(props.row.original);
                  setIsEditModalOpen(true);
                },
              }}
            />
          </>
        );
      },
    },
  ];
  const initialValues = {};
  const EmailAutorespondersSchema = {};
  const contentForm = (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={EmailAutorespondersSchema}
        onSubmit={() => {}}
      >
        {({ errors, setFieldValue, values }) => {
          return (
            <FormikForm id="email-auto-responders-form">
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="w-full last:mb-0">
                  <Input
                    label="Tracking #"
                    name="tracking"
                    id="tracking"
                    placeholder="Enter your tracking"
                  />
                </div>
                <div className="w-full last:mb-0">
                  <Dropdown
                    label="Shipped Via"
                    name="shippedVia"
                    id="shippedVia"
                    options={shippingViaOptions}
                    placeholder="select your shipped..."
                  />
                </div>
                <div className="w-full last:mb-0">
                  <DatePicker
                    name="startDate"
                    label="Shipped On"
                    onChange={(date: any) => setFieldValue("startDate", date)}
                  />
                </div>

                <div className="w-full  mb-4 last:mb-0 ">
                  <Textarea
                    label="Shipped Note"
                    placeholder="Enter your text here..."
                    rows={1}
                    name="ShippedNote"
                    isFormikField
                  />
                </div>
              </div>
              <Button className="" size="sm">
                Add for all
              </Button>
            </FormikForm>
          );
        }}
      </Formik>

      <ReactTable
        DATA={manualShippingList}
        COLUMNS={COLUMNS}
        fetchData={getManualShippingList}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        displaySearch={false}
        usedInsideModal={true}
        isListPage={false}
        showFilter={false}
        noData="No Manual Shipping data available"
        loading={isLoading}
        showPagination={false}
      />
      <ManualShippingForm
        isOpen={isEditModalOpen}
        handleModalClose={() => setIsEditModalOpen(false)}
        rowData={selectedRow}
      />
    </>
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        header="Manual Shipping"
        content={contentForm}
        size="7xl"
        footer={
          <>
            <Button className="" size="sm">
              Update and Send Mail
            </Button>
            <Button className="" size="sm">
              Update
            </Button>
          </>
        }
      />
    </>
  );
};

export default ManualShipping;
