"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { PageRoutes } from "@/admin-pages/routes";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import Loader from "@/components/common/Loader";
import { getSizeMasterById } from "@/services/size-master/sizeMaster.service";
import { sizeMasterValidationSchema } from "@/utils/validations/sizemaster.validation";
import ProductSizeForm from "@/admin-pages/size-master/create/components/ProductSizeForm";
import { ISizeMasterFormValues } from "@/types/sizemaster/sizemaster.type";
import { toast } from "react-toastify";

const statusOptions = [
  { value: "A", label: "Active" },
  { value: "I", label: "Inactive" },
];

const CreateEditSizeMaster = ({ id }: { id?: string }) => {
  const [sizeMaster, setSizeMaster] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (values: ISizeMasterFormValues) => {
    console.log(values);
    toast.success("Size master data submitted successfully.");
    // Handle form submission
  };

  useEffect(() => {
    if (id) {
      const fetchSizeMaster = async () => {
        try {
          setLoading(true);
          const data = await getSizeMasterById(id);
          setSizeMaster(data);
          toast.success("Size master data loaded successfully.");
        } catch (error) {
          toast.error("Failed to load size master data.");
        } finally {
          setLoading(false);
        }
      };

      fetchSizeMaster();
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={{
        productType: sizeMaster?.productType || "",
        displayOrder: sizeMaster?.displayOrder || "",
        status: sizeMaster?.recStatus || "",
        sizes: sizeMaster?.sizes || [],
      }}
      validationSchema={sizeMasterValidationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form id="size-master-form">
          <CreatePageHeader
            module={`${id ? "Edit" : "Add"}  Product Sizes`}
            navigateUrl={PageRoutes.SIZE_MASTER.LIST}
            buttonType="submit"
            validateForm={formik.validateForm}
          />
          <ProductSizeForm formik={formik} statusOptions={statusOptions} />
        </Form>
      )}
    </Formik>
  );
};

export default CreateEditSizeMaster;
