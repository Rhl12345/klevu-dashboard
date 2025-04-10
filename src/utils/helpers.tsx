import Avatar from "@/components/Avatar/Avatar";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { IDropdownOption, ITableColumn } from "@/components/Table/types";
import { StoryFn } from "@storybook/react";
import ProductImageDummy from "@images/dummy.jpg";
import Collapsible from "@/components/Collapsible/Collapsible";
import { format } from "date-fns/format";
import { useEffect, useState } from "react";

// Common function to create a story with dynamic code
export const CreateSourceCodeStory = (code: string) => {
  const Template: StoryFn = () => <></>;
  const Story = Template.bind({});
  Story.parameters = {
    docs: {
      source: {
        code,
      },
    },
  };
  return Story;
};

// Utility function to generate a list of numbers with a gap
export const NumericList = (start: number, end: number, gap: number) => {
  let font: { value: string; label: string }[] = [];
  for (var i = start; i <= end; i = i + gap) {
    font = [...font, { value: i.toString(), label: i.toString() }];
  }
  return font;
};

// Utility function to get image dimensions
export const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Failed to load image"));
    };
  });
};

// Utility function to format date and time
export const formatDateTime = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formatted = date.toLocaleString("en-US", options);
  const [datePart, timePart] = formatted.split(", ");
  return `${datePart} ${timePart}`;
};

