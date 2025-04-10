import { Formik, Form } from "formik";
import Modal from "@/components/Modal/Modal";
import Text from "@/components/Text/Text";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import * as Yup from "yup";

interface UploadFileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  file: Yup.mixed<File>()
    .required("File is required")
    .test("fileFormat", "Only CSV files are allowed", (value) => {
      if (!value) return false;
      return value.type === "text/csv";
    })
    .test("fileSize", "File must be under 20MB", (value) => {
      if (!value) return false;
      return value.size <= 20 * 1024 * 1024; // 20MB in bytes
    }),
});

const UploadFileModal: React.FC<UploadFileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const modalContent = (
    <Formik
      initialValues={{ file: null }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      onSubmit={() => {}}
    >
      {({ setFieldValue }) => (
        <Form className="flex flex-col gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-8">
              <Input
                type="file"
                name="file"
                label="File"
                asterisk
                id="file"
                accept=".csv"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setFieldValue("file", file);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Text size="xs">The file must be .CSV</Text>
            <Text size="xs">The file must be under 20MBytes.</Text>
            <Text size="xs">You can import 25000 items at once.</Text>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" className="px-6">
              Upload Data
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Upload File"
      content={modalContent}
      size="xl"
    />
  );
};

export default UploadFileModal;
