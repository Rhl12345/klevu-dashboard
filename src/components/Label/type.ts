export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  asterisk?: boolean;
  weight?: "font-normal" | "font-semibold" | "font-bold";
}
