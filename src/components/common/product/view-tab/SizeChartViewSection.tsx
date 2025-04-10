import Button from "@/components/Button/Button";
import SizeChartTable from "@/components/common/product/SizeChartTable";
import { Label } from "@/components/Label/Label";
import Text from "@/components/Text/Text";
import SizeChartData from "@/mock-data/EditProductSizeChart.json";
import {
  IProductSizeChart,
  ISizeChartState,
} from "@/types/product/product.type";
import { getErrorMessage } from "@/utils/common.util";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SizeChartViewSection = ({
  productId,
  handleTabChange,
}: {
  productId: string;
  handleTabChange: (tab: number) => void;
}) => {
  const [sizeChartObj, setSizeChartObj] = useState<ISizeChartState>({
    distinctX: [],
    distinctY: [],
    sizeChartViewdata: [],
  });

  const [data, setData] = useState<IProductSizeChart>();

  useEffect(() => {
    try {
      const response = SizeChartData[
        `adidas Men's Size Chart` as keyof typeof SizeChartData
      ] as IProductSizeChart;

      if (response) {
        const parsedView = JSON.parse(response.sizeChartView);
        setData({
          ...response,
          sizeChartView: parsedView,
        });

        const range = response.sizeChartRange.split(",");
        const measurements = response.measurements.split(",");

        setSizeChartObj({
          distinctY: measurements,
          distinctX: range,
          sizeChartViewdata: parsedView,
        });
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, []); // Empty dependency array since we only want to run this once

  return (
    <>
      <div className="border border-gray-light dark:border-gray-dark  bg-body-light dark:bg-body-dark p-4 lg:p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Text size="lg" className="font-semibold">
            Size Chart
          </Text>

          <Button
            variant="default"
            size="md"
            onClick={() => handleTabChange(7)}
            className="underline"
          >
            Edit
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Size Chart Preview</Label>
          <SizeChartTable
            sizeChartObj={sizeChartObj}
            data={data?.sizeChartView}
            chartId={data?.id?.toString() ?? ""}
          />
        </div>

        <div className="flex">
          <Label>Size Chart Template Description :</Label>
          <div
            className="text-quaternary-dark dark:text-quaternary-light"
            dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default SizeChartViewSection;
