export interface IManageBulkTier {
    storeName: string;
    companyName: string;
    customerNumber: string;
    customerName: string;
    currentTier: string;
    oldTier: string;
    createdDate: string;
    createdBy: string;
    modifiedBy: string;
    updatedBy: string;
    recStatus: string;
}
export interface IFilteringOption {
    columnName: string;
    name: string;
    type: 'checkbox' | 'date' | 'select';
    options: string[] | null;
    conditionalSearch?: boolean;
  }
  export interface IInitialValues {
    customerNumber: string;
    storeName: string;
    tier: string;
  }
