import { PasswordStrengthType } from "@/utils/constants";

export interface IUserSettingsData {
  id?: number;
  companyConfigurationId?: number;
  passwordStrengthType: PasswordStrengthType;
  resetPasswordType: number;
  resetPasswordDays: number;
  restrictUsedPasswordType: number;
  restrictUsedPasswordCount: number;
  isOneTimePasswordEnabled: boolean;
  twoStepVerificationType: number;
}

export interface IFormSectionProps {
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: IUserSettingsData;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
  handleBlur?: (e: React.FocusEvent<any>) => void;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
  isSubmitting?: boolean;
  setFieldTouched?: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
}

export interface IPasswordPolicySectionProps extends IFormSectionProps {
  isSubmitting: boolean;
  touched: Record<string, boolean>;
  errors: Record<string, string>;
}

export interface IOneTimePasswordSectionProps
  extends Pick<IFormSectionProps, "handleChange" | "values" | "errors"> {}

export interface IApprovedDomainSectionProps
  extends Pick<
    IFormSectionProps,
    | "handleChange"
    | "values"
    | "handleBlur"
    | "setFieldValue"
    | "setFieldTouched"
  > {}
