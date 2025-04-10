import { FC } from "react";
import { StatusProps } from "@/types/common/common.type";
import { RecStatusValuebyName, RecStatusValueName } from "@/utils/constants";

const Success: FC<StatusProps> = ({ type }) => {
  return (
    <>
      <div className="inline-block w-auto max-w-min min-w-28 border border-green-600 bg-green-100 text-green-900 rounded-full lg:px-6 px-2 py-1 text-xs text-center font-medium tracking-widest">
        {(() => {
          if (type === RecStatusValuebyName.FulFilled) {
            return RecStatusValueName.FulFilled;
          } else if (type === RecStatusValuebyName?.Active) {
            return RecStatusValueName.Active;
          } else if (type === RecStatusValueName.Approved) {
            return RecStatusValueName.Approved;
          } else if (type === RecStatusValueName.Subscribed) {
            return RecStatusValueName.Subscribed;
          } else {
            return type;
          }
        })()}
      </div>
    </>
  );
};

export default Success;
