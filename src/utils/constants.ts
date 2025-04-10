import { PageRoutes } from "@/admin-pages/routes";
import { IconName } from "@/components/SvgIcons/types";
import { ITabOption } from "@/components/Tab/types";
import { ISortOption } from "@/types/product-seo-requirement/productSeoRequirement.type";
import { IFontConfigType } from "@/types/theme-configuration/themeConfiguration.type";
import { NumericList } from "@/utils/helpers";
import { STATUS_OPTIONS } from "@/utils/Dummy";

export const DEFAULT_NOT_FOUND_IMAGE = `https://placehold.co/600x400?text=Image+Not+Found`;

export const DEFAULT_FALLBACK_IMAGE = `https://placehold.co/400x400?text=Fallback+Image`;

export const defaultImage = `https://redefinecommerce.blob.core.windows.net/images/common/default.png`;

export const DEBOUNCE_DELAY = 1000;

export const PaginationOptions = [
  {
    value: 25,
    label: "25 Per Pages",
  },
  {
    value: 50,
    label: "50 Per Pages",
  },
  {
    value: 100,
    label: "100 Per Pages",
  },
];

export const paginationDetails: {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  hasPageSize: boolean;
} = {
  pageIndex: 1,
  pageSize: 25,
  totalCount: 0,
  hasPreviousPage: false,
  hasNextPage: false,
  hasPageSize: true,
};

export const RecStatusValuebyName = {
  Active: "A",
  Inactive: "I",
  Draft: "D",
  Pending: "P",
  Archived: "R",
  Scheduled: "S",
  Expired: "E",
  NavSync: "S",
  Disapproved: "X",
  Cancelled: "Cancelled",
  Fraud: "Fraud",
  Paid: "P",
  FulFilled: "F",
  Unfulfilled: "U",
  Cloned: "C",
};

export const RecStatusValueName = {
  Active: "Active",
  Inactive: "Inactive",
  Draft: "Draft",
  Pending: "Pending",
  Archived: "Archived",
  Scheduled: "Scheduled",
  Expired: "Expired",
  Paid: "Paid",
  Unfulfilled: "Unfulfilled",
  FulFilled: "FulFilled",
  Approved: "Approved",
  Disapproved: "Disapproved",
  Approve: "Approve",
  Reject: "Reject",
  Subscribed: "Subscribed",
  Unsubscribed: "Unsubscribed",
  Cloned: "Cloned",
  Inprogress: "Inprogress",
};

export const companyEditTabs: ITabOption[] = [
  {
    id: 0,
    label: "Company Details",
    icon: "CompanyDetails",
  },
  {
    id: 2,
    label: "Products",
    icon: "archive-box",
  },
  {
    id: 3,
    label: "Notes",
    icon: "Notes",
  },

  {
    id: 4,
    label: "Custom Logo",
    icon: "store",
  },
  {
    id: 5,
    label: "Users",
    icon: "user-account",
  },
  {
    id: 6,
    label: "Abounded Cart",
    icon: "shopping-cart-alert",
  },
  {
    id: 7,
    label: "Consultation Request",
    icon: "document-invoice",
  },
  {
    id: 8,
    label: "Life Cycle",
    icon: "store",
  },
];
export const customerProductTab = [
  {
    id: 0,
    label: "Purchased",
    value: "Purchased",
    componentName: "purchased",
  },
  {
    id: 1,
    label: "Added to cart",
    value: "cart",
    componentName: "cart",
  },

  {
    id: 2,
    label: "Viewed",
    value: "Viewed",
    componentName: "viewed",
  },
  {
    id: 3,
    label: "All Products",
    value: "AllProducts",
    componentName: "allProducts",
  },
  {
    id: 4,
    label: "Wishlist",
    value: "Wishlist",
    componentName: "wishlist",
  },
];

export const contentBuilderTab = [
  {
    id: 0,
    label: "Landing Page",
    value: "LandingPage",
    componentName: "LandingPage",
  },
  {
    id: 1,
    label: "Website Page",
    value: "WebsitePage",
    componentName: "WebsitePage",
  },

  {
    id: 2,
    label: "Blog",
    value: "Blog",
    componentName: "Blog",
  },
];

export const contentBuilderEditTabs = [
  {
    id: 0,
    label: "Content Builder",
    value: "ContentBuilder",
    componentName: "ContentBuilder",
  },
  {
    id: 2,
    label: "Publishing Options",
    value: "PublishingOptions",
    componentName: "PublishingOptions",
  },
];
export const countryOptions = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
];

export const stateOptions = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "Other", label: "Other" },
  { value: "AB", label: "Alberta" },
  { value: "BC", label: "British Columbia" },
  { value: "MB", label: "Manitoba" },
  { value: "NB", label: "New Brunswick" },
  { value: "NL", label: "Newfoundland and Labrador" },
  { value: "NS", label: "Nova Scotia" },
  { value: "NT", label: "Northwest Territories" },
  { value: "NU", label: "Nunavut" },
  { value: "ON", label: "Ontario" },
  { value: "PE", label: "Prince Edward Island" },
  { value: "QC", label: "Quebec" },
  { value: "SK", label: "Saskatchewan" },
  { value: "YT", label: "Yukon" },
  { value: "Other", label: "Other" },
  { value: "Other", label: "Other" },
];

