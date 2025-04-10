// Define types for validation schema
export type TImageValue = File | string | null;

export interface ISocialMediaField {
  image?: TImageValue;
  title?: string;
  description?: string;
  url?: string;
}

export interface IStoreConfigureSeo {
  commonTags: {
    headCode: string;
    bodyCode: string;
  };
  googleAnalytics: {
    enabled: boolean;
    tagId: string;
  };
  googleTagManager: {
    enabled: boolean;
    gtmCode: string;
  };
  facebookPixel: {
    enabled: boolean;
    pixelId: string;
  };
  pinterest: {
    enabled: boolean;
    headCode: string;
    htmlVerificationCode: string;
  };
  affiliateConversion: {
    enabled: boolean;
    connection: string;
  };
  social: {
    ogTags: ISocialMediaField;
    facebook: Omit<ISocialMediaField, "image">;
    twitter: Omit<ISocialMediaField, "image">;
    linkedin: Omit<ISocialMediaField, "image">;
    pinterest: ISocialMediaField;
  };
  integration: {
    enabled: boolean;
    semrushAPIKey: string;
  };
}
