import React, { useState } from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import ModalSourceCode from "!!raw-loader!./Modal";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { CreateSourceCodeStory } from "@/utils/helpers";
import { Form, Formik } from "formik";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import { IModalProps } from "@/components/Modal/types";

export default {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      description: "Controls whether the modal is visible or hidden.",
      control: "boolean",
      defaultValue: false,
    },
    onClose: {
      description: "Callback function invoked when the modal is closed.",
      action: "onClose",
    },
    header: {
      description:
        "ReactNode to render in the header of the modal. Can include text, icons, or custom elements.",
      control: "text",
    },
    content: {
      description: "ReactNode to render as the main content of the modal.",
      control: "text",
    },
    footer: {
      description:
        "ReactNode to render in the footer of the modal, typically containing action buttons.",
      control: "text",
    },
    parentContainerClassName: {
      description:
        "Additional classes for the modal's parent container for custom styling.",
      control: "text",
    },
    wrapperClassName: {
      description:
        "Additional classes for the modal's wrapper to customize its layout and appearance.",
      control: "text",
    },
    contentClassName: {
      description: "Additional classes for the modal's content section.",
      control: "text",
    },
    headerClassName: {
      description: "Additional classes for the modal's header section.",
      control: "text",
    },
    footerClassName: {
      description: "Additional classes for the modal's footer section.",
      control: "text",
    },
    closeButtonClassName: {
      description:
        "Additional classes for the close button to customize its appearance.",
      control: "text",
    },
    overlayContainerClassName: {
      description: " Additional classes for the modal overlay container.",
      control: "text",
    },
    closeButtonIcon: {
      description: "Custom ReactNode to replace the default close button icon.",
      control: "text",
    },
  },
} as Meta<IModalProps>;

export const Default: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="md" variant="secondary">
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        parentContainerClassName="fixed inset-0 z-50 flex items-center justify-center p-10"
        overlayContainerClassName="fixed inset-0 bg-black/50"
        wrapperClassName="bg-white shadow-lg rounded-xl w-screen max-w-xl max-h-full overflow-hidden my-5 flex flex-col relative"
        closeButtonClassName="absolute right-3 top-3 hover:bg-gray-200 rounded-lg p-1"
        headerClassName="p-4 flex flex-wrap justify-between gap-x-2 bg-gray-100"
        contentClassName="p-4 overflow-y-auto"
        footerClassName="p-4 flex items-center justify-end gap-x-2 border-t"
        header={
          <div className="text-sm font-semibold">
            Reach more shoppers with Instagram product tags
          </div>
        }
        content={
          <div>
            Use Instagram posts to share your products with millions of people.
            Let shoppers buy from your store without leaving Instagram.
          </div>
        }
        footer={
          <>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => alert("Learn more clicked!")}
            >
              Learn more
            </Button>
            <Button size="sm" variant="primary" onClick={handleClose}>
              Add Instagram
            </Button>
          </>
        }
      />
    </>
  );
};

export const WithPrimaryAction: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="md" variant="secondary">
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        parentContainerClassName="fixed inset-0 z-50 flex items-center justify-center p-10"
        overlayContainerClassName="fixed inset-0 bg-black/50"
        wrapperClassName="bg-white shadow-lg rounded-xl w-screen max-w-xl max-h-full overflow-hidden my-5 flex flex-col relative"
        closeButtonClassName="absolute right-3 top-3 hover:bg-gray-200 rounded-lg p-1"
        headerClassName="p-4 flex flex-wrap justify-between gap-x-2 bg-gray-100"
        contentClassName="p-4 overflow-y-auto"
        footerClassName="p-4 flex items-center justify-end gap-x-2 border-t"
        header={
          <div className="text-sm font-semibold">Get a shareable link</div>
        }
        content={
          <div>
            <div className="mb-2">
              You can share this discount link with your customers via email or
              social media. Your discount will be automatically applied at
              checkout.
            </div>
            <div className="flex gap-x-1 items-end">
              <Formik
                initialValues={{ "discount-link": "" }}
                onSubmit={(values) => console.log(values)}
              >
                <Form>
                  <Input
                    type="text"
                    name="discount-link"
                    placeholder="https://polaris.shopify.com/"
                    label="Discount link"
                    className="grow py-1"
                  />
                  <Button size="sm" variant="primary" className="py-1.5">
                    Copy link
                  </Button>
                </Form>
              </Formik>
            </div>
          </div>
        }
        footer={
          <>
            <Button
              size="sm"
              variant="primary"
              onClick={handleClose}
              className="px-4"
            >
              Close
            </Button>
          </>
        }
      />
    </>
  );
};

