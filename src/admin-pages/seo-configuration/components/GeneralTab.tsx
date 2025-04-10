import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { Textarea } from "@/components/Textarea/Textarea";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import { ISeoConfiguration } from "@/types/seo-configuration/seoConfiguration.type";
import { useFormikContext } from "formik";

const GeneralTab = () => {
  const { values, setFieldValue } = useFormikContext<ISeoConfiguration>();

  return (
    <>
      {/* Common Tags */}
      <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 lg:gap-6 font-semibold text-secondary-dark dark:text-secondary-light">
          <div className="flex items-center justify-between">
            <Label size="large">Common Tags</Label>
          </div>
          <Textarea
            name="commonTags.headCode"
            placeholder="Enter your Common Head Tag Code here"
            rows={5}
            label="Head Tag Code"
            isFormikField
          />

          <Textarea
            name="commonTags.bodyCode"
            placeholder="Enter your Common Body Tag Code here"
            rows={5}
            label="Body Tag Code"
            isFormikField
          />
        </div>
      </div>

      {/* Google Analytics */}
      <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 lg:gap-6 font-semibold text-secondary-dark dark:text-secondary-light">
          <div className="flex items-center justify-between">
            <Label size="large">Google Analytics</Label>
            <ToggleButton
              name="googleAnalytics.enabled"
              defaultValue={values.googleAnalytics.enabled}
              onChange={(value) =>
                setFieldValue("googleAnalytics.enabled", value, false)
              }
            />
          </div>
          {values.googleAnalytics.enabled && (
            <Input
              name="googleAnalytics.tagId"
              label="Tag ID"
              placeholder="Enter your Google Analytics Tag ID here"
              asterisk
            />
          )}
        </div>
      </div>

      {/* Google Tag Manager */}
      <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 lg:gap-6 font-semibold text-secondary-dark dark:text-secondary-light">
          <div className="flex items-center justify-between">
            <Label size="large">Google Tag Manager</Label>
            <ToggleButton
              name="googleTagManager.enabled"
              defaultValue={values.googleTagManager.enabled}
              onChange={(value) =>
                setFieldValue("googleTagManager.enabled", value, false)
              }
            />
          </div>
          {values.googleTagManager.enabled && (
            <Input
              name="googleTagManager.gtmCode"
              placeholder="Enter your Google Tag Manager Code here"
              label="GTM Code"
              asterisk
            />
          )}
        </div>
      </div>

      {/* Facebook Pixel */}
      <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 lg:gap-6 font-semibold text-secondary-dark dark:text-secondary-light">
          <div className="flex items-center justify-between">
            <Label size="large">Facebook Pixel</Label>
            <ToggleButton
              name="facebookPixel.enabled"
              defaultValue={values.facebookPixel.enabled}
              onChange={(value) =>
                setFieldValue("facebookPixel.enabled", value, false)
              }
            />
          </div>
          {values.facebookPixel.enabled && (
            <Input
              name="facebookPixel.pixelId"
              placeholder="Enter your Facebook Pixel ID here"
              label="Pixel ID"
              asterisk
            />
          )}
        </div>
      </div>

      {/* Pinterest Verification */}
      <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 lg:gap-6 font-semibold text-secondary-dark dark:text-secondary-light">
          <div className="flex items-center justify-between">
            <Label size="large">Pinterest Verification</Label>
            <ToggleButton
              name="pinterest.enabled"
              defaultValue={values.pinterest.enabled}
              onChange={(value) =>
                setFieldValue("pinterest.enabled", value, false)
              }
            />
          </div>
          {values.pinterest.enabled && (
            <>
              <Textarea
                name="pinterest.headCode"
                placeholder="Enter your Pinterest Head Tag Code here"
                rows={5}
                label="Head Tag Code"
                isFormikField
                asterisk
              />

              <Textarea
                name="pinterest.htmlVerificationCode"
                placeholder="Enter your Pinterest HTML Verification Code here"
                rows={5}
                label="Html Verification Tags Body"
                isFormikField
                asterisk
              />
            </>
          )}
        </div>
      </div>

      {/* Affiliate Conversion Tracking */}
      <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 lg:gap-6 font-semibold text-secondary-dark dark:text-secondary-light">
          <div className="flex items-center justify-between">
            <Label size="large">Affiliate Conversion Tracking</Label>
            <ToggleButton
              name="affiliateConversion.enabled"
              defaultValue={values.affiliateConversion.enabled}
              onChange={(value) =>
                setFieldValue("affiliateConversion.enabled", value, false)
              }
            />
          </div>
          {values.affiliateConversion.enabled && (
            <Input
              name="affiliateConversion.connection"
              placeholder="Enter your Affiliate Conversion Connection here"
              label="Connection"
              asterisk
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GeneralTab;
