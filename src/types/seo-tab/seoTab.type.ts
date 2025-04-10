import { FormikProps } from "formik";
import { ISocialMediaField } from "@/types/seo-configuration/seoConfiguration.type";
import { ICommonFormTabProps } from "@/types/products-database/productDatabase.type";

export interface ISeoFormValues {
  pageUrl: string;
  pageTitle: string;
  metaDescription: string;
  metaKeywords: string;
  roiKeywords: string;
  targetedKeywords: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
  social: {
    ogTags: ISocialMediaField;
    facebook: ISocialMediaField;
    twitter: ISocialMediaField;
    linkedin: ISocialMediaField;
    pinterest: ISocialMediaField;
  };
}
export interface ISeoToolTipMessageRange {
  message1: string;
  message2: string;
  message3: string;
}

export interface ISeoSocialFormProps {
  colorSelectorFunction: (type: string, value: any) => string;
  socialFormik: FormikProps<ISeoFormValues>;
}

export interface ISeoFormProps extends ISeoSocialFormProps {
  calculateWordCount: (value: string) => number;
}

export interface ISeoFormTabProps
  extends Omit<
    ICommonFormTabProps,
    "type" | "statusFormField" | "initialData"
  > {
  initialData?: Record<string, any>;
}