export const Large: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="md" variant="secondary">
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        parentContainerClassName="fixed inset-0 z-50 flex items-center justify-center p-10"
        overlayContainerClassName="fixed inset-0 bg-black/50"
        wrapperClassName="bg-white shadow-lg rounded-xl w-screen max-w-5xl max-h-full overflow-hidden my-5 flex flex-col relative"
        closeButtonClassName="absolute right-3 top-3 hover:bg-gray-200 rounded-lg p-1"
        headerClassName="p-4 flex flex-wrap justify-between gap-x-2 bg-gray-100"
        contentClassName="p-4 overflow-y-auto"
        footerClassName="p-4 flex items-center justify-end gap-x-2 border-t"
        header={
          <div className="text-sm font-semibold">Import customers by CSV</div>
        }
        content={
          <div>
            <div className="mb-3">Drag and Drop Input will come here</div>
            <div>
              <label htmlFor="overwrite">
                <Formik
                  initialValues={{ overwrite: false }}
                  onSubmit={(values) => console.log(values)}
                >
                  <Form>
                    <input id="overwrite" type="checkbox" name="overwrite" />
                    Overwrite existing customers that have the same email or
                    phone
                  </Form>
                </Formik>
              </label>
            </div>
          </div>
        }
        footer={
          <>
            <Button size="sm" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button size="sm" variant="primary">
              Export customers
            </Button>
          </>
        }
      />
    </>
  );
};

export const WithoutTitle: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="md" variant="secondary">
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        parentContainerClassName="fixed inset-0 z-50 flex items-center justify-center p-10"
        overlayContainerClassName="fixed inset-0 bg-black/50"
        wrapperClassName="bg-white shadow-lg rounded-xl w-screen max-w-xl max-h-full overflow-hidden my-5 flex flex-col relative"
        closeButtonClassName="absolute right-3 top-3 hover:bg-gray-200 rounded-lg p-1"
        headerClassName="p-4 flex flex-wrap justify-between gap-x-2 bg-gray-100"
        contentClassName="p-4 overflow-y-auto"
        footerClassName="p-4 flex items-center justify-end gap-x-2 border-t"
        content={
          <div className="pr-12">
            Use Instagram posts to share your products with millions of people.
            Let shoppers buy from your store without leaving Instagram.
          </div>
        }
        footer={
          <>
            <Button size="sm" variant="secondary" onClick={handleClose}>
              Learn more
            </Button>
            <Button size="sm" variant="primary" onClick={handleClose}>
              Add Instagram
            </Button>
          </>
        }
      />
    </>
  );
};

export const WithScrollListeners: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="md" variant="secondary">
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        header={<div className="text-sm font-semibold">Scrollable content</div>}
        parentContainerClassName="fixed inset-0 z-50 flex items-center justify-center p-10"
        overlayContainerClassName="fixed inset-0 bg-black/50"
        wrapperClassName="bg-white shadow-lg rounded-xl w-screen max-w-xl max-h-full overflow-hidden my-5 flex flex-col relative"
        closeButtonClassName="absolute right-3 top-3 hover:bg-gray-200 rounded-lg p-1"
        headerClassName="p-4 flex flex-wrap justify-between gap-x-2 bg-gray-100"
        contentClassName="p-4 overflow-y-auto"
        footerClassName="p-4 flex items-center justify-end gap-x-2 border-t"
        content={
          <div className="grow overflow-y-auto max-h-60">
            {Array.from({ length: 30 }, (_, i) => (
              <div key={i} className="p-4 border-b last:border-b-0">
                Item #{i}
              </div>
            ))}
          </div>
        }
        footer={
          <>
            <Button
              size="sm"
              variant="primary"
              onClick={handleClose}
              className="px-4"
            >
              Close
            </Button>
          </>
        }
      />
    </>
  );
};

