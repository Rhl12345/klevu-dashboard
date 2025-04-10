import React from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/Button/Button';
import { iAccountConnectionProps } from './types';

const AccountConnection: React.FC<iAccountConnectionProps> = ({
  appName,
  isConnected,
  onConnect,
  onDisconnect,
  termsText,
  wrapperClassName,
  appNameClassName,
  statusClassName,
  buttonWrapperClassName,
  connectButtonClassName,
  disconnectButtonClassName,
  termsTextClassName,
}) => {
  return (
    <div
      className={twMerge('p-4 bg-gray-100 shadow rounded-xl', wrapperClassName)}
    >
      {/* App Name and Status */}
      <div className="flex justify-between items-center">
        <div>
          <p
            className={twMerge('text-sm font-semibold mb-1', appNameClassName)}
          >
            {appName}
          </p>
          <p
            className={twMerge(
              'text-sm',
              isConnected ? 'text-green-600' : 'text-gray-500',
              statusClassName
            )}
          >
            {isConnected ? 'Account connected' : 'No account connected'}
          </p>
        </div>

        {/* Connect or Disconnect Button */}
        <div className={twMerge('flex-shrink-0', buttonWrapperClassName)}>
          {isConnected ? (
            <Button
              size="sm"
              variant="secondary"
              className={twMerge(
                'bg-red-500 text-white hover:bg-red-600 px-2 py-1 rounded-md',
                disconnectButtonClassName
              )}
              onClick={onDisconnect}
            >
              Disconnect
            </Button>
          ) : (
            <Button
              size="sm"
              variant="primary"
              className={twMerge(
                'bg-blue-500 text-white hover:bg-blue-600 px-2 py-1 rounded-md',
                connectButtonClassName
              )}
              onClick={onConnect}
            >
              Connect
            </Button>
          )}
        </div>
      </div>

      {/* Terms and Conditions */}
      {!isConnected && termsText && (
        <p
          className={twMerge('text-sm mt-4 text-gray-500', termsTextClassName)}
        >
          {termsText}
        </p>
      )}
    </div>
  );
};

export default AccountConnection;
