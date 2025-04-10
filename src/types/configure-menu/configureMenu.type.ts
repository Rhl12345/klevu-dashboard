export interface IMenuItem {
  id: number;
  primaryTypeId?: number;
  secondaryTypeId?: number;
  menuTypeId?: number;
  menuValue?: string | null;
}

export interface IMenuItemErrors {
  primaryTypeId?: string;
  secondaryTypeId?: string;
}

export interface IMenuItemTouched {
  primaryTypeId?: boolean;
  secondaryTypeId?: boolean;
}

export interface IFormValues {
  menuItems: IMenuItem[];
}

export interface IFormErrors
{
  menuItems?: IMenuItemErrors[];
}

export interface IFormTouched
{
  menuItems?: IMenuItemTouched[];
}

export interface IDynamicMenuTabProps {
  item: IMenuItem;
  onSaveMenuItem: (item: IMenuItem) => void;
};

export interface IPrimaryMenuTabProps {
  allItems: IMenuItem[];
  onSaveMenu: (items: IMenuItem[]) => void;
};