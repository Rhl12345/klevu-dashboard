"use client";
import Image from "@/components/Image/Image";
import { IRenderImageProps } from "@/types/logo-location/logo-location.type";
import React from "react";

const RenderLogoImage = (props: IRenderImageProps) => {
  const imagePath =
    `https://redefinecommerce.blob.core.windows.net` + props.imagePath;

  return props.imagePath?.length > 0 ? (
    <div className="flex items-center ">
      <Image className="w-20" src={imagePath} alt={imagePath} />
    </div>
  ) : (
    <div className="flex items-center">
      <Image alt="default-image" className="w-20" src={`/noImage.png`} />
    </div>
  );
};

export default RenderLogoImage;
