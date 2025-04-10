import { FC } from "react";
import { StatusProps } from "@/types/common/common.type";
import { RecStatusValuebyName, RecStatusValueName } from "@/utils/constants";

const Danger: FC<StatusProps> = ({ type, navSync, ...rest }) => {
  return (
    <>
      <div className="inline-block w-auto max-w-min min-w-28 border border-red-600 bg-red-100 text-red-900 rounded-full lg:px-6 px-2 py-1 text-xs text-center font-medium tracking-widest">
        {(() => {
          if (type === RecStatusValuebyName.Inactive) {
            return RecStatusValueName.Inactive;
          } else if (type === RecStatusValueName.Unsubscribed) {
            return RecStatusValueName.Unsubscribed;
          } else {
            return type;
          }
        })()}
      </div>
    </>
  );
};

export default Danger;
