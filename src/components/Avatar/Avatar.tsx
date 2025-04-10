import React from 'react';
import Image from 'next/image';
import AvatarIcon from "@images/Avatar.jpg";
import { iAvatarComponentProps } from './types';

const Avatar: React.FC<iAvatarComponentProps> = ({
  image = AvatarIcon,
  size = 'medium',
  rounded = 'Default',
  icon,
  children,
  ...props
}) => {
  // Base styles for the avatar container
  const baseStyles = 'shadow flex items-center justify-center overflow-hidden';

  // Map size prop to corresponding CSS class
  const sizeStyles = {
    small: 'size-5',
    medium: 'size-10',
    large: 'size-11',
    Xlarge: 'size-20',
  }[size];

  // Map rounded prop to corresponding CSS class
  const variantStyles = {
    Default: 'rounded',
    Full: 'rounded-full',
    None: 'rounded-none',
  }[rounded];

  return (
    <div className={`${baseStyles} ${sizeStyles} ${variantStyles}`} {...props}>
      {icon ? (
        // Render icon if provided
        <span className="flex items-center justify-center">{icon}</span>
      ) : (
        // Render image if no icon is provided
        <Image
          className="object-cover w-full h-full"
          src={image}
          alt="Avatar"
        />
      )}
    </div>
  );
};

export default Avatar;
