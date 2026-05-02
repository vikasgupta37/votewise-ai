/**
 * ErrorBoundary Component
 * Catches React rendering errors gracefully to improve stability (Code Quality & Security).
 */
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // In production, this would log to a service like Sentry
    console.error('VoteWise AI Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            padding: '30px',
            textAlign: 'center',
            background: 'var(--surface-color)',
            borderRadius: '12px',
            margin: '20px',
            border: '1px solid var(--error)',
          }}
        >
          <h2 style={{ color: 'var(--error)', marginBottom: '10px' }}>
            ⚠️ Something went wrong
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: '10px 20px',
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
