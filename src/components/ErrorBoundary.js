import React from 'react';

class ErrorPresenter extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', height: '75vh'}}>
                <div style={{ margin: 'auto',  display: 'flex', flexFlow: 'column', alignItems: 'center'}}>
                    <div style={{ maxWidth: '80%'}}>
                    Oops, developer was sloppy and the page you requested is under effect of Shardfall token.
                    </div>
                    <img src="/assets/icons/error-fallback.png" alt="error" width="50%" height="50%" />
                    <div style={{ maxWidth: '80%'}}>
                        Worry not though! Help is on its way.
                    </div>

                </div>
            </div>
        );
    }
}

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, info) {
      // You can also log the error to an error reporting service
      //logErrorToMyService(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <ErrorPresenter />;
      }
  
      return this.props.children; 
    }
  }

export default ErrorBoundary;