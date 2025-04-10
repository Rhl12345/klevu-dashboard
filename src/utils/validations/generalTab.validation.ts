import * as Yup from "yup";

export const dstValidationSchema = Yup.object().shape({
  dstFile: Yup.mixed().required("DST file is required"),
  sewOut: Yup.mixed().required("Sew out image is required"),
  sewOutProfile: Yup.mixed().required("Sew out profile image is required"),
  stitchCount: Yup.number(),
  logoName: Yup.string().trim().required("Logo name is required"),
});

export const gbpValidationSchema = Yup.object().shape({
  vectorFile: Yup.mixed()
    .required("Logo is required")
    .test("fileFormat", "Only image files are allowed", (value: any) => {
      if (!value) return false;
      const supportedFormats = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      return supportedFormats.includes(value?.type);
    }),
  logoName: Yup.string().required("Logo name is required"),
});

export const perValidationSchema = Yup.object().shape({
  sewOut: Yup.mixed().required("Sew Out is required"),
  sewOutProfile: Yup.mixed().required("Sew Out Profile is required"),
  stitchCount: Yup.number().required("Stitch Count is required"),
  logoName: Yup.string().required("Logo Name is required"),
});

export const scrValidationSchema = Yup.object().shape({
  vectorFile: Yup.mixed()
    .required("Logo is required")
    .test("fileFormat", "Only image files are allowed", (value: any) => {
      if (!value) return false;
      const supportedFormats = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      return supportedFormats.includes(value?.type);
    }),
  proofOut: Yup.mixed().required("Proof out is required"),
  logoName: Yup.string().trim().required("Logo name is required"),
});

export const dthValidationSchema = Yup.object().shape({
  transferProof: Yup.mixed().required("Transfer proof is required"),
  logoName: Yup.string().required("Logo name is required"),
});

export const engValidationSchema = Yup.object({
  yprFile: Yup.mixed()
    .required("Logo is required")
    .test("fileFormat", "Only image files are allowed", (value: any) => {
      if (!value) return false;
      const supportedFormats = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      return supportedFormats.includes(value?.type);
    }),
  logoName: Yup.string().trim().required("Logo name is required"),
});

export const addThreadValidationSchema = Yup.object().shape({
  logoNo: Yup.string().trim().required("Logo No is required"),
  groupName: Yup.string().trim().required("Group Name is required"),
  logoGroupDescriptionId: Yup.string()
    .trim()
    .required("Group Description is required"),
  logoThreadBrandId: Yup.string().trim().required("Thread Brand is required"),
  threadGroupColorOptionsId: Yup.string()
    .trim()
    .required("Thread Group Color Options is required"),
});

