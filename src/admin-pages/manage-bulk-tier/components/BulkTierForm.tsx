import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { getErrorMessage } from "@/utils/common.util";
import { validationSchema } from "@/utils/validations/manageBulkTier.validation";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";

interface FormValues {
  customerNumber: string;
  storeName: string;
  tier: string;
}

const ManageBulkTier = {
  storeOptions: [
    { label: "Store 1", value: "store1" },
    { label: "Store 2", value: "store2" },
  ],
  tierOptions: [
    { label: "Tier 1", value: "tier1" },
    { label: "Tier 2", value: "tier2" },
  ],
};

const BulkTierForm = () => {
  const initialValues: FormValues = {
    customerNumber: "",
    storeName: "",
    tier: "",
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      toast.success("Bulk tier updated successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form className="lg:pt-8 xl:px-8 pt-4 px-4 ">
          <div className="flex flex-wrap gap-4 items-start border border-gray-light dark:border-gray-dark p-4 lg:p-6  ">
            <div className="w-full lg:w-1/4">
              <div className="flex flex-col gap-2">
                <Input
                  label="Customer Number (BC Id)"
                  asterisk
                  type="text"
                  name="customerNumber"
                  placeholder="Enter Customer Number"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="w-full lg:w-1/4">
              <Dropdown
                aria-label="Select Store Name"
                value={values.storeName}
                onChange={(value) => setFieldValue("storeName", value)}
                id="store-name-select"
                label="Store Name"
                asterisk
                options={ManageBulkTier.storeOptions}
                placeholder="Select ..."
              />
            </div>
            <div className="w-full lg:w-1/4">
              <Dropdown
                aria-label="Select Tier"
                value={values.tier}
                onChange={(value) => setFieldValue("tier", value)}
                id="tier-select"
                label="Tier"
                asterisk
                isDisabled={!values.storeName}
                options={ManageBulkTier.tierOptions}
                placeholder="Select ..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className=" opacity-0">&nbsp;</Label>
              <Button type="submit" variant="primary" size="md">
                Save
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BulkTierForm;
