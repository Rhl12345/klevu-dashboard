"use client";
import Button from "@/components/Button/Button";
import FormErrorMessage from "@/components/FormErrorMessage/FormErrorMessage";
import Image from "@/components/Image/Image";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { useUploadImage } from "@/hooks/useUploadImage.hook";
import { IUploadImageProps } from "@/types/upload-image/uploadImage.type";
import { useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";

const UploadImage = ({
  onUpload,
  className = "",
  maxImages = 1,
  minImages = 1,
  initialImages = [],
  aspectRatio = "auto",
  objectFit = "cover",
  rounded = "none",
  errorMessage,
  withoutUploadUI = false,
  id = "upload-input",
  label,
  labelClassName,
  asterisk,
}: IUploadImageProps) => {
  const { images, error, handleFileChange, removeImage, validate } =
    useUploadImage({
      onUpload,
      maxImages,
      minImages,
      initialImages,
      errorMessage,
    });

  if (withoutUploadUI) {
    return (
      <Input
        id={id}
        type="file"
        multiple
        onChange={handleFileChange}
        onBlur={validate}
        className="hidden"
        accept="image/*"
        formik={false}
      />
    );
  }

  const handleRemoveImage = useCallback(
    (index: number) => {
      if (index >= 0 && index < images.length) {
        removeImage(index);
      }
    },
    [images.length, removeImage]
  );

  const renderedImages = useMemo(() => {
    return images.map((image, index) => (
      <div
        className="relative flex justify-center items-center border border-gray-light dark:border-gray-dark w-[200px] h-[200px]"
        key={`image_${index}`}
      >
        <Image
          src={image}
          alt={`Uploaded preview of image ${index + 1}`}
          className="w-full h-full max-h-max max-w-max"
          aspectRatio={aspectRatio}
          objectFit={objectFit}
          rounded={rounded}
          key={image}
        />
        <Button
          onClick={() => handleRemoveImage(index)}
          variant="default"
          className="absolute top-2 right-2 p-1 rounded-full"
          aria-label="Remove image"
          icon={<SvgIcon name="Trash" className="w-6 h-6 text-red-500" />}
        />
      </div>
    ));
  }, [images, aspectRatio, objectFit, rounded, handleRemoveImage]);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label className={labelClassName} aria-required={asterisk}>
          {label}
          {asterisk && <span className="text-danger">*</span>}
        </Label>
      )}

      <div
        className={twMerge(
          className,
          "p-6 border border-gray-light dark:border-gray-dark w-full"
        )}
      >
        <div className="flex flex-wrap justify-center gap-4 w-full min-h-24">
          {renderedImages}
          {images.length < maxImages ? (
            <div className="upload__box flex justify-center items-center">
              <label
                htmlFor={id}
                className="group cursor-pointer flex items-center justify-center w-[200px] h-[200px] border-2 border-dashed border-gray-400  bg-gray-100 dark:bg-gray-light transition duration-300 hover:bg-gray-pointer dark:hover:bg-gray-pointer rounded-none"
              >
                <span className="text-quaternary-light group-hover:text-white dark:text-primary-dark dark:group-hover:text-primary-dark text-3xl">
                  +
                </span>
                <Input
                  id={id}
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  onBlur={validate}
                  className="hidden"
                  accept="image/*"
                  formik={false}
                />
              </label>
            </div>
          ) : null}
        </div>
      </div>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </div>
  );
};

export default UploadImage;
