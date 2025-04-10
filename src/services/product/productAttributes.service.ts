export const getAvailableAttributes = async (productId: string) => {
  try {
    const response = await import(
      "@/mock-data/product-database/attributesList.json"
    );
    return response.default?.map((attribute) => ({
      label: attribute.name,
      value: attribute.id,
    }));
  } catch (error) {
    throw error;
  }
};

export const getAttributesData = async (productId: string) => {
  try {
    const response = await import(
      "@/mock-data/product-database/attributesData.json"
    );
    return response.default;
  } catch (error) {
    throw error;
  }
};

export const getAttributesImageData = async (productId: string) => {
  try {
    const response = await import(
      "@/mock-data/product-database/attributeImageData.json"
    );
    return response.default?.map((attribute) => ({
      ...attribute,
      media: attribute.media.map((media) => ({
        url: media.url,
        file: null,
        name: media.name,
        displayOrder: media.displayOrder,
      })),
      swatch: attribute.swatch
        ? {
            url: attribute.swatch,
            file: null,
          }
        : null,
    }));
  } catch (error) {
    throw error;
  }
};

export const getAttributeCombinationData = async (productId: string) => {
  try {
    const response = await import(
      "@/mock-data/product-database/attributeCombinationData.json"
    );

    return response.default?.map((item) => ({
      id: item.id?.toString(),
      variant: item.varientName,
      sku: item.sku,
      minQuantity: item.minQuantity,
      multipleQuantity: item.multipleQuantity,
      isActive: true,
      additionalPrice: 0,
      upcGtin: item.upC_GTIN || "",
      imageUrl: item.varientImagePath,
      subRows: item.subRows.map((subItem) => ({
        id: subItem.id?.toString(),
        variant: subItem.varientName,
        sku: subItem.sku,
        minQuantity: 0,
        multipleQuantity: 0,
        isActive: true,
        additionalPrice: subItem.price,
        upcGtin: subItem.upC_GTIN || "",
        imageUrl: subItem.varientImagePath,
      })),
    }));
  } catch (error) {
    throw error;
  }
};
