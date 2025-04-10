"use client";
import React from "react";
import Button from "../Button/Button";
import Text from "../Text/Text";

interface IProps {
  children: React.ReactNode;
}

interface IState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): IState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-body-light dark:bg-body-dark">
          <div className="p-8 bg-body-light border border-gray-light dark:border-gray-dark  flex flex-col gap-4">
            <Text
              size="xl"
              className="font-bold !text-danger dark:!text-danger"
            >
              Something went wrong
            </Text>
            <Text size="base">
              We apologize for the inconvenience. Please try refreshing the
              page.
            </Text>
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
              size="md"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
