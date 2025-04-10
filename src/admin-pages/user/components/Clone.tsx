import { Formik, Form as FormikForm } from "formik";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import { CloneValidationSchema } from "@/utils/validations/user.validation";
import { ICloneModalProps, IFormValues } from "@/types/user/user.type";

export const Clone = ({ isOpen, onClose, data }: ICloneModalProps) => {
  const handleSubmit = () => {};

  const initialValues: IFormValues = {
    id: data?.id || 0,
    firstname: data?.name || "",
    lastname: "(clone)",
    email: data?.email || "",
    phone: data?.phone || "",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={"User Clone"}
      content={
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={CloneValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ resetForm }) => (
            <FormikForm id="clone-form" className="flex flex-col gap-4 lg:gap-6">
              <Input
                asterisk={true}
                label="First Name"
                name="firstname"
                displayError={true}
                placeholder="First Name"
              />

              <Input
                asterisk={true}
                label="Last Name"
                name="lastname"
                placeholder="Last Name"
              />

              <Input
                asterisk={true}
                label="Email"
                name="email"
                placeholder="Email"
              />

              <Input
                asterisk={true}
                label="Phone"
                name="phone"
                placeholder="Phone Number"
                displayError
              />
            </FormikForm>
          )}
        </Formik>
      }
      footer={
        <>
          <Button
            type="button"
            onClick={() => {
              onClose();
            }}
            variant="outline-secondary"
          >
            Cancel
          </Button>
          <Button form="clone-form" type="submit" variant="primary">
            Clone
          </Button>
        </>
      }
    />
  );
};

export default Clone;
