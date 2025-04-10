import { ISKUSwap } from "@/types/products-database/productDatabase.type";
import SkuSwap from "@/components/common/product/SkuSwap";

const SkuSwapTab = ({ initialData, productId }: ISKUSwap) => {
  return <SkuSwap initialData={initialData} productId={productId} />;
};

export default SkuSwapTab;
