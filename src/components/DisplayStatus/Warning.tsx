import { FC } from "react";
import { StatusProps } from "@/types/common/common.type";
import { RecStatusValuebyName, RecStatusValueName } from "@/utils/constants";

const Warning: FC<StatusProps> = ({ type }) => {
  return (
    <>
      <div className="inline-block w-auto max-w-min min-w-28 border border-yellow-600 bg-yellow-100 text-yellow-900 rounded-full lg:px-6 px-2 py-1 text-xs text-center font-medium tracking-widest">
        {(() => {
          if (type === RecStatusValuebyName.Pending) {
            return RecStatusValueName.Pending;
          } else if (type === RecStatusValuebyName.Scheduled) {
            return RecStatusValueName.Scheduled;
          } else if (type === RecStatusValuebyName.Unfulfilled) {
            return RecStatusValueName.Unfulfilled;
          } else if (type === RecStatusValueName.Pending) {
            return RecStatusValueName.Pending;
          } else {
            return type;
          }
        })()}
      </div>
    </>
  );
};

export default Warning;
