import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@/components/Button/Button";
import Text from "@/components/Text/Text";
import Modal from "@/components/Modal/Modal";
import Dropdown from "@/components/DropDown/DropDown";
import { toast } from "react-toastify";

interface IProductFileForm {
  brandId: string;
  status: string;
}

const validationSchema = Yup.object().shape({
  brandId: Yup.string().required("Brand is required"),
  status: Yup.string().required("Status is required"),
});

const initialValues: IProductFileForm = {
  brandId: "",
  status: "A", // Default to Active
};

const ProductFileComponent = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const statusOptions = [
    { value: "A", label: "Active" },
    { value: "I", label: "Inactive" },
  ];

  const brandOptions = [
    { value: "Brand 1", label: "Brand 1" },
    { value: "Brand 2", label: "Brand 2" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Download Product File"
      content={
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {
            toast.success("Data downloaded successfully");
            onClose();
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="p-4">
                <div className="mb-4">
                  <div className="flex items-center">
                    <div className="w-full">
                      <Dropdown
                        name="brandId"
                        label="Brand Name"
                        asterisk
                        options={brandOptions}
                        defaultValue={values.brandId}
                        onChange={(selected: any) =>
                          setFieldValue("brandId", selected.value)
                        }
                        isFormikField={true}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center">
                    <div className="w-full">
                      <Dropdown
                        name="status"
                        label="Status"
                        asterisk
                        options={statusOptions}
                        defaultValue={values.status}
                        onChange={(selected: any) =>
                          setFieldValue("status", selected.value)
                        }
                        isFormikField={true}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex mt-4 justify-end">
                  <Button type="submit" variant="primary" className="px-6">
                    Download Data
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      }
    />
  );
};

export default ProductFileComponent;
