import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import NextImage, { StaticImageData } from "next/image";
import { iImageProps, iNextImageProps } from "./types";
import { DEFAULT_NOT_FOUND_IMAGE } from "@/utils/constants";

const isStaticImageData = (
  src: string | StaticImageData | undefined
): src is StaticImageData => {
  return (
    typeof src === "object" &&
    src !== null &&
    "src" in src &&
    typeof (src as StaticImageData).src === "string"
  );
};

const Image = React.forwardRef<HTMLImageElement, iImageProps>((props, ref) => {
  const {
    className = "",
    fallback = "Image failed to load",
    fallbackImage = DEFAULT_NOT_FOUND_IMAGE,
    aspectRatio = "auto",
    objectFit = "cover",
    rounded = "none",
    variant = "default",
    ...rest
  } = props;

  const [hasError, setHasError] = useState(false);
  const [fallbackImageError, setFallbackImageError] = useState(false);

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    auto: "aspect-auto",
  }[aspectRatio];

  const objectFitClasses = {
    contain: "object-contain",
    cover: "object-cover",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down",
  }[objectFit];

  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  }[rounded];

  const baseClasses = "w-full max-h-full";
  const combinedClasses = twMerge(
    baseClasses,
    aspectRatioClasses,
    objectFitClasses,
    roundedClasses,
    className,
    "bg-body-light dark:bg-gray-dark/60"
  );

  if (hasError && fallbackImageError) {
    return (
      <div
        className={twMerge(
          "flex items-center justify-center bg-gray-100 text-gray-500",
          combinedClasses
        )}
      >
        {typeof fallback === "string" ? (
          <span className="text-sm">{fallback}</span>
        ) : (
          fallback
        )}
      </div>
    );
  }

  if (hasError) {
    return variant === "next" ? (
      <NextImage
        {...(rest as iNextImageProps)}
        src={fallbackImage as any}
        className={combinedClasses}
        onError={() => setFallbackImageError(true)}
      />
    ) : (
      <img
        ref={ref}
        src={
          isStaticImageData(fallbackImage)
            ? fallbackImage.src
            : (fallbackImage as string)
        }
        className={combinedClasses}
        onError={() => setFallbackImageError(true)}
        {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    );
  }

  return variant === "next" ? (
    <NextImage
      {...(rest as iNextImageProps)}
      src={(rest as iNextImageProps).src as any}
      className={combinedClasses}
      onError={() => setHasError(true)}
    />
  ) : (
    <img
      ref={ref}
      className={combinedClasses}
      onError={() => setHasError(true)}
      {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)}
    />
  );
});

Image.displayName = "Image";

export default Image;
