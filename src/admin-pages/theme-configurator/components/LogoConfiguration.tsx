import { Label } from "@/components/Label/Label";
import UploadImage from "@/components/UploadImage/UploadImage";
import {
  IImageUploadBoxProps,
  ILogoUrls,
  IThemeConfigurationProps,
} from "@/types/theme-configuration/themeConfiguration.type";
import React, { useState } from "react";

const ImageUploadBox = ({
  label,
  imageUrl,
  onUpload,
  onRemove,
  isUploading,
}: IImageUploadBoxProps) => {
  const handleChange = (files: File[]) => {
    const file = files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div className="col-span-2 md:col-span-1 p-2">
      <Label>{label}</Label>
      <UploadImage onUpload={handleChange} />
    </div>
  );
};

const LogoConfiguration: React.FC<IThemeConfigurationProps> = ({
  errors,
  setFieldValue,
  values,
}) => {
  const [logoUrls, setLogoUrls] = useState<ILogoUrls>({});
  const [uploadingLogos, setUploadingLogos] = useState<Record<string, boolean>>(
    {}
  );

  return (
    <section
      className="w-full flex flex-col gap-4 lg:gap-6 rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark"
      aria-label="Logo Configuration"
    >
      <Label size="large" className="  font-semibold text-lg" required>
        Configure
      </Label>
      <div className="gap-4 lg:gap-6 grid grid-cols-1">
        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
          <div className="lg:w-6/12">
            <div className="flex flex-col gap-2">
              <UploadImage
                label="Logo"
                maxImages={1}
                onUpload={(value) => setFieldValue("storeLogoUrl", value)}
              />
            </div>
          </div>
          <div className="lg:w-6/12">
            <div className="flex flex-col gap-2">
              <UploadImage
                label="Header Logo"
                maxImages={1}
                onUpload={(value) => setFieldValue("headerLogoUrl", value)}
              />
            </div>
          </div>
        </div>
        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
          <div className="lg:w-6/12">
            <div className="flex flex-col gap-2">
              <UploadImage
                label="Favicon"
                maxImages={1}
                onUpload={(value) => setFieldValue("faviconUrl", value)}
              />
            </div>
          </div>
          <div className="lg:w-6/12">
            <div className="flex flex-col gap-2">
              <UploadImage
                label="Email Logo"
                maxImages={1}
                onUpload={(value) => setFieldValue("emailLogoUrl", value)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoConfiguration;
