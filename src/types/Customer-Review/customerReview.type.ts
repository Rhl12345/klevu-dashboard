export interface ICustomerReview {
    customer_name: string;
    customer_email: string;
    comments: string;
    rating: {
      stars: number;
      description: string;
    };
    updated_date: string;
    approved_status: string;
  }

  export interface ICustomerReviewFormList {
    id: number;
    name: string;
    store_name: string;
    charges: number | null;
    created_date: string | null;
    updated_by: string | null;
    recStatus: string;
    updated_date: string | null;
    created_by: string | null;
  }

  export interface ICustomerReviewEnhancedICellProps {
    getValue: () => string;
    row: {
      original: ICustomerReviewFormList;
    };
  }

  export interface ICustomerReviewModalType {
    type: "delete" | "activeInactive" | "createModal" | "edit" | null;
  }