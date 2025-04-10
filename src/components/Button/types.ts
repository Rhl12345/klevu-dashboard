export interface iButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  gap?: number;
  variant?:
    | "default"
    | "primary"
    | "outline-primary"
    | "rounded-primary"
    | "rounded-outline-primary"
    | "secondary"
    | "outline-secondary"
    | "rounded-secondary"
    | "rounded-outline-secondary";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  iconPosition?: "left" | "right";
  scale?: boolean;
  disabled?: boolean;
  id?: string;
  "aria-label"?: string;
  
}
