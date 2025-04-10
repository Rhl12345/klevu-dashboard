export interface IGiftCardValues {
  id: number;
  image: string; // Can be either a URL string or base64 string
  name: string;
  ourSku: string;
  endDate: string;
  salePrice: number;
  recStatus: string;
  createdDate?: string;
  createdBy?: string;
  updatedDate?: string;
  updatedBy?: string;
}

export interface IGiftCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: IGiftCardValues) => void;
  editId: string | null;
}
