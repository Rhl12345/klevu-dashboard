"use client";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { PageRoutes } from "@/admin-pages/routes";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import RequirementForm from "@/components/product-seo-requirement/RequirementForm";
import {
  createSeoRequirement,
  getSeoRequirement,
  updateSeoRequirement,
} from "@/services/seo-requirement/seoRequirement.service";
import {
  IProductSeoRequirementFormValues,
  IProductSeoRequirementReadinessDetail,
} from "@/types/product-seo-requirement/productSeoRequirement.type";
import { getErrorMessage } from "@/utils/common.util";
import { ProductAndSeoRequirementSchema } from "@/utils/validations/productAndSeoRequirement.validation";

const DEFAULT_FORM_VALUES: Omit<IProductSeoRequirementFormValues, "id"> = {
  storeName: "",
  name: "",
  percentage: "",
  readinessStatus: "",
};

const CreateEditSeoRequirement = ({ id }: { id?: string }) => {
  const [initialValues, setInitialValues] = useState(DEFAULT_FORM_VALUES);

  const [readinessDetail, setReadinessDetail] = useState<
    IProductSeoRequirementReadinessDetail[]
  >([]);

  useEffect(() => {
    if (id) {
      fetchSeoRequirement();
    }
  }, [id]);

  const fetchSeoRequirement = async () => {
    try {
      const response = await getSeoRequirement(+id!);
      if (response) {
        setInitialValues({
          storeName: response?.storeid?.toString(),
          name: response?.name,
          percentage: response?.percentage?.toString(),
          readinessStatus: response.recStatus === "A" ? "active" : "inactive",
        });
        setReadinessDetail(response?.readinessDetail);
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Error fetching SEO requirement"));
    }
  };

  const handleSubmit = async (
    values: Omit<IProductSeoRequirementFormValues, "id">,
    {
      resetForm,
      setSubmitting,
    }: { resetForm: () => void; setSubmitting: (submitting: boolean) => void }
  ) => {
    try {
      setSubmitting(true);
      if (id) {
        await updateSeoRequirement({ ...values, id: +id! });
      } else {
        await createSeoRequirement(values);
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
    } finally {
      setSubmitting(false);
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
            module={id ? "Edit SEO Requirement" : "Add SEO Requirement"}
            navigateUrl={PageRoutes.SEO_REQUIREMENT.LIST}
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

export default CreateEditSeoRequirement;
