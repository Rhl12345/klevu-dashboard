import React from "react";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import { IEmailAbandonedShoppingModelProps } from "@/types/abandoned-shopping-cart/abandonedShoppingCart.type";
import { abandonedCartEmailTemplate } from "@/mock-data/abandonedCartEmailTemplateDummay";

const EmailAbandonedShoppingModel = ({
  setIsEmailModalOpen,
  isEmailModalOpen,
}: IEmailAbandonedShoppingModelProps) => {
  return (
    <Modal
      isOpen={isEmailModalOpen}
      onClose={() => setIsEmailModalOpen(false)}
      header="Send Email"
      size="2xl"
      content={
        <>
          <div className="text-sm flex flex-wrap justify-start text-left -mx-4 bg-body-light">
            <div className="w-full p-4">
              <div className="col-span-12 md:col-span-6 mt-2">
                <div
                  dangerouslySetInnerHTML={{
                    __html: abandonedCartEmailTemplate,
                  }}
                />
              </div>
            </div>
          </div>
        </>
      }
      footer={
        <div className="flex gap-2">
          <Button
            variant="outline-secondary"
            onClick={() => setIsEmailModalOpen(false)}
          >
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={() => {
              setIsEmailModalOpen(false);
            }}
          >
            Send
          </Button>
        </div>
      }
    />
  );
};

export default EmailAbandonedShoppingModel;
