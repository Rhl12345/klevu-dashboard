import { ICategotyOrderData } from "@/types/category-order/categoryOrder.type";

export const CATEGORY_DATA: ICategotyOrderData[] = [
  {
    id: "1",
    title: "Women",
    products: 3,
    created_date: "09/05/2024 12:35 AM",
    created_by: "Bhargav Yadav",
    updated_date: "02/18/2025 03:57 AM",
    updated_by: "Anand Kumar",
    status: "active",
    hasChildren: false,
  },
  {
    id: "2",
    title: "Accessories",
    products: 4,
    created_date: "09/05/2024 12:35 AM",
    created_by: "Bhargav Yadav",
    updated_date: "02/18/2025 03:57 AM",
    updated_by: "Anand Kumar",
    status: "active",
    hasChildren: true,
    subRows: [
      {
        id: "21",
        title: "Jackets",
        products: 1,
        created_date: "09/05/2024 12:35 AM",
        created_by: "Bhargav Yadav",
        updated_date: "",
        updated_by: "",
        status: "inactive",
        hasChildren: true,
        subRows: [
          {
            id: "23",
            title: "Outerwear",
            products: 1,
            created_date: "09/05/2024 12:35 AM",
            created_by: "Bhargav Yadav",
            updated_date: "",
            updated_by: "",
            status: "active",
            hasChildren: false,
          },
        ],
      },
      {
        id: "33",
        title: "Hoodies & Sweatshirts",
        products: 1,
        created_date: "09/05/2024 12:35 AM",
        created_by: "Bhargav Yadav",
        updated_date: "",
        updated_by: "",
        status: "active",
        hasChildren: false,
      },
    ],
  },
  {
    id: "3",
    title: "Men",
    products: 5,
    created_date: "09/11/2024 12:29 AM",
    created_by: "Bhargav Yadav",
    updated_date: "02/18/2025 03:57 AM",
    updated_by: "Anand Kumar",
    status: "active",
    hasChildren: false,
  },
];
