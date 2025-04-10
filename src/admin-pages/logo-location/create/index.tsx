"use client";
import CreateEditLogoLocation from "@/admin-pages/logo-location/components/CreateEditLogoLocation";
import LogoLocationDetails from "@/admin-pages/logo-location/components/LogoLocationDetail";
import { PageRoutes } from "@/admin-pages/routes";
import Button from "@/components/Button/Button";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import {
  getAll,
  logoLocationDetails,
} from "@/services/logo-location/logoLocation.service";
import {
  ILogoLocationItem,
  ILogoLocationListItem,
  TLogoLocationResponse,
} from "@/types/logo-location/logo-location.type";
import { CATEGORY_OPTIONS, STATUS_VALUES } from "@/utils/constants";
import { IDropdownOption } from "@/components/Table/types";
import { toast } from "react-toastify";
import { LogoLocationValidationSchema } from "@/utils/validations/logo-location.validation";
import { Formik, Form as FormikForm } from "formik";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { getErrorMessage } from "@/utils/common.util";
import { useRouter } from "next/navigation";
import ContentHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";
import Loader from "@/components/common/Loader";
const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor/RichTextEditor"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const CreateLogoLocation = (props: { id?: string }) => {
  const [data, setData] = useState<ILogoLocationListItem>();
  const [locationId, setLocationId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [oldBrands, setOldBrands] = useState<TLogoLocationResponse[]>([]);
  const [logoLocation, setLogoLocation] = useState<ILogoLocationItem[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [logoLocationDetail, setLogoLocationDetail] =
    useState<ILogoLocationItem>({} as ILogoLocationItem);
  const router = useRouter();

  const INITIAL_VALUES = useMemo(() => {
    return {
      categoryId: CATEGORY_OPTIONS.find((item) => item.label === data?.gender)
        ?.value,
      recStatus: data?.recStatus === "A" ? "active" : "inactive",
    };
  }, [data, CATEGORY_OPTIONS]);

  const getLogoLocationDetailList = async () => {
    try {
      const response = await logoLocationDetails();
      setLogoLocation(response.items);
    } catch (error) {
      toast.error("Error fetching logo location details");
    }
  };

  const openCreateLogoLocationModal = (id?: string) => {
    setOpenModal(true);
    setEditId(id || null);
  };

  const getLogoLocationList = async () => {
    try {
      const response = await getAll();
      const selectedLogoLocationResponse = response.items.find(
        (item) => item.id === Number(props.id)
      );
      setData(selectedLogoLocationResponse);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const getLogoLocationData = () => {};
  const createAndUpdateLogoLocationBrandField = () => {};

  const onSubmit = async (values: typeof INITIAL_VALUES) => {
    try {
      toast.success("Logo location created successfully");
      router.push(PageRoutes.LOGO_LOCATION.LIST);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    getLogoLocationList();
  }, []);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmit}
        validationSchema={LogoLocationValidationSchema}
      >
        {({ validateForm, values, setFieldValue }) => {
          return (
            <>
              <FormikForm>
                <CreatePageHeader
                  navigateUrl={PageRoutes.LOGO_LOCATION.LIST}
                  module={`${props.id ? "Edit" : "Create"} Logo Locations`}
                  validateForm={validateForm}
                  buttonType="submit"
                />
                <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4">
                  <div className="w-full lg:w-7/12 xl:w-10/12">
                    <div className="flex flex-wrap gap-4 lg:gap-8">
                      <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
                        <div className="font-semibold text-secondary-dark dark:text-secondary-light">
                          <div className="gap-4 grid grid-cols-1">
                            <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                              <div className="w-full">
                                <Dropdown
                                  id="category"
                                  asterisk
                                  label="Category"
                                  options={CATEGORY_OPTIONS}
                                  value={CATEGORY_OPTIONS.find(
                                    (item) => values?.categoryId === item.value
                                  )}
                                  name="categoryId"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "categoryId",
                                      (e as IDropdownOption).value
                                    );
                                  }}
                                  placeholder="Select Category"
                                  isFormikField
                                />
                              </div>
                            </div>

                            <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                              <div className="w-full">
                                <RichTextEditor label="Description" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
                        <ContentHeader name={"Logo Locations"}>
                          <Button
                            type="button"
                            data-modal-toggle="addcatalogModal"
                            onClick={() => {
                              openCreateLogoLocationModal();
                              setLogoLocationDetail({} as ILogoLocationItem);
                            }}
                          >
                            Add Logo Location
                          </Button>
                        </ContentHeader>

                        {!props.id ? (
                          <div className="flex flex-wrap uppercase font-bold text-sm mb-4 ml-8 text-rose-500 ">
                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                            Create Logo Location First To Add Logo Location
                            Detail Data
                          </div>
                        ) : (
                          <LogoLocationDetails
                            id={props.id}
                            locationId={locationId}
                            setLocationId={setLocationId}
                            getLogoLocationData={getLogoLocationData}
                            setLogoLocationDetail={setLogoLocationDetail}
                            logoLocationsDetails={logoLocation}
                            fetchLogoLocationDetails={getLogoLocationDetailList}
                            createAndUpdateLogoLocationBrandField={
                              createAndUpdateLogoLocationBrandField
                            }
                            setOldBrands={setOldBrands}
                            oldBrands={oldBrands}
                            openCreateLogoLocationModal={
                              openCreateLogoLocationModal
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-5/12 xl:w-2/12 py-4 border rounded-none border-gray-light dark:border-gray-dark">
                    <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4">
                      <div className="flex flex-col gap-2 max-w-sm mx-auto">
                        <Dropdown
                          id="logo-location-status"
                          label="Logo Location Status"
                          asterisk
                          isFormikField
                          options={STATUS_VALUES}
                          name={"recStatus"}
                          value={STATUS_VALUES.find(
                            (item) => values?.recStatus === item.value
                          )}
                          onChange={(e) => {
                            setFieldValue(
                              "recStatus",
                              (e as IDropdownOption).value
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </FormikForm>
            </>
          );
        }}
      </Formik>
      {openModal && (
        <CreateEditLogoLocation
          logoLocationDetail={logoLocationDetail}
          editId={editId}
          locationId={locationId}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default CreateLogoLocation;
