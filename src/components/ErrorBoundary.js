import React from 'react';
import { db } from '../firebase';

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
      this.state = { hasError: false, info: '', error: '' };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true, error: error };
    }
  
    componentDidCatch(error, info) {
        //this.setState({ error: error, info: info });
      // You can also log the error to an error reporting service
      //logErrorToMyService(error, info);
      db.collection('errors').add({
          error: JSON.stringify(error.message),
          stack: JSON.stringify(error.stack),
          info: JSON.stringify(info)
      }).then(docRef => console.log('Error reported: ', docRef.id))
        .catch(error => console.log('Error adding error doc', error));
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <ErrorPresenter error={this.state.error} info={this.state.info} />;
      }
  
      return this.props.children; 
    }
  }

export default ErrorBoundary;