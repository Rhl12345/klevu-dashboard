import { IThreadGroupData } from "@/types/admin-stores/storeForm.types";

export interface IDstFormValues {
  dstFile: File | null;
  sewOut: File | null;
  sewOutProfile: File | null;
  stitchCount: number;
  logoName: string;
}

export interface IDthFormValues {
  transferProof: File | null;
  logoName: string;
}

export interface IEngFormValues {
  yprFile: File | null;
  logoName: string;
}

export interface IGbpFormValues {
  vectorFile: File | null;
  logoName: string;
}

export interface IPerFormValues {
  sewOut: File | null;
  sewOutProfile: File | null;
  stitchCount: number;
  logoName: string;
}
export interface IScrFormValues {
  vectorFile: File | null;
  proofOut: File | null;
  logoName: string;
}

export interface IAddThreadGroupFormValues {
  logoNo: string;
  groupName: string;
  logoGroupDescriptionId: string;
  logoThreadBrandId: string;
  threadGroupColorOptionsId: string;
}

export interface IAddThreadGroupTabProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "add" | "edit";
  initialData?: IThreadGroupData | null;
}

// Add these interfaces for type safety
export interface IOptionType {
  value: string;
  label: string;
}
