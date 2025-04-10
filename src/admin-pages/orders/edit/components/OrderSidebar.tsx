import Button from "@/components/Button/Button";
import Status from "@/components/DisplayStatus/Status";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Text from "@/components/Text/Text";
import { Textarea } from "@/components/Textarea/Textarea";
import { useState } from "react";
import { toast } from "react-toastify";

const OrderSidebar = () => {
  const options = [
    { label: "New", value: "new" },
    { label: "Pending", value: "pending" },
    { label: "Shipped", value: "shipped" },
    { label: "Hold", value: "hold" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Partially Shipped", value: "partially_shipped" },
    { label: "Expired", value: "expired" },
  ];

  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [orderNotes, setOrderNotes] = useState<string>("");
  const [internalNotes, setInternalNotes] = useState<string>("");
  const [shippedNotes, setShippedNotes] = useState<string>("");

  const handleSaveOrderNotes = () => {
    setOrderNotes("");
    toast.success("Order notes saved successfully");
  };

  const handleSaveInternalNotes = () => {
    setInternalNotes("");
    toast.success("Internal notes saved successfully");
  };

  const handleSaveShippedNotes = () => {
    setShippedNotes("");
    toast.success("Shipped notes saved successfully");
  };

  const handleUploadDocuments = () => {
    toast.success("Documents uploaded successfully");
  };

  const handleAddTag = () => {
    if (tag) {
      setTags([...tags, tag]);
      setTag("");
      toast.success("Tag added successfully");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    toast.success("Tag removed successfully");
  };

  const handleUpdateTrackingInfo = () => {
    toast.success("Tracking info updated successfully");
  };

  const handleUpdateTrackingInfoAndSendEmail = () => {
    toast.success("Tracking info updated successfully and email sent");
  };

  return (
    <>
      <div>
        <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4 mt-2">
          <div className="flex flex-col gap-2 max-w-sm mx-auto">
            <Dropdown options={options} label="Order Status" id="" name="" />
            <div className="mt-2">
              <Label>BC Status</Label>
              <Status type="Pending" />
            </div>
          </div>
        </div>
        <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4 mt-2">
          <div className="flex flex-col gap-2 max-w-sm mx-auto">
            <Label>Tracking Info</Label>
            <Input formik={false} label="Tracking #" id="" name="" />
            <Dropdown
              options={options}
              label="Shipped Via"
              id="shippedVia"
              name="shippedVia"
            />
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleUpdateTrackingInfo}
              >
                Update
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleUpdateTrackingInfoAndSendEmail}
              >
                Update & Send Email
              </Button>
            </div>
          </div>
        </div>
        <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4 mt-2">
          <div className="flex flex-col gap-2 max-w-sm mx-auto">
            <Textarea
              formik={false}
              label="Order Notes"
              placeholder="Add Order notes here..."
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveOrderNotes}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
        <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4 mt-2">
          <div className="flex flex-col gap-2 max-w-sm mx-auto">
            <Textarea
              formik={false}
              label="Internal Notes"
              placeholder="Add Order notes here..."
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveInternalNotes}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
        <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4 mt-2">
          <div className="flex flex-col gap-2 max-w-sm mx-auto">
            <Textarea
              formik={false}
              label="Shipped Notes"
              id=""
              name=""
              placeholder="Add Order notes here..."
              value={shippedNotes}
              onChange={(e) => setShippedNotes(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveShippedNotes}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
        <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4 mt-2">
          <div className="flex flex-col gap-2 max-w-sm mx-auto">
            <Input
              type="file"
              formik={false}
              label="Upload Documents"
              id="Date"
              name="Date"
              placeholder="Date"
            />
            <Text>
              <span className="text-sm">
                Only Accept PDF, JPEG, JPG and PNG Files
              </span>
            </Text>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleUploadDocuments}
              >
                upload
              </Button>
            </div>
          </div>
        </div>
        <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4 mt-2">
          <div className="flex flex-col gap-2 max-w-sm mx-auto">
            <Input
              formik={false}
              label="Tags"
              id="tags"
              name="tags"
              placeholder="Add Tag here"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onBlur={handleAddTag}
            />
            {tags.length > 0 &&
              tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex justify-between gap-2 text-quaternary-dark dark:text-quaternary-light"
                >
                  <span>{tag}</span>
                  <SvgIcon
                    name="trash-01"
                    width={16}
                    height={16}
                    onClick={() => handleRemoveTag(tag)}
                    className="cursor-pointer"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSidebar;
