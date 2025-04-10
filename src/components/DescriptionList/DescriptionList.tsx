import React from 'react';
import { twMerge } from 'tailwind-merge';
import { iDescriptionListProps } from './types';

const DescriptionList: React.FC<iDescriptionListProps> = ({
  items,
  gap = 'loose',
}) => {
  // Map the gap value to corresponding CSS spacing classes
  const gapClass = {
    tight: 'py-2',
    loose: 'py-4',
  }[gap];

  // Render each term-description pair
  const renderedItems = items.map(({ id, term, description }) => (
    <div className="flex w-full" key={`description-item-${id}`}>
      <dt className={twMerge('md:w-5/12 w-full font-semibold', gapClass)}>
        {term}
      </dt>
      <dd className={twMerge('md:w-5/12 w-full', gapClass)}>{description}</dd>
    </div>
  ));

  return <dl>{renderedItems}</dl>;
};

export default DescriptionList;
