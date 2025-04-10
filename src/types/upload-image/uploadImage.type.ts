export interface IUseUploadImageProps {
  onUpload: (files: File[]) => void;
  maxImages?: number;
  minImages?: number;
  initialImages: string[];
  errorMessage?: string;
}

export interface IUseUploadImageReturn {
  images: string[];
  files: File[];
  error: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  validate: () => boolean;
}

export type TUploadImageAspectRatio =
  | "auto"
  | "square"
  | "portrait"
  | "landscape"
  | "video";

export type TUploadImageObjectFit =
  | "contain"
  | "cover"
  | "fill"
  | "none"
  | "scale-down";

export type TUploadImageRounded = "none" | "sm" | "md" | "lg" | "full";

export interface IUploadImageProps {
  onUpload: (files: File[]) => void;
  className?: string;
  maxImages?: number;
  minImages?: number;
  initialImages?: string[];
  aspectRatio?: TUploadImageAspectRatio;
  objectFit?: TUploadImageObjectFit;
  rounded?: TUploadImageRounded;
  errorMessage?: string;
  withoutUploadUI?: boolean;
  id?: string;
  label?: string;
  labelClassName?: string;
  asterisk?: boolean;
}
