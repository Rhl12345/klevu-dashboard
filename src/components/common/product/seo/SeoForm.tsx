import { Form } from "formik";
import Input from "@/components/Input/Input";
import { Textarea } from "@/components/Textarea/Textarea";
import { ISeoFormProps, ISeoFormValues } from "@/types/seo-tab/seoTab.type";
import WarningSigns from "./WarningSigns";
import ToolTipMessage from "./ToolTipMessage";
import { Label } from "@/components/Label/Label";
import Text from "@/components/Text/Text";
import { PRODUCT_SEO_FIELDS_WORD_LIMIT } from "@/utils/constants";
const SeoForm = ({
  socialFormik,
  colorSelectorFunction,
  calculateWordCount,
}: ISeoFormProps) => {
  const { values, handleChange, handleBlur, setFieldValue } = socialFormik;

  const wordLimitHandleChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
    limit: number,
    key: string
  ) => {
    let inputText = e.target.value;
    let words = inputText.trim().split(",").filter(Boolean);
    if (words.length <= limit) {
      setFieldValue(key, inputText);
    }
  };

  return (
    <Form className="flex flex-col gap-4 lg:gap-6">
      <div className="flex flex-col gap-4">
        <div className=" flex flex-col gap-1 sm:flex-row justify-between w-full">
          <div className="flex">
            <Label asterisk>
              Page URL
              <ToolTipMessage
                message1="1 TO 100 CHARACTERS = GREEN"
                message2="101 TO 160 = YELLOW"
                message3="0 OR 160+ = RED"
              />
            </Label>
          </div>
          <div className="flex sm:justify-end justify-start text-quaternary-dark dark:text-quaternary-light text-sm">
            <span className="text-xs">
              <span>{values.pageUrl.length}</span> /{" "}
              <span>{PRODUCT_SEO_FIELDS_WORD_LIMIT.PAGE_URL.LIMIT}</span>{" "}
              Character
              {`(Max ${PRODUCT_SEO_FIELDS_WORD_LIMIT.PAGE_URL.MAX} characters)`}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Text size="base">https://beta-cg.parsonskellogg.shop//</Text>
          <div className="w-full flex grow gap-2">
            <Input
              name="pageUrl"
              placeholder="Enter page URL"
              value={values.pageUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={true}
              maxLength={PRODUCT_SEO_FIELDS_WORD_LIMIT.PAGE_URL.MAX}
            />
            <Text size="base">.html</Text>
          </div>
          <WarningSigns
            colorFill={colorSelectorFunction("pageUrl", values.pageUrl)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="w-full">
          <Input
            name="pageTitle"
            placeholder="Enter page title"
            value={values.pageTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            label={
              <div className=" flex flex-col gap-1 sm:flex-row justify-between w-full">
                <div className="flex">
                  <Label asterisk>
                    Page Title
                  </Label>
                  <ToolTipMessage
                    message1="1 TO 60 CHARACTERS = GREEN"
                    message2="61 TO 72 CHARACTERS = YELLOW"
                    message3="0 CHARACTERS = RED"
                  />
                </div>

                <div className="flex sm:justify-end justify-start text-quaternary-dark dark:text-quaternary-light text-sm">
                  <span className="text-xs">
                    <span>{values.pageTitle.length}</span> /{" "}
                    <span>{PRODUCT_SEO_FIELDS_WORD_LIMIT.PAGE_TILE.LIMIT}</span>{" "}
                    Character
                    {`(Max ${PRODUCT_SEO_FIELDS_WORD_LIMIT.PAGE_TILE.MAX} characters)`}
                  </span>
                </div>
              </div>
            }
            maxLength={PRODUCT_SEO_FIELDS_WORD_LIMIT.PAGE_TILE.MAX}
          />
        </div>
        <div className="flex gap-2">
          <WarningSigns
            colorFill={colorSelectorFunction("pageTitle", values.pageTitle)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="w-full">
          <Textarea
            name="metaDescription"
            label={
              <div className=" flex flex-col gap-1 sm:flex-row justify-between w-full">
                <div className="flex">
                  <Label asterisk>
                    Meta Description
                  </Label>
                  <ToolTipMessage
                    message1="120 TO 155 CHARACTERS = GREEN"
                    message2="LESS THAN 120 CHARACTERS = YELLOW"
                    message3="0 OR 155+ CHARACTERS = RED"
                  />
                </div>

                <div className="flex sm:justify-end justify-start text-quaternary-dark dark:text-quaternary-light text-sm">
                  <span className="text-xs">
                    <span>{values.metaDescription.length}</span> /{" "}
                    <span>
                      {PRODUCT_SEO_FIELDS_WORD_LIMIT.META_DESCRIPTION.LIMIT}
                    </span>{" "}
                    Character
                    {`(Max ${PRODUCT_SEO_FIELDS_WORD_LIMIT.META_DESCRIPTION.MAX} characters)`}
                  </span>
                </div>
              </div>
            }
            placeholder="Enter meta description"
            rows={4}
            isFormikField
            maxLength={PRODUCT_SEO_FIELDS_WORD_LIMIT.META_DESCRIPTION.MAX}
            value={values.metaDescription}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              handleChange(e);
              setFieldValue("social.ogTags.description", e.target.value);
              setFieldValue("social.facebook.description", e.target.value);
              setFieldValue("social.linkedin.description", e.target.value);
              setFieldValue("social.twitter.description", e.target.value);
              setFieldValue("social.pinterest.description", e.target.value);
            }}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <WarningSigns
            colorFill={colorSelectorFunction(
              "metaDescription",
              values.metaDescription
            )}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="w-full">
          <Textarea
            name="metaKeywords"
            placeholder="Enter meta keywords"
            rows={4}
            label={
              <div className="flex flex-col gap-1 sm:flex-row justify-between w-full">
                <div className="flex">
                  Meta Keywords<span className="text-danger">*</span>
                  <ToolTipMessage
                    message1="4 TO 7 WORDS = GREEN"
                    message2="LESS THAN 120 WORDS = YELLOW"
                    message3="0 OR 155+ WORDS = RED"
                  />
                </div>

                <div className="flex sm:justify-end justify-start text-quaternary-dark dark:text-quaternary-light text-sm">
                  <span className="text-xs">
                    <span>{calculateWordCount(values.metaKeywords)}</span> /{" "}
                    <span>
                      {PRODUCT_SEO_FIELDS_WORD_LIMIT.META_KEYWORDS.LIMIT}
                    </span>{" "}
                    Words
                    {`(Max ${PRODUCT_SEO_FIELDS_WORD_LIMIT.META_KEYWORDS.MAX} words)`}
                  </span>
                </div>
              </div>
            }
            isFormikField
            value={values.metaKeywords}
            onChange={(e) =>
              wordLimitHandleChange(
                e,
                PRODUCT_SEO_FIELDS_WORD_LIMIT.META_KEYWORDS.MAX,
                "metaKeywords"
              )
            }
            onBlur={handleBlur}
          />
        </div>
        <div>
          <WarningSigns
            colorFill={colorSelectorFunction(
              "metaKeywords",
              values.metaKeywords
            )}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="w-full">
          <Input
            name="roiKeywords"
            label={
              <div className=" flex flex-col gap-1 sm:flex-row justify-between w-full">
                <div className="flex">
                  ROI Keywords
                  <ToolTipMessage
                    message1="1 TO 3 WORDS = GREEN"
                    message2="4 TO 7 WORDS = YELLOW"
                    message3="0 WORDS = RED"
                  />
                </div>

                <div className="flex sm:justify-end justify-start text-quaternary-dark dark:text-quaternary-light text-sm">
                  <span className="text-xs">
                    <span>{calculateWordCount(values.roiKeywords)}</span> /{" "}
                    <span>
                      {PRODUCT_SEO_FIELDS_WORD_LIMIT.ROI_KEYWORDS.LIMIT}
                    </span>{" "}
                    Words
                    {`(Max ${PRODUCT_SEO_FIELDS_WORD_LIMIT.ROI_KEYWORDS.MAX} words)`}
                  </span>
                </div>
              </div>
            }
            placeholder="Enter ROI keywords"
            value={values.roiKeywords}
            onChange={(e) =>
              wordLimitHandleChange(
                e,
                PRODUCT_SEO_FIELDS_WORD_LIMIT.ROI_KEYWORDS.MAX,
                "roiKeywords"
              )
            }
            onBlur={handleBlur}
          />
        </div>
        <div>
          <WarningSigns
            colorFill={colorSelectorFunction("roiKeywords", values.roiKeywords)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="w-full">
          <Input
            name="targetedKeywords"
            placeholder="Enter targeted keywords"
            value={values.targetedKeywords}
            label={
              <div className=" flex flex-col gap-1 sm:flex-row justify-between w-full">
                <div className="flex">
                  Targeted Keywords{" "}
                  <ToolTipMessage
                    message1="1 TO 3 WORDS = GREEN"
                    message2="4 TO 7 WORDS = YELLOW"
                    message3="0 WORDS = RED"
                  />
                </div>

                <div className="flex sm:justify-end justify-start text-quaternary-dark dark:text-quaternary-light text-sm">
                  <span className="text-xs">
                    <span>{calculateWordCount(values.targetedKeywords)}</span> /{" "}
                    <span>
                      {PRODUCT_SEO_FIELDS_WORD_LIMIT.TARGETED_KEYWORDS.LIMIT}
                    </span>{" "}
                    Words
                    {`(Max ${PRODUCT_SEO_FIELDS_WORD_LIMIT.TARGETED_KEYWORDS.MAX} words)`}
                  </span>
                </div>
              </div>
            }
            onChange={(e) =>
              wordLimitHandleChange(
                e,
                PRODUCT_SEO_FIELDS_WORD_LIMIT.TARGETED_KEYWORDS.MAX,
                "targetedKeywords"
              )
            }
            onBlur={handleBlur}
          />
        </div>
        <div>
          <WarningSigns
            colorFill={colorSelectorFunction(
              "targetedKeywords",
              values.targetedKeywords
            )}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:gap-6">
        <Label>
          Header Tags
          <ToolTipMessage
            message1="H1 count = 1 GREEN"
            message2="H1 count = 0 or 1+ RED"
            message3="H2 to H6 > 0 = GREEN otherwise RED"
          />
        </Label>

        {["h1", "h2", "h3", "h4", "h5", "h6"].map((tag) => (
          <div key={tag} className="flex items-center gap-2">
            <div className="grow">
              <Input
                label={tag.toUpperCase()}
                name={tag}
                value={values[tag as keyof ISeoFormValues]}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={true}
              />
            </div>
            <div>
              <WarningSigns
                colorFill={colorSelectorFunction("headerTag", {
                  tag,
                  value: values[tag as keyof ISeoFormValues],
                })}
              />
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default SeoForm;
