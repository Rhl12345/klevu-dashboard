
import * as Yup from "yup";

export const ThemeConfigurationValidationSchema = Yup.object({
    storeLogoUrl: Yup.string().trim().required("Store logo is required."),
    headerLogoUrl: Yup.string().trim().required("Header logo is required."),
    faviconUrl: Yup.string().trim().required("Favicon logo is required."),
    emailLogoUrl: Yup.string().trim().required("Email logo is required."),
    bFontFamily: Yup.string().trim().required("Body font is required."),
    bFontSize: Yup.string().trim().required("Body font size is required."),
    bFontWeight: Yup.string().trim().required("Body font weight is required."),
    bLineHeight: Yup.string().trim().required("Body line height is required."),
    bLetterSpacing: Yup.string()
      .trim()
      .required("Body letter spacing is required."),
    sBgcolor: Yup.string()
      .trim()
      .required("Sidebar background color is required."),
    sbgActivecolor: Yup.string()
      .trim()
      .required("Sidebar active background color is required."),
    sbGhovercolor: Yup.string()
      .trim()
      .required("Sidebar hover background color is required."),
    sFontcolor: Yup.string().trim().required("Sidebar font color is required."),
    sActiveColor: Yup.string()
      .trim()
      .required("Sidebar active font color is required."),
    sHoverColor: Yup.string()
      .trim()
      .required("Sidebar hover font color is required."),
    pFontFamily: Yup.string().trim().required("Page heading font is required."),
    pFontSize: Yup.string()
      .trim()
      .required("Page heading font size is required."),
    pFontWeight: Yup.string()
      .trim()
      .required("Page heading font weight is required."),
    pLineHeight: Yup.string()
      .trim()
      .required("Page heading line height is required."),
    pLetterSpacing: Yup.string()
      .trim()
      .required("Page heading letter spacing is required."),
    cBgcolor: Yup.string()
      .trim()
      .required("Button background color is required."),
    cbgActivecolor: Yup.string()
      .trim()
      .required("Button active background color is required."),
    cbGhovercolor: Yup.string()
      .trim()
      .required("Button hover background color is required."),
    cFontcolor: Yup.string().trim().required("Button font color is required."),
    cActiveColor: Yup.string()
      .trim()
      .required("Button active font color is required."),
    cHoverColor: Yup.string()
      .trim()
      .required("Button hover font color is required."),
    primary: Yup.string().trim().required("Primary color is required."),
    secondary: Yup.string().trim().required("Secondary color is required."),
    red: Yup.string().trim().required("Red color is required."),
    green: Yup.string().trim().required("Green color is required."),
    yellow: Yup.string().trim().required("Yellow color is required."),
    loginPageStyle: Yup.string().trim().required("Login page style is required."),
    loginBackgroundUrl: Yup.string()
      .trim()
      .required("Login background image is required."),
  });