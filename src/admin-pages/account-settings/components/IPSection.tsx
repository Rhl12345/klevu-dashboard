import { Label } from "@/components/Label/Label";
import Text from "@/components/Text/Text";
import { memo } from "react";

const IPSection = memo(() => {
  return (
    <div className="p-4 lg:p-6 flex flex-col gap-4 lg:gap-6 border-b border-gray-light dark:border-gray-dark">
      <div className="flex items-center justify-between">
        <Text size="lg" className="font-bold">
          Approved IP ranges or subnets{" "}
          <span className="text-tertiary-dark dark:text-tertiary-light underline text-sm ml-1">
            (Coming Soon)
          </span>
        </Text>
      </div>
      <div className="">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="text-sm font-medium">
            <Text size="sm">
              {/* As of now using static value */}
              Only users with IP addresses within the specified range will be
              able to access account.
            </Text>
            <Text size="sm">
              This computer is using IP address 27.54.168.197
            </Text>
            <Text size="sm">Approved IP ranges or subnets (0):</Text>
            <Text size="sm" className="mt-2.5">
              <Label
                size="small"
                className="text-quaternary-dark dark:text-quaternary-light"
              >
                Add IP address
              </Label>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
});

export default IPSection;
