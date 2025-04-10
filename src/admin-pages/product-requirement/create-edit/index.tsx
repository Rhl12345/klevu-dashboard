"use client";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { PageRoutes } from "@/admin-pages/routes";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import RequirementForm from "@/components/product-seo-requirement/RequirementForm";
import {
  createProductRequirement,
  getProductRequirement,
  updateProductRequirement,
} from "@/services/product-requirement/productRequirement.service";
import {
  IProductSeoRequirementFormValues,
  IProductSeoRequirementReadinessDetail,
} from "@/types/product-seo-requirement/productSeoRequirement.type";
import { getErrorMessage } from "@/utils/common.util";
import { ProductAndSeoRequirementSchema } from "@/utils/validations/productAndSeoRequirement.validation";

const CreateEditProductRequirement = ({ id }: { id?: string }) => {
  const [initialValues, setInitialValues] = useState<
    Omit<IProductSeoRequirementFormValues, "id">
  >({
    storeName: "",
    name: "",
    percentage: "",
    readinessStatus: "",
  });

  const [readinessDetail, setReadinessDetail] = useState<
    IProductSeoRequirementReadinessDetail[]
  >([]);

  useEffect(() => {
    if (id) {
      fetchProductRequirement();
    }
  }, [id]);

  const fetchProductRequirement = async () => {
    const response = await getProductRequirement(+id!);
    if (response) {
      setInitialValues({
        storeName: response?.storeid?.toString(),
        name: response?.name,
        percentage: response?.percentage?.toString(),
        readinessStatus: response.recStatus === "A" ? "active" : "inactive",
      });
      setReadinessDetail(response?.readinessDetail);
    }
  };

  const handleSubmit = async (
    values: Omit<IProductSeoRequirementFormValues, "id">,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      if (id) {
        await updateProductRequirement({ ...values, id: +id! });
      } else {
        await createProductRequirement(values);
        resetForm();
      }
      toast.success(
        id
          ? "Requirement updated successfully"
          : "Requirement created successfully"
      );
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          id ? "Error updating requirement" : "Error creating requirement"
        )
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProductAndSeoRequirementSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, setFieldValue, validateForm }) => (
        <Form>
          <CreatePageHeader
            module={id ? "Edit Product Requirement" : "Add Product Requirement"}
            navigateUrl={PageRoutes.PRODUCT_REQUIREMENT.LIST}
            buttonType="submit"
            validateForm={validateForm}
          />

          <RequirementForm
            values={values}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
            readinessDetail={readinessDetail}
            id={id}
          />
        </Form>
      )}
    </Formik>
  );
};

export default CreateEditProductRequirement;
