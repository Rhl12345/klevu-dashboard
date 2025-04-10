import { ICustomeGiftCard } from "@/types/gift-card/giftCard.type";
import * as Yup from "yup";
    
export const validationSchema = Yup.object().shape({
    storeName: Yup.string().trim().required("Store Name is required"),
    recipientName: Yup.string().trim().required("Recipient Name is required"),
    emailTo: Yup.string().trim().email("Invalid email").required("Email is required"),
    serialNumber: Yup.string().trim().required("Serial Number is required"),
    orderNumber: Yup.string().trim().required("Order Number is required"),
    initialAmount: Yup.number()
      .typeError("Must be a number")
      .min(0, "Amount must be positive")
      .required("Initial Amount is required"),
    balance: Yup.number()
      .typeError("Must be a number")
      .min(0, "Balance must be positive")
      .required("Balance is required"),
    status: Yup.string().oneOf(['A', 'I'], "Invalid status").required("Status is required"),
  });



  export const getInitialValues = (editGiftCard: ICustomeGiftCard,selectedStore: string) => {
    return {
      storeName: selectedStore,
      recipientName: editGiftCard?.customerName || "",
      emailTo: editGiftCard?.emailTo || "",
      serialNumber: editGiftCard?.serialNumber || "",
      orderNumber: editGiftCard?.orderNumber || "",
      initialAmount: editGiftCard?.initialAmount || "",
      balance: editGiftCard?.balance || "",
      status: editGiftCard?.recStatus || "A",
    };
  };