export const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// Sample columns for the table
export const sampleColumns: ITableColumn[] = [
  {
    id: "productImage",
    accessorKey: "productImage",
    header: "Product Image",
    cell: (props: any) => (
      <div className="w-10 h-10">
        <Avatar image={ProductImageDummy} />
      </div>
    ),
  },
  { id: "productName", accessorKey: "productName", header: "Product Name" },
  { id: "ourSku", accessorKey: "ourSku", header: "Our SKU" },
  { id: "vendorSku", accessorKey: "vendorSku", header: "Vendor SKU" },
  {
    id: "brandName",
    accessorKey: "brandName",
    header: "Brand Name",
    filterFn: "arrIncludesSome",
  },
  {
    id: "vendorName",
    accessorKey: "vendorName",
    header: "Vendor Name",
    filterFn: "arrIncludesSome",
  },
  { id: "ourCost", accessorKey: "ourCost", header: "Our Cost ($)" },
  { id: "imap", accessorKey: "imap", header: "IMAP ($)" },
  { id: "salePrice", accessorKey: "salePrice", header: "Sale Price ($)" },
  {
    id: "createdDate",
    accessorKey: "createdDate",
    header: "Created Date",
    filterFn: "customDateFilter",
    cell: (props: any) => (
      <div className="whitespace-pre">{props.getValue()}</div>
    ),
  },
  {
    id: "createdBy",
    accessorKey: "createdBy",
    header: "Created By",
    filterFn: "arrIncludesSome",
  },
  {
    id: "updatedDate",
    accessorKey: "updatedDate",
    header: "Updated Date",
    filterFn: "customDateFilter",
    cell: (props: any) => (
      <div className="whitespace-pre">{props.getValue()}</div>
    ),
  },
  {
    id: "updatedBy",
    accessorKey: "updatedBy",
    header: "Updated By",
    filterFn: "arrIncludesSome",
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    filterFn: "arrIncludesSome",
    cell: (props: any) => {
      const status = props.getValue();
      const statusClasses: any = {
        Active: "bg-green-200 text-green-600",
        Staging: "bg-yellow-200 text-yellow-600",
        Inactive: "bg-red-200 text-red-600",
        Draft: "bg-gray-200 text-gray-600",
      };
      return (
        <span
          className={`rounded-full px-3 py-1 text-[8px] ${
            statusClasses[status] || ""
          } text-center block font-extrabold uppercase tracking-widest`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "action",
    accessorKey: "action",
    header: "Action",
    cell: () => (
      <div className="flex gap-2 items-center">
        <SvgIcon
          name="Edit"
          className="hover:cursor-pointer"
          height={22}
          width={22}
        />
        <SvgIcon
          name="Trash"
          className="hover:cursor-pointer"
          height={22}
          width={22}
        />
        <Collapsible
          trigger={
            <SvgIcon
              name="EllipsisVertical"
              className="hover:cursor-pointer size-7 mt-2"
            />
          }
          triggerClassName="cursor-pointer focus:outline-none"
          className="relative"
          contentClassName="absolute top-10 right-0"
        >
          <div className="z-10 border bg-white border-gray-light dark:border-gray-dark dark:bg-dark-body-bg rounded-md p-0 w-36 text-left divide-y divide-gray-light dark:divide-gray-dark overflow-hidden relative">
            <a className="group items-center flex hover:cursor-pointer justify-between rounded-lg px-2 py-2.5 text-xs font-bold text-tertiary-dark dark:text-tertiary-light hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark">
              <span className="flex gap-x-3 items-center">
                <SvgIcon width={24} height={24} name="EyeClosed" /> Inactive
              </span>
            </a>
            <a className="group items-center hover:cursor-pointer flex justify-between px-2 py-2 text-xs font-bold text-tertiary-dark dark:text-tertiary-light hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark">
              <span className="flex gap-x-3 items-center">
                <SvgIcon name="CopyIcon" width={24} height={24} /> Clone
              </span>
            </a>
            <a className="group items-center hover:cursor-pointer flex justify-between px-2 py-2 text-xs font-bold text-tertiary-dark dark:text-tertiary-light hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark">
              <span className="flex gap-x-3 items-center">
                <SvgIcon name="HistoryIcon" width={24} height={24} /> History
              </span>
            </a>
          </div>
        </Collapsible>
      </div>
    ),
  },
];

export const downloadCSV = (data: any[], filename: string) => {
  // Get visible columns (excluding action column and handling nested structures)
  const columns = sampleColumns
    .filter((col: any) => col.id !== "action" && col.id !== "productImage")
    .map((col: any) => col.accessorKey);

  // Flatten nested data
  const flattenData = (items: any[]): any[] => {
    return items.reduce((acc: any[], item: any) => {
      // Create a flat object without unwanted fields
      const flatItem = { ...item };
      delete flatItem.subRows;
      delete flatItem.expandable;
      delete flatItem.customContent;
      delete flatItem.productImage;

      acc.push(flatItem);

      // Recursively process subRows if they exist
      if (item.subRows && Array.isArray(item.subRows)) {
        const flattenedSubRows = flattenData(item.subRows);
        acc.push(...flattenedSubRows);
      }

      return acc;
    }, []);
  };

  const flatData = flattenData(data);
  // Create CSV header
  const header = columns.join(",") + "\n";

  // Create CSV rows
  const csvRows = flatData.map((row) => {
    return columns
      .map((col: any) => {
        const value = row[col];
        // Handle values that might contain commas or quotes
        if (
          typeof value === "string" &&
          (value.includes(",") || value.includes('"'))
        ) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      })
      .join(",");
  });

  // Combine header and rows
  const csvString = header + csvRows.join("\n");

  // Create blob and download
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const DateTimeFormat = (
  value: string | number | Date,
  DateFormat: string = "MM/dd/yyyy"
) => {
  return {
    date: format(new Date(value), DateFormat),
    time: format(new Date(value), "hh:mm a"),
  };
};

// Add custom debounce hook
export const useDebounce = (value: string, delay: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
export const getFilterOption = <T,>(
  name: string,
  columnName: string,
  type: string,
  options: T[] = [],
  conditionalSearch: boolean = false
) => ({
  name,
  columnName,
  options,
  type,
  ...(conditionalSearch && { conditionalSearch }),
});

export const calculateVolume = (
  length: number,
  width: number,
  height: number
): number => {
  const l = length;
  const w = width;
  const h = height;

  if (isNaN(l) || isNaN(w) || isNaN(h)) {
    return 0;
  }

  return l * w * h;
};

export const generateRange = (start: number, len: number) => {
  return Array.from({ length: len }, (_, index) => start + index);
};

const getMultiSelectFilteredData = (
  data: IDropdownOption[],
  values: string[]
) => {
  const filteredData = data.filter((item) => {
    return values.includes(item.value.toString());
  });
  return filteredData.length > 0 ? filteredData : null;
};

const getSingleSelectFilteredData = (
  data: IDropdownOption[],
  value: string
) => {
  const filteredData = data.find((item) => {
    return item.value.toString() === value;
  });
  return filteredData || null;
};

export { getMultiSelectFilteredData, getSingleSelectFilteredData };
