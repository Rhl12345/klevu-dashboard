import { IconName } from "@/components/SvgIcons/types";

interface IStoreLink {
  href: string;
  label: string;
  value: number | string;
}

interface IStoreCardProps {
  title: string;
  mainLink: string;
  links: IStoreLink[];
}

interface IStoreCardInfoExtraData {
  title: string;
  count: number;
  icon: IconName;
}

interface IStoreCardInfoProps {
  title: string;
  value: IStoreCardInfoExtraData[];
  extraData?: { [key: string]: IStoreCardInfoExtraData[] };
}

interface IStoreSectionProps {
  title: string;
  items: { src: string; alt: string; name: string }[];
}

interface IDashboardProps {
  storeSection: { [key: string]: IStoreSectionProps["items"] };
  storeDashboardData: IStoreCardProps[];
  storeDashboardInfo: { [key: string]: IStoreCardInfoProps["value"] };
  storeDashboardInfoExtra?: { [key: string]: IStoreCardInfoExtraData[] };
}

export type {
  IStoreSectionProps,
  IDashboardProps,
  IStoreCardProps,
  IStoreLink,
  IStoreCardInfoProps,
};
