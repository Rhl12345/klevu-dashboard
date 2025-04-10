"use client";

import {
  IUseUploadImageProps,
  IUseUploadImageReturn,
} from "@/types/upload-image/uploadImage.type";
import { useEffect, useState } from "react";

export const useUploadImage = ({
  onUpload,
  maxImages = 1,
  minImages = 1,
  initialImages = [],
  errorMessage,
}: IUseUploadImageProps): IUseUploadImageReturn => {
  const [images, setImages] =
    useState<IUseUploadImageProps["initialImages"]>(initialImages);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(errorMessage || null);

  useEffect(() => {
    if (errorMessage) {
      setError(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    setImages(initialImages);
  }, [initialImages.length]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    if (newFiles.length + files.length > maxImages) {
      setError(`You can upload a maximum of ${maxImages} images.`);
      return;
    }

    const newImages = newFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
    setFiles((prev) => [...prev, ...newFiles]);
    onUpload([...files, ...newFiles]);
    setError(null);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
    onUpload(files.filter((_, i) => i !== index));

    if (images.length - 1 < minImages) {
      setError(
        `At least ${minImages} image${minImages > 1 ? "s" : ""} are required.`
      );
    } else {
      setError(null);
    }
  };

  const validate = () => {
    if (images.length < minImages) {
      setError(
        `At least ${minImages} image${minImages > 1 ? "s" : ""} are required.`
      );
      return false;
    }
    setError(null);
    return true;
  };

  return {
    images,
    files,
    error,
    handleFileChange,
    removeImage,
    validate,
  };
};
