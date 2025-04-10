import { PageRoutes } from "@/admin-pages/routes";

export const SETTINGS_DASHBOARD_DATA = [
  {
    title: "Users",
    mainLink: PageRoutes.USERS.LIST,
    links: [
      {
        href: PageRoutes.USERS.LIST,
        label: "Active",
        value: 52,
      },
      {
        href: PageRoutes.USERS.LIST,
        label: "Inactive",
        value: 0,
      },
      {
        href: PageRoutes.USERS.LIST,
        label: "Total",
        value: 52,
      },
    ],
  },
  {
    title: "Roles",
    mainLink: PageRoutes.ROLES.LIST,
    links: [
      {
        href: PageRoutes.ROLES.LIST,
        label: "Active",
        value: 32,
      },
      {
        href: PageRoutes.ROLES.LIST,
        label: "Inactive",
        value: 0,
      },
      {
        href: PageRoutes.ROLES.LIST,
        label: "Total",
        value: 32,
      },
    ],
  },
];

export const SETTINGS_MODULES_DATA = [
  {
    title: "Modules Wise User",
    header: "Module Wise User",
    modules: [
      {
        label: "Dashboard",
        value: 51,
      },
      {
        label: "Reports",
        value: 57,
      },
      {
        label: "Orders",
        value: 71,
      },
      {
        label: "Admin Theme",
        value: 45,
      },
      {
        label: "Google Analytics",
        value: 12,
      },
      {
        label: "Dashboard Widget",
        value: 10,
      },
      {
        label: "Test",
        value: 47,
      },
    ],
  },
];

export const SETTINGS_PIE_CHART_DATA = [
  {
    name: "Dashboard",
    value: 42,
    color: "#22c55e",
  },
  {
    name: "Orders",
    value: 18,
    color: "#87CEEB", // Light blue
  },
  {
    name: "Admin Theme",
    value: 12,
    color: "#FFB6C1", // Pink
  },
  {
    name: "Reports",
    value: 10,
    color: "#DDA0DD", // Plum
  },
  {
    name: "Google Analytics",
    value: 8,
    color: "#FFB6C1", // Pink
  },
  {
    name: "Dashboard Widget",
    value: 6,
    color: "#00CED1", // Turquoise
  },
  {
    name: "Test",
    value: 4,
    color: "#C0C0C0", // Gray
  },
];

export const PIE_CHART_CONFIG = {
  title: "Module Wise User Report",
  data: SETTINGS_PIE_CHART_DATA,
  showTooltip: true,
  showLabels: true,
  centerLabel: {
    text: "Total Modules",
    value: "51",
  },
};
