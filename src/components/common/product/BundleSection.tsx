"use client";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Text from "@/components/Text/Text";
import { getBundleList } from "@/services/bundle/bundle.service";
import { IBundleItem } from "@/types/bundle/bundle.type";
import { getErrorMessage } from "@/utils/common.util";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import RenderImageCell from "@/components/common/RenderImageCell";

const BundleSection = () => {
  const [data, setData] = useState<IBundleItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const columns: ITableColumn<IBundleItem>[] = useMemo(() => {
    return [
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
      },
      {
        id: "store",
        accessorKey: "storeImage",
        header: "Store",
        cell: (props) => <RenderImageCell path={props.getValue()} />,
      },
      {
        id: "ourSKU",
        accessorKey: "ourSKU",
        header: "SKU",
      },
      {
        id: "salePrice",
        accessorKey: "salePrice",
        header: "Sale Price",
      },
      {
        id: "msrp",
        accessorKey: "msrp",
        header: "MSRP",
      },
      {
        id: "quantity",
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        id: "color",
        accessorKey: "color",
        header: "Color",
      },
    ];
  }, []);

  const fetchBundleList = async () => {
    try {
      setIsLoading(true);
      const response = await getBundleList();
      setData(response.items as IBundleItem[]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const getRowCanExpand = (row: IBundleItem) => {
    return !!(row.subRows && row.subRows.length > 0);
  };

  useEffect(() => {
    fetchBundleList();
  }, []);

  return (
    <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
      <ReactTable
        loading={isLoading}
        COLUMNS={columns}
        DATA={data}
        isListPage={false}
        showFilter={false}
        showPagination={false}
        displaySearch={false}
        getRowCanExpand={getRowCanExpand}
      />
    </div>
  );
};

export default BundleSection;
