interface ISendMailModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  modalInformation: IMailLogDetail;
}

interface IIsModalOpen {
  type: "sendMail" | "viewMail" | null;
  isOpen: boolean;
}

interface IMailLogDetail {
  fromEmail: string;
  toEmail: string;
  subject: string;
  body: string;
  attachments: string[];
}

interface IMailLogItem {
  emailLogoId: number;
  fromEmail: string;
  toEmail: string;
  storeName: string;
  subject: string;
  ipAddress: string;
  sentOn: string;
  resendMail: number;
  body: string;
  storeId: number;
  storeLogo: string;
  storeEmailLogo: string;
}

export type { ISendMailModalProps, IIsModalOpen, IMailLogDetail, IMailLogItem };
