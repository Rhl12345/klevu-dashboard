type IProductAttributesTypeStatus = "active" | "inactive";

export interface IProductAttributesFormValues {
  name?: string;
  displayOrder?: string
  createdBy?: unknown;
  ProductAttributesTypeStatus?: IProductAttributesTypeStatus;
  id?: number;
  productAttributesName?: string;
  ControlType?: string;
  TextPrompt?: string;
  DisplayOrder?: string;
}



