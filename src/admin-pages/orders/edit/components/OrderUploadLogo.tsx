import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import Image from "@/components/Image/Image";
import Modal from "@/components/Modal/Modal";
import RadioGroup from "@/components/RadioGroup/RadioGroup";
import UploadImage from "@/components/UploadImage/UploadImage";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const OrderUploadLogo = ({
  item,
  setShowUploadLogo,
  showUploadLogo,
}: {
  item: any;
  setShowUploadLogo: any;
  showUploadLogo: boolean;
}) => {
  const LogoPositionOptions = [
    { label: "Back Yoke", value: "Back Yoke" },
    { label: "Full Back", value: "Full Back" },
    { label: "Left Chest", value: "Left Chest" },
  ];

  const logoLocationBank = [
    {
      value:
        "/betastoragemedia/1/store/5/images/logo_16_638675754569198443_93825.png",
      label: "New Logo",
    },
    {
      value:
        "/betastoragemedia/1/store/5/images/logo_16_638675754569198443_93825_94024.png",
      label: "New Logo",
    },
    {
      value:
        "/betastoragemedia/storagemedia/1/store/5/images/screenshot 2024-05-08 113158_638723326973728889.png",
      label: "New Logo",
    },
    {
      value:
        "/betastoragemedia/storagemedia/1/store/5/images/screenshot 2024-05-10 112535_638723342768633046.png",
      label: "New Logo",
    },
    {
      value:
        "/betastoragemedia/1/logolocation/1/details/Right-Sleeve-70-193.jpg",
      label: "t",
    },
    {
      value:
        "/betastoragemedia/storagemedia/1/store/5/images/screenshot 2024-05-10 112535_638723342768633046.png",
      label: "t",
    },
  ];

  const validationSchema = Yup.object().shape({
    logoPosition: Yup.string().required("Logo Position is required"),
    waysToUploadLogo: Yup.string(),

    logoUrl: Yup.string().when("waysToUploadLogo", {
      is: "By uploading logo",
      then: (schema) => schema.required("Logo is required"),
    }),

    logoLocationBank: Yup.string().when("waysToUploadLogo", {
      is: "By selecting logo form logo bank",
      then: (schema) => schema.required("Logo is required"),
    }),
  });

  const submitHandler = (values: any) => {
    toast.success("Logo uploaded successfully");
    setShowUploadLogo(false);
  };

  const initialValues = {
    id: item?.id || 0,
    mainId: item?.mainId || 0,
    logoPosition: item?.logoLocation || item?.logoName || "",
    logoUrl: item?.logo || "",
    logoPositionImage: item?.logoPositionImage || "",
    waysToUploadLogo: "By uploading logo",
    logoLocationBank: "",
    logoName: item?.logoName,
    reUsableCustomerLogo: 0,
    rowVersion: item?.rowVersion || "",
  };

  return (
    <>
      <Modal
        isOpen={showUploadLogo}
        onClose={() => setShowUploadLogo(false)}
        header="Upload Logo"
        size="3xl"
        footer={
          <>
            <Button
              form="orderUploadLogo"
              type="submit"
              variant="primary"
              size="md"
            >
              Save
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setShowUploadLogo(false);
              }}
              type="button"
            >
              Cancel
            </Button>
          </>
        }
        content={
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={submitHandler}
            validationSchema={validationSchema}
          >
            {({
              errors,
              setFieldValue,
              values,
              setFieldError,
              resetForm,
              touched,
              setFieldTouched,
            }) => {
              return (
                <Form id="orderUploadLogo">
                  <div className={`w-full flex flex-col gap-y-4`}>
                    <div>
                      <Dropdown
                        options={LogoPositionOptions}
                        name="logoPosition"
                        defaultValue={values.logoPosition}
                        label="Select Logo Position"
                        asterisk={true}
                        errorMessage={
                          touched.logoPosition && errors.logoPosition
                            ? String(errors.logoPosition)
                            : ""
                        }
                        error={!!errors.logoPosition}
                        onChange={(e: any) => {
                          console.log(e);
                          if (e) {
                            setFieldValue("logoPosition", e.value);
                          } else {
                            setFieldValue("logoPosition", "");
                            setFieldError(
                              "logoPosition",
                              "Logo Position is required"
                            );
                          }
                        }}
                      />
                    </div>

                    <div>
                      <RadioGroup
                        type="radio"
                        name="waysToUploadLogo"
                        id={"waysToUploadLogo-byUploading"}
                        value={"By uploading logo"}
                        onClick={(e: any) => {
                          setFieldValue(`waysToUploadLogo`, e.target.value);
                          setFieldError("logoUrl", "");
                          setFieldTouched("logoUrl", false);
                        }}
                        checked={
                          values.waysToUploadLogo === "By uploading logo"
                        }
                        label={"Upload Logo"}
                      />

                      <RadioGroup
                        type="radio"
                        name="waysToUploadLogo"
                        id={"waysToUploadLogo-bySlececting"}
                        value={"By selecting logo form logo bank"}
                        onClick={(e: any) => {
                          setFieldValue(`waysToUploadLogo`, e.target.value);
                          setFieldError("logoLocationBank", "");
                          setFieldTouched("logoLocationBank", false);
                        }}
                        checked={
                          values.waysToUploadLogo ===
                          "By selecting logo form logo bank"
                        }
                        label={"Use From Logo Bank"}
                      />
                    </div>
                    <div className={`w-full border-none`}>
                      {values.waysToUploadLogo === "By uploading logo" ? (
                        <>
                          <UploadImage
                            id="logoUrl"
                            label="Upload Logo"
                            asterisk={true}
                            onUpload={(files) => {
                              setFieldValue("logoUrl", files[0] || null);
                            }}
                            errorMessage={
                              touched.logoUrl && errors.logoUrl
                                ? String(errors.logoUrl)
                                : ""
                            }
                          />
                        </>
                      ) : (
                        <>
                          <Dropdown
                            options={logoLocationBank}
                            name="reUsableCustomerLogo"
                            label="Select Logo"
                            defaultValue={values.reUsableCustomerLogo}
                            errorMessage={
                              errors.logoLocationBank
                                ? String(errors.logoLocationBank)
                                : ""
                            }
                            error={
                              touched.logoLocationBank &&
                              !!errors.logoLocationBank
                            }
                            onChange={(e: any) => {
                              if (e) {
                                setFieldValue("reUsableCustomerLogo", e.label);
                                setFieldValue("logoLocationBank", e.value);
                              } else {
                                setFieldValue("logoLocationBank", "");
                              }
                            }}
                          />

                          <div className="h-40 w-full border border-1 flex justify-center items-center my-2   rounded">
                            <Image
                              className="h-30 w-30"
                              src={`https://storagemedia.corporategear.com/${values.logoLocationBank}`}
                              alt=""
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        }
      />
    </>
  );
};

export default OrderUploadLogo;
