import { StaticImageData } from 'next/image';

// Extend the default HTML image attributes with the custom avatar props
type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

/**
 * Props for the Avatar component.
 */
export interface iAvatarProps {
  /**
   * Image source for the avatar.
   * If not provided, a default image will be used.
   */
  image?: StaticImageData;

  /**
   * Icon to display inside the avatar as an alternative to an image.
   * Accepts any ReactNode (e.g., an SVG or JSX element).
   */
  icon?: React.ReactNode;

  /**
   * Size of the avatar.
   * Options: 'small', 'medium', 'large', 'Xlarge'.
   * Default: 'medium'.
   */
  size?: 'small' | 'medium' | 'large' | 'Xlarge';

  /**
   * Rounding style for the avatar.
   * Options: 'Default' (rounded corners), 'Full' (circular), 'None' (square).
   * Default: 'Default'.
   */
  rounded?: 'Default' | 'Full' | 'None';
}

/**
 * Combined props for the Avatar component.
 * Extends both the default image props and custom avatar props.
 */
export type iAvatarComponentProps = ImageProps & iAvatarProps;
