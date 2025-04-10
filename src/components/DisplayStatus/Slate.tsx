import { FC } from "react";
import { RecStatusValueName } from "@/utils/constants";
import { StatusProps } from "@/types/common/common.type";

const Archive: FC<StatusProps> = () => {
  return (
    <>
      <div className="inline-block w-auto max-w-min min-w-28 border border-slate-600 bg-slate-100 text-slate-900 rounded-full lg:px-6 px-2 py-1 text-xs text-center font-medium tracking-widest">
        {RecStatusValueName?.Archived}
      </div>
    </>
  );
};

export default Archive;
