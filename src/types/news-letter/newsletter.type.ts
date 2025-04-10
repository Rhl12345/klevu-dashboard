export interface INewsLetter {
  id: number;
  email: string;
  isSubscribe: boolean;
  storeName: string;
  createdDate: string;
  createdName: string;
  modifiedDate: string | null;
  modifiedName: string;
  recStatus: string;
}

export interface INewsLetterCellProps {
  row: {
    original: INewsLetter;
  };
  getValue: () => string;
}
