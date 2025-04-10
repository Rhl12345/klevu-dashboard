import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { IContentBuilderSettingsFormValues } from "@/types/content-management/content-builder/contentBuilder.type";
import Loader from "@/components/common/Loader";
import { toast } from "react-toastify";
import { validationSchema } from "@/utils/validations/tier.validation";
import GeneralSection from "@/admin-pages/content-builder/create-edit-content-builder/settings/components/GeneralSection";
import MetaDataSection from "@/admin-pages/content-builder/create-edit-content-builder/settings/components/MetaDataSection";
import TemplateSection from "@/admin-pages/content-builder/create-edit-content-builder/settings/components/TemplateSection";
import BreadCrumbShowSection from "@/admin-pages/content-builder/create-edit-content-builder/settings/components/BreadCrumbShowSection";
import SocialShareSection from "@/admin-pages/content-builder/create-edit-content-builder/settings/components/SocialShareSection";
import { getContentBuilderById } from "@/services/content-management/content-builder/content-bulder-list.service";

const CreateEditContentBuilderSettings = ({ id }: { id: string }) => {
  const [contentBuilderSettings, setContentBuilderSettings] =
    useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchContentBuilder = async () => {
        try {
          setIsLoading(true);
          // Mock Service Data
          const contentBuilderData = await getContentBuilderById(id);
          setContentBuilderSettings(contentBuilderData);
          toast.success("Content builder fetched successfully");
        } catch (err) {
          toast.error("Failed to fetch content builder");
        } finally {
          setIsLoading(false);
        }
      };
      fetchContentBuilder();
    }
  }, [id]);

  const handleSubmit = async (values: IContentBuilderSettingsFormValues) => {
    try {
      setIsLoading(true);
      // Handle form submission
      // await submitProductTier(values);
      toast.success("Product tier saved successfully");
    } catch (err) {
      toast.error("Error saving product tier");
    } finally {
      setIsLoading(false);
    }
  };

  const initialValues = {
    internalPageName: contentBuilderSettings?.title || "",
    isPasswordRequredToViewPage: contentBuilderSettings?.passRequired || false,
    selectParent: contentBuilderSettings?.parentId || "",
    tag: contentBuilderSettings?.tag || "",
    author: contentBuilderSettings?.author || "",
    isHomePage: contentBuilderSettings?.isHomePage || false,
    isDesktopResult: contentBuilderSettings?.isDesktopResult || false,
    isMobileResult: contentBuilderSettings?.isMobileResult || false,
    domain: contentBuilderSettings?.domainName || "",
    contentSlug: contentBuilderSettings?.slug || "",
    pageTitle: contentBuilderSettings?.topicTitle || "",
    metaDescription: contentBuilderSettings?.metaDescription || "",
    previewAs: contentBuilderSettings?.previewAs || "isDesktopResult",
    metaKeywords: contentBuilderSettings?.metaKeywords || "",
    template: contentBuilderSettings?.template || "",
    isBreadCrumbShow: contentBuilderSettings?.isBreadCrumbShow || false,
    menuType: contentBuilderSettings?.menuType || "",
    social: contentBuilderSettings?.social || {
      ogTags: {
        image: null,
        title: "",
        description: "",
        url: "",
      },
      facebook: {
        title: "",
        description: "",
        url: "",
      },
      twitter: {
        title: "",
        description: "",
        url: "",
      },
      linkedin: {
        title: "",
        description: "",
        url: "",
      },
      pinterest: {
        image: null,
        title: "",
        description: "",
        url: "",
      },
    },
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {() => (
        <Form id="content-builder-settings-form">
          <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4">
            <div className="w-full" role="form">
              <div className="flex flex-wrap gap-4 lg:gap-8">
                <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
                  <GeneralSection />
                </div>

                <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
                  <MetaDataSection />
                </div>

                <div className="w-full template-section">
                  <TemplateSection />
                </div>

                <div className="w-full template-section">
                  <BreadCrumbShowSection />
                </div>

                <div className="w-full template-section">
                  <SocialShareSection />
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateEditContentBuilderSettings;
