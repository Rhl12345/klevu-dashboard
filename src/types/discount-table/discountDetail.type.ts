export interface IDiscountDetail {
  id: string;
  quantityId: string;
  minQuantity: number;
  maxQuantity: number;
  discount: number;
  discountType: string;
  recStatus: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string | null;
  modifiedBy: string | null;
  rowVersion: string | null;
}

export interface IDiscountDetailFormValues extends IDiscountDetail {}

export interface IDiscountDetailProps {
  quantityId?: string;
  isAddMode: boolean;
}

export interface IDiscountDetailTableProps {
  discountData: IDiscountDetail[];
  onEdit: (id: string, isDisabled: boolean) => void;
  onDelete: (detail: IDiscountDetail) => void;
  isAddMode: boolean;
}

export interface IDiscountDetailFormProps {
  initialValues: IDiscountDetailFormValues;
  onSubmit: (values: IDiscountDetailFormValues, helpers: any) => void;
  onClose: () => void;
  isLoading: boolean;
  isDisabled: boolean;
}
