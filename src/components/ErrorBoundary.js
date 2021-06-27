import React from "react";
import { withFirebase } from "../firebase";

class ErrorPresenter extends React.Component {
    render() {
        return (
            <div className="w-full h-full grid place-content-center bg-gray-100">
                <div className="flex flex-col items-center">
                    <h1 className="text-gray-900 text-2xl">
                        Oops, developer was sloppy and the page you requested is
                        under effect of Shardfall token.
                    </h1>
                    <img
                        src="/assets/icons/error-fallback.png"
                        alt="error"
                        width="50%"
                        height="50%"
                    />
                    Worry not though! Help is on its way. Or you can ask on
                    Discord :)
                </div>
            </div>
        );
    }
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, info: "", error: "" };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error: error };
    }

    componentDidCatch(error, info) {
        //this.setState({ error: error, info: info });
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <ErrorPresenter
                    error={this.state.error}
                    info={this.state.info}
                />
            );
        }

        return this.props.children;
    }
}

export default withFirebase(ErrorBoundary);
