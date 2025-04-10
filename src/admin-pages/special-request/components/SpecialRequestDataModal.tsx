"use client";
import React, { useMemo } from "react";
import Button from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker";
import Image from "@/components/Image/Image";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Modal from "@/components/Modal/Modal";
import {
  IFieldConfig,
  ISpecialRequestDataModal,
  IFormValues,
} from "@/types/special-request/specialRequest.type";
import { Formik } from "formik";

const SpecialRequestDataModal = ({
  handleShowModal,
  modalInformation,
  isOpen,
  showSubmitButton = false,
}: ISpecialRequestDataModal) => {
  // Memoized field configurations
  const fields: IFieldConfig[] = useMemo(
    () => [
      {
        label: "Store Name",
        value: modalInformation?.storeName ?? null,
        type: "text",
        name: "store_name",
      },
      {
        label: "Customer Name",
        value:
          modalInformation?.first_name && modalInformation?.last_name
            ? `${modalInformation.first_name} ${modalInformation.last_name}`
            : null,
        type: "text",
      },
      { label: "Email", value: modalInformation?.email ?? null, type: "text" },
      {
        label: "Ship Customer Name",
        value:
          modalInformation?.shipFirstName && modalInformation?.shipLastName
            ? `${modalInformation.shipFirstName} ${modalInformation.shipLastName}`
            : null,
        type: "text",
      },
      {
        label: "Ship To Address",
        value: modalInformation?.shipAddress1 ?? null,
        type: "address",
      },
      {
        label: "Item Name",
        value: modalInformation?.itemName ?? null,
        type: "text",
      },
      {
        label: "Item Color",
        value: modalInformation?.color ?? null,
        type: "text",
      },
      {
        label: "Size & Quantity Requested",
        value: modalInformation?.quantity ?? null,
        type: "text",
      },
      {
        label: "Special Request",
        value: modalInformation?.specialRequest ?? null,
        type: "text",
      },
      {
        label: "Before InHandDate",
        value: modalInformation?.beforeInHandDate ?? null,
        type: "date",
      },
      {
        label: "Need-By Date",
        value: modalInformation?.inHandDate ?? null,
        type: "date",
      },
      {
        label: "Company Phone Number",
        value: modalInformation?.phone ?? null,
        type: "text",
      },
      {
        label: "Company Name",
        value: modalInformation?.organizationName ?? null,
        type: "text",
      },
      {
        label: "Reason For Give Away Purpose",
        value: modalInformation?.reasonForGiveAwayPurpose ?? null,
        type: "text",
      },
      {
        label: "Additional Comments Or Request",
        value: modalInformation?.additionalCommentsOrRequest ?? null,
        type: "text",
      },
      {
        label: "Ideas Particular Items Of Interest",
        value: modalInformation?.ideasParticularItemsOfInterest ?? null,
        type: "text",
      },
      {
        label: "Event Name",
        value: modalInformation?.eventName ?? null,
        type: "text",
      },
      {
        label: "Target Audience",
        value: modalInformation?.targetAudience ?? null,
        type: "text",
      },
      {
        label: "Message",
        value: modalInformation?.message ?? null,
        type: "text",
      },
      {
        label: "Reason",
        value: modalInformation?.reason ?? null,
        type: "text",
      },
      { label: "Sport", value: modalInformation?.sport ?? null, type: "text" },
      {
        label: "Budget",
        value: modalInformation?.budget ?? null,
        type: "text",
      },
      {
        label: "Request GiveAway",
        value: modalInformation?.requestGiveAway ?? false,
        type: "boolean",
      },
      {
        label: "Desired Branding Uniti Logo",
        value: modalInformation?.isDesiredBrandingUnitiLogo ?? false,
        type: "boolean",
      },
      {
        label: "Desired Branding Other Existing Logo",
        value: modalInformation?.isDesiredBrandingOtherExistingLogo ?? false,
        type: "boolean",
      },
      {
        label: "Desired Branding New Logo Or Graphic",
        value: modalInformation?.isDesiredBrandingNewLogoOrGraphic ?? false,
        type: "boolean",
      },
      {
        label: "Brand Preference",
        value: modalInformation?.brandPreference ?? null,
        type: "text",
      },
      { label: "Logo", value: modalInformation?.logo ?? null, type: "image" },
    ],
    [modalInformation]
  );

  const initialValues: IFormValues = useMemo(() => {
    return fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.label.toLowerCase().replace(/\s+/g, "_")]: field.value,
      }),
      {} as IFormValues
    );
  }, [modalInformation]);

  const handleSubmit = (values: IFormValues) => {};

  // Updated renderField function
  const renderField = (field: IFieldConfig) => {
    const baseClasses = "w-full lg:w-8/12";
    switch (field.type) {
      case "text":
        return (
          <div className={baseClasses}>
            <Input
              defaultValue={field.value as string}
              disabled
              id={field.label}
              name={field.label}
              className="text-base"
            />
          </div>
        );
      case "date":
        return (
          <div className={baseClasses}>
            <DatePicker
              disabledLogo={true}
              name="date"
              disabled
              defaultDate={
                field.value ? new Date(field.value as string) : undefined
              }
            />
          </div>
        );

      case "boolean":
        return (
          <div className={baseClasses}>
            <Input
              defaultValue={field.value === true ? "Yes" : "No"}
              disabled
              id={field.label}
              name={field.label}
              // checked={field.value as boolean}
            />
          </div>
        );

      case "address":
        return (
          <div className={baseClasses}>
            <Input
              type="text"
              disabled
              name={field.label}
              defaultValue={field.value as string}
              className="cursor-not-allowed"
            />
          </div>
        );

      case "image":
        return (
          <div className="pl-7 font-bold flex items-center justify-center border-spacing-1 border-dashed border-2 border-gray-light dark:border-gray-dark rounded-none h-36 w-full max-w-80 text-center grow">
            <div className="flex items-center h-40">
              <Image src={field.value as string} className="w-full h-9" />
            </div>
          </div>
        );

      default:
        return (
          <div className={baseClasses}>
            <Input
              defaultValue={field.value as string}
              disabled
              id={field.label}
              name={field.label}
              className="text-base"
            />
          </div>
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleShowModal}
      header="Special Request"
      size="7xl"
      content={
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="w-full">
              <div className="w-full flex flex-wrap gap-6">
                {fields.map((field, index) => (
                  <div
                    key={index}
                    className="flex max-md:flex-wrap w-full gap-4 items-center"
                  >
                    <Label className="w-full lg:w-4/12">{field.label} : </Label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
              {showSubmitButton && (
                <div className="mt-6 flex justify-end">
                  <Button type="submit" className="">
                    Submit
                  </Button>
                </div>
              )}
            </form>
          )}
        </Formik>
      }
    />
  );
};

export default SpecialRequestDataModal;
