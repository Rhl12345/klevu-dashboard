// Base type for HTML attributes applicable to a span
type iBadgeHTMLProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

// Enhanced Badge Props with additional customizations
export type iBadgeProps = iBadgeHTMLProps & {
  size?: 'small' | 'medium' | 'large'; // Badge size variants
  variant?: 'red' | 'green' | 'blue'; // Badge color variants
  className?: string; // Custom className to override default styles
};
