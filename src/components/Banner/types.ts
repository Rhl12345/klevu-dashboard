export type iBannerTone = 'success' | 'info' | 'warning' | 'critical';

export interface iBannerProps {
  title?: string /** Title content for the banner. */;
  icon?: React.ReactNode /** Status icon to display in the banner. */;
  hideIcon?: boolean /** Whether to hide the icon. */;
  tone?: iBannerTone /** Visual tone/style of the banner. */;
  content?: React.ReactNode /** Content/body of the banner. */;

  /** Primary action button details. */
  action?: {
    /** Text to display on the primary action button. */
    content: string;
    /** Callback triggered when the primary action button is clicked. */
    onClick: () => void;
  };

  /** Secondary action button details. */
  secondaryAction?: {
    /** Text to display on the secondary action button. */
    content: string;
    /** Callback triggered when the secondary action button is clicked. */
    onClick: () => void;
  };

  onDismiss?: () => void /** Callback triggered when the banner is dismissed. */;
  dismissIcon?: React.ReactNode /** Custom dismiss icon to display in the header. */;
  wrapperClassName?: string /** Custom CSS classes for the outer wrapper of the banner. */;
  headingClassName?: string /** Custom CSS classes for the header (title, icon and dismiss button) section. */;
  contentClassName?: string /** Custom CSS classes for the content/body section. */;
  actionButtonsWrapperClassName?: string /** Custom CSS classes for the actions buttons wrapper. */;
  primaryActionButtonClassName?: string /** Custom CSS classes for the primary action button. */;
  secondaryActionButtonClassName?: string /** Custom CSS classes for the secondary action button. */;
  dismissIconClassName?: string /** Custom CSS classes for the dismiss button. */;
}
