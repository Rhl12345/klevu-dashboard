"use client";
import { PageRoutes } from "@/admin-pages/routes";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import STATUS_OPTIONS from "@/mock-data/DimensionActive.json";
import {
  IDimensionItem,
  IDimenSionsPayload,
  IDimenSionsProps,
} from "@/types/dimensions/dimension.type";
import { getErrorMessage } from "@/utils/common.util";
import { IDropdownOption } from "@/components/Table/types";
import { useRouter } from "next/navigation";
import { calculateVolume } from "@/utils/helpers";
import { DimensionSchemaValidation } from "@/utils/validations/dimensions.validaiont";
import { Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { parentCategoryOptions } from "@/utils/Dummy";
import InputNumber from "@/components/Input/InputNumber";
import { getAllDimensions } from "@/services/dimensions/dimensions.service";

const CreateDimensionsPage = (props: IDimenSionsProps) => {
  const [dimensionData, setDimensionData] = useState<IDimensionItem>();

  const INITIAL_VALUES: IDimenSionsPayload = {
    name: dimensionData?.name || "",
    categoryId:
      parentCategoryOptions.find(
        (item) => item.value == String(dimensionData?.categoryId)
      )?.value || "",
    length: Number(dimensionData?.length) || null,
    width: Number(dimensionData?.width) || null,
    height: Number(dimensionData?.height) || null,
    recStatus: dimensionData?.recStatus === "A" ? "active" : "inactive",
  };

  const router = useRouter();

  // Add proper type for input change handler
  const handleInputChange = useCallback(
    (setFieldValue: (field: string, value: string) => void) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(e.target.name, e.target.value);
      },
    []
  );

  const onSubmit = useCallback(
    async (values: IDimenSionsPayload) => {
      try {
        toast.success(
          `Dimension ${props.id ? "updated" : "created"} successfully`
        );
        router.push(PageRoutes.DIMENSIONS.LIST);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    [props.id, router]
  );

  const getDimensionList = async () => {
    try {
      const response = await getAllDimensions();
      const selectedDimensionResponse = response.items.find(
        (item) => item.id === Number(props.id)
      );
      setDimensionData(selectedDimensionResponse);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getDimensionList();
  }, []);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={DimensionSchemaValidation}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue, validateForm }) => {
        return (
          <Form>
            <CreatePageHeader
              navigateUrl={PageRoutes.DIMENSIONS.LIST}
              module={`${props.id ? "Edit" : "Add"} Product Dimensions`}
              buttonType="submit"
              validateForm={validateForm}
            />
            <div className="lg:py-8 xl:px-8 py-4 px-4 w-full">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-full xl:col-span-10">
                  <div className="w-full bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark p-6">
                    <div className="w-full bg-body-light dark:bg-body-dark mb-6">
                      <div className="w-full mb-6 last:mb-0 relative">
                        <Input label="Name" asterisk type="text" name="name" />
                      </div>
                      <div className="w-full mb-6 last:mb-0 relative">
                        <Dropdown
                          id="categoryId"
                          label="Category"
                          isFormikField
                          name="categoryId"
                          asterisk
                          options={parentCategoryOptions}
                          value={parentCategoryOptions.find(
                            (item) => item.value == values.categoryId
                          )}
                          onChange={(event) => {
                            setFieldValue(
                              "categoryId",
                              (event as IDropdownOption).value
                            );
                          }}
                        />
                      </div>
                      <div className="w-full flex flex-col gap-2 text-quaternary-dark dark:text-quaternary-light">
                        <Label required>Dimension</Label>
                        <div className="flex flex-row gap-4">
                          <InputNumber
                            displayError
                            name="length"
                            allowNegative={false}
                            value={values.length!}
                            placeholder="Length"
                            onChange={handleInputChange(setFieldValue)}
                          />
                          <div className="mt-3">X</div>
                          <InputNumber
                            displayError
                            name="width"
                            allowNegative={false}
                            value={values.width!}
                            placeholder="Width"
                            onChange={handleInputChange(setFieldValue)}
                          />
                          <div className="mt-3">X</div>
                          <InputNumber
                            displayError
                            name="height"
                            allowNegative={false}
                            value={values.height!}
                            placeholder="Height"
                            onChange={handleInputChange(setFieldValue)}
                          />
                          <div className="mt-3">=</div>
                          <InputNumber
                            placeholder="Volume"
                            allowNegative={false}
                            type="text"
                            name="volume"
                            value={calculateVolume(
                              values.length!,
                              values.width!,
                              values.height!
                            )}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col col-span-full xl:col-span-2 py-4 border border-gray-light dark:border-gray-dark">
                  <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4">
                    <Dropdown
                      id="recStatus"
                      asterisk
                      label="Dimension Status"
                      name="recStatus"
                      isFormikField
                      options={STATUS_OPTIONS}
                      value={STATUS_OPTIONS.find(
                        (item) => item.value == values.recStatus
                      )}
                      onChange={(event) => {
                        setFieldValue(
                          "recStatus",
                          (event as IDropdownOption).value
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateDimensionsPage;
