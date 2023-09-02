import { Component } from 'react';
import ErrorPage from '@/routes/error-page';
import type { PropsWithChildren, ErrorInfo, ReactNode } from 'react';

interface IState extends Readonly<{}> {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component {
  public declare props: PropsWithChildren;
  public state: IState;

  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ hasError: true });
    console.log({ error, errorInfo });
  }

  render(): ReactNode {
    if (this.state.hasError)
      return (
        <ErrorPage
          retryFn={(): void => this.setState({ hasError: false, error: null })}
        />
      );
    return this.props.children;
  }
}
