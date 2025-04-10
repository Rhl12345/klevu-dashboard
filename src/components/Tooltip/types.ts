// Type for default button properties
type TButtonHTMLProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

// Tooltip Props with additional customizations
export type TTooltipProps = TButtonHTMLProps & {
  size?: "xs" | "sm" | "md" | "lg"; // Tooltip size variants
  position?: "top" | "bottom" | "left" | "right"; // Tooltip position
  children: React.ReactNode; // Text displayed in the tooltip
  icon?: React.ReactNode;
};
