import RadioGroup from "@/components/RadioGroup/RadioGroup";
import Text from "@/components/Text/Text";
import { SEO_RADIO_GROUP } from "@/mock-data/seoStoreData";
import { ISeoFormTabProps, ISeoFormValues } from "@/types/seo-tab/seoTab.type";
import { seoStoreValidationSchema } from "@/utils/validations/seoStore.validation";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import SeoForm from "@/components/common/product/seo/SeoForm";
import SeoSocialForm from "@/components/common/product/seo/SeoSocialForm";
import { toast } from "react-toastify";

const SeoTab = ({
  onFormChange,
  setIsFormValid,
  initialData = {},
}: ISeoFormTabProps) => {
  const [selectedResult, setSelectedResult] = useState(
    SEO_RADIO_GROUP[0].label
  );
  const initialValues: ISeoFormValues = {
    pageUrl: initialData?.pageUrl || "",
    pageTitle: initialData?.pageTitle || "",
    metaDescription: initialData?.metaDescription || "",
    metaKeywords: initialData?.metaKeywords || "",
    roiKeywords: initialData?.roiKeywords || "",
    targetedKeywords: initialData?.targetedKeywords || "",
    h1: initialData?.h1 || "",
    h2: initialData?.h2 || "",
    h3: initialData?.h3 || "",
    h4: initialData?.h4 || "",
    h5: initialData?.h5 || "",
    h6: initialData?.h6 || "",
    social: {
      ogTags: {
        title: initialData?.social?.title || "",
        description: initialData?.social?.description || "",
      },
      facebook: {
        title: initialData?.social?.title || "",
        description: initialData?.social?.description || "",
      },
      twitter: {
        title: initialData?.social?.title || "",
        description: initialData?.social?.description || "",
      },
      linkedin: {
        title: initialData?.social?.title || "",
        description: initialData?.social?.description || "",
      },
      pinterest: {
        title: initialData?.social?.title || "",
        description: initialData?.social?.description || "",
      },
    },
  };

  const handleSubmit = (values: ISeoFormValues) => {
    toast.success("SEO specifications saved successfully");
    // Handle form submission
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={seoStoreValidationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        useEffect(() => {
          if (onFormChange && formik.dirty) {
            onFormChange();
          }

          if (Object.keys(formik.errors).length === 0) {
            setIsFormValid?.(true);
          } else {
            setIsFormValid?.(false);
          }
        }, [formik.dirty, onFormChange, formik.errors]);

        const calculateWordCount = (value: string) =>
          value.split(",").filter((word: string) => word !== "").length;

        const colorSelectorFunction = (type: string, value: any) => {
          if (type === "pageUrl") {
            return value.length === 0 || value.length > 160
              ? "bg-red-500"
              : value.length > 100
                ? "bg-yellow-500"
                : "bg-green-500";
          }

          if (type === "pageTitle") {
            return value.length === 0
              ? "bg-red-500"
              : value.length > 60
                ? "bg-yellow-500"
                : "bg-green-500";
          }

          if (type === "metaDescription") {
            return value.length === 0 || value.length > 155
              ? "bg-red-500"
              : value.length >= 120 && value.length <= 155
                ? "bg-green-500"
                : "bg-yellow-500";
          }

          if (type === "metaKeywords") {
            let wordCount = calculateWordCount(value);
            return wordCount === 0 || wordCount > 155
              ? "bg-red-500"
              : wordCount >= 4 && wordCount <= 7
                ? "bg-green-500"
                : "bg-yellow-500";
          }

          if (type === "roiKeywords" || type === "targetedKeywords") {
            let wordCount = calculateWordCount(value);
            return wordCount === 0
              ? "bg-red-500"
              : wordCount >= 4 && wordCount <= 7
                ? "bg-yellow-500"
                : wordCount >= 1 && wordCount <= 3
                  ? "bg-green-500"
                  : "";
          }

          if (type === "headerTag") {
            const tag = value.tag;
            const tagValue = value.value;
            if (tag === "h1") {
              return tagValue.length === 1 ? "bg-green-600" : "bg-red-500";
            }
            return tagValue.length > 0 ? "bg-green-600" : "bg-red-500";
          }

          if (type === "ogTagTitle") {
            return value.length === 0
              ? "bg-red-500"
              : value.length >= 1 && value.length <= 60
                ? "bg-green-500"
                : "";
          }

          if (type === "ogTagDescription") {
            return value.length === 0
              ? "bg-red-500"
              : value.length >= 120 && value.length <= 155
                ? "bg-green-500"
                : "bg-yellow-500";
          }
          return "";
        };
        return (
          <>
            <div className="border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
              <div className="flex flex-col gap-4 lg:gap-6 dark:border-gray-dark">
                <Text size="lg">Meta Data</Text>

                <div className="flex items-end gap-4 w-full">
                  {SEO_RADIO_GROUP.map((tab, index) => {
                    return (
                      <div className="" key={index}>
                        <div className="inline-flex items-center">
                          <RadioGroup
                            id={`password_strength_${index}`}
                            label={tab.label}
                            name="passwordStrengthType"
                            value={tab.label}
                            defaultChecked={selectedResult === tab.label}
                            onChange={() => {
                              setSelectedResult(tab.label);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Text size="base">
                  https://beta-cg.parsonskellogg.shop//{formik.values?.pageUrl}
                  .html
                </Text>
                <Text size="base">{formik?.values?.pageTitle}</Text>
                <Text size="base">
                  {formik?.values?.pageTitle} gives its customers exclusive,
                  direct access to custom branded clothing and accessories from
                  {selectedResult === "Mobile Result"
                    ? ""
                    : "iconic premium sports and lifestyle brands."}
                </Text>
                {selectedResult === "Mobile Result" && (
                  <Text size="base">
                    iconic premium sports and lifestyle brands.
                  </Text>
                )}

                <SeoForm
                  socialFormik={formik}
                  colorSelectorFunction={colorSelectorFunction}
                  calculateWordCount={calculateWordCount}
                />
              </div>
            </div>

            <SeoSocialForm
              socialFormik={formik}
              colorSelectorFunction={colorSelectorFunction}
            />
          </>
        );
      }}
    </Formik>
  );
};

export default SeoTab;