export const Sectioned: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="md" variant="secondary">
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        parentContainerClassName="fixed inset-0 z-50 flex items-center justify-center p-10"
        overlayContainerClassName="fixed inset-0 bg-black/50"
        wrapperClassName="bg-white shadow-lg rounded-xl w-screen max-w-xl max-h-full overflow-hidden my-5 flex flex-col relative"
        closeButtonClassName="absolute right-3 top-3 hover:bg-gray-200 rounded-lg p-1"
        headerClassName="p-4 flex flex-wrap justify-between gap-x-2 bg-gray-100"
        contentClassName="p-4 overflow-y-auto"
        footerClassName="p-4 flex items-center justify-end gap-x-2 border-t"
        content={
          <div className="p-4 grow overflow-x-auto">
            <ul>
              <li>First section</li>
              <li>
                Second section
                <ul className="p-3">
                  <li>Nested section</li>
                </ul>
              </li>
              <li>Fourth section</li>
            </ul>
          </div>
        }
        header={<div className="text-sm font-semibold">Sectioned modal</div>}
        footer={
          <>
            <Button
              size="sm"
              variant="primary"
              onClick={handleClose}
              className="px-4"
            >
              Save
            </Button>
          </>
        }
      />
    </>
  );
};

export const WithLongContent: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="md" variant="secondary">
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        header={<div className="text-sm font-semibold">Long form modal</div>}
        parentContainerClassName="fixed inset-0 z-50 flex items-center justify-center p-10"
        overlayContainerClassName="fixed inset-0 bg-black/50"
        wrapperClassName="bg-white shadow-lg rounded-xl w-screen max-w-xl max-h-full overflow-hidden my-5 flex flex-col relative"
        closeButtonClassName="absolute right-3 top-3 hover:bg-gray-200 rounded-lg p-1"
        headerClassName="p-4 flex flex-wrap justify-between gap-x-2 bg-gray-100"
        contentClassName="p-4 overflow-y-auto"
        footerClassName="p-4 flex items-center justify-end gap-x-2 border-t"
        footer={
          <Button
            size="sm"
            variant="primary"
            onClick={handleClose}
            className="px-4"
          >
            Save
          </Button>
        }
        content={
          <div className="grow overflow-x-auto">
            <div className="p-4">
              <div className="mb-2 flex flex-wrap items-center gap-x-1 bg-blue-100 p-2 rounded-xl font-semibold">
                <SvgIcon name="CircleInfo" className="w-5" />
                Payment details
              </div>
            </div>
            <form className="border-t p-4 grid grid-cols-2 gap-x-3 gap-y-4">
              <div className="col-span-1">
                <label htmlFor="payment_method" className="mb-2 block">
                  Payment method type
                </label>
                <div>
                  <Formik
                    initialValues={{ payment_method: "" }}
                    onSubmit={(values) => console.log(values)}
                  >
                    <Form>
                      <Input
                        type="text"
                        name="payment_method"
                        id="payment_method"
                      />
                    </Form>
                  </Formik>
                </div>
              </div>
              <div className="col-span-1">
                <label htmlFor="card_number" className="mb-2 block">
                  Card number
                </label>
                <div>
                  <Formik
                    initialValues={{ card_number: "" }}
                    onSubmit={(values) => console.log(values)}
                  >
                    <Form>
                      <Input type="text" name="card_number" id="card_number" />
                    </Form>
                  </Formik>
                </div>
              </div>
              <div className="col-span-1">
                <label htmlFor="expires" className="mb-2 block">
                  Expires
                </label>
                <div>
                  <Formik
                    initialValues={{ expires: "" }}
                    onSubmit={(values) => console.log(values)}
                  >
                    <Form>
                      <Input type="text" name="expires" id="expires" />
                    </Form>
                  </Formik>
                </div>
              </div>
              <div className="col-span-1">
                <label htmlFor="cvv" className="mb-2 block">
                  CVV
                </label>
                <div>
                  <Formik
                    initialValues={{ cvv: "" }}
                    onSubmit={(values) => console.log(values)}
                  >
                    <Form>
                      <Input type="text" name="cvv" id="cvv" />
                    </Form>
                  </Formik>
                </div>
              </div>
              <div className="col-span-2">
                <label htmlFor="country_region" className="mb-2 block">
                  Country/region
                </label>
                <div>
                  <Formik
                    initialValues={{ country_region: "" }}
                    onSubmit={(values) => console.log(values)}
                  >
                    <Form>
                      <Input
                        type="text"
                        name="country_region"
                        id="country_region"
                      />
                    </Form>
                  </Formik>
                </div>
              </div>
              <div className="col-span-1">
                <label htmlFor="first_name" className="mb-2 block">
                  First name
                </label>
                <div>
                  <Formik
                    initialValues={{ first_name: "" }}
                    onSubmit={(values) => console.log(values)}
                  >
                    <Form>
                      <Input type="text" name="first_name" id="first_name" />
                    </Form>
                  </Formik>
                </div>
              </div>
              <div className="col-span-1">
                <label htmlFor="last_name" className="mb-2 block">
                  Last name
                </label>
                <div>
                  <Formik
                    initialValues={{ last_name: "" }}
                    onSubmit={(values) => console.log(values)}
                  >
                    <Form>
                      <Input type="text" name="last_name" id="last_name" />
                    </Form>
                  </Formik>
                </div>
              </div>
              <div className="col-span-1">
                <label htmlFor="address" className="mb-2 block">
                  Address
                </label>
                <div>
                  <Formik
                    initialValues={{ address: "" }}
                    onSubmit={(values) => console.log(values)}
                  >
                    <Form>
                      <Input type="text" name="address" id="address" />
                    </Form>
                  </Formik>
                </div>
              </div>
              <div className="col-span-1">
                <label htmlFor="apartment" className="mb-2 block">
                  Apartment, suite, etc.
                </label>
                <div>
                  <Formik
                    initialValues={{ apartment: "" }}
                    onSubmit={(values) => console.log(values)}
                  >
                    <Form>
                      <Input type="text" name="apartment" id="apartment" />
                    </Form>
                  </Formik>
                </div>
              </div>
              <div className="col-span-1">
                <label htmlFor="city" className="mb-2 block">
                  City
                </label>
                <div>
                  <Formik
                    initialValues={{ city: "" }}
                    onSubmit={(values) => console.log(values)}
                  >
                    <Form>
                      <Input type="text" name="city" id="city" />
                    </Form>
                  </Formik>
                </div>
              </div>
              <div className="col-span-1">
                <label htmlFor="province" className="mb-2 block">
                  Province
                </label>
                <div>
                  <Formik
                    initialValues={{ province: "" }}
                    onSubmit={(values) => console.log(values)}
                  >
                    <Form>
                      <Input type="text" name="province" id="province" />
                    </Form>
                  </Formik>
                </div>
              </div>
              <div className="col-span-2">
                <label htmlFor="postal_code" className="mb-2 block">
                  Postal code
                </label>
                <div>
                  <Formik
                    initialValues={{ postal_code: "" }}
                    onSubmit={(values) => console.log(values)}
                  >
                    <Form>
                      <Input type="text" name="postal_code" id="postal_code" />
                    </Form>
                  </Formik>
                </div>
              </div>
            </form>
          </div>
        }
      />
    </>
  );
};

export const DeleteModalStory: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    console.log("Item deleted!");
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="md" variant="secondary">
        Delete Item
      </Button>
      <DeleteModal
        isOpen={isOpen}
        onClose={handleClose}
        onDelete={handleDelete}
        title="Delete Item"
        itemName="customer"
      />
    </>
  );
};

export const StatusModalStory: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    console.log("Status changed!");
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="md" variant="secondary">
        Change Status
      </Button>
      <StatusChangeModel
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        currentRowData={{
          recStatus: "inactive",
          quantityName: "customer",
          recordName: "customer",
        }}
        title="Change Status"
        message="Do you want to change the status of this customer?"
      />
    </>
  );
};

export const SourceCode = CreateSourceCodeStory(ModalSourceCode);
