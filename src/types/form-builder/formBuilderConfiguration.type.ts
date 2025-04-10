export interface IBannerTextState {
  text: string;
  error: string;
  isSaving: boolean;
}

export interface IBannerFormConfigValues {
  bannerImage: File | null;
}

export interface ILogoPositionFormProps {
  dropDownTitle: "logoPosition" | "fontFamily";
  selectedValue: string;
  onValueChange: (selected: any) => void;
}
