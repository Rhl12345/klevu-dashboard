export interface IShippingMethodValues {
  id: number;
  name: string;
  shippingVia: string;
  charges: number;
  recStatus: string;
  shippingServicesId: number;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
}

export interface IShippingMethodModal {
  isOpen: boolean;
  onClose: () => void;
  editId: number | null;
  onSubmit: (values: IShippingMethodValues) => void;
}
