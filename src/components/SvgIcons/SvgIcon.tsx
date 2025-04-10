import React from 'react';
import { SvgArray } from './SvgIconsArray';
import { iSvgIconProps } from './types';

const SvgIcon: React.FC<iSvgIconProps> = ({
  name,
  height,
  width,
  fill,
  className,
  ...props
}) => {
  const icon = SvgArray.find((svg) => svg.name === name);

  if (!icon) {
    return null;
  }

  // Create an object to hold only the defined props
  const clonedProps = {
    ...(height !== undefined && { height }),
    ...(width !== undefined && { width }),
    ...(fill !== undefined && { fill }),
    ...(className !== undefined && { className }),
    ...props, // Spread any additional props
  };

  // Use React.cloneElement only if there are props to apply
  if (Object.keys(clonedProps).length > 0) {
    return React.cloneElement(icon.svg, clonedProps);
  }

  // Return the icon as-is if no props are passed
  return icon.svg;
};

export default SvgIcon;