export const DropdownConfigs = [
  {
    name: "pFontFamily",
    label: "Font Family",
    options: [], // Add font family options
  },
  {
    name: "pFontSize",
    label: "Font Size",
    options: NumericList(12, 50, 1),
  },
  {
    name: "pFontWeight",
    label: "Font Weight",
    options: NumericList(100, 900, 100),
  },
  {
    name: "pLineHeight",
    label: "Line Height",
    options: NumericList(1, 3, 1),
  },
  {
    name: "pLetterSpacing",
    label: "Letter Spacing",
    options: NumericList(0, 10, 1),
  },
];

export const fontConfig: IFontConfigType = {
  WEIGHT: [100, 900, 100].map((weight) => ({
    value: weight,
    label: weight.toString(),
  })),
  SIZE: [12, 18, 14, 16].map((size) => ({
    value: size.toString(),
    label: `${size}px`,
  })),
  LINE_HEIGHT: [1, 3, 0.1].map((height) => ({
    value: height,
    label: height.toString(),
  })),
  LETTER_SPACING: [0, 10, 0.5].map((spacing) => ({
    value: spacing,
    label: `${spacing}px`,
  })),
};

export const STATUS_VALUES = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const DEFAULT_PAGE_SIZE = 25;

export const userNameValues = [
  {
    value: "133",
    label: "Aakash  Chaudhary",
  },
  {
    value: "93",
    label: "Alex Alutto",
  },
  {
    value: "82",
    label: "Alex Dumais",
  },
  {
    value: "47",
    label: "Alex Pohl",
  },
  {
    value: "40",
    label: "Alexis Bernard",
  },
  {
    value: "24",
    label: "Allysa Beaton",
  },
  {
    value: "4",
    label: "Alpesh Prajapati",
  },
  {
    value: "44",
    label: "Amanda Rosenberg",
  },
];

export enum PasswordStrengthType {
  NOT_SET = "NOT_SET",
  FAIR = "FAIR",
  GOOD = "GOOD",
  STRONG = "STRONG",
}

export const passwordStrengthTypeLabels: Record<PasswordStrengthType, string> =
  {
    [PasswordStrengthType.NOT_SET]: "Not set",
    [PasswordStrengthType.FAIR]: "Fair",
    [PasswordStrengthType.GOOD]: "Good",
    [PasswordStrengthType.STRONG]: "Strong",
  };

export const PRODUCT_SEO_REQUIREMENT_INITIAL_SORTING: ISortOption[] = [
  { field: "storeName", direction: 0, priority: 0 },
  { field: "name", direction: 0, priority: 0 },
  { field: "percentage", direction: 0, priority: 0 },
  { field: "createdDate", direction: 0, priority: 0 },
  { field: "createdName", direction: 0, priority: 0 },
  { field: "modifiedDate", direction: 0, priority: 0 },
  { field: "modifiedName", direction: 0, priority: 0 },
  { field: "recStatus", direction: 0, priority: 0 },
];

export const PROFILE_PATHS = [
  `${PageRoutes.PROFILE.MY_ACCOUNT}`,
  `${PageRoutes.PROFILE.MY_NOTIFICATION}`,
  `${PageRoutes.PROFILE.ACTIVITY}`,
  `${PageRoutes.PROFILE.PERMISSION}`,
  `${PageRoutes.PROFILE.ACCOUNT_ACTVITY}`,
];
export const COLOR_CODES = [
  {
    code: "#86EFAC",
    name: "Mint Green",
  },
  {
    code: "#263CFF",
    name: "Royal Blue",
  },
  {
    code: "#B5BECC",
    name: "Light Gray",
  },
  {
    code: "#93C5FD",
    name: "Sky Blue",
  },
  {
    code: "#FDA4AF",
    name: "Salmon Pink",
  },
  {
    code: "#FDE047",
    name: "Yellow",
  },
  {
    code: "#7DD3FC",
    name: "Light Blue",
  },
  {
    code: "#BEF264",
    name: "Lime Green",
  },
  {
    code: "#FDBA74",
    name: "Light Orange",
  },
  {
    code: "#D8B4FE",
    name: "Lavender",
  },
  {
    code: "#F9A8D4",
    name: "Pink",
  },
  {
    code: "#67E8F9",
    name: "Cyan",
  },
  {
    code: "#FF6B6B",
    name: "Coral Red",
  },
  {
    code: "#4ECDC4",
    name: "Turquoise",
  },
  {
    code: "#9B59B6",
    name: "Purple",
  },
  {
    code: "#2ECC71",
    name: "Emerald",
  },
  {
    code: "#F1C40F",
    name: "Sunflower",
  },
  {
    code: "#E74C3C",
    name: "Crimson",
  },
  {
    code: "#34495E",
    name: "Midnight Blue",
  },
  {
    code: "#16A085",
    name: "Sea Green",
  },
  {
    code: "#8E44AD",
    name: "Deep Purple",
  },
  {
    code: "#D35400",
    name: "Burnt Orange",
  },
  {
    code: "#2C3E50",
    name: "Dark Navy",
  },
  {
    code: "#27AE60",
    name: "Nephritis Green",
  },
];

