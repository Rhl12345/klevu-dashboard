"use client";
import { Form, Formik } from "formik";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/DropDown/DropDown";
import { useRouter } from "next/navigation";
import { PageRoutes } from "@/admin-pages/routes";
import { toast } from "react-toastify";
import { navigationValidationSchema } from "@/utils/validations/module.validation";

const CreateNavigation = ({ id = 0 }: { id?: number }) => {
  const router = useRouter();
  const navigateUrl = PageRoutes.MODULES.LIST;

  const initialValues = {
    name: id ? "Lewis" : "",
    menuicon: id ? "fa-cog" : "",
    parentModuleId: id ? "1" : "",
    recStatus: id ? "A" : "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      // Add your API call here
      toast.success("Navigation module created successfully");
      router.push(navigateUrl);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const statusOptions = [
    { label: "Active", value: "A" },
    { label: "Inactive", value: "I" },
  ];

  const parentOptions = [
    // Add your parent navigation options here
    { label: "Parent 1", value: "1" },
    { label: "Parent 2", value: "2" },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={navigationValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ validateForm, setFieldTouched, setFieldValue, values }) => (
        <Form>
          <CreatePageHeader
            module={id ? "Edit" : "Add" + " Navigation"}
            navigateUrl={navigateUrl}
            validateForm={validateForm}
            buttonType="submit"
          />
          <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4">
            <div className="w-full lg:w-7/12 xl:w-10/12 rounded-none content border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark p-4 lg:p-6">
              <div className="gap-4 lg:gap-6 grid grid-cols-1">
                <Input
                  name="name"
                  label="Name"
                  asterisk
                  placeholder="Enter Name"
                />

                <Dropdown
                  name="parentModuleId"
                  label="Select Parent"
                  options={parentOptions}
                  isFormikField
                  value={parentOptions.find(
                    (option) => option.value === values.parentModuleId
                  )}
                  onChange={(selected: any) => {
                    setFieldValue(
                      "parentModuleId",
                      selected ? selected.value : ""
                    );
                  }}
                />

                <Input
                  name="menuicon"
                  label="Menu Icon"
                  placeholder="Ex- fa-cog"
                />
              </div>
            </div>

            <div className="w-full lg:w-5/12 xl:w-2/12 py-4 border rounded-none border-gray-light dark:border-gray-dark">
              <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4">
                <Dropdown
                  name="recStatus"
                  label="Navigation Status"
                  options={statusOptions}
                  asterisk
                  isFormikField
                  value={statusOptions.find(
                    (option) => option.value === values.recStatus
                  )}
                  onChange={(selected: any) => {
                    setFieldValue("recStatus", selected ? selected.value : "");
                  }}
                />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateNavigation;
