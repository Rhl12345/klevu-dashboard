import dayjs from "dayjs";

export const getFormatDate = (
  date: string | Date | null | undefined,
  options?: {
    dateFormat?: string;
    timeFormat?: string;
    timeFormat24?: boolean;
  }
): { date: string; time: string } => {
  // Set defaults
  const {
    dateFormat = "MM/DD/YYYY",
    timeFormat = "hh:mm A",
    timeFormat24 = false,
  } = options || {};

  // Handle null/undefined
  if (!date) {
    return { date: "Invalid Date", time: "Invalid Date" };
  }

  // Check validity
  const parsedDate = dayjs(date);
  if (!parsedDate.isValid()) {
    return { date: "Invalid Date", time: "Invalid Date" };
  }

  // Format time based on 12/24 hour preference
  const finalTimeFormat = timeFormat24
    ? timeFormat.replace("hh", "HH").replace(" A", "")
    : timeFormat;

  return {
    date: parsedDate.format(dateFormat),
    time: parsedDate.format(finalTimeFormat),
  };
};
