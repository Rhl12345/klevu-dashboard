import dayjs from "dayjs";

export const getProductFeedDetails = async (id: string) => {
  try {
    // For now using mock data, replace with actual API call
    return {
      productId: "1",
      productName: "Test Product",
      description: "Test Description",
      status: "active",
      vendorSku: "VSKU1325",
      sku: "SKU123",
      brand: "4", // Brand ID
      vendor: "5", // Vendor ID
      productType: "fg",
      shortDescription: "Short description here",
      longDescription: "Long description here",
      specifications: "Product specifications",
      features: "Product features",
      msrp: 100,
      ourCost: 50,
      salePrice: 75,
      isImapEnabled: true,
      imap: 80,
      volume: 100,
      length: 10,
      width: 5,
      height: 2,
      taxCode: "US-TAX",
      hasDifferentErpName: true,
      differentErpName: "Different ERP Name",
      hasExistingErpId: true,
      erpItemId: "1234567890",
      weight: 10,
      shipWeight: 12,
      searchDimensionTemplate: "5",
      pageRedirectionUrl: "",
      companionProduct: "1",
      imageUrl:
        "https://storagemedia.corporategear.com/betastoragemedia/1/mastercatalog/attributeimages/a570-blk.jpg?0.8125169374802548",
      updatedBy: "John Doe",
      updatedAt: dayjs().subtract(4, "day").toISOString(),
      productReadiness: 80,
      seoReadiness: 90,
      pageUrl: "pageurl",
      pageTitle: "Page Title",
      metaDescription: "Meta Description",
      metaKeywords: "Meta Keywords",
      roiKeywords: "ROI Keywords",
      targetedKeywords: "Targeted Keywords",
      h1: "Header 1",
      h2: "Header 2",
      h3: "Header 3",
      h4: "Header 4",
      h5: "Header 5",
      h6: "Header 6",
      social: {
        title: "Social Title",
        description: "Meta Description",
      },
    };

    //TODO: fetch the product details from the backend once the API is ready
    // const response = await AsyncFetch<Product>({
    //   method: "GET",
    //   url: `/api/products/${id}`,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};
