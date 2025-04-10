import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { Textarea } from "@/components/Textarea/Textarea";
import UploadImage from "@/components/UploadImage/UploadImage";
import { ISeoSocialFormProps } from "@/types/seo-tab/seoTab.type";
import { getErrorMessage } from "@/utils/common.util";
import { PRODUCT_SEO_FIELDS_WORD_LIMIT } from "@/utils/constants";
import { toast } from "react-toastify";
import ToolTipMessage from "@/components/common/product/seo/ToolTipMessage";
import WarningSigns from "@/components/common/product/seo/WarningSigns";

const SeoSocialForm = ({
  colorSelectorFunction,
  socialFormik,
}: ISeoSocialFormProps) => {
  const { values, setFieldValue, handleChange, handleBlur } = socialFormik;

  const handleOpenGraphImage = (file?: File) => {
    try {
      if (!file) {
        setFieldValue("social.ogTags.image", null, true);
        setFieldValue("social.ogTags.url", "");
        setFieldValue("social.facebook.url", "");
        setFieldValue("social.twitter.url", "");
        setFieldValue("social.linkedin.url", "");
        return;
      }
      setFieldValue("social.ogTags.image", file, true);
      const imageUrl = URL.createObjectURL(file);
      setFieldValue("social.ogTags.url", imageUrl);
      setFieldValue("social.facebook.url", imageUrl);
      setFieldValue("social.twitter.url", imageUrl);
      setFieldValue("social.linkedin.url", imageUrl);
      setFieldValue("social.pinterest.url", imageUrl);
    } catch (error) {
      toast.error(getErrorMessage(error) || "Error creating image URL");
    }
  };

  return (
    <div>
      {/* Open Graph */}
      <div className="w-full content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark mt-4">
        <div className="flex flex-col gap-4 lg:gap-6 font-semibold text-secondary-dark dark:text-secondary-light">
          <div className="flex items-center justify-between">
            <Label size="large">Open Graph</Label>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="col-span-2 md:col-span-1">
              <UploadImage
                key="open_graph_file_upload"
                initialImages={
                  values.social.ogTags.url ? [values.social.ogTags.url] : []
                }
                onUpload={(files) => handleOpenGraphImage(files?.[0])}
              />
            </div>

            <div className="flex flex-col gap-4 lg:gap-6 col-span-2 md:col-span-1">
              <div className="flex gap-2">
                <div className="w-full">
                  <Input
                    name="social.ogTags.title"
                    label={
                      <div className="flex flex-col gap-1 sm:flex-row justify-between w-full">
                        <div className="flex">
                          Open Graph Title{" "}
                          <ToolTipMessage
                            message1="1 TO 60 Characters = Green"
                            message2="0 Characters = Red"
                            message3=""
                          />
                        </div>

                        <div className="flex sm:justify-end justify-start text-quaternary-dark dark:text-quaternary-light text-sm">
                          <span className="text-xs">
                            <span>{values.social.ogTags.title?.length}</span> /{" "}
                            <span>
                              {PRODUCT_SEO_FIELDS_WORD_LIMIT.OG_TITLE.LIMIT}
                            </span>{" "}
                            Characters
                            {`(Max ${PRODUCT_SEO_FIELDS_WORD_LIMIT.OG_TITLE.MAX} Characters)`}
                          </span>
                        </div>
                      </div>
                    }
                    labelClassName="flex justify-between w-full"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      console.log(e.target.value, "<--value");
                      handleChange(e);
                      setFieldValue("social.facebook.title", e.target.value);
                      setFieldValue("social.twitter.title", e.target.value);
                      setFieldValue("social.linkedin.title", e.target.value);
                      setFieldValue("social.pinterest.title", e.target.value);
                    }}
                    onBlur={handleBlur}
                    maxLength={PRODUCT_SEO_FIELDS_WORD_LIMIT.OG_TITLE.MAX}
                  />
                </div>
                <div>
                  <WarningSigns
                    colorFill={colorSelectorFunction(
                      "ogTagTitle",
                      values.social.ogTags.title
                    )}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-full">
                  <Textarea
                    name="social.ogTags.description"
                    isFormikField
                    rows={2}
                    value={values.social.ogTags.description}
                    maxLength={PRODUCT_SEO_FIELDS_WORD_LIMIT.OG_DESCRIPTION.MAX}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      handleChange(e);
                      setFieldValue(
                        "social.facebook.description",
                        values.social.ogTags.description
                      );
                      setFieldValue(
                        "social.twitter.description",
                        values.social.ogTags.description
                      );
                      setFieldValue(
                        "social.linkedin.description",
                        values.social.ogTags.description
                      );
                      setFieldValue(
                        "social.pinterest.description",
                        values.social.ogTags.description
                      );
                    }}
                    onBlur={handleBlur}
                    label={
                      <div className="flex flex-col gap-1 sm:flex-row justify-between w-full">
                        <div className="flex">
                          Open Graph Description
                          <ToolTipMessage
                            message1="120 TO 155 Characters = Green"
                            message2="LESS THAN 120 Characters = Yellow"
                            message3="0 Characters = Red"
                          />
                        </div>
                        <div className="flex sm:justify-end justify-start text-quaternary-dark dark:text-quaternary-light text-sm">
                          <span className="text-xs">
                            <span>
                              {values.social.ogTags.description?.length}
                            </span>{" "}
                            /{" "}
                            <span>
                              {
                                PRODUCT_SEO_FIELDS_WORD_LIMIT.OG_DESCRIPTION
                                  .LIMIT
                              }
                            </span>{" "}
                            Character
                            {`(Max ${PRODUCT_SEO_FIELDS_WORD_LIMIT.OG_DESCRIPTION.MAX} Characters)`}
                          </span>
                        </div>
                      </div>
                    }
                  />
                </div>
                <div>
                  <WarningSigns
                    colorFill={colorSelectorFunction(
                      "ogTagDescription",
                      values.social.ogTags.description
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Open Graph Preview */}
      <div className="w-full content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark mt-4">
        <div className="flex flex-col gap-2 font-semibold text-secondary-dark dark:text-secondary-light">
          <div className="flex items-center justify-between  mb-2">
            <Label size="large">Open Graph Preview</Label>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4 lg:gap-6 pt-3 items-center col-span-2 md:col-span-1 border border-gray-light dark:border-gray-dark">
              <SvgIcon
                name="Facebook"
                className="w-10 h-10 fill-primary-light dark:fill-primary-dark"
              />
              <div className="w-52 h-52">
                <UploadImage
                  className="w-full h-full"
                  onUpload={() => {}}
                  initialImages={
                    values.social.facebook.url
                      ? [values.social.facebook.url]
                      : []
                  }
                  key="facebook"
                  id="facebook"
                />
              </div>
              <div className="text-base w-full bg-gray-pointer/60 p-4 flex flex-col gap-2 min-h-28">
                <div className="text-md font-bold text-primary-light dark:text-primary-dark">
                  {values?.social.facebook.title}
                </div>
                <div className="text-sm text-primary-light/80 dark:text-primary-dark/80 break-words">
                  {values?.social.facebook.description}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-3 items-center col-span-2 md:col-span-1 border border-gray-light dark:border-gray-dark">
              <SvgIcon
                name="Twitter"
                className="w-10 h-10   fill-primary-light dark:fill-primary-dark"
              />
              <div className="w-52 h-52">
                <UploadImage
                  className="w-full h-full"
                  onUpload={() => {}}
                  initialImages={
                    values.social.twitter.url ? [values.social.twitter.url] : []
                  }
                />
              </div>
              <div className="text-base w-full bg-gray-pointer/60 p-4 flex flex-col gap-2 min-h-28">
                <div className="text-md font-bold text-primary-light dark:text-primary-dark">
                  {values?.social.twitter.title}
                </div>
                <div className="text-sm text-primary-light/80 dark:text-primary-dark/80 break-words">
                  {values?.social.twitter.description}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-3 items-center col-span-2 md:col-span-1 border border-gray-light dark:border-gray-dark">
              <SvgIcon
                name="LinkedIn"
                className="w-10 h-10  fill-primary-light dark:fill-primary-dark"
              />
              <div className="w-52 h-52">
                <UploadImage
                  className="w-full h-full"
                  onUpload={() => {}}
                  initialImages={
                    values.social.linkedin.url
                      ? [values.social.linkedin.url]
                      : []
                  }
                />
              </div>
              <div className="text-base w-full bg-gray-pointer/60 p-4 flex flex-col gap-2 min-h-28">
                <div className="text-md font-bold text-primary-light dark:text-primary-dark">
                  {values?.social.linkedin.title}
                </div>
                <div className="text-sm text-primary-light/80 dark:text-primary-dark/80 break-words">
                  {values?.social.linkedin.description}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-3 items-center col-span-2 md:col-span-1 border border-gray-light dark:border-gray-dark">
              <SvgIcon
                name="Pinterest"
                className="w-10 h-10  text-primary-light dark:text-primary-dark"
              />
              <div className="w-52 h-52">
                <UploadImage
                  className="w-full h-full"
                  onUpload={() => {}}
                  initialImages={
                    values.social.pinterest.url
                      ? [values.social.pinterest.url]
                      : []
                  }
                />
              </div>
              <div className="text-base w-full bg-gray-pointer/60 p-4 flex flex-col gap-2 min-h-28">
                <div className="text-md font-bold text-primary-light dark:text-primary-dark">
                  {values?.social.pinterest.title}
                </div>
                <div className="text-sm text-primary-light/80 dark:text-primary-dark/80 break-words">
                  {values?.social.pinterest.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoSocialForm;
