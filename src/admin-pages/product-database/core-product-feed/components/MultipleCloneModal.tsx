import React, { useState } from "react";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import productsClone from "@/mock-data/productsClone.json";
import Text from "@/components/Text/Text";
import Image from "@/components/Image/Image";
import { toast } from "react-toastify";
import { IMultipleCloneModalProps } from "@/types/core-product-feed/coreProductFeed.type";

const MultipleCloneModal = (props: IMultipleCloneModalProps) => {
  const { isOpen, onClose } = props;
  const [selectedStores, setSelectedStores] = useState<{ [key: number]: boolean }>({});

  const handleCheckboxChange = (storeId: number) => {
    setSelectedStores((prev) => ({
      ...prev,
      [storeId]: !prev[storeId],
    }));
  };

  const handleSave = () => {
    const selectedStoreIds = Object.keys(selectedStores).filter((id) => selectedStores[Number(id)]);
    console.log("Selected Stores:", selectedStoreIds);
    toast.success("Cloning products to selected stores...");
    setSelectedStores({});
    onClose();
  };

  return (
    <Modal
      size="7xl"
      isOpen={isOpen}
      onClose={onClose}
      header={"Store List"}
      content={
        <div className="space-y-6">
          <Input placeholder="Search" formik={false}/>
          <Checkbox id="doNotCloneBCItemId" label="Do not clone BC ITEM ID" />
          {productsClone.data.map((storeType) => (
            <div key={storeType.storeTypeId} className="flex flex-col gap-2 w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
              <Text size="lg">{storeType.storeType}</Text>
              <div className="grid grid-cols-2 lg:grid-cols-7 gap-4">
                {storeType.storeList.map((store) => (
                  <div key={store.storeId} className="border border-gray-light dark:border-gray-dark p-4 flex flex-col gap-4 justify-between items-center relative">
                    <div className="absolute top-1 left-1">
                      <Checkbox
                        id={`store-${store.storeId}`}
                        name={`store-${store.storeId}`}
                        checked={!!selectedStores[store.storeId]}
                        onChange={() => handleCheckboxChange(store.storeId)}
                      />
                    </div>
                    <div className="h-32 flex flex-col justify-center items-center flex-grow">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_MEDIA_BASE_URL_ADMIN}${store.storeImagePath}`}
                        alt={store.storeName}
                        className="min-w-full mx-auto h-auto rounded-t-md p-1"
                        variant="next"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="w-full text-center ">
                      <Text size="sm">{store.storeName}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      }
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} size="sm" variant="outline-secondary" aria-label="Cancel">
            Cancel
          </Button>
          <Button onClick={handleSave} size="sm" variant="primary" aria-label="Save">
            Save
          </Button>
        </div>
      }
    />
  );
};

export default MultipleCloneModal
