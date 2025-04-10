import { STORE_TYPES } from "@/types/products-database/productDatabase.type";

// All Static Routes are defined here.
export const PageRoutes = {
  DASHBOARD: "/dashboard",
  COUPON_CODE: {
    LIST: "/admin/promotions/couponcode",
    CREATE: "/admin/promotions/couponcode/create",
    EDIT: "/admin/promotions/couponcode/edit/",
  },
  CONTENT_MANAGEMENT: {
    LIST: "/admin/content-management/content-builder",
    CREATE: "/admin/content-management/content-builder/create",
    EDIT: "/admin/content-management/content-builder/edit",
    STORY_CATEGORY: "/admin/content-management/story-category",
  },
  VENDOR: {
    LIST: "/admin/master-catalog/configuration/vendor",
    CREATE: "/admin/master-catalog/configuration/vendor/create",
    EDIT: "/admin/master-catalog/configuration/vendor/edit/",
  },

  PRODUCTATTRIBUTES: {
    LIST: "/admin/master-catalog/configuration/attributes",
    CREATE: "/admin/master-catalog/configuration/attributes/create",
    EDIT: "/admin/master-catalog/configuration/attributes/edit/",
  },
  BRAND: {
    LIST: "/admin/master-catalog/configuration/brand",
    CREATE: "/admin/master-catalog/configuration/brand/create",
    EDIT: "/admin/master-catalog/configuration/brand/edit/",
  },
  PAYMENT_TYPES: {
    LIST: "/admin/master-catalog/configuration/payment-types",
  },

  SHIPPING_METHOD: {
    LIST: "/admin/master-catalog/configuration/shipping-method",
  },
  SHIPPING_CARRIERS: {
    LIST: "/admin/master-catalog/configuration/shipping-carrier",
  },

  SIZE_MASTER: {
    LIST: "/admin/master-catalog/configuration/size-master",
    CREATE: "/admin/master-catalog/configuration/size-master/create",
    EDIT: "/admin/master-catalog/configuration/size-master/edit/",
  },
  CUSTOMER: {
    LIST: "/admin/customer/customer",
    CREATE: "/admin/customer/customer/create",
    EDIT: "/admin/customer/customer/edit/",
    DASHBOARD: "/admin/customer/dashboard/",
    QUOTE_LIST: "/admin/customer/quotecustomerlist",
    QUOTE_CREATE: "/admin/customer/quotecustomerlist/create",
    QUOTE_VIEW: "/admin/customer/quotecustomerlist/viewquote",
    QUOTE_EDIT: "/admin/customer/quotecustomerlist/editquote",
    ABANDONED_SHOPPING_CART_LIST: "/admin/customer/abandoned-shopping-cart",
    CONSULTATION_REQUEST_LIST: "/admin/customer/consultation-request",
  },
  PRODUCT_CATEGORY: {
    LIST: "/admin/master-catalog/configuration/category",
    CREATE: "/admin/master-catalog/configuration/category/create",
    EDIT: "/admin/master-catalog/configuration/category/edit/",
  },

  BRAND_NAME_FORMULA: {
    LIST: "/admin/master-catalog/configuration/formulabrandname",
    CREATE: "/admin/master-catalog/configuration/formulabrandname/create",
    EDIT: "/admin/master-catalog/configuration/formulabrandname/edit/",
  },
  ROLES: {
    LIST: "/admin/settings/roles",
    CREATE: "/admin/settings/roles/create",
    EDIT: "/admin/settings/roles/edit/",
  },
  USERS: {
    LIST: "/admin/settings/users",
    CREATE: "/admin/settings/users/create",
    EDIT: "/admin/settings/users/edit/",
  },
  STORE: {
    STORE: "/admin/stores",
    DASHBOARD: "/admin/stores/dashboard",
    LIST: "/admin/stores",
    CREATE: "/admin/stores/create",
    EDIT: "/admin/stores/edit/",
    CONFIGURATION: "/admin/stores/configuration/",
  },
  SIZE_CHART: {
    LIST: "/admin/master-catalog/configuration/size-chart",
    CREATE: "/admin/master-catalog/configuration/size-chart/create",
    EDIT: "/admin/master-catalog/configuration/size-chart/edit/",
  },
  PRODUCT_TIER: {
    LIST: "/admin/master-catalog/configuration/tier",
    CREATE: "/admin/master-catalog/configuration/tier/create",
    EDIT: "/admin/master-catalog/configuration/tier/edit/",
  },
  SPECIAL_REQUEST: {
    LIST: "/admin/customer/specialrequest",
  },
  COMPANY: {
    LIST: "/admin/customer/company",
    CREATE: "admin/customer/company/create",
    EDIT: "/admin/customer/company/edit/",
  },
  DISCOUNT_TABLES: {
    LIST: "/admin/master-catalog/configuration/discount-tables",
    CREATE: "/admin/master-catalog/configuration/discount-tables/create",
    EDIT: "/admin/master-catalog/configuration/discount-tables/edit/",
  },
  LOGO_LOCATION: {
    CREATE: "/admin/master-catalog/configuration/logo-location/create",
    LIST: "/admin/master-catalog/configuration/logo-location",
    EDIT: "/admin/master-catalog/configuration/logo-location/edit/",
  },
  CONTACT_US: {
    LIST: "/admin/customer/contactus",
  },
  DIMENSIONS: {
    LIST: "/admin/master-catalog/configuration/dimensions",
    CREATE: "/admin/master-catalog/configuration/dimensions/create",
    EDIT: "/admin/master-catalog/configuration/dimensions/edit/",
  },
  GIFT_CARD: {
    LIST: "/admin/customer/gift-card",
  },
  WIDGET_MODULE: {
    LIST: "/admin/configurator/widgetmodule",
  },
  THEME_CONFIGURATION: {
    LIST: "/admin/configurator/themeconfiguration",
  },
  STORE_BUILDER: {
    LIST: `/admin/stores/${STORE_TYPES.STORE_BUILDER}/pk-stores/store`,
  },

  FORM_BUILDER: {
    LIST: `/admin/stores/${STORE_TYPES.FORM_BUILDER}/pk-forms/store`,
  },

  CUSTOMER_APPLICATION_LIST: {
    LIST: "/admin/customer/customerapplicationlist",
  },
  ACCOUNT_SETTINGS: {
    LIST: "/admin/configurator/settings",
  },
  GROUP_DESCRIPTION: {
    LIST: "/admin/master-catalog/configuration/groupdescription",
  },
  PRODUCT_REQUIREMENT: {
    LIST: "/admin/master-catalog/configuration/product-requirement",
    CREATE: "/admin/master-catalog/configuration/product-requirement/create",
    EDIT: "/admin/master-catalog/configuration/product-requirement/edit/",
  },
  THREAD_BRAND: {
    LIST: "/admin/master-catalog/configuration/threadbrand",
  },
  PAGE_REDIRECT: {
    LIST: "/admin/master-catalog/configuration/page-redirect",
    CREATE: "/admin/master-catalog/configuration/page-redirect/create",
    EDIT: "/admin/master-catalog/configuration/page-redirect/edit/",
  },

  THIRD_PARTY_SERVICE: {
    LIST: "/admin/configurator/thirdpartyservices",
    CREATE: "/admin/configurator/thirdpartyservices/create",
    EDIT: "/admin/configurator/thirdpartyservices/edit",
  },
  MODULES: {
    LIST: "/admin/configurator/modules",
  },
  COLORS: {
    LIST: "/admin/master-catalog/configuration/colors",
  },
  FORMULA_BRAND_NAME: {
    LIST: "/admin/master-catalog/configuration/formulabrandname",
    CREATE: "/admin/master-catalog/configuration/formulabrandname/create",
    EDIT: "/admin/master-catalog/configuration/formulabrandname/edit/",
  },
  SETTINGS: {
    DASHBOARD: "/admin/settings/dashboard",
  },
  SYSTEM_LOG: {
    LIST: "/admin/settings/system/log",
  },
  ACCOUNT_ACTIVITY: {
    LIST: "/admin/settings/account/activity",
  },
  PRODUCT_ATTRIBUTES: {
    LIST: "/admin/master-catalog/configuration/attributes",
  },
  FIX_CHARGES: {
    LIST: "/admin/master-catalog/configuration/fix-charges",
  },
  PRODUCT_TAG_MASTER: {
    LIST: "/admin/master-catalog/configuration/product-tag-master",
  },
  THREAD_GROUP_COLOR: {
    LIST: "/admin/master-catalog/configuration/threadgroupcoloroption",
  },
  NAV_SKU_MAPPING: {
    LIST: "/admin/master-catalog/configuration/nav-sku-mapping",
  },

  EMAIL_TEMPLATE: {
    LIST: "/admin/master-catalog/configuration/email-template",
  },
  MANAGE_BULK_TIER: {
    LIST: "/admin/customer/manage-bulk-tier",
  },
  ORDERS: {
    LIST: "/admin/order/orders",
    DASHBOARD: "/admin/order/dashboard",
    EDIT: "/admin/order/orders/edit/:orderId",
    PHONE_ORDER: "/admin/order/phone",
  },

  COMPANY_CONFIGURATION: {
    LIST: "/admin/configurator/companyconfiguration",
    CREATE: "/admin/configurator/companyconfiguration/create",
    EDIT: "/admin/configurator/companyconfiguration/edit/",
  },
  SEO_REQUIREMENT: {
    LIST: "/admin/master-catalog/configuration/seo-requirement",
    CREATE: "/admin/master-catalog/configuration/seo-requirement/create",
    EDIT: "/admin/master-catalog/configuration/seo-requirement/edit/",
  },

  NAVIGATION: {
    CREATE: "/admin/configurator/modules/navigation/create",
    EDIT: "/admin/configurator/modules/navigation/edit/",
  },
  MODULE: {
    CREATE: "/admin/configurator/modules/create",
    EDIT: "/admin/configurator/modules/edit/",
  },
  PROFILE: {
    MY_ACCOUNT: "/admin/settings/user/profile/my-account",
    MY_NOTIFICATION: "/admin/settings/user/profile/my-notification",
    ACTIVITY: "/admin/settings/user/profile/activity",
    PERMISSION: "/admin/settings/user/profile/permission",
    ACCOUNT_ACTVITY: "/admin/settings/user/profile/account/activity",
  },
  MESSAGES: {
    LIST: "/admin/master-catalog/configuration/messages",
  },
  MASTER_PRODUCT_FEED: {
    DASHBOARD: "/admin/master-catalog/dashboard",
    PRODUCT_FEED: {
      LIST: "/admin/master-catalog/product-feed",
      CREATE: "/admin/master-catalog/product-feed/create",
      EDIT: "/admin/master-catalog/product-feed/edit/",
      EXPORT: "/admin/master-catalog/product-feed/export",
      IMPORT: "/admin/master-catalog/product-feed/import",
    },
    CORE_PRODUCT_FEED: {
      LIST: "/admin/master-catalog/core-product-feed",
      CREATE: "/admin/master-catalog/core-product-feed/create",
      EDIT: "/admin/master-catalog/core-product-feed/edit/",
      EXPORT: "/admin/master-catalog/core-product-feed/export",
      IMPORT: "/admin/master-catalog/core-product-feed/import",
      MANUAL_BRAND_INVENTORY:
        "/admin/master-catalog/core-product-feed/manual-brand-inventory",
    },
    CLEAR_CACHE: "/admin/master-catalog/setting/clear-cache",
  },
  SHIPPING_COST: {
    LIST: "/admin/master-catalog/configuration/shipping-charges",
    CREATE: "/admin/master-catalog/configuration/shipping-charges/create",
    EDIT: "/admin/master-catalog/configuration/shipping-charges/edit/",
  },

  REPORTS: {
    LIST: "/admin/reports",
    LOW_INVENTORY: "/admin/reports/low-inventory",
    ITEM_SALE_BY_MARKETS: "/admin/reports/item-sale-by-market",
    ORDER_STATE_TAX_REPORT: "/admin/reports/order-state-tax-report",
    ORDER_NUMBER_SALE_TAX_REPORT: "/admin/reports/order-number-sale-tax-report",
    REVENUE_SUMMARY: "/admin/reports/revenue-summary",
    SALES_SUMMARY_BY_STORE_SHIPPED_DATE:
      "/admin/reports/sales-summary-by-store-shipped-date",
    VENDORWISE_PRODUCT_REPORT: "/admin/reports/vendorwise-product-report",
    PRODUCT_STATUS_REPORT: "/admin/reports/product-status-report",
    MAIL_LOG: "/admin/reports/mail-log",
    BRAND_WISE_PRODUCT_REPORT: "/admin/reports/brand-wise-product-report",
    BUSINESS_INTELLIGENCE: "/admin/reports/business-intelligence",
    MASTER_PRODUCT_INVENTORY_REPORT:
      "/admin/reports/master-product-inventory-report",
    ORDER_STATISTICS: "/admin/reports/order-statistics",
    INQUIRIES_LIST_REPORT: "/admin/reports/inquiries-list-report",
    SALES_SUMMARY_BY_STORE: "/admin/reports/sales-summary-by-store",
    ORDER_BENEFICIAL_REPORT: "/admin/reports/order-beneficial-report",
    PRODUCT_SUMMARY: "/admin/reports/product-summary",
    PRODUCT_CALCULATION_REPORT: "/admin/reports/product-calculation-report",
    COMPARATIVE_SALES_REPORT: "/admin/reports/comparative-sales-report",
    TOP_100_SELLING_PRODUCTS: "/admin/reports/top-100-selling-products",
    PRODUCT_LISTING_REPORT: "/admin/reports/product-listing-report",
  },
  NEWS_LETTER: {
    LIST: "/admin/master-catalog/configuration/news-letter",
  },
  SEO_CONFIGURATOR: {
    CREATE_EDIT: "/admin/configurator/seo-configuration",
  },
  BRAND_MASTER: {
    LIST: (storeType: string, storeName: string) =>
      `/admin/stores/${storeType}/${storeName}/brand-master`,
    EDIT: (storeType: string, storeName: string) =>
      `/admin/stores/${storeType}/${storeName}/brand-master/edit/`,
  },
  FORGOT_PASSWORD: "/forgot-password",
  LOGIN: "/login",
  RESET_PASSWORD: "/reset-password",
  TWO_FACTOR_AUTHENTICATION: "/two-factor-authentication",
};

export const BLANK_LAYOUT_ROUTES = [
  PageRoutes.CONTENT_MANAGEMENT.EDIT,
  PageRoutes.LOGIN,
  PageRoutes.FORGOT_PASSWORD,
  PageRoutes.RESET_PASSWORD,
  PageRoutes.TWO_FACTOR_AUTHENTICATION,
];
