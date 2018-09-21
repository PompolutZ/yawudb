import React, { Component } from 'react';
import firebase from '../firebase';
import GoogleButton from 'react-google-button';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Login extends Component {
    handleLogin = provider => {
        firebase.auth().signInWithRedirect(provider);
    }

    async componentDidMount() {
        try {
            const r = await firebase.auth().getRedirectResult();
            if (r.credential) {
                const {email, displayName, uid} = r.user;
                this.props.onLogin({email, displayName, uid});
                this.props.history.push('/mydecks');
            }
        } catch(error) {
            console.log('ERROR', error);
        }
    }

    render() {
        return(
            <div style={{display: 'flex', alignItems: 'center', flexFlow: 'column nowrap'}}>
                <FacebookLoginButton onClick={() => this.handleLogin(new firebase.auth.FacebookAuthProvider())} style={{margin: '1rem'}} />
                <GoogleButton onClick={() => this.handleLogin(new firebase.auth.GoogleAuthProvider())} style={{margin: '0 1rem 1rem 1rem'}} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch({type: 'SET_USER', user: user})
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Login));