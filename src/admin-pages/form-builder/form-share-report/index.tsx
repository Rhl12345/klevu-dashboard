"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form as FormikForm } from "formik";
import { toast } from "react-toastify";

import { getErrorMessage } from "@/utils/common.util";
import { ShareReportValidationSchema } from "@/utils/validations/form-builder-validation/shareReport.validation";

import ShareReportList from "@/admin-pages/form-builder/form-share-report/components/ShareReportList";
import { IFormShareReportValues } from "@/types/form-builder/formShareReport.type";
import ShareReportForm from "@/admin-pages/form-builder/form-share-report/components/ShareReportForm";
import shareReportData from "@/mock-data/form-builder/shareReport.json";

const FormShareReport = () => {
  const [editId, setEditId] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState(true); // State to track if the input is editable

  const handleEdit = (id: string) => {
    setEditId(id);
    setIsEditable(false);
  };

  const [formBuilder, setFormBuilder] = useState<IFormShareReportValues | null>(
    null
  );

  useEffect(() => {
    if (editId) {
      const editData = shareReportData.data.find(
        (item) => item.id === Number(editId)
      );
      setFormBuilder(editData as unknown as IFormShareReportValues);
    } else {
      setFormBuilder(null);
    }
  }, [editId]);

  const handleSubmit = async ({
    setSubmitting,
  }: {
    setSubmitting: (submitting: boolean) => void;
  }) => {
    try {
      toast.success(`Form submitted Successfully!`);
      setSubmitting(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false); // Reset the submitting state
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      onSubmit={handleSubmit}
      initialValues={{
        email: formBuilder?.email || "",
        name: formBuilder?.name || "",
        setSubmitting: () => {},
      }}
      validationSchema={ShareReportValidationSchema}
    >
      {({ setFieldValue }) => {
        const handleClear = () => {
          setFieldValue("email", "");
          setFieldValue("name", "");
          setIsEditable(true);
        };
        return (
          <>
            <FormikForm>
              <div className="w-full lg:py-8 xl:px-8 py-4 px-4 bg-body-light dark:bg-body-dark ">
                <div className="col-span-12 flex flex-col gap-4">
                  <ShareReportForm
                    setFieldValue={setFieldValue}
                    handleClear={handleClear}
                    isEditable={isEditable}
                  />
                </div>
              </div>
              <div className="w-full">
                <ShareReportList handleEdit={handleEdit} />
              </div>
            </FormikForm>
          </>
        );
      }}
    </Formik>
  );
};

export default FormShareReport;
