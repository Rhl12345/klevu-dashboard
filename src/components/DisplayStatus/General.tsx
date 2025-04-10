import { FC } from "react";
import { StatusProps } from "@/types/common/common.type";

const General: FC<StatusProps> = ({ type, className, ...rest }) => {
  return (
    <>
      {type && (
        <div
          className={`inline-block w-auto max-w-min min-w-28 border rounded-full lg:px-6 px-2 py-1 text-xs text-center font-medium tracking-widest  ${className ? className : "border-slate-600 bg-slate-100 text-slate-900"
            }`}
          {...rest}
        >
          {type && type?.toUpperCase()}
        </div>
      )}
    </>
  );
};

export default General;
