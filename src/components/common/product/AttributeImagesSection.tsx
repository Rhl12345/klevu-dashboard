import Button from "@/components/Button/Button";
import Status from "@/components/DisplayStatus/Status";
import Image from "@/components/Image/Image";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Text from "@/components/Text/Text";
import UploadImage from "@/components/UploadImage/UploadImage";
import {
  IAttributeImageOption,
  IAttributeMedia,
} from "@/types/product/product.type";
import { useMemo, useState } from "react";

import Checkbox from "@/components/Checkbox/Checkbox";
import Input from "@/components/Input/Input";
import InputNumber from "@/components/Input/InputNumber";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import colors from "@/mock-data/Colors.json";

/**
 * AttributeImagesSection component displays and manages product attribute images
 * including media images, swatches, and facet colors.
 *
 * @component
 * @param {Object} props - Component props
 * @param {IAttributeImageOption[]} props.attributesImageData - Array of attribute image options
 * containing image data, swatches, and facet colors for each attribute
 *
 * @example
 * ```tsx
 * const attributesData = [{
 *   id: '1',
 *   value: 'Red',
 *   suffix: 'rd',
 *   media: [],
 *   swatch: null,
 *   facetColor: [],
 *   isActive: true
 * }];
 *
 * <AttributeImagesSection attributesImageData={attributesData} />
 * ```
 */
