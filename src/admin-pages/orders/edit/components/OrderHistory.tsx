import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Modal from "@/components/Modal/Modal";
import React from "react";

const OrderHistory = ({
  handleModalClose,
}: {
  handleModalClose: () => void;
}) => {
  return (
    <Modal
      size="2xl"
      isOpen={true}
      onClose={handleModalClose}
      header={"Order History"}
      content={
        <div>
          <div className="flex justify-end mb-2 items-center">
            <Label weight="font-normal">PRICE</Label>
            <Input formik={false} value={101.5} />
          </div>

          <div className="flex items-center justify-between mb-2">
            <Label weight="font-normal">Size: XS</Label>
            <div className="flex items-center">
              <Label size="small" weight="font-semibold">
                QUANTITY
              </Label>
              <Input formik={false} value={3} />
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <Label weight="font-normal">Size: SM</Label>
            <div className="flex items-center">
              <Label size="small" weight="font-semibold">
                QUANTITY
              </Label>
              <Input formik={false} value={20} />
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <Label weight="font-normal">Size: MD</Label>
            <div className="flex items-center">
              <Label size="small" weight="font-semibold">
                QUANTITY
              </Label>
              <Input formik={false} value={1} />
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <Label weight="font-normal">Size: LG</Label>
            <div className="flex items-center">
              <Label size="small" weight="font-semibold">
                QUANTITY
              </Label>
              <Input formik={false} value={1} />
            </div>
          </div>
        </div>
      }
      footer={
        <div className="flex gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleModalClose}>
            Save
          </Button>
        </div>
      }
    />
  );
};

export default OrderHistory;
