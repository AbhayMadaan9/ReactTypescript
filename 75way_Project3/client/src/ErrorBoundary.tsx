import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by error boundary:', error, errorInfo);
    // You can also perform additional actions, e.g., send the error to a server
    // Example: sendErrorToServer(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong. Please try again later. <Link to = "/login">Login again</Link></div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
