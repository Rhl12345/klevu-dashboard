import Text from "@/components/Text/Text";
import { useMemo } from "react";
import {
  Cell,
  Pie,
  PieChart as RechartsChart,
  ResponsiveContainer,
} from "recharts";

const ReadinessCard = ({
  readinessPercentage,
  readinessTitle,
}: {
  readinessPercentage: number;
  readinessTitle: string;
}) => {
  const getReadinessColor = (percentage: number) => {
    if (percentage >= 80) return "green";
    if (percentage >= 50) return "#FBC02D";
    return "red";
  };

  const readinessData = useMemo(() => {
    const nonCompletedPercentage = 100 - readinessPercentage;
    return [
      {
        value: readinessPercentage,
        displayColor: getReadinessColor(readinessPercentage),
      },
      {
        value: nonCompletedPercentage,
        displayColor: "#f3f4f6",
      },
    ];
  }, [readinessPercentage]);
  return (
    <div className="flex gap-2 p-4 items-center">
      <div className="h-[100px] w-[100px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsChart>
            <Pie
              data={readinessData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              startAngle={450}
              endAngle={90}
            >
              {readinessData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.displayColor}
                  stroke="#fff"
                  strokeWidth={1}
                />
              ))}
            </Pie>
          </RechartsChart>
        </ResponsiveContainer>
      </div>
      <div className="grow">
        <Text>{`${readinessPercentage}%`}</Text>
        <Text>{readinessTitle}</Text>
      </div>
    </div>
  );
};

export default ReadinessCard;
