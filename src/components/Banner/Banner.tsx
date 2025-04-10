import React from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../Button/Button';
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { iBannerProps } from './types';

const Banner: React.FC<iBannerProps> = ({
  title,
  icon,
  hideIcon = false,
  tone = 'info',
  content,
  action,
  secondaryAction,
  onDismiss,
  dismissIcon,
  wrapperClassName,
  headingClassName,
  contentClassName,
  actionButtonsWrapperClassName,
  primaryActionButtonClassName,
  secondaryActionButtonClassName,
  dismissIconClassName,
}) => {
  // Define tone-specific classes for the header
  const toneClasses = {
    success: 'bg-green-700 text-white',
    info: 'bg-blue-300 text-black',
    warning: 'bg-amber-400 text-black',
    critical: 'bg-red-500 text-white',
  };

  return (
    <div
      className={twMerge(
        'bg-gray-100 shadow rounded-xl overflow-hidden',
        wrapperClassName
      )}
    >
      {/* Header Section (Title, Icon and Dismiss) */}
      <div
        className={twMerge(
          'p-3 flex items-center justify-between gap-x-1',
          toneClasses[tone],
          headingClassName
        )}
      >
        <div className="flex items-center gap-x-2 grow">
          {!hideIcon && icon && <div>{icon}</div>}
          {title && <div className="text-sm font-semibold">{title}</div>}
        </div>
        {onDismiss && (
          <div
            className={twMerge(
              'text-lg text-gray-500 hover:text-gray-700 hover:cursor-pointer',
              dismissIconClassName
            )}
            onClick={onDismiss}
          >
            {dismissIcon || <SvgIcon name="CrossIcon" />}
          </div>
        )}
      </div>

      {/* Content/Body Section */}
      {content && (
        <div
          className={twMerge(
            'p-3 text-sm text-gray-800',
            contentClassName // Custom content section styles
          )}
        >
          {content}
        </div>
      )}

      {/* Action Buttons Section */}
      {(action || secondaryAction) && (
        <div
          className={twMerge(
            'pb-4 px-3 flex gap-2',
            actionButtonsWrapperClassName
          )}
        >
          {action && (
            <Button
              className={twMerge(
                'px-3 py-1 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700',
                primaryActionButtonClassName
              )}
              onClick={action.onClick}
            >
              {action.content}
            </Button>
          )}
          {secondaryAction && (
            <Button
              className={twMerge(
                'px-3 py-1 text-sm font-medium rounded bg-blue-100 text-blue-600 hover:bg-blue-200',
                secondaryActionButtonClassName
              )}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.content}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Banner;