export const PRODUCT_TAB_OPTIONS = [
  {
    id: 0,
    label: "All",
  },
  {
    id: 1,
    label: "Active",
  },
  {
    id: 2,
    label: "Draft",
  },
  {
    id: 3,
    label: "Inactive",
  },
  {
    id: 4,
    label: "Synced with BC",
  },
  {
    id: 5,
    label: "Resync with BC",
  },
  {
    id: 6,
    label: "BC Sync Pending",
  },
];

export const AXIS_CLASSES =
  "text-quaternary-dark dark:text-quaternary-light fill-quaternary-dark dark:fill-quaternary-light";

const PAYMENT_OPTIONS = [
  { id: 1, name: "Budget" },
  { id: 2, name: "Purchase Order (PO)" },
  { id: 3, name: "Credit Card" },
  { id: 4, name: "Punchout Ariba" },
  { id: 5, name: "Punchout Coupa" },
  { id: 6, name: "Punchout To Go" },
  { id: 7, name: "Use Net" },
  { id: 8, name: "None" },
];

const CHILD_STORE_BRANDS = [
  {
    storeId: 186,
    storeName: "Shelley Fitzgerald",
    storeParentBrandViewModel: [{ id: 1, brandName: "Brand A" }],
  },
  {
    storeId: 207,
    storeName: "hiteshtest",
    storeParentBrandViewModel: [{ id: 2, brandName: "Brand B" }],
  },
  {
    storeId: 1323,
    storeName: "BigDealchild",
    storeParentBrandViewModel: [{ id: 3, brandName: "Brand C" }],
  },
  {
    storeId: 1324,
    storeName: "Corporate ssdsdsdsdsd",
    storeParentBrandViewModel: [{ id: 4, brandName: "Brand D" }],
  },
  {
    storeId: 1325,
    storeName: "testkaro",
    storeParentBrandViewModel: [{ id: 5, brandName: "Brand E" }],
  },
];

const STORE_TYPE_OPTIONS = [
  {
    value: "1",
    label: "Corporate Store",
  },
  {
    value: "2",
    label: "eCommerce Store",
  },
  {
    value: "5",
    label: "Form Builder",
  },
  {
    value: "3",
    label: "Store Builder",
  },
];

const SHIPPING_CHARGE_OPTIONS = [
  { value: "0", label: "None" },
  { value: "1", label: "Range" },
  { value: "2", label: "Fix Charges" },
  { value: "3", label: "Runtime Charges" },
];

enum LOGO_TYPE_LABELS {
  EMB = "DST File",
  PER = "DST File",
  ENG = "YPR File",
  DTH = "Transfer Proof",
}

export {
  CHILD_STORE_BRANDS,
  LOGO_TYPE_LABELS,
  PAYMENT_OPTIONS,
  SHIPPING_CHARGE_OPTIONS,
  STORE_TYPE_OPTIONS,
};

export const OG_TAGS_FIELD_CONSTRAINS = {
  title: 60,
  description: 120,
  image: 5 * 1024 * 1024,
};

export const PRODUCT_SEO_FIELDS_WORD_LIMIT = {
  PAGE_URL: {
    LIMIT: 160,
    MAX: 255,
  },

  PAGE_TILE: {
    LIMIT: 60,
    MAX: 72,
  },

  META_DESCRIPTION: {
    LIMIT: 155,
    MAX: 190,
  },

  META_KEYWORDS: {
    LIMIT: 7,
    MAX: 9,
  },

  ROI_KEYWORDS: {
    LIMIT: 3,
    MAX: 7,
  },

  TARGETED_KEYWORDS: {
    LIMIT: 3,
    MAX: 7,
  },

  OG_TITLE: {
    LIMIT: 60,
    MAX: 60,
  },

  OG_DESCRIPTION: {
    LIMIT: 155,
    MAX: 155,
  },
};

export const STORE_OPTIONS = [
  {
    label: "Store 1",
    value: "1",
  },
  {
    label: "Store 2",
    value: "2",
  },
];

export const CURRENCY_SYMBOLS_BY_CODE = {
  BRL: "R$",
  CAD: "CA$",
  CNY: "¥",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  KPW: "₩",
  KYD: "CI$",
  RUB: "₽",
  SGD: "S$",
  THB: "฿",
  USD: "$",
};

