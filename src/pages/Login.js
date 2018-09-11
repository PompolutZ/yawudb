import React, { Component } from 'react';
import firebase from 'firebase';
import GoogleButton from 'react-google-button';

class Login extends Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }

    async componentDidMount() {
        const r = await firebase.auth().getRedirectResult();
        if (r.credential) {
            const {email, displayName, uid} = r.user;
            console.log(email, displayName, uid);
        }
    }

    render() {
        return(
            <div>
                <GoogleButton onClick={this.handleLogin} style={{margin: '1rem'}} />
            </div>
        );
    }
}

export default Login;