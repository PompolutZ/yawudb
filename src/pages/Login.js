import React, { Component } from 'react';
import firebase from 'firebase';
import GoogleButton from 'react-google-button';
import { FacebookLoginButton } from 'react-social-login-buttons';

class Login extends Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }

    async componentDidMount() {
        try {
            const r = await firebase.auth().getRedirectResult();
            if (r.credential) {
                const {email, displayName, uid} = r.user;
                console.log(email, displayName, uid);
            }
        } catch(error) {
            console.log('ERROR', error);
        }
    }

    render() {
        return(
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <FacebookLoginButton onClick={this.handleLogin} style={{margin: '1rem'}} />
            </div>
        );
    }
}

export default Login;