export const CATEGORY_OPTIONS = [
  {
    value: "5",
    label: "Accessories",
  },
  {
    value: "401",
    label: "BM 4585",
  },
  {
    value: "378",
    label: "Discontinue",
  },
  {
    value: "379",
    label: "Hip & Sling Bags",
  },
  {
    value: "2",
    label: "Men",
  },
  {
    value: "386",
    label: "newCategory",
  },
  {
    value: "385",
    label: "newCategory0014",
  },
  {
    value: "387",
    label: "newCategory0015",
  },
  {
    value: "381",
    label: "Other",
  },
  {
    value: "380",
    label: "Sale",
  },
  {
    value: "391",
    label: "tc",
  },
  {
    value: "396",
    label: "tc1",
  },
  {
    value: "402",
    label: "Test 11",
  },
  {
    value: "410",
    label: "Test 1234",
  },
  {
    value: "397",
    label: "Test C 1",
  },
  {
    value: "400",
    label: "Test C 2",
  },
  {
    value: "404",
    label: "Test Parent",
  },
  {
    value: "3",
    label: "Women",
  },
  {
    value: "8",
    label: "Youth",
  },
];

const EXPORT_TABS: ITabOption[] = [
  { id: 0, label: "Export Data" },
  { id: 1, label: "Export History" },
];

