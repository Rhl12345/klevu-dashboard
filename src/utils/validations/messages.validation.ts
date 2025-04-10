import * as Yup from "yup";
import { RecStatusValueName } from "../constants";

export const MessageSchema = Yup.object().shape({
  message: Yup.string()
    .trim()
    .required("Message is required")
    .max(100, "Message must be at most 100 characters"),
  messageKey: Yup.string()
    .trim()
    .required("Message Key is required")
    .max(100, "Message Key must be at most 100 characters"),
  storeName: Yup.string()
    .trim()
    .required("Store Name is required")
    .max(100, "Store Name must be at most 100 characters"),
  recStatus: Yup.string()
    .trim()
    .required("Message status is required")
    .oneOf(
      [RecStatusValueName.Active, RecStatusValueName.Inactive],
      "Invalid status"
    ),
});
