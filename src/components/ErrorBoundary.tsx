import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: false }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  logError = (error: Error, componentStack: React.ErrorInfo): void => {
    console.log('Error:', error);
    console.log('Component Stack:', componentStack.componentStack);
  };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.logError(error, info);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <p className="error-fallback">
          Something went wrong. Please refresh the page.
        </p>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