const EXPORT_BRANDS = [
  {
    value: "80",
    label: "3M Promotional Markets",
    childId: "1013",
  },
  {
    value: "81",
    label: "A T Cross Company",
  },
  {
    value: "164",
    label: "A4 Apparel",
  },
  {
    value: "82",
    label: "Acushnet Golf",
  },
  {
    value: "83",
    label: "Ad Bands",
  },
  {
    value: "4",
    label: "adidas",
  },
  {
    value: "84",
    label: "Agua Corp/ Towels & Textiles",
  },
  {
    value: "85",
    label: "Ahead LLC",
  },
  {
    value: "72",
    label: "Alphabroder",
  },
  {
    value: "86",
    label: "Alternative",
  },
  {
    value: "73",
    label: "American Magic/BMQR",
  },
  {
    value: "206",
    label: "Apex",
  },
  {
    value: "63",
    label: "ArcTeryx",
  },
  {
    value: "190",
    label: "Arctic Zone",
  },
  {
    value: "27",
    label: "ASICS",
  },
  {
    value: "33",
    label: "Augusta",
  },
  {
    value: "242",
    label: "avon",
  },
  {
    value: "208",
    label: "B. Draddy",
  },
  {
    value: "171",
    label: "Badger",
  },
  {
    value: "87",
    label: "Bag Makers Inc",
  },
  {
    value: "5",
    label: "BAUER",
  },
  {
    value: "88",
    label: "Bay State Specialty Co",
  },
  {
    value: "89",
    label: "BEL Promo",
  },
  {
    value: "195",
    label: "Belkin",
  },
  {
    value: "162",
    label: "Bella + Canvas",
  },
  {
    value: "64",
    label: "Berne Apparel",
  },
  {
    value: "90",
    label: "Bic Graphic",
  },
  {
    value: "91",
    label: "Blouin Display/MFB Holdings",
  },
  {
    value: "244",
    label: "Bogg Bag",
  },
  {
    value: "185",
    label: "Bose",
  },
  {
    value: "214",
    label: "Bridgestone Golf",
  },
  {
    value: "227",
    label: "Brooks Brothers",
  },
  {
    value: "197",
    label: "BruMate",
  },
  {
    value: "74",
    label: "Bullet Line LLC",
  },
  {
    value: "166",
    label: "Burnside",
  },
  {
    value: "92",
    label: "ButtonStar",
  },
  {
    value: "12",
    label: "Callaway Golf",
  },
  {
    value: "176",
    label: "Camelbak",
  },
  {
    value: "93",
    label: "Camp David Apparel",
  },
  {
    value: "240",
    label: "Campus",
  },
  {
    value: "36",
    label: "Carhartt",
  },
  {
    value: "94",
    label: "Century 21 Promotions",
  },
  {
    value: "95",
    label: "Charles River Apparel",
  },
  {
    value: "96",
    label: "Chocolate Inn/Taylor& Grant",
  },
  {
    value: "97",
    label: "CMC Design LLC",
  },
  {
    value: "25",
    label: "Columbia",
  },
  {
    value: "173",
    label: "Core 365",
  },
  {
    value: "179",
    label: "Corkcicle",
  },
  {
    value: "98",
    label: "Cornerstone Sign and Decal",
  },
  {
    value: "229",
    label: "Courant",
  },
  {
    value: "183",
    label: "Cross",
  },
  {
    value: "165",
    label: "Cutter and Buck",
  },
  {
    value: "239",
    label: "Davek Direct",
  },
  {
    value: "232",
    label: "Devon & Jones",
  },
  {
    value: "161",
    label: "Dickies",
  },
  {
    value: "54",
    label: "District Made",
  },
  {
    value: "203",
    label: "Dri Duck",
  },
  {
    value: "29",
    label: "Eddie Bauer",
  },
  {
    value: "175",
    label: "Ember",
  },
  {
    value: "99",
    label: "ETS Express Inc",
  },
  {
    value: "100",
    label: "Evans Manufacturing",
  },
  {
    value: "205",
    label: "Faherty Brand",
  },
  {
    value: "101",
    label: "Fairway & Greene",
  },
  {
    value: "102",
    label: "FIEL - Fairdeal Import & Export ",
  },
  {
    value: "184",
    label: "Field & Co",
  },
  {
    value: "103",
    label: "Fields Manufacturing, Inc",
  },
  {
    value: "167",
    label: "Flexfit",
  },
  {
    value: "3",
    label: "FootJoy",
  },
  {
    value: "222",
    label: "G/FORE",
  },
  {
    value: "178",
    label: "Galvin Green",
  },
  {
    value: "104",
    label: "Garyline",
  },
  {
    value: "105",
    label: "Gemini Line ",
  },
  {
    value: "106",
    label: "Gemline",
  },
  {
    value: "107",
    label: "Gilbane Building Company",
  },
  {
    value: "157",
    label: "Gildan",
  },
  {
    value: "151",
    label: "Glenbrae",
  },
  {
    value: "108",
    label: "Go East Promotions",
  },
  {
    value: "219",
    label: "Greyson",
  },
  {
    value: "109",
    label: "HandStands Promo Inc",
  },
  {
    value: "235",
    label: "Harriton",
  },
  {
    value: "6",
    label: "Helly Hansen",
  },
  {
    value: "201",
    label: "Herschel",
  },
  {
    value: "191",
    label: "High Sierra",
  },
  {
    value: "110",
    label: "High Sierra Sport Co",
  },
  {
    value: "111",
    label: "Hippo Displays",
  },
  {
    value: "112",
    label: "Hit Promotional Products",
  },
  {
    value: "43",
    label: "Holloway Sportswear",
  },
  {
    value: "113",
    label: "Hub Pen Co",
  },
  {
    value: "217",
    label: "Hydro Flask",
  },
  {
    value: "114",
    label: "iClick",
  },
  {
    value: "115",
    label: "IDProductsource",
  },
  {
    value: "182",
    label: "Igloo",
  },
  {
    value: "116",
    label: "Illini",
  },
  {
    value: "221",
    label: "Imperial Headwear",
  },
  {
    value: "247",
    label: "Jaanuu",
  },
  {
    value: "193",
    label: "JBL",
  },
  {
    value: "7",
    label: "johnnie-O",
  },
  {
    value: "238",
    label: "Jones Sport",
  },
  {
    value: "187",
    label: "JournalBooks",
  },
  {
    value: "202",
    label: "Klean Kanteen",
  },
  {
    value: "153",
    label: "KNACK",
  },
  {
    value: "216",
    label: "Kuhl",
  },
  {
    value: "21",
    label: "Lacoste",
  },
  {
    value: "117",
    label: "Lanco Corporation",
  },
  {
    value: "118",
    label: "Leeds",
  },
  {
    value: "237",
    label: "Legacy",
  },
  {
    value: "75",
    label: "Lemon & Line, LLC",
  },
  {
    value: "152",
    label: "Linksoul",
  },
  {
    value: "119",
    label: "Lion Circle ",
  },
  {
    value: "120",
    label: "Liqui-Mark Corp ",
  },
  {
    value: "246",
    label: "Lululemon",
  },
  {
    value: "180",
    label: "Marine Layer",
  },
  {
    value: "26",
    label: "Marmot",
  },
  {
    value: "220",
    label: "Matouk",
  },
  {
    value: "218",
    label: "Melin",
  },
  {
    value: "156",
    label: "Men's",
  },
  {
    value: "204",
    label: "Mercer-Mettle",
  },
  {
    value: "213",
    label: "Miir",
  },
  {
    value: "34",
    label: "Mizuno",
  },
  {
    value: "177",
    label: "Moleskine",
  },
  {
    value: "194",
    label: "Mophie",
  },
  {
    value: "207",
    label: "Nautica",
  },
  {
    value: "30",
    label: "New Era",
  },
  {
    value: "163",
    label: "Next Level",
  },
  {
    value: "11",
    label: "Nike",
  },
  {
    value: "121",
    label: "Nike USA",
  },
  {
    value: "210",
    label: "Nomadix",
  },
  {
    value: "23",
    label: "Oakley",
  },
  {
    value: "24",
    label: "OGIO",
  },
  {
    value: "230",
    label: "Osprey",
  },
  {
    value: "172",
    label: "Other",
  },
  {
    value: "122",
    label: "Ouellette Industries Inc",
  },
  {
    value: "76",
    label: "ParsonsKellogg",
  },
  {
    value: "1",
    label: "Patagonia",
  },
  {
    value: "170",
    label: "Pear Sox",
  },
  {
    value: "123",
    label: "Peerless Umbrella Co Inc",
  },
  {
    value: "47",
    label: "Pennant Sportswear",
  },
  {
    value: "2",
    label: "Peter Millar",
  },
  {
    value: "124",
    label: "PIM.TV",
  },
  {
    value: "125",
    label: "Pioneer Balloon Co",
  },
  {
    value: "159",
    label: "PORT and COMPANY",
  },
  {
    value: "160",
    label: "Port Authority",
  },
  {
    value: "126",
    label: "Prime Line",
  },
  {
    value: "14",
    label: "PUMA",
  },
  {
    value: "127",
    label: "Radians, Inc ",
  },
  {
    value: "243",
    label: "Renwick",
  },
  {
    value: "199",
    label: "Richardson",
  },
  {
    value: "186",
    label: "Rocketbook",
  },
  {
    value: "77",
    label: "SanMar",
  },
  {
    value: "128",
    label: "Showdown Displays",
  },
  {
    value: "129",
    label: "Sir Speedy / eLume Marketing",
  },
  {
    value: "189",
    label: "Skullcandy",
  },
  {
    value: "188",
    label: "Slowtide",
  },
  {
    value: "130",
    label: "SnugZ USA ",
  },
  {
    value: "78",
    label: "Soundview Millworks",
  },
  {
    value: "8",
    label: "Southern Tide",
  },
  {
    value: "131",
    label: "Spector & Co",
  },
  {
    value: "168",
    label: "Sportsman",
  },
  {
    value: "158",
    label: "SPORT-TEK",
  },
  {
    value: "209",
    label: "Spyder",
  },
  {
    value: "226",
    label: "Stanley",
  },
  {
    value: "154",
    label: "STATE Bags",
  },
  {
    value: "181",
    label: "Stio",
  },
  {
    value: "132",
    label: "Stone Enterprises Inc",
  },
  {
    value: "133",
    label: "Stormtech USA",
  },
  {
    value: "223",
    label: "Swannies",
  },
  {
    value: "174",
    label: "S'well",
  },
  {
    value: "231",
    label: "tasc Performance",
  },
  {
    value: "13",
    label: "TaylorMade",
  },
  {
    value: "236",
    label: "TC & B Corporate Wearables Inc",
  },
  {
    value: "134",
    label: "Tekweld",
  },
  {
    value: "233",
    label: "tentree",
  },
  {
    value: "215",
    label: "Tervis",
  },
  {
    value: "135",
    label: "The Magnet Group",
  },
  {
    value: "31",
    label: "The North Face",
  },
  {
    value: "228",
    label: "Therabody",
  },
  {
    value: "234",
    label: "Threadfast Apparel",
  },
  {
    value: "200",
    label: "Tile",
  },
  {
    value: "196",
    label: "Tingley Rubber",
  },
  {
    value: "28",
    label: "Titleist",
  },
  {
    value: "136",
    label: "Toddy Gear",
  },
  {
    value: "225",
    label: "Tommy Bahama",
  },
  {
    value: "155",
    label: "Tory Burch",
  },
  {
    value: "137",
    label: "TradeNet Publishing Inc",
  },
  {
    value: "169",
    label: "TravisMathew",
  },
  {
    value: "224",
    label: "TriDri",
  },
  {
    value: "211",
    label: "Tumi",
  },
  {
    value: "9",
    label: "Under Armour",
  },
  {
    value: "79",
    label: "Vanguard Visual Grafix",
  },
  {
    value: "10",
    label: "Vineyard Vines",
  },
  {
    value: "35",
    label: "Wilson",
  },
  {
    value: "138",
    label: "Wow Line",
  },
  {
    value: "20",
    label: "YETI",
  },
  {
    value: "198",
    label: "Yupoong",
  },
  {
    value: "15",
    label: "Zero Restriction",
  },
];

