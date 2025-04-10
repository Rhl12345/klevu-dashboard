import { Label } from "@/components/Label/Label";
import Text from "@/components/Text/Text";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import { MY_NOTIFICATION_DATA } from "@/mock-data/accountActivity";
import React from "react";

const MyNotification = () => {
  return (
    <div className="w-full flex flex-col gap-4 lg:gap-8 lg:px-8 px-4 py-4 lg:py-8">
      <div className="w-full bg-body-light dark:bg-body-dark lg:py-6 lg:px-6 py-4 px-4 border border-gray-light dark:border-gray-dark">
        <div className="flex flex-col">
          <div className="w-full flex flex-col gap-4 lg:gap-6">
            <Label size="large">My Notifications</Label>

            <div className="flex flex-col gap-4 lg:gap-6">
              <Label size="medium">General</Label>

              <ul className="flex flex-col gap-4">
                {MY_NOTIFICATION_DATA.map((data, index) => (
                  <li key={index}>
                    <div className="flex flex-col gap-2">
                      <div>
                        <Label size="medium">{data.key}</Label>
                      </div>
                      <div className="flex items-center justify-between">
                        <Text size="sm">{data.content}</Text>
                        <div className="ml-8">
                          <ToggleButton
                            name="isCommentsandreplies"
                            id="isCommentsandreplies"
                            size="small"
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNotification;
