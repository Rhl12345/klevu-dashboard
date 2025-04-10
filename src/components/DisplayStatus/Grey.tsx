import { FC } from "react";
import { StatusProps } from "@/types/common/common.type";
import { RecStatusValuebyName, RecStatusValueName } from "@/utils/constants";

const Draft: FC<StatusProps> = ({ type, ...rest }) => {
  return (
    <>
      <div className="inline-block w-auto max-w-min min-w-28 border border-gray-600 bg-gray-100 text-gray-900 rounded-full lg:px-6 px-2 py-1 text-xs text-center font-medium tracking-widest">
        {type === RecStatusValuebyName.Paid
          ? RecStatusValueName.Paid
          : type === RecStatusValuebyName.Cloned
            ? RecStatusValueName.Cloned
            : RecStatusValueName.Draft}
      </div>
    </>
  );
};

export default Draft;
