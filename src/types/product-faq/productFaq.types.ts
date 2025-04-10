export interface IFAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { question: string; answer: string }) => void;
  initialData?: {
    question: string;
    answer: string;
  };
  mode: "create" | "edit";
}

export interface IFAQData {
  id: number;
  question: string;
  answer: string;
  createdDate: string;
  createdTime: string;
  createdBy: string;
  status: "active" | "inactive";
}