const EXPORT_VENDORS = [
  {
    value: "1013",
    label: "3M Promotional Markets",
  },
];

const EXPORT_TYPES = [
  {
    value: "productFeed",
    label: "Product Feed",
  },
];

const PRODUCT_STATUS_OPTIONS = [
  { value: "all", label: "All" },
  ...STATUS_OPTIONS,
  { value: "draft", label: "Draft" },
];

const STORE_STATUS_OPTIONS = [
  { value: "all", label: "All" },
  ...STATUS_OPTIONS,
  { value: "staging", label: "Staging" },
];

const CORE_EXPORT_TYPES = [
  {
    value: "Product",
    label: "Product",
  },
  {
    value: "OptionProduct",
    label: "OptionProduct",
  },
  {
    value: "Inventory",
    label: "Inventory",
  },
  {
    value: "Companion",
    label: "Companion",
  },
  {
    value: "Category",
    label: "Category",
  },
  {
    value: "FacetColor",
    label: "FacetColor",
  },
  {
    value: "FlyDate",
    label: "FlyDate",
  },
  {
    value: "Prices",
    label: "Prices",
  },
  {
    value: "UPC",
    label: "UPC",
  },
  {
    value: "AlterImage",
    label: "AlterImage",
  },
  {
    value: "ProductColor",
    label: "ProductColor",
  },
  {
    value: "LogoLocation",
    label: "LogoLocation",
  },
  {
    value: "ProductColorWithStores",
    label: "ProductColorWithStores",
  },
  {
    value: "CloneProductInStores",
    label: "CloneProductInStores",
  },
  {
    value: "MasterProductDescription",
    label: "MasterProductDescription",
  },
  {
    value: "ProductWithOptionDiscontinue",
    label: "ProductWithOptionDiscontinue",
  },
];

