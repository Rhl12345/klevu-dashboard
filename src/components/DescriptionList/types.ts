interface Item {
  id: number; // Unique identifier for the item
  term: React.ReactNode /** Title or term of the item */;
  description: React.ReactNode /** Description or content of the item */;
}
export interface iDescriptionListProps {
  items: Item[];
  gap?: 'tight' | 'loose';
}
