import { toast } from "react-toastify";
import { Fragment, useCallback, useEffect, useState } from "react";
import { ICustomerNotes, IOrderDetail } from "@/types/orders/orders.type";
import Input from "@/components/Input/Input";
import { customerNotesValidation } from "@/utils/validations/orders.validation";
import { Formik, Form } from "formik";
import Button from "@/components/Button/Button";
import OrderData from "@/mock-data/OrdersEditData.json";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Checkbox from "@/components/Checkbox/Checkbox";
const CustomerNotes = ({ orderDetail }: { orderDetail: IOrderDetail }) => {
  const [data, setData] = useState<ICustomerNotes[]>(OrderData.customerNotes);
  const [showComments, setShowComments] = useState(true);
  const submitHandler = (values: any, resetForm: any) => {
    setData([
      ...data,
      {
        createdDate: new Date().toISOString(),
        subRows: [
          {
            id: data.length + 1,
            orderNumber: orderDetail.orderNumber,
            createdName: null,
            title: values.title,
            description: values.description,
            createdTime: new Date().toLocaleTimeString(),
            createdDateDisplay: new Date().toLocaleDateString(),
            recStatus: "A",
            createdDate: new Date().toISOString(),
            createdBy: 149,
            modifiedDate: null,
            modifiedBy: null,
            rowVersion: "WwbkycdP3Qg=",
            location: "RI",
            ipAddress: "120.72.90.155",
            macAddress: "00-00-00-00-00-00",
          },
        ],
      },
    ]);
    toast.success("Note added successfully");
    resetForm();
  };
  const getData = useCallback(() => {
    setData(OrderData.customerNotes);
  }, [orderDetail]);
  useEffect(() => {
    if (orderDetail?.orderNumber) {
      getData();
    }
  }, [orderDetail]);
  return (
    <>
      <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
        <div className="w-full flex flex-col gap-4 justify-between border bg-body-light dark:bg-body-dark border-gray-light dark:border-gray-dark p-4 rounded-none">
          <div className="w-full">
            <div className="flex gap-4 items-center justify-between">
              <div className="text-base text-quaternary-dark dark:text-quaternary-light text-left">
                Customer Notes
              </div>
              <div className="">
                <div className="flex space-x-3 items-center rounded-lg w-full text-tertiary-dark dark:text-tertiary-light">
                  <Checkbox
                    id={"showComments"}
                    checked={showComments}
                    onChange={(e) => setShowComments(e.target.checked)}
                    label="Show comments"
                  />
                </div>
              </div>
            </div>
          </div>
          <Formik
            enableReinitialize={true}
            initialValues={{
              id: 0,
              rowVersion: "",
              orderNumber: orderDetail.orderNumber,
              title: "",
              description: "",
              isCreatedByCustomerUser: false,
              recStatus: "A",
              isSystemGenerated: false,
            }}
            validateOnBlur={false}
            onSubmit={(values, { resetForm }) =>
              submitHandler(values, resetForm)
            }
            validationSchema={customerNotesValidation}
          >
            {({ errors, setFieldValue, values }) => {
              return (
                <Form>
                  <div className="w-full py-3 px-3 my-2">
                    <div className="flow-root">
                      <ul className="mb-8">
                        <Step isLastStep={data.length <= 0 || !showComments}>
                          <div className="min-w-0 flex-1 flex justify-between space-x-4">
                            <div className="flex lg:flex-row flex-col gap-2 justify-start w-full">
                              <div className="flex flex-col gap-2">
                                <div className="flex lg:flex-row flex-col gap-2 justify-start w-full">
                                  <div className="">
                                    <Input
                                      name={"title"}
                                      placeholder="Title"
                                      value={values.title}
                                      onChange={(e) =>
                                        setFieldValue("title", e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="">
                                    <Input
                                      name={"description"}
                                      placeholder="Description"
                                      value={values.description}
                                      onChange={(e) =>
                                        setFieldValue(
                                          "description",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <p className="text-left text-sm text-quaternary-dark dark:text-quaternary-light">
                                  Only you and other staff can see comments
                                </p>
                              </div>
                              <div className="">
                                <Button
                                  variant="primary"
                                  size="md"
                                  type="submit"
                                >
                                  Post
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Step>
                        {data.length > 0 &&
                          showComments &&
                          data?.map((value, index) => {
                            return (
                              <Fragment key={index}>
                                {value?.subRows?.map((post, index) => {
                                  return (
                                    <Step
                                      key={index}
                                      isLastStep={
                                        value?.subRows?.length === index + 1 &&
                                        data?.length === index + 1
                                      }
                                    >
                                      {({
                                        showDescription,
                                        setShowDescription,
                                      }: {
                                        showDescription: boolean;
                                        setShowDescription: (
                                          showDescription: boolean
                                        ) => void;
                                      }) => {
                                        return (
                                          <div className="min-w-0 flex-1 pt-1.5">
                                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                              <div>
                                                {index == 0 && (
                                                  <p className="text-sm text-quaternary-dark dark:text-quaternary-light font-bold py-2">
                                                    {post.createdDateDisplay}
                                                  </p>
                                                )}
                                                <div className="relative">
                                                  <div
                                                    onClick={() =>
                                                      setShowDescription(
                                                        !showDescription
                                                      )
                                                    }
                                                    className="flex w-full flex-wrap justify-between items-center text-sm py-2 px-0 border-0"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                  >
                                                    <span className="ml-1 text-sm text-quaternary-dark dark:text-quaternary-light">
                                                      {post.title}
                                                    </span>
                                                    <span className="material-icons-outlined">
                                                      {showDescription ? (
                                                        <SvgIcon
                                                          name="ArrowUp"
                                                          width={16}
                                                          height={16}
                                                          className="text-quaternary-dark dark:text-quaternary-light"
                                                        />
                                                      ) : (
                                                        <SvgIcon
                                                          name="ArrowDown"
                                                          width={16}
                                                          height={16}
                                                          className="text-quaternary-dark dark:text-quaternary-light"
                                                        />
                                                      )}
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="text-right text-sm whitespace-nowrap text-quaternary-dark dark:text-quaternary-light">
                                                <time dateTime="2020-09-20">
                                                  {post?.createdTime}
                                                </time>
                                              </div>
                                            </div>
                                            {showDescription && (
                                              <div className="overflow-hidden ml-1 text-quaternary-dark dark:text-quaternary-light">
                                                {post?.description}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      }}
                                    </Step>
                                  );
                                })}
                              </Fragment>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

const Step = ({
  isLastStep,
  children,
}: {
  isLastStep: boolean;
  children: any;
}) => {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <li>
      <div className="relative pb-8">
        {!isLastStep && (
          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"></span>
        )}
        <div className="relative flex space-x-3">
          <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white mt-2">
            <SvgIcon name="check-circle" width={24} height={24} />
          </div>
          {children instanceof Function
            ? children({ showDescription, setShowDescription })
            : children}
        </div>
      </div>
    </li>
  );
};

export default CustomerNotes;
