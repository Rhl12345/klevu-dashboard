import { IBrand } from "@/types/master-product-feed-setting/masterProductFeedSetting.type";

export interface ISectionProps {
  moduleName: string;
  options: IBrand[] | { label: string; value: string; }[];
  id: string;
}   