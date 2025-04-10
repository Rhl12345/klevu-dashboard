import React from "react";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";
import { Textarea } from "@/components/Textarea/Textarea";
import { Formik, Form } from "formik";
import Button from "@/components/Button/Button";
import { IFAQModalProps } from "@/types/product-faq/productFaq.types";
import { faqSchema } from "@/utils/validations/productFaq.validation";

const FAQModal: React.FC<IFAQModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}) => {
  const initialValues = {
    question: initialData?.question || "",
    answer: initialData?.answer || "",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={`${mode === "create" ? "Add" : "Edit"} FAQ`}
      content={
        <Formik
          initialValues={initialValues}
          validationSchema={faqSchema}
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          {({ handleChange, values, errors, touched, handleBlur }) => (
            <Form className="space-y-4">
              <Input
                label="Question"
                name="question"
                value={values.question}
                onChange={handleChange}
                onBlur={handleBlur}
                asterisk
                error={touched.question && !!errors.question}
                errorMessage={touched.question && errors.question}
              />
              <Textarea
                label="Answer"
                name="answer"
                value={values.answer}
                onChange={handleChange}
                onBlur={handleBlur}
                asterisk
                rows={4}
                error={touched.answer && !!errors.answer}
                errorMessage={
                  touched.answer && errors.answer ? errors.answer : undefined
                }
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline-secondary"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      }
    />
  );
};

export default FAQModal;
