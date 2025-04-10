import Input from "@/components/Input/Input";
import React from "react";
import { Formik, Form } from "formik";
const Seo = ({ id }: { id: number }) => {
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          title: "",
          keywords: "",
          description: "",
          h1Tag: "",
          h2Tag: "",
        }}
        onSubmit={() => {}}
        validationSchema={[]}
      >
        {() => {
          return (
            <Form>
              <div className="w-full flex flex-col gap-4 lg:gap-6 lg:p-6 p-4">
                <Input
                  label="Title "
                  name="title"
                  placeholder="Enter Title"
                  asterisk
                />
                <Input
                  label="Keywords "
                  name="keywords"
                  placeholder="Enter Keywords"
                />
                <Input
                  label="Description "
                  name="description"
                  placeholder="Enter Description"
                />
                <Input
                  label="H1 Tag: "
                  name=" h1Tag"
                  placeholder="Enter H1 Tag"
                />
                <Input
                  label="H Tag: "
                  name=" h2Tag"
                  placeholder="Enter H1 Tag"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Seo;
