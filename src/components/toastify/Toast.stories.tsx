import { Meta, StoryFn } from '@storybook/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../Button/Button';
import SvgIcon from '../SvgIcons/SvgIcon';
import Toast from './Toast';

export default {
    title: 'Components/Toast',
    component: Toast,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} as Meta;

export const Default: StoryFn = () => {
    const showToast = () => {
        toast('Default Toast Message');
    };

    return (
        <div>
            <Button onClick={showToast} size="md" variant="primary">
                Show Toast
            </Button>
            <Toast />
        </div>
    );
};

export const ToastTypes: StoryFn = () => {
    const showSuccess = () => toast.success('Success Message');
    const showError = () => toast.error('Error Message');
    const showInfo = () => toast.info('Info Message');
    const showWarning = () => toast.warning('Warning Message');

    return (
        <div className="flex flex-col gap-4">
            <Button onClick={showSuccess} size="md" variant="primary">
                Success Toast
            </Button>
            <Button onClick={showError} size="md" variant="primary">
                Error Toast
            </Button>
            <Button onClick={showInfo} size="md" variant="primary">
                Info Toast
            </Button>
            <Button onClick={showWarning} size="md" variant="primary">
                Warning Toast
            </Button>
            <Toast />
        </div>
    );
};

export const ToastPositions: StoryFn = () => {
    const positions = [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
    ] as const;

    const showToast = (position: typeof positions[number]) => {
        toast(`Toast Position: ${position}`, {
            position,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            {positions.map((position) => (
                <Button
                    key={position}
                    onClick={() => showToast(position)}
                    size="md"
                    variant="primary"
                >
                    Show {position} Toast
                </Button>
            ))}
            <Toast />
        </div>
    );
};

export const CustomToast: StoryFn = () => {
    const showCustomToast = () => {
        toast(
            <div className="flex items-center gap-2">
                <SvgIcon name="SuccessCheckmark" width={24} height={24} className="text-green-600" />
                <div>
                    <h4 className="font-semibold text-gray-900">Order Completed</h4>
                    <p className="text-sm text-gray-600">
                        Order #12345 has been successfully processed
                    </p>
                </div>
            </div>,
            {
                className: 'custom-toast',
                progressClassName: 'custom-progress-bar',
            }
        );
    };

    const showCustomErrorToast = () => {
        toast(
            <div className="flex items-center gap-2">
                <SvgIcon name="CrossIcon" width={24} height={24} className="text-red-600" />
                <div>
                    <h4 className="font-semibold text-gray-900">Payment Failed</h4>
                    <p className="text-sm text-gray-600">
                        Please check your payment details and try again
                    </p>
                </div>
            </div>,
            {
                className: 'custom-toast',
                progressClassName: 'custom-progress-bar-error',
            }
        );
    };

    return (
        <div className="flex flex-col gap-2">
            <Button onClick={showCustomToast} size="md" variant="primary">
                Show Custom Success Toast
            </Button>
            <Button onClick={showCustomErrorToast} size="md" variant="primary">
                Show Custom Error Toast
            </Button>
            <Toast />
            <style>
                {`
          .custom-toast {
            background: white;
            border-radius: 10px;
            padding: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .custom-progress-bar {
            background: linear-gradient(to right, #10B981, #059669);
          }
          .custom-progress-bar-error {
            background: linear-gradient(to right, #EF4444, #DC2626);
          }
        `}
            </style>
        </div>
    );
};

export const AutoCloseDelay: StoryFn = () => {
    const showQuickToast = () => {
        toast('Quick Toast - 2 seconds', { autoClose: 2000 });
    };

    const showSlowToast = () => {
        toast('Slow Toast - 8 seconds', { autoClose: 8000 });
    };

    const showPersistentToast = () => {
        toast('Persistent Toast - Click to close', { autoClose: false });
    };

    return (
        <div className="flex flex-col gap-4">
            <Button onClick={showQuickToast} size="md" variant="primary">
                Quick Toast (2s)
            </Button>
            <Button onClick={showSlowToast} size="md" variant="primary">
                Slow Toast (8s)
            </Button>
            <Button onClick={showPersistentToast} size="md" variant="primary">
                Persistent Toast
            </Button>
            <Toast />
        </div>
    );
}; 