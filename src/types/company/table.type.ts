export interface ITableCellProps<T> {
  row: {
    original: T;
    getValue: () => string | number | boolean;
  };
}

export interface ISortingOption {
  field: string;
  direction: number;
  priority: number;
} 