"use client";
import Button from "@/components/Button/Button";
import ChartHeader from "@/components/charts/ChartHeader";
import DateCell from "@/components/common/DateCell";
import Loader from "@/components/common/Loader";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Modal from "@/components/Modal/Modal";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { storeOptions } from "@/mock-data/couponCode";
import { getMailLogs } from "@/services/mail-log/mailLog.service";
import { IIsModalOpen, IMailLogItem } from "@/types/mail-log/mailLog.type";
import { getErrorMessage } from "@/utils/common.util";
import { paginationDetails } from "@/utils/constants";
import { MailLogValidationSchema } from "@/utils/validations/mailLog.validation";
import { Formik, Form as FormikForm } from "formik";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { toast } from "react-toastify";
const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor/RichTextEditor"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const MailLog = () => {
  const [data, setData] = useState<IMailLogItem[]>([]);
  const [mailLogDetailIndex, setMailLogDetailIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<IIsModalOpen>({
    type: null,
    isOpen: false,
  });
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [pagination, setPagination] = useState({
    ...paginationDetails,
  });
  const [filteringOptions, setColumnFilteringOptions] = useState<
    { filter: string; name: string }[]
  >([]);
  const selectedMailLog = data?.[mailLogDetailIndex];

  const INITIAL_VALUES = {
    fromEmail: selectedMailLog?.fromEmail || "",
    toEmail: selectedMailLog?.toEmail || "",
    subject: selectedMailLog?.subject || "",
    body: selectedMailLog?.body || "",
    storeEmailLogo: [],
  };

  const columns: ITableColumn[] = [
    {
      id: "productName",
      accessorKey: "fromEmail",
      header: "From Email",
    },
    { id: "toEmail", accessorKey: "toEmail", header: "To Email" },
    { id: "storeName", accessorKey: "storeName", header: "Store Name" },
    {
      id: "subject",
      accessorKey: "subject",
      header: "Subject",
    },
    { id: "ipAddress", accessorKey: "ipAddress", header: "IP Address" },
    {
      id: "sentOn",
      accessorKey: "sentOn",
      header: "Sent On",
      cell: (props) => <DateCell date={props.getValue()} />,
    },
    {
      id: "view",
      accessorKey: "resendMail",
      header: "View",
      cell: (props) => {
        return (
          <Button
            variant="default"
            icon={<SvgIcon name="EyeOpen" width={16} height={16} />}
            size="sm"
            onClick={() => {
              setMailLogDetailIndex(props.row.index);
              setIsModalOpen({ type: "viewMail", isOpen: true });
            }}
          />
        );
      },
    },
    {
      id: "sendMail",
      accessorKey: "sendMail",
      header: "Send Mail",
      cell: (props) => {
        return (
          <Button
            variant="default"
            icon={<SvgIcon name="mail-01" width={16} height={16} />}
            size="sm"
            onClick={() => {
              setMailLogDetailIndex(props.row.index);
              setIsModalOpen({ type: "sendMail", isOpen: true });
            }}
          />
        );
      },
    },
    {
      id: "resendMail",
      accessorKey: "resendMail",
      header: "Resend Mail",
    },
  ];

  const setPaginationDataFunc = (key: string, value: string | number) => {
    setPagination((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getMailLogList = async () => {
    try {
      const response = await getMailLogs();
      setData(response.items);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleExport = async () => {
    try {
      toast.success("Exported successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleClose = () => {
    setIsModalOpen({ type: null, isOpen: false });
  };

  const onSubmit = async (values: typeof INITIAL_VALUES) => {
    try {
      toast.success("Mail sent successfully");
      handleClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <ListPageHeader moduleName={"Mail Log"}>
        <Button onClick={handleExport}>Export</Button>
        <Dropdown
          id="storeName"
          name="storeName"
          options={storeOptions}
          className="lg:w-48"
        />
      </ListPageHeader>

      <div className="border border-b-0 border-gray-light dark:border-gray-dark xl:mx-8 mx-4 xl:mt-8 mt-4 border-b-transparent ">
        <ChartHeader
          dateFilter={{
            showDateFilter: true,
            startDate: startDate,
            endDate: endDate,
            onStartDateChange: (date: Date) => {
              setStartDate(date);
            },
            onEndDateChange: (date: Date) => {
              setEndDate(date);
            },
          }}
        />
      </div>

      <ReactTable
        DATA={data}
        COLUMNS={columns}
        fetchData={getMailLogList}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        showFilter={false}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        {...pagination}
        totalCount={data.length}
      />

      <Modal
        size="2xl"
        isOpen={isModalOpen.isOpen && isModalOpen.type === "sendMail"}
        onClose={handleClose}
        header="Reply Email"
        content={
          <Formik
            enableReinitialize={true}
            initialValues={INITIAL_VALUES}
            validationSchema={MailLogValidationSchema}
            onSubmit={onSubmit}
          >
            {({ values }) => (
              <FormikForm id="reply-email-form" className="flex flex-col gap-2">
                <Input
                  label="From"
                  name="fromEmail"
                  disabled
                  asterisk
                  value={values.fromEmail}
                />
                <Input
                  label="To"
                  name="toEmail"
                  asterisk
                  value={values.toEmail}
                />
                <Input
                  label="Subject"
                  name="subject"
                  placeholder="Enter subject"
                  asterisk
                  value={values.subject}
                />
                <Label required>Body</Label>
                <RichTextEditor placeholder="Enter your message" />
                <Label>Attachments</Label>
                <Input type="file" name="storeEmailLogo" />
              </FormikForm>
            )}
          </Formik>
        }
        footer={
          <>
            <Button size="sm" variant="outline-primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="reply-email-form"
              size="sm"
              variant="primary"
            >
              Send
            </Button>
          </>
        }
      />

      <Modal
        size="2xl"
        isOpen={isModalOpen.isOpen && isModalOpen.type === "viewMail"}
        onClose={handleClose}
        header="View Mail"
        content={
          <div
            className="flex justify-center items-center"
            dangerouslySetInnerHTML={{ __html: selectedMailLog?.body || "" }}
          />
        }
      />
    </>
  );
};

export default MailLog;
