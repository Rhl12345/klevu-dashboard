"use client";
import React from "react";
import { useRouter } from "next/navigation";
import FormulaBrandNameForm from "@/admin-pages/formula-brands-name/components/FormulaBrandNameForm";
import {
  IEditFormulaBrandNameProps,
  IFormulaBrandNameForm,
} from "@/types/formula-brand-names/formulaBrandName.type";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
import { PageRoutes } from "@/admin-pages/routes";
import {
  createFormulaBrandName,
  updateFormulaBrandName,
} from "@/services/formula-brand-name/formulaBrandName.service";

/**
 * CreateEditFormulaBrandName Component
 * @component
 * @description Handles the creation and editing of formula brand names
 * @param {ICreateEditFormulaBrandNameProps} props - Component props
 * @param {string} [props.id] - Optional ID for editing existing formula brand names
 * @returns {React.ReactElement} Rendered form component
 */

const CreateEditFormulaBrandName: React.FC<IEditFormulaBrandNameProps> = ({
  id,
}) => {
  const router = useRouter();

  const handleSubmit = async (values: IFormulaBrandNameForm) => {
    try {
      if (id) {
        await updateFormulaBrandName(id, values);
        toast.success("Successfully updated brand name formula");
      } else {
        await createFormulaBrandName(values);
        toast.success("Successfully created brand name formula");
      }
      router.push(PageRoutes.FORMULA_BRAND_NAME.LIST);
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Failed to create brand name formula")
      );
    }
  };

  return <FormulaBrandNameForm id={id} onSubmit={handleSubmit} />;
};

export default CreateEditFormulaBrandName;
