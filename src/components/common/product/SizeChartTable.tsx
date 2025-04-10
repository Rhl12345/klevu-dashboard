import Link from "next/link";
import { PageRoutes } from "@/admin-pages/routes";
import { ISizeChartTableProps } from "@/types/product/product.type";

/*
    This component is used to display the size chart table.
    It uses the sizeChartObj to get the size chart data.
    It uses the data to get the size chart data.
    It uses the ChartId to get the size chart data.

    @param sizeChartObj - The size chart object.
    @param data - The size chart data.
    @param chartId - The size chart id.

    @returns A component that displays the size chart table.
*/

const SizeChartTable = ({
  sizeChartObj,
  data,
  chartId,
}: ISizeChartTableProps) => {
  // Any is used here because i am not confirm about the data type yet once i get the data type i will change the data type
  const { distinctX, distinctY, sizeChartViewdata } = sizeChartObj;

  return (
    <div className="flex w-full overflow-auto">
      <div className="w-full text-quaternary-dark dark:text-quaternary-light">
        <table className="table-auto w-full border  border-gray-light dark:border-gray-dark">
          <thead className="text-xs font-semibold uppercase border-t border-b  border-gray-light dark:border-gray-dark">
            <tr>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-left w-52">Size</div>
              </th>
              {distinctX.map((value: string, index: number) => {
                return (
                  <th
                    className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
                    key={index}
                  >
                    <div className="font-semibold text-left">{value}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="text-sm">
            {distinctY.map((y: string, index: number) => {
              const objectLInsideSizeArray =
                data.length > 0 ? Object.keys(data[0]) : [];

              return (
                <tr
                  key={index}
                  className="border-b border-gray-light dark:border-gray-dark"
                >
                  {distinctX.length > 0 && y.length > 0 ? (
                    <>
                      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-medium">{y}</div>
                      </td>

                      {distinctX.map((x: string, index: number) => (
                        <td
                          className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
                          key={index}
                        >
                          <div className="font-medium">
                            <span>
                              {(data &&
                                objectLInsideSizeArray?.length > 0 &&
                                data[0][y + x]) ??
                                "0"}
                            </span>
                          </div>
                        </td>
                      ))}
                    </>
                  ) : (
                    <td className="text-rose-500 w-full text-center px-0.5">
                      Please Add Size Chart Data
                      <Link href={`${PageRoutes.SIZE_CHART.EDIT}/${chartId}`}>
                        First
                      </Link>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SizeChartTable;
