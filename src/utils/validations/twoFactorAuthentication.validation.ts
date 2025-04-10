import * as Yup from "yup";

const TwoFactorAuthenticationValidationSchema = Yup.object().shape({
  code: Yup.string().trim(),
});

export { TwoFactorAuthenticationValidationSchema };
