import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { ISizeChartProps } from "@/types/size-chart/sizeChart.type";

const SizeChart: React.FC<ISizeChartProps> = ({
  measurements,
  sizeChartRange,
  onDataChange,
  isEditable = false,
  data = {},
}) => {
  const getValue = (measurement: string, size: string): string | number => {
    const key = `${measurement}${size}`;
    return data[key] || "0";
  };

  return (
    <div className='overflow-x-auto mt-4'>
      <table className='min-w-full border-collapse border border-gray-light dark:border-gray-dark'>
        <thead>
          <tr>
            <th className='p-2 border border-gray-light dark:border-gray-dark'>
              <Label>Size</Label>
            </th>
            {sizeChartRange.map((size) => (
              <th
                key={size}
                className='p-2 border border-gray-light dark:border-gray-dark'
              >
                <Label>{size}</Label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {measurements.map((measurement) => (
            <tr key={measurement}>
              <td className='p-2 border border-gray-light dark:border-gray-dark'>
                <Label>{measurement}</Label>
              </td>
              {sizeChartRange.map((size) => (
                <td
                  key={`${measurement}-${size}`}
                  className='p-4 border border-gray-light dark:border-gray-dark'
                >
                  {isEditable ? (
                    <Input
                      type='text'
                      formik={false}
                      className='w-full p-1 border border-gray-300 rounded'
                      placeholder='0'
                      value={getValue(measurement, size)}
                      onChange={(e) => {
                        if (onDataChange) {
                          onDataChange({
                            measurements,
                            ranges: sizeChartRange,
                            value: e.target.value,
                            field: `${measurement}${size}`,
                          });
                        }
                      }}
                    />
                  ) : (
                    getValue(measurement, size)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SizeChart;
