import React from "react";
import Image from "@/components/Image/Image";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Modal from "@/components/Modal/Modal";
import { IConsultationRequestCustomer } from "@/types/consultation-request/consultationRequest.type";
import { Formik, Form as FormikForm } from "formik";

const View = ({
  isOpen,
  onClose,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData: IConsultationRequestCustomer;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={"Request Consultation & Proof"}
      size="4xl"
      content={
        <>
          <Formik
            enableReinitialize
            initialValues={initialData}
            onSubmit={() => {}}
          >
            {({ resetForm }) => (
              <FormikForm id="view-form">
                <div>
                  <Label size="large" weight="font-semibold">
                    Contact Information
                  </Label>
                  <div className="w-full grid grid-cols-2 gap-4 py-2">
                    <Input
                      label="Product Name"
                      name="productName"
                      placeholder="Product Name"
                      disabled
                    />
                    <Input
                      label="First Name"
                      name="firstname"
                      placeholder="First Name"
                      disabled
                    />

                    <Input
                      label="Last Name"
                      name="lastname"
                      placeholder="Last Name"
                      disabled
                    />
                    <Input
                      label="Company"
                      name="company"
                      placeholder="Company"
                      disabled
                    />
                    <Input
                      label="Email"
                      name="email"
                      placeholder="Email"
                      disabled
                    />
                    <Input
                      label="Phone"
                      name="companyPhone"
                      placeholder="Phone Number"
                      disabled
                    />
                    <Input
                      label="Desired Quantity"
                      name="desiredQuantity"
                      placeholder="Desired Quantity"
                      disabled
                    />
                    <Input
                      label="Budget Per Recipient"
                      name="budgetPerRecipient"
                      placeholder="Budget Per Recipient"
                      disabled
                    />
                    <div className="flex flex-col gap-2">
                      <Label>Store Logo</Label>
                      <div className="h-24 w-40 p-2 border border-gray-light dark:border-gray-dark flex justify-center items-center">
                        <Image
                          src={
                            "https://redefinecommerce.blob.core.windows.net/storagemedia/1/store/logo_5.svg"
                          }
                          alt="Proof"
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-3">
                  <Label size="large" weight="font-semibold">
                    Optional Information
                  </Label>

                  <div className="w-full grid grid-cols-2 gap-4 py-2">
                    <Input
                      label="In Hand Date"
                      name="inHandsDate"
                      placeholder="In Hand Date"
                      disabled
                    />
                    <Input
                      label="Message"
                      name="message"
                      placeholder="Message"
                    />

                    <div className="flex flex-col gap-2">
                      <Label>Logo Url</Label>
                      <div className="h-24 w-40 p-2 border border-gray-light dark:border-gray-dark flex justify-center items-center">
                        <Image
                          variant="next"
                          aspectRatio="landscape"
                          src={
                            "https://redefinecommerce.blob.core.windows.net/storagemedia/1/store/5/images/headerlogourl_2.png"
                          }
                          alt="Proof"
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </FormikForm>
            )}
          </Formik>
        </>
      }
    />
  );
};

export default View;
