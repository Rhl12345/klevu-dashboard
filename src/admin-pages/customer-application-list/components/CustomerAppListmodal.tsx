"use client";
import React from "react";

import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/DropDown/DropDown";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import { Label } from "@/components/Label/Label";

import FormField from "@/admin-pages/customer-application-list/components/FormField";
import { ICustomerApplicationModalProps } from "@/types/customer/customer-application-list/customerApplicationList.type";

// Add display name for better debugging
FormField.displayName = "FormField";

const CustomerApplicationModal: React.FC<ICustomerApplicationModalProps> = ({
  isOpen,
  onClose,
  customer,
}) => {
  return (
    <Modal
      size="4xl"
      isOpen={isOpen}
      onClose={onClose}
      header=
       "Customer Application List"
      
      footer={
        <>
          <Button size="sm" variant="outline-secondary" onClick={onClose}>
            Cancel
          </Button>
          {customer?.recStatus === "Pending" && (
            <>
              <Button size="sm" variant="primary" onClick={onClose}>
                Approve
              </Button>
            </>
          )}
          {customer?.recStatus === "Rejected" && (
            <>
              <Button size="sm" variant="primary" onClick={onClose}>
                Reject
              </Button>
            </>
          )}
        </>
      }
      content={
        <>
          <FormField
            label="Name"
            name="name"
            value={customer?.organizationName}
          />
          <FormField label="Email" name="email" value={customer?.email} />
          <FormField
            label="Phone Number"
            name="phone_number"
            value={customer?.phone}
          />
          <FormField
            label="Job Title"
            name="job_title"
            value={customer?.customerName}
          />
          <FormField
            label="Address 1"
            name="address1"
            value={customer?.address1}
          />
          <FormField
            label="Address 2"
            name="address2"
            value={customer?.address2}
          />
          <FormField label="City" name="city" value={customer?.city} />
          <FormField label="State" name="state" value={customer?.state} />
          <FormField
            label="Zip Code"
            name="zip_code"
            value={customer?.zip_code}
          />
          <FormField label="Country" name="country" value={customer?.country} />
          <FormField
            label="Industry"
            name="industry"
            value={customer?.industry}
          />
          <FormField
            label="Department Name"
            name="department_name"
            value={customer?.department_name}
          />
          <FormField
            label="Company Name"
            name="company_name"
            value={customer?.company_name}
          />
          <FormField label="Status" name="status" value={customer?.status} />
          <FormField
            label="Are You An ASI Distributor?"
            name="asi_distributor"
            value={customer?.asi_distributor}
          />
          <FormField
            label="Purpose of Order"
            name="purpose_of_order"
            value={customer?.purpose_of_order}
          />
          <FormField
            label="Styles of Interest"
            name="styles_of_interest"
            value={customer?.styles_of_interest}
          />
          <FormField
            label="Quantity"
            name="quantity"
            value={customer?.quantity}
          />
          <FormField
            label="In-Hand Date"
            name="in_hand_date"
            value={customer?.in_hand_date}
          />
          <FormField
            label="Additional Comments"
            name="additional_comments"
            value={customer?.additional_comments}
          />
          <FormField label="Website" name="website" value={customer?.website} />
          <FormField
            label="Annual Promotional"
            name="annual_promotional"
            value={customer?.annual_promotional}
          />
          <FormField
            label="Is Company Under Supplier"
            name="is_company_under_supplier"
            value={customer?.is_company_under_supplier}
          />
          {customer?.notes && (
            <div className="mb-4">
              <Label>Notes:</Label>
              <Input
                type="text"
                name="notes"
                id="notes"
                value={customer.notes}
                formik={false}
                disabled
              />
            </div>
          )}
          {customer?.customer_number && (
            <div className="mb-4">
              <Label>Customer Number:</Label>
              <Input
                type="text"
                name="customer_number"
                id="customer_number"
                value={customer.customer_number}
                formik={false}
                disabled
              />
            </div>
          )}
          {customer?.tier_name && (
            <div className="w-full mb-4 last:mb-0">
              <Label>Tier Name:</Label>
              <Dropdown
                aria-label="Select "
                defaultValue=""
                id="tier-name"
                label=""
                options={[
                  {
                    label: "One",
                    value: "one",
                  },
                  {
                    label: "Two",
                    value: "two",
                  },
                ]}
                isDisabled={true}
                placeholder="Select ..."
              />
            </div>
          )}
          {customer && (
            <div className="flex gap-16">
              <div className="mb-4">
                <ToggleButton
                  label="Approved for PO / Net Terms"
                  id="toggle-default"
                  name="toggle-default"
                  off="Inactive"
                  on="Active"
                  onChange={() => {}}
                  size="medium"
                  disabled
                />
              </div>
              <div className="mb-4">
                <ToggleButton
                  label="Personalization"
                  id="toggle-default"
                  name="toggle-default"
                  off="Inactive"
                  on="Active"
                  onChange={() => {}}
                  size="medium"
                  disabled
                />
              </div>
            </div>
          )}
        </>
      }
    />
  );
};

export default CustomerApplicationModal;
