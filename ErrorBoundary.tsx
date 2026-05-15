import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-red-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full border border-red-100">
            <div className="flex items-center space-x-3 mb-6 border-b border-red-100 pb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
            </div>
            
            <p className="text-gray-700 mb-4 font-medium">
              The application encountered an unexpected error.
            </p>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-xs text-red-400 font-mono mb-4 text-left">
              {this.state.error && this.state.error.toString()}
            </div>

            <button
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              onClick={() => window.location.reload()}
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
