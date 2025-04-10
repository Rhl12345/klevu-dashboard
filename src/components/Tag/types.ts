export interface iTagProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The size of the Tag */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  /** The alignment of the Tag */
  align?: 'left' | 'center' | 'right';
  /** The content of the Tag */
  children: React.ReactNode;
  /** Additional class names for custom styling */
  className?: string;
  /** Whether the Tag is disabled */
  disabled?: boolean;
  /** Whether the Tag is removable */
  removable?: boolean;
  /** Callback when the Tag is removed */
  onRemove?: () => void;
  /** Optional link associated with the Tag */
  link?: string;
}
