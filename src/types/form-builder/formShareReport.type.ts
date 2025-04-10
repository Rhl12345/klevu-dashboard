export interface IFormShareReportValues {
  id: number;
  email: string;
  name: string;
  sentDate: string;
  sentBy: string;
  updatedDate: string;
  updatedBy: string;
  status: string;
  formName: string;
  formType: string;
}

export interface IFormShareReportProps {
  setFieldValue: (field: string, value: any) => void;
  handleClear: () => void;
  isEditable: boolean;
}

export interface IShareReportListProps {
  handleEdit: (id: string) => void;
}
