"use client";
import Grid from "@/components/Grid/Grid";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Text from "@/components/Text/Text";
import { IStoreCardInfoProps } from "@/types/dashboard/dashboard.type";
import { useMemo } from "react";

const StoreCardInfo = (props: IStoreCardInfoProps) => {
  const renderExtraData = useMemo(() => {
    if (props.extraData && props.extraData[props.title]) {
      return (
        <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-12 px-4 lg:px-6 py-4 lg:py-6 border-t border-gray-light dark:border-gray-dark">
          <div className="text-center text-quaternary-dark dark:text-quaternary-light item-center block">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 lg:gap-6">
              {props.extraData[props.title]?.map((item) => {
                if (
                  ![
                    "activeProducts",
                    "inActiveProducts",
                    "totalProducts",
                  ].includes(item.title)
                ) {
                  return (
                    <div
                      key={item.title}
                      className="relative w-full text-center border border-gray-light dark:border-gray-dark"
                    >
                      <div className="bg-body-light dark:bg-body-dark p-4 lg:p-6">
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col items-start justify-start">
                            <Text size="2xl" align="left">
                              {item.count}
                            </Text>
                            <Text size="lg" align="left">
                              {item.title}
                            </Text>
                          </div>
                          <SvgIcon name={item.icon} height={50} width={50} />
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      );
    } else return null;
  }, [props.extraData, props.title]);

  return (
    <div className="text-center item-center block border border-gray-light dark:border-gray-dark flex flex-col gap-4 lg:gap-6">
      <div className="p-2 lg:p-4 font-semibold text-md lg:text-lg text-quaternary-dark dark:text-quaternary-light border-b border-gray-light dark:border-gray-dark">
        {props.title}
      </div>
      <div className={`flex flex-col gap-4 lg:gap-6 px-4 lg:px-6 ${renderExtraData ? "" : "pb-4 lg:pb-6"}`}>
        <Grid className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-6">
          {props.value.map((item) => {
            return (
              <div
                key={item.title}
                className="flex flex-col items-center justify-center gap-4 lg:gap-6 p-4 lg:p-6 bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark"
              >
                <div className="h-24 flex items-center justify-center text-quaternary-dark dark:text-quaternary-light">
                  <SvgIcon name={item.icon} height={50} width={50} />
                </div>
                <div className="text-md lg:text-xl">
                  <Text size="xl" align="center">
                    {item?.count}
                  </Text>
                </div>
                <div className="">
                  <Text size="lg" align="center">
                    {item?.title}
                  </Text>
                </div>
              </div>
            );
          })}
        </Grid>
      </div>     

      {renderExtraData}
    </div>
  );
};

export default StoreCardInfo;
