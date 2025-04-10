import Accordion from "@/components/Accordion/Accordion";
import SocialTagForm from "@/components/common/SocilaContent";
import { IContentBuilderSettingsFormValues } from "@/types/content-management/content-builder/contentBuilder.type";
import { getErrorMessage } from "@/utils/common.util";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SocialShareSection = () => {
    const { values, setFieldValue, errors } =
    useFormikContext<IContentBuilderSettingsFormValues>();

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
    } catch (error) {
      toast.error(getErrorMessage(error) || "Error creating image URL");
    }
  };

  const handlePinterestImage = (file?: File) => {
    if (!file) {
      setFieldValue("social.pinterest.image", null, true);
      setFieldValue("social.pinterest.url", "");
      return;
    }
    setFieldValue("social.pinterest.image", file, true);
    const imageUrl = URL.createObjectURL(file);
    setFieldValue("social.pinterest.url", imageUrl);
  };

  useEffect(() => {
    setFieldValue("social.facebook.title", values.social.ogTags.title);
    setFieldValue("social.twitter.title", values.social.ogTags.title);
    setFieldValue("social.linkedin.title", values.social.ogTags.title);
  }, [values.social.ogTags.title]);

  useEffect(() => {
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
  }, [values.social.ogTags.description]);

    const accordionItems = [
      {
        id: "social-share",
        title: "Social Share",
        content: <SocialTagForm handleOpenGraphImage={handleOpenGraphImage} handlePinterestImage={handlePinterestImage} values={values} errors={errors}/>,
      },
    ];
  
    return (
      <Accordion iconVariant="arrow" items={accordionItems} />
  );
};

export default SocialShareSection;
