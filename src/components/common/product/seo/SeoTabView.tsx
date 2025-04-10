import { useState } from "react";

import Button from "@/components/Button/Button";
import { Label } from "@/components/Label/Label";
import Text from "@/components/Text/Text";
import RadioGroup from "@/components/RadioGroup/RadioGroup";
import SvgIcon from "@/components/SvgIcons/SvgIcon";

import { SOCIAL_MEDIA_OPTIONS } from "@/utils/constants";
import { IconName } from "@/components/SvgIcons/types";

const SeoTabView = ({
  productId,
  handleTabChange,
}: {
  productId: string;
  handleTabChange: (tabId: number) => void;
}) => {
  // State for radio selection
  const [previewType, setPreviewType] = useState("desktop");

  return (
    <div className="flex flex-col gap-4">
      <div className="border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex items-center justify-between">
          <Text size="lg" className="font-semibold">
            SEO
          </Text>
          <Button
            variant="default"
            size="lg"
            className="underline"
            onClick={() => handleTabChange(6)}
          >
            Edit
          </Button>
        </div>

        <div className="mt-6">
          <Text size="lg" className="font-bold mb-6">
            Meta Data
          </Text>

          {/* Preview Options */}
          <div className="mb-7">
            <Text size="base" className="font-bold mb-6">
              Preview as:
            </Text>
            <div className="flex mb-6">
              <RadioGroup
                name="previewType"
                label="Desktop Result"
                value="desktop"
                checked={previewType === "desktop"}
                onChange={(e) => setPreviewType(e.target.value)}
                wrapperClassName="mr-5"
              />
              <RadioGroup
                name="previewType"
                label="Mobile Result"
                value="mobile"
                checked={previewType === "mobile"}
                onChange={(e) => setPreviewType(e.target.value)}
                wrapperClassName="ml-5"
              />
            </div>

            {/* Preview Display */}
            <div className="mb-6 py-4 rounded w-full">
              <div className="text-sm">
                <Text size="base">https://www.corporategear.com › ...</Text>
              </div>
              <div className="text-[20px] text-[#1a0dab] font-arial leading-6 py-1">
                <Text size="base">Corporate Gear</Text>
              </div>
              <div className="text-[14px] leading-[22px] text-[#4d5156] mb-2">
                <Text size="base">
                  <span className="font-bold">Corporate Gear</span> gives its
                  customers exclusive, direct access to custom branded clothing
                  and accessories from iconic premium sports and lifestyle
                  brands.
                </Text>
              </div>
            </div>
          </div>

          {/* Meta Fields */}
          <div className="space-y-6">
            <div>
              <Label required asterisk>
                Page URL
              </Label>
            </div>
            <div>
              <Label required asterisk>
                Page Title
              </Label>
            </div>
            <div>
              <Label required asterisk>
                Meta Description
              </Label>
            </div>
            <div>
              <Label required asterisk>
                Meta Keywords
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* Social Preview Section */}
      <div className="border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <Text size="lg" className="font-bold mb-6">
          Social Preview
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Social Media Preview Cards */}
          {SOCIAL_MEDIA_OPTIONS.map((platform: IconName) => (
            <div key={platform} className="border border-gray-200 p-4">
              <div className="text-center mt-1 mb-3 w-10 mx-auto">
                <SvgIcon
                  name={platform}
                  className={
                    platform === "Pinterest"
                      ? "w-10 h-10  text-primary-light dark:text-primary-dark"
                      : "w-10 h-10 fill-primary-light dark:fill-primary-dark"
                  }
                />
              </div>
              <Label className="text-sm leading-4">
                We recommend 1,200px by 628px
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeoTabView;
