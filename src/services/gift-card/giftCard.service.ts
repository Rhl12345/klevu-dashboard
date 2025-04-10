import giftCard from "@/mock-data/giftCard.json";
import { IGiftCardFormValues, IGiftCardPayload, IGiftCardResponse } from "@/types/gift-card/giftCard.type";

  export const getGiftCards =  async (args: IGiftCardPayload): Promise<IGiftCardResponse> => {
    try {
      // Simulating API call with mock data
      const response = await new Promise<any>((resolve) => {
          let filteredData = [...giftCard.items];

          // Filter based on selected store if any
          // if (args.selectedStore) {
          //   filteredData = filteredData.filter(
          //     (item) => item.storeName === args.selectedStore
          //   );
          // }

          const startIndex = (args.pageIndex - 1) * args.pageSize;
          const endIndex = startIndex + args.pageSize;
          const paginatedItems = filteredData.slice(startIndex, endIndex);

          resolve({
            items: paginatedItems,
            pageIndex: args.pageIndex,
            pageSize: args.pageSize,
            totalCount: filteredData.length,
            totalPages: Math.ceil(filteredData.length / args.pageSize),
            hasPreviousPage: args.pageIndex > 1,
            hasNextPage: endIndex < filteredData.length,
          });
      });

      return response;
    } catch (error) {
      console.error("Error in getGiftCards service:", error);
      throw error;
    }
  }


  export const updateGiftCard = async (args: IGiftCardFormValues): Promise<IGiftCardResponse> => {
    try {
      // Simulating API call with mock data
      const response = await new Promise<any>((resolve) => {
        const updatedItems = giftCard.items.map((item) => {
          if (item.orderNumber === args.orderNumber) {
            return {
              ...item,
              storeName: args.storeName,
              recipientName: args.recipientName,
              emailTo: args.emailTo,
              serialNumber: args.serialNumber,
              initialAmount: args.initialAmount,
              balance: args.balance,
            }
          } else {
            return item;
          }
        });
        resolve({...giftCard,items:updatedItems});
      });
      return response;
    } catch (error) {
      console.error("Error in updateGiftCard service:", error);
      throw error;
    }
  }



