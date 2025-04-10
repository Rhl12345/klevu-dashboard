import mockData from "@/mock-data/websitePage.json";

let pageListPayload = {
    "createdName": "",
    "modifiedName": "Chandan Kumar",
    "domainName": "https://wheatonartistic23.gamedaygearonline.store",
    "id": 45,
    "title": "Index Page",
    "pageType": "Website",
    "passRequired": null,
    "password": "",
    "passExpiryPeriod": null,
    "tag": "",
    "author": "",
    "previewAs": "",
    "storeId": 125,
    "slug": "Index-Page",
    "topicTitle": "Bacardi Corporate Stores",
    "metaDescription": "Bacardi Corporate Stores",
    "metaKeywords": "",
    "templateId": 15,
    "headHtml": "",
    "footerhtml": "",
    "canonicalurl": "",
    "publishDuration": "D",
    "publishDate": null,
    "publishTime": null,
    "unpublishDate": null,
    "unpublishTime": null,
    "scheduleUnpublish": null,
    "redirectPageId": null,
    "createdBy": null,
    "updatedBy": "94",
    "status": "P",
    "createdAt": null,
    "updatedAT": "2024-06-27T06:36:54.775",
    "isHomePage": "Y",
    "publish_status": null,
    "menuType": "",
    "oldId": null,
    "storiesImage": null,
    "categoryId": 0,
    "displaySideBar": null,
    "description": null,
    "productSku": "[]",
    "isbreadcrumbShow": "N",
    "isonSitemap": false,
    "parentId": 0,
    "openGraphImagePath": null,
    "openGraphTitle": null,
    "openGraphDescription": null,
    "facebookImagePath": null,
    "facebookOpenGraphTitle": null,
    "facebookOpenGraphDescription": null,
    "twitterImagePath": null,
    "twitterOpenGraphTitle": null,
    "twitterOpenGraphDescription": null,
    "linkedinImagePath": null,
    "linkedinOpenGraphTitle": null,
    "linkedinOpenGraphDescription": null,
    "pinterestImagePath": null,
    "pinterestOpenGraphTitle": null,
    "pinterestOpenGraphDescription": null,
    "isNewStructure": false
}

export const createPage = async (pageName: string, pageType: string): Promise<number> => {
    try {
      mockData.items.push({
        ...pageListPayload,
        title: pageName,
        pageType: pageType,
        id: mockData.items.length + 1,
      });
      pageListPayload = {
        ...pageListPayload,
        title: pageName,
        pageType: pageType,
        id: mockData.items.length + 1,
      }
      return mockData.items.length + 1;
    } catch (error) {
      console.error("Error in createPage:", error);
      throw error;
    }
  };


  export const getContentBuilderById = async (id: number | string): Promise<any> => {
    try {
      mockData.items.push(pageListPayload);
      const contentBuilder = mockData.items.find((item) => item.id === Number(id));
      return contentBuilder;
    } catch (error) {
      console.error("Error in getContentBuilderById:", error);
      throw error;
    }
  };