const AttributeImagesSection = ({
  attributesImageData,
}: {
  attributesImageData: IAttributeImageOption[];
}) => {
  const [data, setData] = useState<IAttributeImageOption[] | any[]>(
    attributesImageData
  );

  /**
   * Handles image upload for media or swatch images
   * @param {File[]} files - Array of uploaded files
   * @param {string} rowId - ID of the row being updated
   * @param {'media' | 'swatch'} type - Type of image being uploaded
   */
  const handleImageUpload = (
    files: File[],
    rowId: string,
    type: "media" | "swatch"
  ) => {
    setData((prevData) =>
      prevData.map((row) => {
        if (row.id === rowId) {
          if (type === "media") {
            const newMediaItems = files.map((file) => ({
              url: URL.createObjectURL(file),
              file,
              name: file.name,
              displayOrder: row.media?.length + 1 || 1,
            }));
            return {
              ...row,
              media: [...(row.media || []), ...newMediaItems],
            };
          } else {
            return {
              ...row,
              swatch: {
                url: URL.createObjectURL(files[0]),
                file: files[0],
              },
            };
          }
        }
        return row;
      })
    );
  };

  /**
   * Handles deletion of media or swatch images
   * @param {string} rowId - ID of the row being updated
   * @param {'media' | 'swatch'} type - Type of image being deleted
   * @param {number} [mediaIndex] - Index of media image being deleted (only for media type)
   */
  const handleImageDelete = (
    rowId: string,
    type: "media" | "swatch",
    mediaIndex?: number
  ) => {
    setData((prevData) =>
      prevData.map((row) => {
        if (row.id === rowId) {
          if (type === "media" && typeof mediaIndex === "number") {
            const newMedia = [...row.media];
            newMedia.splice(mediaIndex, 1);
            return {
              ...row,
              media: newMedia,
            };
          } else if (type === "swatch") {
            return {
              ...row,
              swatch: null,
            };
          }
        }
        return row;
      })
    );
  };

  /**
   * Handles changes to facet color selection
   * @param {string} rowId - ID of the row being updated
   * @param {string} color - Hex code of the color being toggled
   * @param {boolean} isChecked - Whether the color is being selected or deselected
   */
  const handleFacetColorChange = (
    rowId: string,
    color: string,
    isChecked: boolean
  ) => {
    setData((prevData) =>
      prevData.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            facetColor: isChecked
              ? [...row.facetColor, color]
              : row.facetColor.filter((c: string) => c !== color),
          };
        }
        return row;
      })
    );
  };

  const columns: ITableColumn<IAttributeImageOption>[] = useMemo(
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
              alt={row.original.media?.[0]?.name}
              className="w-full h-full"
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
            {row.original.swatch ? (
              <>
                <Image
                  src={row.original.swatch.url}
                  alt="Swatch"
                  className="w-full h-full"
                  objectFit="contain"
                  variant="next"
                  width={100}
                  height={100}
                />
                <Button
                  onClick={() => handleImageDelete(row?.original?.id, "swatch")}
                  variant="default"
                  type="button"
                  className="absolute top-1 right-1 p-1 rounded-full bg-white shadow-md"
                  aria-label="Remove swatch"
                  icon={
                    <SvgIcon name="Trash" className="w-4 h-4 text-red-500" />
                  }
                />
              </>
            ) : (
              <label
                htmlFor={`swatch-${row.original.value}-${row.original.suffix}`}
                className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-400 bg-gray-100 cursor-pointer"
              >
                <span className="text-quaternary-light text-3xl">+</span>
                <UploadImage
                  key={`swatch-${Math.random()}`}
                  id={`swatch-${row.original.value}-${row.original.suffix}`}
                  onUpload={(files) =>
                    handleImageUpload(files, row.original.id, "swatch")
                  }
                  withoutUploadUI
                />
              </label>
            )}
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
                  onChange={(e) =>
                    handleFacetColorChange(
                      row.original.id,
                      color.hexCode,
                      e.target.checked
                    )
                  }
                  checked={row.original.facetColor.includes(color.hexCode)}
                  checkboxClassName=" !border-none !bg-transparent dark:!bg-transparent dark:!border-none"
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

  const handleImageNameChange = (
    rowId: string,
    index: number,
    value: string
  ) => {
    setData((prevData) =>
      prevData.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            media: row.media.map((mediaItem: any, i: number) =>
              i === index ? { ...mediaItem, name: value } : mediaItem
            ),
          };
        }
        return row;
      })
    );
  };

  const handleImageDisplayOrderChange = (
    rowId: string,
    index: number,
    value: number
  ) => {
    setData((prevData) =>
      prevData.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            media: row.media.map((mediaItem: any, i: number) =>
              i === index ? { ...mediaItem, displayOrder: value } : mediaItem
            ),
          };
        }
        return row;
      })
    );
  };
  const renderSubComponent = ({ row }: { row: any }) => {
    return (
      <div className="w-full py-2 px-4">
        <div className="grid grid-cols-5 gap-4">
          {row.original.media.map(
            (mediaItem: IAttributeMedia, index: number) => (
              <div
                key={`image_${mediaItem.url}`}
                className="relative  flex flex-col gap-2"
              >
                <Image
                  src={mediaItem.url}
                  alt={`Media ${index + 1}`}
                  className="w-full h-48"
                  objectFit="contain"
                  variant="next"
                  width={208}
                  height={208}
                />
                <div className="grid grid-cols-3 gap-1">
                  <div className="col-span-2">
                    <Input
                      type="text"
                      placeholder="Enter Image Name"
                      value={mediaItem.name}
                      onChange={(e) =>
                        handleImageNameChange(
                          row.original.id,
                          index,
                          e.target.value
                        )
                      }
                      formik={false}
                    />
                  </div>
                  <div className="col-span-1">
                    <InputNumber
                      placeholder="Enter display order"
                      value={mediaItem.displayOrder}
                      onChange={(e) =>
                        handleImageDisplayOrderChange(
                          row.original.id,
                          index,
                          +e.target.value
                        )
                      }
                      formik={false}
                    />
                  </div>
                </div>
                <Button
                  onClick={() =>
                    handleImageDelete(row.original.id, "media", index)
                  }
                  variant="default"
                  className="absolute top-2 right-0"
                  aria-label="Remove image"
                  type="button"
                  icon={
                    <SvgIcon name="Trash" className="w-6 h-6 text-red-500" />
                  }
                />
              </div>
            )
          )}
          {row.original.media.length < 5 && (
            <label
              htmlFor={`${row.original.id}_${row.original.value}`}
              className="h-48 flex items-center justify-center border-2 border-dashed border-gray-400 bg-gray-100 cursor-pointer"
            >
              <span className="text-quaternary-light text-3xl">+</span>
              <UploadImage
                key={`${row.original.id}_${
                  row?.original?.media?.length
                    ? row?.original?.media?.[row?.original?.media?.length - 1]
                        ?.url
                    : `${row.original.suffix}`
                }`}
                id={`${row.original.id}_${row.original.value}`}
                onUpload={(files) =>
                  handleImageUpload(files, row.original.id, "media")
                }
                withoutUploadUI
                maxImages={5 - row.original.media.length}
              />
            </label>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
      <div className="flex justify-between items-center px-4 lg:px-6 pt-4 xl:pt-6">
        <Text size="lg">Attributes Images</Text>
        <Button variant="primary" size="sm" onClick={() => {}}>
          Save
        </Button>
      </div>

      <ReactTable
        COLUMNS={columns}
        DATA={data}
        isListPage={false}
        showFilter={false}
        showPagination={false}
        displaySearch={false}
        getRowCanExpand={() => true}
        renderSubComponent={renderSubComponent}
      />
    </div>
  );
};

export default AttributeImagesSection;
