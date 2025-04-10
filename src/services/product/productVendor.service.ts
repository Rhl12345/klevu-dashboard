export const getProductAllVendors = async (productId: string) => {
  try {
    return [{ label: "Hudson Sutler", value: "1100" }];
  } catch (error) {
    throw error;
  }
};

export const getProductVendors = async (productId: string) => {
  try {
    return [
      { label: "All Vendors", value: "all" },
      { label: "Peter Millar", value: "974" },
    ];
  } catch (error) {
    throw error;
  }
};

export const getVendorSkuMappingData = async (
  productId: string,
  vendorId: string
) => {
  try {
    const vendorSkuMappingData = await import(
      "@/mock-data/product-database/vendorSkuMappingData.json"
    );
    return vendorId !== "all"
      ? vendorSkuMappingData.default?.filter(
          (item) => item.vendorId == vendorId
        )
      : vendorSkuMappingData.default;
  } catch (error) {
    throw error;
  }
};

export const saveVendorSkuMappingData = async (
  productId: string,
  vendorId: string
) => {
  try {
    return {
      id: 8788,
      vendorId: "1100",
      vendorName: "Hudson Sutler",
      vendorSku: null,
      referenceName: null,
      ourSubSku: null,
      mpn: null,
      isDefaultVendor: false,
      subRows: [
        {
          id: 0,
          parentId: 8788,
          vendorName: "Hudson Sutler",
          vendorSku: null,
          referenceName: null,
          ourSubSku: "MS25EK15S-BSEA-LG",
          mpn: "",
          isDefaultVendor: false,
        },
        {
          id: 0,
          parentId: 8788,
          vendorName: "Hudson Sutler",
          vendorSku: null,
          referenceName: null,
          ourSubSku: "MS25EK15S-BSEA-MD",
          mpn: "",
          isDefaultVendor: false,
        },
        {
          id: 0,
          parentId: 8788,
          vendorName: "Hudson Sutler",
          vendorSku: null,
          referenceName: null,
          ourSubSku: "MS25EK15S-BSEA-SM",
          mpn: "",
          isDefaultVendor: false,
        },
        {
          id: 0,
          parentId: 8788,
          vendorName: "Hudson Sutler",
          vendorSku: null,
          referenceName: null,
          ourSubSku: "MS25EK15S-BSEA-XL",
          mpn: "",
          isDefaultVendor: false,
        },
        {
          id: 0,
          parentId: 8788,
          vendorName: "Hudson Sutler",
          vendorSku: null,
          referenceName: null,
          ourSubSku: "MS25EK15S-NAV-LG",
          mpn: "",
          isDefaultVendor: false,
        },
        {
          id: 0,
          parentId: 8788,
          vendorName: "Hudson Sutler",
          vendorSku: null,
          referenceName: null,
          ourSubSku: "MS25EK15S-NAV-MD",
          mpn: "",
          isDefaultVendor: false,
        },
        {
          id: 0,
          parentId: 8788,
          vendorName: "Hudson Sutler",
          vendorSku: null,
          referenceName: null,
          ourSubSku: "MS25EK15S-NAV-SM",
          mpn: "",
          isDefaultVendor: false,
        },
        {
          id: 0,
          parentId: 8788,
          vendorName: "Hudson Sutler",
          vendorSku: null,
          referenceName: null,
          ourSubSku: "MS25EK15S-NAV-XL",
          mpn: "",
          isDefaultVendor: false,
        },
        {
          id: 0,
          parentId: 8788,
          vendorName: "Hudson Sutler",
          vendorSku: null,
          referenceName: null,
          ourSubSku: "MS25EK15S-ULTRV-LG",
          mpn: "",
          isDefaultVendor: false,
        },
        {
          id: 0,
          parentId: 8788,
          vendorName: "Hudson Sutler",
          vendorSku: null,
          referenceName: null,
          ourSubSku: "MS25EK15S-ULTRV-MD",
          mpn: "",
          isDefaultVendor: false,
        },
        {
          id: 0,
          parentId: 8788,
          vendorName: "Hudson Sutler",
          vendorSku: null,
          referenceName: null,
          ourSubSku: "MS25EK15S-ULTRV-SM",
          mpn: "",
          isDefaultVendor: false,
        },
        {
          id: 0,
          parentId: 8788,
          vendorName: "Hudson Sutler",
          vendorSku: null,
          referenceName: null,
          ourSubSku: "MS25EK15S-ULTRV-XL",
          mpn: "",
          isDefaultVendor: false,
        },
      ],
    };
  } catch (error) {
    throw error;
  }
};
