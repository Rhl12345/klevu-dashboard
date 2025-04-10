export const COMPANY_STATS = {
  active: 0,
  inactive: 0,
  total: 0,
};

export const COUNTRY_DATA = [
  { location: "California", value: 120 },
  { location: "Texas", value: 95 },
  { location: "New York", value: 85 },
  { location: "Florida", value: 75 },
  { location: "Illinois", value: 65 },
  { location: "Pennsylvania", value: 70 },
  { location: "Ohio", value: 60 },
  { location: "Georgia", value: 80 },
  { location: "North Carolina", value: 90 },
  { location: "Michigan", value: 55 },
  { location: "Virginia", value: 55 },
  { location: "Louisiana", value: 55 },
  { location: "Arizona", value: 55 },
  { location: "Colorado", value: 55 },
  { location: "Minnesota", value: 55 },
  { location: "Nebraska", value: 55 },
  { location: "Oklahoma", value: 55 },
  { location: "Tennessee", value: 55 },
  { location: "Wisconsin", value: 55 },
  { location: "Wyoming", value: 55 },
  { location: "Connecticut", value: 55 },
  { location: "Delaware", value: 55 },
  { location: "Hawaii", value: 55 },
  { location: "Idaho", value: 0 },
  { location: "Indiana", value: 55 },
  { location: "Iowa", value: 55 },
  { location: "Kansas", value: 55 },
  { location: "Kentucky", value: 55 },
  { location: "Maine", value: 55 },
  { location: "Maryland", value: 55 },
  { location: "Massachusetts", value: 55 },
];

export const REVENUE_STATS = {
  ecommerce: {
    orderTotal: "15.00",
    revenue: "20.00",
  },
  corporateStore: {
    orderTotal: "10.00",
    revenue: "15.00",
  },
  storeBuilder: {
    orderTotal: "25.00",
    revenue: "20.00",
  },
};

export const STORE_OPTIONS = [
  { label: "All Stores", value: "all" },
  { label: "PK Stores", value: "pk" },
];

export const STORE_DURATON = [
  { label: "Last 24 Hours", value: "24h" },
  { label: "Last 48 Hours", value: "48h" },
];

export const REVIEWS_DATA = [
  {
    productName: "Wireless Headphones",
    storeName: "Electronics Hub",
    time: "2024-03-20 14:30",
    reviewer: "John Smith",
    review: "Great sound quality and comfortable fit",
    rating: "4.5/5",
    status: "Approved",
  },
  {
    productName: "Smart Watch Pro",
    storeName: "Tech Zone",
    time: "2024-03-20 13:15",
    reviewer: "Emma Wilson",
    review: "Battery life could be better, but overall good product",
    rating: "4/5",
    status: "Approved",
  },
  {
    productName: "Coffee Maker",
    storeName: "Home Essentials",
    time: "2024-03-20 12:45",
    reviewer: "Michael Brown",
    review: "Makes perfect coffee every time",
    rating: "5/5",
    status: "Approved",
  },
  {
    productName: "Running Shoes",
    storeName: "Sports World",
    time: "2024-03-20 11:30",
    reviewer: "Sarah Johnson",
    review: "Very comfortable for long runs",
    rating: "4.5/5",
    status: "Pending",
  },
  {
    productName: "Laptop Stand",
    storeName: "Office Supplies",
    time: "2024-03-20 10:20",
    reviewer: "David Lee",
    review: "Improved my posture while working",
    rating: "4/5",
    status: "Approved",
  },
];

export const REVIEWS_CHART_DATA = [
  {
    name: "5 Stars",
    value: 425,
    percentage: "38.6%",
    color: "#22c55e",
  },
  {
    name: "4 Stars",
    value: 320,
    percentage: "29.1%",
    color: "#84cc16",
  },
  {
    name: "3 Stars",
    value: 180,
    percentage: "16.4%",
    color: "#eab308",
  },
  {
    name: "2 Stars",
    value: 85,
    percentage: "7.7%",
    color: "#f97316",
  },
  {
    name: "1 Star",
    value: 90,
    percentage: "8.2%",
    color: "#ef4444",
  },
];

export const TOP_CUSTOMERS_DATA = [
  {
    id: 1,
    name: "John Smith",
    profit: 12500.75,
  },
  {
    id: 2,
    name: "Emma Wilson",
    profit: 11200.5,
  },
  {
    id: 3,
    name: "Michael Chen",
    profit: 9800.25,
  },
  {
    id: 4,
    name: "Sarah Johnson",
    profit: 8950.6,
  },
  {
    id: 5,
    name: "David Brown",
    profit: 7800.3,
  },
];

export const FREQUENT_CUSTOMERS_DATA = [
  {
    name: "John Smith",
    email: "john.smith@email.com",
    tags: "VIP, Regular",
    lastOrderDate: "2024-03-15",
    orderCount: 45,
    totalSpent: 3750.0,
    status: "Active",
  },
  {
    name: "Emma Wilson",
    email: "emma.w@email.com",
    tags: "Premium, Loyal",
    lastOrderDate: "2024-03-14",
    orderCount: 38,
    totalSpent: 2890.5,
    status: "Active",
  },
  {
    name: "Michael Chen",
    email: "m.chen@email.com",
    tags: "VIP",
    lastOrderDate: "2024-03-13",
    orderCount: 32,
    totalSpent: 2450.75,
    status: "Active",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    tags: "Regular",
    lastOrderDate: "2024-03-12",
    orderCount: 28,
    totalSpent: 1950.25,
    status: "Inactive",
  },
  {
    name: "David Brown",
    email: "d.brown@email.com",
    tags: "Premium",
    lastOrderDate: "2024-03-11",
    orderCount: 25,
    totalSpent: 1875.0,
    status: "Active",
  },
  {
    name: "Lisa Anderson",
    email: "lisa.a@email.com",
    tags: "Loyal",
    lastOrderDate: "2024-03-10",
    orderCount: 22,
    totalSpent: 1650.8,
    status: "Active",
  },
  {
    name: "Robert Taylor",
    email: "rob.t@email.com",
    tags: "VIP, Premium",
    lastOrderDate: "2024-03-09",
    orderCount: 20,
    totalSpent: 1580.9,
    status: "Active",
  },
  {
    name: "Jennifer Lee",
    email: "jen.lee@email.com",
    tags: "Regular",
    lastOrderDate: "2024-03-08",
    orderCount: 18,
    totalSpent: 1350.4,
    status: "Active",
  },
  {
    name: "William Davis",
    email: "w.davis@email.com",
    tags: "Premium",
    lastOrderDate: "2024-03-07",
    orderCount: 15,
    totalSpent: 1250.6,
    status: "Inactive",
  },
  {
    name: "Maria Garcia",
    email: "m.garcia@email.com",
    tags: "Loyal, Regular",
    lastOrderDate: "2024-03-06",
    orderCount: 12,
    totalSpent: 980.3,
    status: "Active",
  },
];
