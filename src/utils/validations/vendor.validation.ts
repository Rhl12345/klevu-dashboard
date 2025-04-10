import * as Yup from "yup";

export const VendorSchema = Yup.object().shape({
  id: Yup.number(),
  vendorName: Yup.string().required("Vendor Name is required"),
  vendorBCID: Yup.string().required("Vendor BC ID is required"),
  contactName: Yup.string(),
  contactEmail: Yup.string().email("Invalid email"),
  address: Yup.string(),
  website: Yup.string().url("Invalid URL"),
  loginName: Yup.string(),
  password: Yup.string(),
  imagePortalWebsite: Yup.string().url("Invalid URL"),
  imagePortalLogin: Yup.string(),
  imagePortalPassword: Yup.string(),
  notes: Yup.string(),
  vendorStatus: Yup.string().required("Vendor Status is required"),
  isInventoryAvailable: Yup.boolean(),
  isAPIAvailable: Yup.boolean(),
  isFTPAvailable: Yup.boolean(),
  contactPhone: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact Phone must be exactly 10 digits")
    .required("Contact Phone is required"),
  apiUrl: Yup.string().when(["isAPIAvailable"], {
    is: true,
    then: () => Yup.string().required("API URL is required"),
    otherwise: () => Yup.string(),
  }),
  apiUsername: Yup.string().when(["isAPIAvailable"], {
    is: true,
    then: () => Yup.string().required("API Username is required"),
    otherwise: () => Yup.string(),
  }),
  apiPassword: Yup.string().when(["isAPIAvailable"], {
    is: true,
    then: () => Yup.string().required("API Password is required"),
    otherwise: () => Yup.string(),
  }),
  ftpUrl: Yup.string().when(["isFTPAvailable"], {
    is: true,
    then: () => Yup.string().required("FTP URL is required"),
    otherwise: () => Yup.string(),
  }),
  ftpUsername: Yup.string().when(["isFTPAvailable"], {
    is: true,
    then: () => Yup.string().required("FTP Username is required"),
    otherwise: () => Yup.string(),
  }),
  ftpPassword: Yup.string().when(["isFTPAvailable"], {
    is: true,
    then: () => Yup.string().required("FTP Password is required"),
    otherwise: () => Yup.string(),
  }),
});
