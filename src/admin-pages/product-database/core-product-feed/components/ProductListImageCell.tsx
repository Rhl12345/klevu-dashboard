import { PageRoutes } from "@/admin-pages/routes";
import Image from "@/components/Image/Image";
import Text from "@/components/Text/Text";
import Link from "next/link";

export const ProductListImageCell = (value: string[], id: number) => {
  const defaultImage = "/default-image.jpg";
  const getEditUrl = (id: number) =>
    `${PageRoutes.MASTER_PRODUCT_FEED.CORE_PRODUCT_FEED.EDIT}${id}`;
  const MAX_VISIBLE_IMAGES = 3;

  // Handle empty or invalid value
  if (!value || value.length === 0) {
    return (
      <Link href={getEditUrl(id)}>
        <div className="h-14 w-14 flex items-center justify-center overflow-hidden box-content rounded-full border bg-white">
          <Image
            src={defaultImage}
            width={56}
            height={56}
            objectFit="cover"
            rounded="full"
          />
        </div>
      </Link>
    );
  }

  return (
    <div className="flex -space-x-9 items-center" style={{ width: "160px" }}>
      {value.slice(0, MAX_VISIBLE_IMAGES).map((imageUrl, index) => (
        <Link href={getEditUrl(id)} key={index}>
          <div className="h-14 w-14 flex items-center justify-center overflow-hidden box-content rounded-full border bg-white">
            <Image
              src={`https://storagemedia.corporategear.com${imageUrl}`}
              width={56}
              height={56}
              objectFit="cover"
              rounded="full"
            />
          </div>
        </Link>
      ))}

      {/* Show remaining count after MAX_VISIBLE_IMAGES */}
      {value && value.length > MAX_VISIBLE_IMAGES && (
        <div className="h-14 w-14 rounded-full box-content bg-gray-light dark:bg-gray-selected text-quaternary-dark dark:text-white flex items-center justify-center">
          {/* DOne: Add font-medium as needed */}
          <Text size="xs" className="font-medium">
            +{value.length - MAX_VISIBLE_IMAGES}
          </Text>
        </div>
      )}
    </div>
  );
};
