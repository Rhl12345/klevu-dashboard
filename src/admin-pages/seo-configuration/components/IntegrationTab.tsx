import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Text from "@/components/Text/Text";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import { ISeoConfiguration } from "@/types/seo-configuration/seoConfiguration.type";
import { useFormikContext } from "formik";
import Link from "next/link";

const IntegrationTab = () => {
  const { values, setFieldValue } = useFormikContext<ISeoConfiguration>();

  return (
    <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
      <div className="flex flex-col gap-4 lg:gap-6 font-semibold text-secondary-dark dark:text-secondary-light">
        <div className="flex items-center justify-between">
          <Label size="large">SEMrush Integrationg</Label>
          <ToggleButton
            name="integration.enabled"
            defaultValue={values.integration.enabled}
            onChange={(value) =>
              setFieldValue("integration.enabled", value, false)
            }
          />
        </div>
        {values.integration.enabled && (
          <>
            <div className="">
              <Text size="xs">
                To connect to SEMrush you'll need a SEMrush Business account
                with API access enabled.
              </Text>
              <Text size="xs">
                You can find your API Key in you SEMrush account under
              </Text>
              <Text size="xs">
                User profile {">"} API {">"} Begin: GET API Key (
                <Link
                  href="https://www.semrush.com/api-use/"
                  className="text-indigo-500"
                >
                  https://www.semrush.com/api-use/
                </Link>
                )
              </Text>
              <Text size="xs">
                <strong>Important!</strong>&nbsp;You will be changed SEMrush API
                units each time you gather data for your SEMrush dashboard.
              </Text>
            </div>
            <Input
              name="integration.semrushAPIKey"
              placeholder="Enter your SEMrush API Key here"
              label="API Key"
              asterisk
            />
          </>
        )}
      </div>
    </div>
  );
};

export default IntegrationTab;
