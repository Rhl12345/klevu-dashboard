export interface ICreateModalProps {
  isOpen: boolean;
  handleModalClose: () => void;
  editId: number | null;
}

export interface IEmailAutorespondersFormValues {
  id: number | null;
  label: string;
  subject: string;
  emailBody: string | null;
  store: string;
  emailFrom: string;
  emailTo: string | null;
  emailCC: string | null;
  emailBCC: string | null;
  recStatus: "A" | "I";
}

export interface IEmailAutorespondersData {
  id: number;
  label: string;
  emailFrom: string;
  emailTo: string;
  store: string;
  subject: string;
  emailCC: string | null;
  emailBCC: string | null;
  createdDate: string | null;
  updatedBy: string | null;
  recStatus: "A" | "I";
  updatedDate: string | null;
  createdBy: string | null;
  emailBody?: string | null;
}

export interface IDropdownOption {
  label: string;
  value: string | null;
}
