async function getStoreCategories() {
    const response = await import('@/mock-data/StoreCategoryList.json');
    return {...response.default, storeCategoryList: [...response.default.storeCategoryList]};
}

export {getStoreCategories};
