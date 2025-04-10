import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import Loader from "@/components/common/Loader";
import Status from "@/components/DisplayStatus/Status";
import Image from "@/components/Image/Image";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Text from "@/components/Text/Text";
import colors from "@/mock-data/Colors.json";
import {
  getAttributeCombinationData,
  getAttributesData,
  getAttributesImageData,
} from "@/services/product/productAttributes.service";
import {
  IAttribute,
  IAttributeCombination,
  IAttributeImageOption,
  IAttributeMedia,
} from "@/types/product/product.type";
import { getErrorMessage } from "@/utils/common.util";
import { Row } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const AttributeViewSection = ({
  productId,
  handleTabChange,
}: {
  productId: string;
  handleTabChange: (tab: number) => void;
}) => {
  const [attributesData, setAttributesData] = useState<IAttribute[]>([]);
  const [attributesImageData, setAttributesImageData] = useState<
    IAttributeImageOption[]
  >([]);
  const [attributeCombinationData, setAttributeCombinationData] = useState<
    IAttributeCombination[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAttributesData = async () => {
    try {
      const attributes = await getAttributesData(productId);
      setAttributesData(attributes);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const fetchAttributesImageData = async () => {
    try {
      const attributes = await getAttributesImageData(productId);
      setAttributesImageData(attributes);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const fetchAttributeCombinationData = async () => {
    try {
      const attributeCombinationRes =
        await getAttributeCombinationData(productId);
      setAttributeCombinationData(attributeCombinationRes);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const fetchInitialData = async () => {
    try {
      await Promise.all([
        fetchAttributesData(),
        fetchAttributesImageData(),
        fetchAttributeCombinationData(),
      ]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [productId]);

  const attributeImageColumns: ITableColumn<IAttributeImageOption>[] = useMemo(
    () => [
      {
        id: "color",
        accessorKey: "value",
        header: "Color",
        enableSorting: false,
      },
      {
        id: "suffix",
        accessorKey: "suffix",
        header: "Suffix",
        enableSorting: false,
      },
      {
        id: "media",
        accessorKey: "media",
        header: "Media",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="w-full max-w-24 relative">
            <Image
              src={
                row.original.media?.length
                  ? row.original.media?.[0].url
                  : "/noImage.png"
              }
              alt={row.original.media?.[0]?.name || "Attribute Image"}
              objectFit="contain"
              variant="next"
              width={100}
              height={100}
            />
            {row.original.media?.length > 1 && (
              <span className="text-danger text-sm absolute top-0 right-0">
                +{row.original.media?.length - 1}
              </span>
            )}
          </div>
        ),
      },
      {
        id: "swatch",
        accessorKey: "swatch",
        header: "Swatch",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="w-full max-w-24 relative">
            <Image
              src={row?.original?.swatch?.url || "/noImage.png"}
              alt="Swatch"
              className="w-full h-full"
              objectFit="cover"
              variant="next"
              width={100}
              height={100}
            />
          </div>
        ),
      },
      {
        id: "facetColor",
        accessorKey: "facetColor",
        header: "Facet Color",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1 max-w-40">
            {colors.items.map((color) => (
              <div
                key={color.id}
                className="w-5 h-5 border border-gray-light dark:border-gray-dark"
                style={{ backgroundColor: color.hexCode }}
              >
                <Checkbox
                  id={color.hexCode}
                  defaultChecked={row.original.facetColor.includes(
                    color.hexCode
                  )}
                  disabled
                  checkboxClassName="!border-none !bg-transparent dark:!bg-transparent dark:!border-none"
                />
              </div>
            ))}
          </div>
        ),
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        enableSorting: false,
        cell: ({ row }) => <Status type={row.original.isActive ? "A" : "I"} />,
      },
    ],
    []
  );

  const attributeCombinationColumns: ITableColumn<IAttributeCombination>[] = [
    {
      id: "imageUrl",
      accessorKey: "imageUrl",
      header: "Image",
      enableSorting: false,
      cell: ({ row }: { row: Row<IAttributeCombination> }) => (
        <div className="w-full max-w-24 relative">
          <Image
            alt={row.original.variant}
            src={row.original.imageUrl}
            objectFit="contain"
            variant="next"
            height={100}
            width={100}
          />
        </div>
      ),
    },
    {
      id: "variant",
      accessorKey: "variant",
      header: "Variant",
      enableSorting: false,
    },
    {
      id: "sku",
      accessorKey: "sku",
      header: "SKU",
      enableSorting: false,
    },
    {
      id: "additionalPrice",
      accessorKey: "additionalPrice",
      header: "Additional Price ($)",
      enableSorting: false,
      cell: ({ row }: { row: Row<IAttributeCombination> }) =>
        row.original.additionalPrice
          ? row.original.additionalPrice?.toFixed(2)
          : "0.00",
    },
    {
      id: "minQuantity",
      accessorKey: "minQuantity",
      header: "Min Quantity",
      enableSorting: false,
    },
    {
      id: "multipleQuantity",
      accessorKey: "multipleQuantity",
      header: "Multiple Quantity",
      enableSorting: false,
    },
    {
      id: "upcGtin",
      accessorKey: "upcGtin",
      header: "UPC/GTIN",
      enableSorting: false,
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      cell: ({ row }: { row: Row<IAttributeCombination> }) => (
        <Status type={row.original.isActive ? "A" : "I"} />
      ),
    },
  ];

  const renderSubComponent = ({ row }: { row: any }) => {
    return (
      <div className="w-full py-2 px-4">
        <div className="grid grid-cols-5 gap-4">
          {row.original?.media?.map((mediaItem: IAttributeMedia) => (
            <div
              key={`image_${mediaItem.url}`}
              className="relative  flex flex-col gap-2 items-center"
            >
              <Image
                src={mediaItem.url}
                alt={mediaItem.name || "Attribute Image"}
                className="w-full h-48"
                objectFit="contain"
                variant="next"
                width={208}
                height={208}
              />
              <Text size="sm">{mediaItem.name}</Text>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className=" border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-4 lg:gap-6 dark:border-gray-dark">
          <div className="flex justify-between items-center">
            <Text size="lg" className="font-semibold">
              Attribute Information
            </Text>

            <Button
              variant="default"
              size="md"
              onClick={() => handleTabChange(4)}
              className="underline"
            >
              Edit
            </Button>
          </div>

          <div className="flex flex-col md:flex-row justify-start text-left gap-2 w-full">
            <Text size="sm" className="md:w-1/3">
              Color:
            </Text>
            <Text size="sm" className="md:w-2/3">
              {attributesData
                ?.filter((a) => a.name === "Color")
                ?.map((a) => a.options?.map((o) => o.value).join(", "))}
            </Text>
          </div>

          <div className="flex flex-col md:flex-row justify-start text-left gap-2 w-full">
            <Text size="sm" className="md:w-1/3">
              Size:
            </Text>
            <Text size="sm" className="md:w-2/3">
              {attributesData
                ?.filter((a) => a.name === "Size")
                ?.map((a) => a.options?.map((o) => o.value).join(", "))}
            </Text>
          </div>

          <Text size="base" className="font-semibold">
            Attribute Images
          </Text>

          <ReactTable
            COLUMNS={attributeImageColumns}
            DATA={attributesImageData}
            usedInsideModal={true}
            showFilter={false}
            showPagination={false}
            displaySearch={false}
            getRowCanExpand={() => true}
            renderSubComponent={renderSubComponent}
          />

          <Text size="base" className="font-semibold">
            Attribute Combinations
          </Text>

          <ReactTable
            COLUMNS={attributeCombinationColumns}
            DATA={attributeCombinationData}
            usedInsideModal={true}
            showFilter={false}
            showPagination={false}
            displaySearch={false}
            getRowCanExpand={(row) => row.original.subRows?.length > 0}
          />
        </div>
      )}
    </div>
  );
};

export default AttributeViewSection;
