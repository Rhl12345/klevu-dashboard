import React from 'react';
import { iListProps } from './types';

const List: React.FC<iListProps> = ({ type, className, items }) => {
  const ListElement = type === 'ul' ? 'ul' : 'ol';

  return (
    <div className="p-5">
      <ListElement className={className}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ListElement>
    </div>
  );
};

export default List;