const STORE_EXPORT_TYPES = [
  {
    value: "StoreProduct",
    label: "StoreProduct",
  },
  {
    value: "LogoLocation",
    label: "LogoLocation",
  },
  {
    value: "Companion",
    label: "Companion",
  },
  {
    value: "MinimumQuantity",
    label: "MinimumQuantity",
  },
  {
    value: "StoreOptionProduct",
    label: "StoreOptionProduct",
  },
  {
    value: "StoreProductSeo",
    label: "StoreProductSeo",
  },
  {
    value: "StoreAlterImageTag",
    label: "StoreAlterImageTag",
  },
  {
    value: "StoreProductSeo",
    label: "StoreProductSeo",
  },
  {
    value: "StoreAlterImageTag",
    label: "StoreAlterImageTag",
  },
  {
    value: "StoreShortDescription",
    label: "StoreShortDescription",
  },
  {
    value: "StoreProductFlag",
    label: "StoreProductFlag",
  },
  {
    value: "StoreProductQuantityDiscount",
    label: "StoreProductQuantityDiscount",
  },
  {
    value: "StoreProductAlterImage",
    label: "StoreProductAlterImage",
  },
  {
    value: "StoreProductPrices",
    label: "StoreProductPrices",
  },
  {
    value: "StoreProductAlterImage",
    label: "StoreProductAlterImage",
  },
  {
    value: "StoreProductSizeChart",
    label: "StoreProductSizeChart",
  },
  {
    value: "StoreProductDescription",
    label: "StoreProductDescription",
  },
  {
    value: "StoreProductSizeChart",
    label: "StoreProductDescription",
  },
  {
    value: "StoreProductDraftOrStagingToActive",
    label: "StoreProductDraftOrStagingToActive",
  },
  {
    value: "StoreProductDraftOrStagingToActive",
    label: "StoreProductDraftOrStagingToActive",
  },
  {
    value: "StoreProductName",
    label: "StoreProductName",
  },
  {
    value: "StoreProductName",
    label: "StoreProductName",
  },
];

const PRODUCT_DISCONTINUE_OPTIONS = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "All",
    value: "all",
  },
  {
    label: "No",
    value: "no",
  },
];

const PRODUCT_SUB_TYPE_OPTIONS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Blank",
    value: "blank",
  },
  {
    label: "FG",
    value: "fg",
  },
];

const PRODUCT_FIELDS = [
  "SKU",
  "Name",
  "ProductType",
  "MSRP",
  "OurCost",
  "SalePrice",
  "Brand",
  "Vendor",
  "VendorSKU",
  "Category",
  "TaxCode",
  "NAVName",
  "Description",
  "ShortDescription",
  "SizeChart",
  "CompanionSKU",
  "LogoLocationCategory",
  "LogoLocations",
  "AttributeMapping",
  "Color",
  "ColorCode",
  "AttributeOptionSwatch",
  "FacetedColor",
  "SeasonalSku",
  "Attribute1",
  "Attribute1Suffix",
  "ALTImage1",
  "ALTImageTitle1",
  "ALTImage2",
  "ALTImageTitle2",
  "ALTImage3",
  "ALTImageTitle3",
  "ALTImage4",
  "ALTImageTitle4",
  "ALTImage5",
  "ALTImageTitle5",
  "ALTImage6",
  "ALTImageTitle6",
  "ProductId",
  "IsPersonalize",
  "Status",
  "IsNew",
  "IsDropShipper",
];

const OPTION_PRODUCT_FIELDS = [
  "ProductId",
  "VariantValueId",
  "Brand",
  "Name",
  "VariantValue",
  "VariantSKU",
  "VendorName",
  "Status",
  "VendorSKU",
  "VariantImageName",
  "VariantSwatchimage",
  "DisplayOrder",
  "UPC",
  "OptionStatus",
  "ParentSKU",
  "ProductOptionDiscontinueStatus",
  "SeasonalSKU",
  "ColorName",
];

const PRODUCT_COLORS = [
  "ProductID",
  "VariantValueID",
  "Brand",
  "Name",
  "ParentSKU",
  "VariantSKU",
  "VariantValue",
  "VariantDisplayOrder",
  "OptionStatus",
  "MainCategory",
  "SubCategory1",
  "SubCategory2",
  "Description",
];

const STORE_PRODUCT_COLORS = [
  "ProductId",
  "Name",
  "ParentSKU",
  "VariantValueID",
  "VariantValue",
  "VariantSKU",
  "SeasonSKU",
  "StoreName",
];

const PRODUCT_WITH_OPTION_DISCONTINUE = [
  "ProductId",
  "VariantValueId",
  "Brand",
  "Name",
  "VariantValue",
  "VariantSKU",
  "VendorName",
  "Status",
  "VendorSKU",
  "VariantImageName",
  "VariantSwatchimage",
  "DisplayOrder",
  "UPC",
  "OptionStatus",
  "ParentSKU",
  "ProductOptionDiscontinueStatus",
  "ProductDiscontinueStatus",
  "SeasonalSKU",
  "ColorName",
];

