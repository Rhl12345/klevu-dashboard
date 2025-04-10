import React from "react";
import Checkbox from "@/components/Checkbox/Checkbox";
import Text from "@/components/Text/Text";
import companyConfiguration from "@/mock-data/companyConfiguration.json";

const ModuleRights = () => {
  return (
    <div className="w-full flex gap-4 lg:gap-8 lg:py-8 py-4 lg:pt-0">
      <div className="px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="w-full flex flex-col gap-4 lg:gap-6">
            <div className="w-full p-4 lg:p-6 border border-gray-light dark:border-gray-dark">
              <Text>Module Rights</Text>
              {companyConfiguration.MODULE_DATA[0].sections.map(
                (item, index) => {
                  if (typeof item === "string") {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 lg:py-4 border-b border-gray-light dark:border-gray-dark "
                      >
                        <Text size="sm">{item}</Text>
                        <Checkbox
                          wrapperClassName="space-x-0"
                          name={`RolePermissionData[0].modules.${index}_ext.default`}
                          type="checkbox"
                          maxLength={255}
                          id={`${index}_ext`}
                        />
                      </div>
                    );
                  } else if (
                    typeof item === "object" &&
                    "Stores Subsections" in item
                  ) {
                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between py-2 lg:py-4 border-b border-gray-light dark:border-gray-dark">
                          <Text size="sm">Stores</Text>
                          <Checkbox
                            wrapperClassName="space-x-0"
                            name={`RolePermissionData[0].modules.stores_ext.default`}
                            type="checkbox"
                            maxLength={255}
                            id="stores_ext"
                          />
                        </div>
                        {item["Stores Subsections"].map(
                          (subsection, subIndex) => (
                            <div
                              key={`${index}-${subIndex}`}
                              className="flex items-center justify-between py-2 lg:py-4 border-b border-gray-light dark:border-gray-dark pl-8 last:border-b-0"
                            >
                              <Text size="sm">{subsection}</Text>
                              <Checkbox
                                wrapperClassName="space-x-0"
                                name={`RolePermissionData[0].modules.${subsection.toLowerCase().replace(/\s+/g, "_")}_ext.default`}
                                type="checkbox"
                                maxLength={255}
                                id={`${subsection.toLowerCase().replace(/\s+/g, "_")}_ext`}
                              />
                            </div>
                          )
                        )}
                      </div>
                    );
                  }
                  return null;
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleRights;
