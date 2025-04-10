"use client";
import StoreCard from "@/components/common/dashboard/components/StoreCard";
import StoreCardInfo from "@/components/common/dashboard/components/StoreCardInfo";
import StoreSection from "@/components/common/dashboard/components/StoreSection";
import Grid from "@/components/Grid/Grid";
import { IDashboardProps } from "@/types/dashboard/dashboard.type";

const CommonDashBoard = (props: IDashboardProps) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto flex flex-col gap-4 lg:gap-6">
      <Grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {props.storeDashboardData.map((store) => (
          <StoreCard key={store.title} {...store} />
        ))}
      </Grid>

      {Object.entries(props.storeSection).map(([key, value]) => (
        <StoreSection key={key} title={key} items={value} />
      ))}

      {Object.entries(props.storeDashboardInfo).map(([key, value]) => (
        <StoreCardInfo
          key={key}
          title={key}
          value={value}
          extraData={props.storeDashboardInfoExtra}
        />
      ))}
    </div>
  );
};

export default CommonDashBoard;
