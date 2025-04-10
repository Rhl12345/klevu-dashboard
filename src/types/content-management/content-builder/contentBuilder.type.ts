export interface IContentPage {
  id: number;
  title: string;
  slug?: string;
  status?: string;
  updatedAT?: string;
  modifiedName?: string;
  domainName?: string;
}

export interface IContentPageList {
  createdName: string;
  modifiedName: string;
  domainName: string;
  id: number;
  title: string;
  pageType: string;
  passRequired: string;
  password: string;
  passExpiryPeriod: string;
  tag: string;
  author: string;
  previewAs: string;
  storeId: number;
  slug: string;
  topicTitle: string;
  metaDescription: string;
  metaKeywords: string;
  templateId: number;
  headHtml: string;
  footerhtml: string;
  canonicalurl: string;
  publishDuration: string;
  publishDate: string;
  publishTime: string;
  unpublishDate: string;
  unpublishTime: string;
  scheduleUnpublish: string;
  redirectPageId: string;
  createdBy: string;
  updatedBy: string;
  status: string;
  createdAt: string;
  updatedAT: string;
  isHomePage: string;
  publish_status: string;
  menuType: string;
  oldId: string;
  storiesImage: string;
  categoryId: number;
  displaySideBar: string;
  description: string;
  productSku: string;
  isbreadcrumbShow: string;
  isonSitemap: boolean;
  parentId: number;
  openGraphImagePath: string;
  openGraphTitle: string;
  openGraphDescription: string;
  facebookImagePath: string;
  facebookOpenGraphTitle: string;
  facebookOpenGraphDescription: string;
  twitterImagePath: string;
  twitterOpenGraphTitle: string;
  twitterOpenGraphDescription: string;
  linkedinImagePath: string;
  linkedinOpenGraphTitle: string;
  linkedinOpenGraphDescription: string;
  pinterestImagePath: string;
  pinterestOpenGraphTitle: string;
  pinterestOpenGraphDescription: string;
  isNewStructure: boolean;
}

export interface IContentPageListRequest {
  pageIndex: number;
  pageSize: number;
  sortingOptions: {
    field: string;
    direction: number;
    priority: number;
  }[];
}

export interface IContentPageResponse {
  items: IContentPage[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

const IMODAL_TYPES = {
  DELETE: 'delete',
  ACTIVE_INACTIVE: 'activeInactive',
  CLONE: 'clone',
  VIEW_HISTORY: 'viewHistory'
} as const;

export type IContentModalType = typeof IMODAL_TYPES[keyof typeof IMODAL_TYPES];

export type TImageValue = File | string | null;

export interface ISocialMediaField {
  image?: TImageValue;
  title?: string;
  description?: string;
  url?: string;
}

export interface IContentBuilderSettingsFormValues {
  internalPageName: string;
  isPasswordRequredToViewPage: boolean;
  selectParent: string;
  tag: string;  
  author: string;
  isHomePage: boolean;
  isDesktopResult: boolean;
  isMobileResult: boolean;
  domain: string;
  contentSlug: string;
  pageTitle: string;
  metaDescription: string;
  previewAs: string;
  metaKeywords: string;
  template: string;
  isBreadCrumbShow: boolean;
  menuType: string;
  social: {
    ogTags: ISocialMediaField;
    facebook: Omit<ISocialMediaField, "image">;
    twitter: Omit<ISocialMediaField, "image">;
    linkedin: Omit<ISocialMediaField, "image">;
    pinterest: ISocialMediaField;
  };
}

export interface ICreatePageModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageType: string;
}
