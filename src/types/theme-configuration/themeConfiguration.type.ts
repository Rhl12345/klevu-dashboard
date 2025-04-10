import { FormikErrors } from "formik";

export interface IThemeConfigurationValues {
  storeLogoUrl: string;
  headerLogoUrl: string;
  faviconUrl: string;
  emailLogoUrl: string;
  bFontFamily: string;
  bFontSize: string;
  bFontWeight: string;
  bLineHeight: string;
  bLetterSpacing: string;
  sBgcolor: string;
  sbgActivecolor: string;
  sbGhovercolor: string;
  sFontcolor: string;
  sActiveColor: string;
  sHoverColor: string;
  pFontFamily: string;
  pFontSize: string;
  pFontWeight: string;
  pLineHeight: string;
  pLetterSpacing: string;
  cBgcolor: string;
  cbgActivecolor: string;
  cbGhovercolor: string;
  cFontcolor: string;
  cActiveColor: string;
  cHoverColor: string;
  primary: string;
  secondary: string;
  red: string;
  green: string;
  yellow: string;
  loginPageStyle: string;
  loginBackgroundUrl: string;
}

export interface IFontConfig {
  bFontFamily: string;
  bFontSize: number;
  bFontWeight: number;
  bLineHeight: number;
  bLetterSpacing: number;
}

export interface IBodyFontConfigurationProps {
  initialConfig?: Partial<IFontConfig>;
  onConfigurationChange?: (config: Partial<IFontConfig>) => void;
  errors: any;
  setFieldValue: any;
  values: any;
}

export interface IColorPickerWrapperProps {
  label: string;
  name: string;
}

export interface ILogoConfig {
  logo?: File;
  headerLogo?: File;
  favicon?: File;
  emailLogo?: File;
}

export interface ILogoUrls {
  logo?: string;
  headerLogo?: string;
  favicon?: string;
  emailLogo?: string;
}

export interface IImageUploadBoxProps {
  label: string;
  imageUrl?: string;
  onUpload: (file: File) => void;
  onRemove: () => void;
  isUploading?: boolean;
}

export interface IPageHeadingFontConfigurationProps {
  onChange?: (values: any) => void;
  initialValues?: any;
  errors: any;
  setFieldValue: any;
  values: any;
}

export interface ILoginConfig {
  loginPageStyle: string;
  backgroundImage?: File;
  backgroundImageUrl?: string;
}

export interface IThemeConfigurationProps {
  errors: FormikErrors<IThemeConfigurationValues>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void | FormikErrors<IThemeConfigurationValues>>;
  values: IThemeConfigurationValues;
}

export interface IFontConfigType {
  WEIGHT: { value: { value: string; label: string; }; label: string; }[]
  SIZE: { value: { value: string; label: string; }; label: string; }[];
  LINE_HEIGHT: { value: { value: string; label: string; }; label: string; }[];
  LETTER_SPACING: { value: { value: string; label: string; }; label: string; }[];
}
