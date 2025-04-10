import React from "react";
import { getFormatDate } from "@/utils/date.util";

const DateCell = ({ date }: { date: string }) => {
  if (!date) return null;
  const formattedDate = getFormatDate(date);
  return (
    <>
      <div>{formattedDate.date}</div>
      <div className="text-xs font-normal">{formattedDate.time}</div>
    </>
  );
};

export default React.memo(DateCell);
