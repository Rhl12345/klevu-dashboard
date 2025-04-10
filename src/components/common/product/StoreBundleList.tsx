import Image from "@/components/Image/Image";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Text from "@/components/Text/Text";
import { IStoreBundle } from "@/types/product/product.type";
import { useMemo, useState } from "react";

const StoreBundleList = ({
  data,
  type,
}: {
  data: IStoreBundle[];
  type: string;
}) => {
  const [storeSearchQuery, setStoreSearchQuery] = useState("");

  const storeBundles = useMemo(() => {
    const filteredStoreBundles: IStoreBundle[] = [];
    data.forEach((item) => {
      const filteredStore = item.list.filter((str) =>
        str.name.toLowerCase().includes(storeSearchQuery.toLowerCase())
      );
      if (filteredStore.length > 0) {
        filteredStoreBundles.push({ ...item, list: filteredStore });
      }
    });
    return filteredStoreBundles;
  }, [storeSearchQuery, data]);

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder={`Search ${type}`}
        value={storeSearchQuery}
        onChange={(e) => setStoreSearchQuery(e.target.value)}
        formik={false}
      />

      {storeBundles.length ? (
        storeBundles.map((storeBundle) => (
          <div className="flex flex-col gap-2 mb-2" key={storeBundle.typeId}>
            <Label>{storeBundle.type}</Label>
            <ul className="flex flex-col gap-2">
              {storeBundle.list.map((str) => (
                <li key={str.id} className="">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex w-full gap-2 relative items-center overflow-hidden">
                      <span className="absolute top-0 bottom-0 my-auto left-0 bg-green-500 text-white rounded-full text-center w-2 h-2 items-center inline-flex mr-1">
                        &nbsp;
                      </span>
                      <div className="h-12 w-16 flex items-center justify-center overflow-hidden rounded-none pl-4">
                        <div className="h-12 w-16 p-2 flex justify-center items-center border border-gray-light dark:border-gray-dark bg-white dark:bg-body-dark">
                          <div className="flex justify-center items-center">
                            <Image
                              variant="next"
                              className="max-w-full max-h-full rounded-none"
                              src={str.imageUrl}
                              alt={`${str.name} logo`}
                              width={16}
                              height={16}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-[calc(100%-5rem)]">
                        <Text
                          weight="font-normal"
                          className="w-full"
                          innerClass="overflow-hidden truncate"
                        >
                          {str.name}
                        </Text>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className="text-danger text-center py-4">No Data found</div>
      )}
    </div>
  );
};

export default StoreBundleList;
