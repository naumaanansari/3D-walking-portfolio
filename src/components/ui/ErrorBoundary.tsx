import React, { Component, ErrorInfo, ReactNode } from 'react';
import { FallbackView } from './FallbackView';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('ErrorBoundary caught error in 3D scene:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <FallbackView />;
    }

    return this.props.children;
  }
}