const STORE_PRODUCT_FIELDS = [
  "MainCategory",
  "SubCategory1",
  "SubCategory2",
  "Brand",
  "Vendor",
  "StoreName",
  "ProductId",
  "Name",
  "SKU",
  "UPC",
  "VendorSKU",
  "Weight",
  "MSRP",
  "OurPrice",
  "Cost",
  "Inventory",
  "Status",
  "Gender",
  "Description",
  "MinimumOrderQty",
  "IsNew",
  "IsDropShipper",
  "IsPersonalize",
  "CreatedOn",
  "QuantityDiscount",
  "ProductSubType",
];

const STORE_OPTION_PRODUCT_FIELDS = [
  "ProductId",
  "VariantValueId",
  "Brand",
  "Name",
  "VariantValue",
  "VariantSKU",
  "VendorName",
  "StoreName",
  "Status",
  "VendorSKU",
  "VariantImageName",
  "VariantSwatchimage",
  "DisplayOrder",
  "UPC",
  "OptionStatus",
  "Inventory",
  "ParentSKU",
  "ProductSubType",
  "ProductOptionDiscontinueStatus",
  "SeasonalSKU",
  "ColorName",
];

const STORE_EXPORT_BRANDS = [
  {
    value: "972",
    label: "Jones Sport",
  },
  {
    value: "973",
    label: "Other",
  },
  {
    value: "971",
    label: "Peter Millar",
  },
  {
    value: "974",
    label: "Stanley",
  },
  {
    value: "970",
    label: "tentree",
  },
  {
    value: "968",
    label: "The North Face",
  },
  {
    value: "969",
    label: "TravisMathew",
  },
];

const STORE_EXPORT_VENDORS = [
  {
    value: "2189",
    label: "Jones Sport",
  },
];

export {
  EXPORT_TABS,
  EXPORT_BRANDS,
  EXPORT_VENDORS,
  EXPORT_TYPES,
  CORE_EXPORT_TYPES,
  PRODUCT_FIELDS,
  PRODUCT_DISCONTINUE_OPTIONS,
  PRODUCT_SUB_TYPE_OPTIONS,
  OPTION_PRODUCT_FIELDS,
  PRODUCT_COLORS,
  STORE_PRODUCT_COLORS,
  PRODUCT_WITH_OPTION_DISCONTINUE,
  PRODUCT_STATUS_OPTIONS,
  STORE_PRODUCT_FIELDS,
  STORE_OPTION_PRODUCT_FIELDS,
  STORE_EXPORT_BRANDS,
  STORE_EXPORT_VENDORS,
  STORE_STATUS_OPTIONS,
};

export enum CONSULTATION_REQUEST_TABS_ID {
  ALL = 0,
  NEW = 1,
  IN_PROGRESS = 2,
  APPROVED = 3,
  JUNK = 4,
  REJECTED = 5,
}

export const CONSULTATION_REQUEST_TABS = [
  {
    id: CONSULTATION_REQUEST_TABS_ID.ALL,
    label: "All",
    value: "All",
  },
  {
    id: CONSULTATION_REQUEST_TABS_ID.NEW,
    label: "New",
    value: "New",
  },
  {
    id: CONSULTATION_REQUEST_TABS_ID.IN_PROGRESS,
    label: "In Progress",
    value: "Inprogress",
  },
  {
    id: CONSULTATION_REQUEST_TABS_ID.APPROVED,
    label: "Approved",
    value: "Approved",
  },
  {
    id: CONSULTATION_REQUEST_TABS_ID.JUNK,
    label: "Junk",
    value: "Junk",
  },
  {
    id: CONSULTATION_REQUEST_TABS_ID.REJECTED,
    label: "Rejected",
    value: "Reject",
  },
];
export const SOCIAL_MEDIA_OPTIONS: IconName[] = [
  "Facebook",
  "Twitter",
  "LinkedIn",
  "Pinterest",
];

const IMPORT_TABS: ITabOption[] = [
  { id: 0, label: "Import Data" },
  { id: 1, label: "Import History" },
];

export { IMPORT_TABS, STORE_EXPORT_TYPES };

export const STORE_BRAND_TABS: ITabOption[] = [
  { id: 0, label: "General", icon: "CompanyDetails" },
  { id: 1, label: "Promotional Products", icon: "shopping-cart-add" },
];

export const PRODUCT_MODAL_TABS: ITabOption[] = [
  { id: 0, label: "All Products", componentName: "AllProductsTab" },
  { id: 1, label: "Selected Products", componentName: "SelectedProductsTab" },
];

const LOGIN_BACKGROUND_IMAGE = `https://redefinecommerce.blob.core.windows.net/storagemedia/1/themeconfiguration/0.28291671310334543/LoginBackgroundUrl_2.png`;

const OTP_LENGTH = 6;

const TILL_ONE_DAY_EXPIRATION = 1000 * 60 * 60 * 24;

export { LOGIN_BACKGROUND_IMAGE, OTP_LENGTH, TILL_ONE_DAY_EXPIRATION };

export const STORE_CATEGORY_EDIT_TABS: ITabOption[] = [
  {
    id: 0,
    label: "General",
    icon: "CompanyDetails",
  },
  {
    id: 1,
    label: "Promotional Product",
    icon: "shopping-cart-add",
  },
];



