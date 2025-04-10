import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { OrderAddressModalProps } from "@/types/orders/orders.type";
import { addAddressValidationSchema } from "@/utils/validations/customer.validation";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/DropDown/DropDown";
import CustomerData from "@/mock-data/customerList.json";

const OrderAddressModal = ({
  type,
  orderDetail,
  setShowModal,
  showModal,
}: OrderAddressModalProps) => {
  const address =
    type === "Billing"
      ? orderDetail.billingAddress
      : orderDetail.shippingAddress;

  const onSubmit = (values: any) => {
    toast.success(`${type} Address updated successfully`);
    setShowModal(false);
  };
  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="4xl"
        header={
          type === "Billing"
            ? "Edit    Billing Address"
            : "Edit Shipping Address"
        }
        footer={
          <div className="flex flex-wrap justify-end space-x-2">
            <Button
              type="button"
              size="sm"
              variant="outline-secondary"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="primary"
              type="submit"
              form="order-edit-address-form"
            >
              Save
            </Button>
          </div>
        }
        content={
          <Formik
            enableReinitialize={true}
            initialValues={{
              id: 0,
              customerId: orderDetail.customerId || 0,
              firstname: address?.firstName || "",
              lastName: address?.lastName || "",
              email: address?.email || "",
              address1: address?.address1 || "",
              address2: address?.address2 || "",
              suite: address?.suite || "",
              city: address?.city || "",
              state: address?.state || "",
              postalCode: address?.zipCode || "",
              fax: address?.fax || "",
              phone: address?.phone || "",
              countryName: address?.country || "",
              countryCode: address?.countryCode || "",
              addressType: type === "Billing" ? "B" : "S",
              isDefault: false,
              recStatus: "Active",
            }}
            onSubmit={onSubmit}
            validationSchema={addAddressValidationSchema}
          >
            {({ setFieldValue, errors, values, resetForm }) => {
              return (
                <Form id="order-edit-address-form">
                  <div className="text-sm flex flex-wrap justify-start text-left -mx-4">
                    <div className="w-full p-4">
                      <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 md:col-span-6">
                          <Input
                            type="text"
                            name="firstname"
                            label="First Name"
                            onChange={(e) => {
                              setFieldValue("firstname", e.target.value);
                            }}
                            value={values.firstname}
                            placeholder="First Name"
                            asterisk={true}
                            error={errors.firstname ? true : false}
                            errorMessage={errors.firstname?.toString()}
                          />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                          <Input
                            type="text"
                            name="lastName"
                            label="Last Name"
                            onChange={(e) => {
                              setFieldValue("lastName", e.target.value);
                            }}
                            value={values.lastName}
                            placeholder="Last Name"
                            asterisk={true}
                            error={errors.lastName ? true : false}
                            errorMessage={errors.lastName?.toString()}
                          />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                          <Input
                            type="email"
                            name="email"
                            label="Email"
                            placeholder="Email"
                            onChange={(e) => {
                              setFieldValue("email", e.target.value);
                            }}
                            value={values.email}
                            asterisk={true}
                            error={errors.email ? true : false}
                            errorMessage={errors.email?.toString()}
                          />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                          <Input
                            type="text"
                            name="phone"
                            label="Phone"
                            placeholder="000-000-0000"
                            maxLength={17}
                            onChange={(e) => {
                              setFieldValue("phone", e.target.value);
                            }}
                            value={values.phone}
                            asterisk={true}
                            error={errors.phone ? true : false}
                            errorMessage={errors.phone?.toString()}
                          />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                          <Input
                            type="text"
                            name="address1"
                            label="Address 1"
                            placeholder="Address 01"
                            onChange={(e) => {
                              setFieldValue("address1", e.target.value);
                            }}
                            value={values.address1}
                            asterisk={true}
                            error={errors.address1 ? true : false}
                            errorMessage={errors.address1?.toString()}
                          />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                          <Input
                            type="text"
                            name="address2"
                            label="Address 2"
                            placeholder="Address 02"
                            onChange={(e) => {
                              setFieldValue("address2", e.target.value);
                            }}
                            value={values.address2}
                            error={errors.address2 ? true : false}
                            errorMessage={errors.address2?.toString()}
                          />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                          <Input
                            type="text"
                            name="city"
                            label="City"
                            placeholder="City"
                            onChange={(e) => {
                              setFieldValue("city", e.target.value);
                            }}
                            value={values.city}
                            asterisk={true}
                            error={errors.city ? true : false}
                            errorMessage={errors.city?.toString()}
                          />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                          <Dropdown
                            label="Country"
                            options={CustomerData.country}
                            defaultValue={CustomerData.country.find(
                              (item) => item.label === values?.countryName
                            )}
                            name={`countryName`}
                            asterisk={true}
                            value={CustomerData.country.find(
                              (item) => item.label === values?.countryName
                            )}
                            error={errors.countryName ? true : false}
                            errorMessage={errors.countryName?.toString()}
                            onChange={(value: any) => {
                              setFieldValue(`countryName`, value.value);
                              setFieldValue(`countryCode`, value.countryCode);
                            }}
                          />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                          <Input
                            type="text"
                            name="postalCode"
                            label="Postal Code"
                            placeholder="Postal Code"
                            maxLength={6}
                            value={values.postalCode}
                            asterisk={true}
                            error={errors.postalCode ? true : false}
                            errorMessage={errors.postalCode?.toString()}
                            onChange={(e) => {
                              setFieldValue("postalCode", e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                          <Dropdown
                            label="State"
                            options={CustomerData.states}
                            defaultValue={CustomerData.states.find(
                              (item) => item.label === values?.state
                            )}
                            value={CustomerData.states.find(
                              (item) => item.label === values?.state
                            )}
                            asterisk={true}
                            error={errors.state ? true : false}
                            errorMessage={errors.state?.toString()}
                            name={`state`}
                            onChange={(value: any) => {
                              setFieldValue(`state`, value.label);
                            }}
                          />
                        </div>

                        <div className="col-span-12 md:col-span-6">
                          <Input
                            type="text"
                            name="countryCode"
                            value={values.countryCode}
                            label="Country Code"
                            onChange={(e) => {
                              setFieldValue("countryCode", e.target.value);
                            }}
                            placeholder="Country Code"
                            maxLength={3}
                            error={errors.countryCode ? true : false}
                            errorMessage={errors.countryCode?.toString()}
                          />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                          <Input
                            type="text"
                            name="suite"
                            value={values.suite}
                            onChange={(e) => {
                              setFieldValue("suite", e.target.value);
                            }}
                            label="Apt/ Suite#"
                            placeholder="Apt/ Suite#"
                            error={errors.suite ? true : false}
                            errorMessage={errors.suite?.toString()}
                          />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                          <Input
                            type="text"
                            name="fax"
                            value={values.fax}
                            onChange={(e) => {
                              setFieldValue("fax", e.target.value);
                            }}
                            label="Fax"
                            placeholder="000-000-0000"
                            maxLength={15}
                            error={errors.fax ? true : false}
                            errorMessage={errors.fax?.toString()}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        }
      />
    </>
  );
};

export default OrderAddressModal;
