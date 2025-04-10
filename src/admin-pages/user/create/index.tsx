"use client";
import React from "react";
import { Formik, Form as FormikForm, FieldArray } from "formik";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import { PageRoutes } from "@/admin-pages/routes";
import { RecStatusValuebyName } from "@/utils/constants";
import UserDetail from "@/admin-pages/user/components/UserDetail";
import { UserSchema } from "@/utils/validations/user.validation";
import Button from "@/components/Button/Button";
import { Label } from "@/components/Label/Label";
import { IAdminUser } from "@/types/user/user.type";

const CreateUser = () => {
  const submitHandler = async () => {};

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          adminUserViewModel: [
            {
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              reportingTo: 0,
              isSuperUser: false,
              role: "",
              recstatus: RecStatusValuebyName.Draft,
            },
          ],
        }}
        onSubmit={submitHandler}
        validationSchema={UserSchema}
        validateOnMount={true}
      >
        {({ validateForm }) => {
          return (
            <FormikForm>
              <CreatePageHeader
                module="Invite Users"
                navigateUrl={PageRoutes.USERS.LIST}
                buttonType="submit"
                validateForm={validateForm}
              >
                <Button variant="primary" type="button">
                  Invite
                </Button>
              </CreatePageHeader>
              <div className="w-full flex gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4">
                <div className="bg-body-light dark:bg-body-dark w-full flex flex-col gap-4 lg:gap-8">
                  <FieldArray
                    name="adminUserViewModel"
                    render={(fieldArrayProps) => {
                      const { form } = fieldArrayProps;
                      return (
                        <>
                          {form.values.adminUserViewModel.map(
                            (value: IAdminUser, i: number) => {
                              return (
                                <UserDetail
                                  fieldArrayProps={fieldArrayProps}
                                  key={i}
                                  index={i}
                                />
                              );
                            }
                          )}
                          <div className="flex justify-end items-center w-full">
                            <div className="w-full md:w-1/3 text-right">
                              <Label
                                onClick={() => {
                                  fieldArrayProps.push({
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    phone: "",
                                    isSuperUser: false,
                                    reportingTo: 0,
                                    role: "",
                                    recstatus: RecStatusValuebyName.Draft,
                                  });
                                }}
                              >
                                + Add another team member
                              </Label>
                            </div>
                          </div>
                        </>
                      );
                    }}
                  />
                </div>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default CreateUser;
