import { PageRoutes } from "@/admin-pages/routes";
import { IStoreCardInfoProps } from "@/types/dashboard/dashboard.type";
const STORE_DASHBOARD_DATA = [
  {
    title: "Ecommerce",
    mainLink: PageRoutes.STORE.LIST,
    links: [
      {
        href: PageRoutes.MASTER_PRODUCT_FEED.PRODUCT_FEED.LIST,
        label: "Product",
        value: 18285,
      },

      {
        href: PageRoutes.BRAND.LIST,
        label: "Brand",
        value: 292,
      },

      {
        href: PageRoutes.VENDOR.LIST,
        label: "Vendor",
        value: 72,
      },
    ],
  },
  {
    title: "Corporate Store",
    mainLink: PageRoutes.STORE.LIST,
    links: [
      {
        href: PageRoutes.MASTER_PRODUCT_FEED.PRODUCT_FEED.LIST,
        label: "Product",
        value: 1503,
      },
      {
        href: PageRoutes.BRAND.LIST,
        label: "Brand",
        value: 222,
      },
      {
        href: PageRoutes.VENDOR.LIST,
        label: "Vendor",
        value: 37,
      },
    ],
  },
  {
    title: "Store Builder",
    mainLink: PageRoutes.STORE_BUILDER.LIST,
    links: [
      {
        href: PageRoutes.STORE_BUILDER.LIST,
        label: "Active",
        value: 6,
      },
      {
        href: PageRoutes.STORE_BUILDER.LIST,
        label: "INACTIVE",
        value: 1,
      },
      {
        href: PageRoutes.STORE_BUILDER.LIST,
        label: "TOTAL STORES",
        value: 7,
      },
    ],
  },
  {
    title: "Form Builder",
    mainLink: PageRoutes.FORM_BUILDER.LIST,
    links: [
      {
        href: PageRoutes.FORM_BUILDER.LIST,

        label: "INACTIVE",
        value: 105,
      },
      {
        href: PageRoutes.FORM_BUILDER.LIST,
        label: "TOTAL FORMS",
        value: 0,
      },
      {
        href: PageRoutes.FORM_BUILDER.LIST,
        label: "Vendor",
        value: 105,
      },
    ],
  },
];

const STORE_DASHBOARD_INFO: Record<string, IStoreCardInfoProps["value"]> = {
  Ecommerce: [
    {
      title: "Active Product",
      count: 15667,
      icon: "check-done",
    },
    {
      title: "InActive Product",
      count: 1405,
      icon: "uncheck",
    },

    {
      title: "Brand",
      count: 292,
      icon: "diamond-01",
    },

    {
      title: "Product Categories",
      count: 45,
      icon: "user-account",
    },

    {
      title: "Total Product",
      count: 18285,
      icon: "store",
    },
  ],
  "Corporate Store": [
    {
      title: "Active Product",
      count: 826,
      icon: "check-done",
    },
    {
      title: "InActive Product",
      count: 26,
      icon: "uncheck",
    },

    {
      title: "Brand",
      count: 222,
      icon: "diamond-01",
    },

    {
      title: "Product Categories",
      count: 93,
      icon: "user-account",
    },

    {
      title: "Total Product",
      count: 1503,
      icon: "store",
    },
  ],
  "Store Builder": [
    {
      title: "Active Store Builders",
      count: 6,
      icon: "check-done",
    },
    {
      title: "InActive Store Builders",
      count: 1,
      icon: "uncheck",
    },

    {
      title: "Brand",
      count: 45,
      icon: "diamond-01",
    },

    {
      title: "Product Categories",
      count: 86,
      icon: "user-account",
    },

    {
      title: "Total Store Builders",
      count: 7,
      icon: "store",
    },
  ],
  "Form Builder": [
    {
      title: "Active Product",
      count: 46,
      icon: "check-done",
    },
    {
      title: "InActive Product",
      count: 6,
      icon: "uncheck",
    },

    {
      title: "Brand",
      count: 96,
      icon: "diamond-01",
    },

    {
      title: "Product Categories",
      count: 612,
      icon: "user-account",
    },

    {
      title: "Total Product",
      count: 261,
      icon: "store",
    },
  ],
};

const STORE_SECTION = {
  Ecommerce: [
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
  ],
  "Corporate-Store": [
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
  ],
  "Store Builder": [
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
  ],
  "Form Builder": [
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
    {
      src: "/noImage.png",
      alt: "demo-image",
      name: "Corporate Gear",
    },
  ],
};

export { STORE_DASHBOARD_DATA, STORE_DASHBOARD_INFO, STORE_SECTION };
