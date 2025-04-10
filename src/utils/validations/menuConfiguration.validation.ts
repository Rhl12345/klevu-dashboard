import { IMenuItem } from "@/types/configure-menu/configureMenu.type";
import * as yup from "yup";

export const getInitialValues = (menuItem: IMenuItem) => {
  const menuItemInitialValues: IMenuItem = {
    id: menuItem.id,
    primaryTypeId: menuItem.primaryTypeId,
    secondaryTypeId: menuItem.secondaryTypeId,
    menuTypeId: menuItem.menuTypeId,
    menuValue: menuItem.menuValue,
  };
  return menuItemInitialValues;
};

export const menuConfigurationValidationSchema = yup.object().shape({
  menuItems: yup.array().of(yup.object().shape({
    primaryTypeId: yup.number().required("This field is required"),
    secondaryTypeId: yup.number().required("This field is required"),
  })),
});
