import customerData from "@/mock-data/customerList.json";


export const getViewedList = async (obj:{
    args: {
        pageSize: number,
        pageIndex: number,
        sortingOptions: any,
        filteringOptions: any,
    },
    comapnyid: number,
    customerId: number
}
) => {
    const viewedList= customerData.viewedProductList
    return viewedList
    // const response = await API.post(`/Customer/getViewedListbycustomerid.json`, obj);
    // return response.data;
}

export const getWishListProduct = async (obj:{
    args: {
        pageSize: number,
        pageIndex: number,
        sortingOptions: any,
        filteringOptions: any,
    },
    comapnyid: number,
    customerId: number
}) => {

    const wishlistList= customerData.wishlistProductList
    return wishlistList
    // const response = await API.post(`/Customer/getwishlistpurchasedproductlistbycustomer.json`, obj);
    // return response.data;
}       

export const getPurchaseProductList = async (obj:{
    args: {
        pageSize: number,
        pageIndex: number,
        sortingOptions: any,
        filteringOptions: any,
    },
    comapnyid: number,
    customerId: number
}     
) => {
    const purchasedList= customerData.purchasedProductList
    return purchasedList
    // const response = await API.post(`/Customer/getpurchasedproductlistbycustomer.json`, obj);
    // return response.data;
}

export const getAddedCartProduct = async (obj:{
    args: {
        pageSize: number,
        pageIndex: number,
        sortingOptions: any,
        filteringOptions: any,
    },
    comapnyid: number,
    customerId: number
}
) => {
    const abandonedCartList= customerData.abandonedCartProductList
    return abandonedCartList
    // const response = await API.post(`/Customer/getaddedtocartpurchasedproductlistbycustomer.json`, obj);
    // return response.data;
}

