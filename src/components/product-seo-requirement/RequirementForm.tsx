import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import FieldPercentagesForm from "@/components/product-seo-requirement/FieldPercentagesForm";
import storeList from "@/mock-data/product-requirement/storeList.json";
import { IRequirementFormProps } from "@/types/product-seo-requirement/productSeoRequirement.type";
import { STATUS_VALUES } from "@/utils/constants";

const RequirementForm = ({
  values,
  setFieldValue,
  touched,
  errors,
  readinessDetail,
  id,
}: IRequirementFormProps) => {
  return (
    <div className="-full flex max-lg:flex-wrap  gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4">
      <div className="w-full lg:w-7/12 xl:w-10/12">
        <div className="flex flex-wrap gap-4 lg:gap-6">
          <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
            <div className="font-semibold text-secondary-dark dark:text-secondary-light">
              <div className="gap-4 lg:gap-6 grid grid-cols-1">
                <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                  <div className="lg:w-6/12">
                    <Dropdown
                      label="Store Name"
                      id="storeName"
                      name="storeName"
                      placeholder="Select..."
                      options={storeList}
                      value={
                        storeList.find(
                          (item) => item.value === values.storeName
                        ) || null
                      }
                      onChange={(option: any) =>
                        setFieldValue("storeName", option.value)
                      }
                      error={touched.storeName && !!errors.storeName}
                      errorMessage={errors.storeName}
                      asterisk
                      isDisabled={!!id}
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="Readiness Percentage Required to Publish Product"
                      name="percentage"
                      placeholder="Enter Percentage"
                      id="percentage"
                      type="number"
                      asterisk
                    />
                  </div>
                </div>
                <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="Name"
                      name="name"
                      placeholder="Enter Name"
                      id="name"
                      asterisk
                    />
                  </div>
                  <div className="lg:w-6/12"></div>
                </div>
              </div>
            </div>
          </div>
          {id ? (
            <FieldPercentagesForm
              maxPercentage={+values.percentage}
              readinessDetail={readinessDetail}
            />
          ) : (
            <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
              <div className="text-center text-red-500 font-semibold">
                First Save Readiness To Add Readiness Percentage Field
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full lg:w-5/12 xl:w-2/12 py-4 border rounded-none border-gray-light dark:border-gray-dark">
        <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4">
          <Dropdown
            label="Readiness Status"
            id="readinessStatus"
            name="readinessStatus"
            options={STATUS_VALUES}
            value={
              STATUS_VALUES.find(
                (item) => item.value === values.readinessStatus
              ) || null
            }
            onChange={(option: any) =>
              setFieldValue("readinessStatus", option.value)
            }
            asterisk
            error={touched.readinessStatus && !!errors.readinessStatus}
            errorMessage={errors.readinessStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default RequirementForm;
