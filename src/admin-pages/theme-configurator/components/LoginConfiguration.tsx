import Dropdown from "@/components/DropDown/DropDown";
import { Label } from "@/components/Label/Label";
import UploadImage from "@/components/UploadImage/UploadImage";
import { OPTIONS } from "@/mock-data/themeConfiguration";
import {
  ILoginConfig,
  IThemeConfigurationProps,
} from "@/types/theme-configuration/themeConfiguration.type";
import { getImageDimensions } from "@/utils/helpers";
import { useCallback, useState } from "react";

const LoginConfiguration = ({
  errors,
  setFieldValue,
  values,
}: IThemeConfigurationProps) => {
  const [config, setConfig] = useState<ILoginConfig>({
    loginPageStyle: "default",
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = useCallback(async (files: File[]) => {
    const file = files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // Validate image dimensions
      const dimensions = await getImageDimensions(file);
      if (dimensions.width !== 960 || dimensions.height !== 780) {
        throw new Error("Image must be 960x780 pixels");
      }

      setConfig((prev) => ({
        ...prev,
        backgroundImage: file,
        backgroundImageUrl: URL.createObjectURL(file),
      }));
    } catch (error) {
      console.error("Image upload error:", error);
      // Handle error appropriately
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleRemoveImage = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      backgroundImage: undefined,
      backgroundImageUrl: undefined,
    }));
  }, []);

  return (
    <section
      className="w-full flex flex-col gap-4 lg:gap-6 rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark"
      aria-label="Login Page Configuration"
    >
      <Label className="font-semibold text-lg">Login Page</Label>
      <div className="gap-4 lg:gap-6 grid grid-cols-1">
        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
          <div className="lg:w-6/12">
            <div className="flex flex-col gap-2">
              <Dropdown
                label="Login Page Style"
                isMulti={false}
                name="loginPageStyle"
                value={config.loginPageStyle}
                options={OPTIONS}
              />

              <div className="mt-2 max-h-72 h-60">
                {config.loginPageStyle && (
                  <div className="w-full h-full bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark rounded-none flex items-center justify-center">
                    {/* Preview component would go here */}
                    <span className="text-quaternary-dark dark:text-quaternary-light">
                      Style Preview
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="lg:w-6/12">
            <div className="flex flex-col gap-2">
              <UploadImage
                onUpload={handleImageUpload}
                label="Login Background"
              />

              <p className="text-sm text-quaternary-dark dark:text-quaternary-light">
                Recommended size for login background is 960 x 780 pixels
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginConfiguration;
