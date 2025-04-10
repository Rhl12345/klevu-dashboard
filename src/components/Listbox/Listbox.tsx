import React from 'react';
import { twMerge } from 'tailwind-merge';
import { iListboxProps } from './types';

const Listbox: React.FC<iListboxProps> = ({
  items,
  containerClassName = '',
  searchContainerClassName = '',
  listClassName = '',
  searchComponent,
  scrollable = false,
}) => {
  return (
    <div
      className={twMerge(
        'bg-gray-100 rounded-md overflow-hidden',
        containerClassName
      )}
    >
      {searchComponent && (
        <div className={twMerge('p-2.5 shadow', searchContainerClassName)}>
          {searchComponent}
        </div>
      )}
      <ul
        className={twMerge(
          'p-2.5',
          scrollable ? 'max-h-40 overflow-auto' : '',
          listClassName
        )}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className={twMerge(
              'px-3 py-1.5 rounded-md flex items-center gap-x-2 cursor-pointer',
              item.disabled ? 'cursor-not-allowed opacity-30' : '',
              item.itemClassName
            )}
          >
            {item.action && <span>{item.action}</span>}
            <span className="flex-grow">{item.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listbox;
