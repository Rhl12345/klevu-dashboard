import { ReactNode } from 'react';

export interface IDndGridProps {
  items: any[];
  setItems: (items: any[]) => void;
  renderItem: (item: any, index: number) => ReactNode;
  className?: string;
  sortableKey: string;
}

export interface ISortableItemProps {
  id: string | number;
  children: React.ReactNode;
}
