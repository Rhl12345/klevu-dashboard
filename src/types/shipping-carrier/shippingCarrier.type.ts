export interface IShippingCarrierValues {
  id: number;
  name: string;
  userName: string;
  password: string;
  clientKey: string;
  secretKey: string;
  token: string;
  url: string;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  rowVersion: string;
  location: string;

}

export interface IShippingCarrierModal {
  isOpen: boolean;
  onClose: () => void;
  editId: number | null;
  onSubmit: (values: IShippingCarrierValues) => void;
}
