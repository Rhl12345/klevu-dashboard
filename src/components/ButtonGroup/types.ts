// Type for default button group properties
type iButtonGroupHTMLProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

// Enhanced Button Group Props with customizations
export type iButtonGroupProps = iButtonGroupHTMLProps & {
  className?: string; // Custom className to override wrapper styles
  variant?: 'default' | 'with-gap'; // Variants for ButtonGroup
};
