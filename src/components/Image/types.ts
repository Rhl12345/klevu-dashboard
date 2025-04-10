import { ImageProps as NextImageProps, StaticImageData } from 'next/image';

export type ImageVariant = 'default' | 'next';

export interface iBaseImageProps {
  className?: string;
  fallback?: string | React.ReactNode;
  fallbackImage?: string | StaticImageData;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'auto';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  variant?: ImageVariant;
}

// Omit objectFit from NextImageProps to avoid conflict
export interface iNextImageProps
  extends Omit<NextImageProps, 'objectFit' | 'src'>,
    iBaseImageProps {
  variant: 'next';
  width: number;
  height: number;
  src: string | StaticImageData;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export interface iDefaultImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    iBaseImageProps {
  variant?: 'default';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export type iImageProps = iDefaultImageProps | iNextImageProps;
