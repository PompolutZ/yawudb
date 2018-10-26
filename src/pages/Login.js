import React, { Component } from 'react';
import firebase, { db } from '../firebase';
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
                const { displayName, uid, photoURL } = r.user;
                const userProfileRef = await db.collection('users').doc(uid).get();
                if(!userProfileRef.exists) {
                    await db.collection('users').doc(uid).set({
                        displayName: displayName,
                        mydecks: [],
                        role: 'soul'
                    });

                    this.props.onLogin({ displayName, uid, role: 'sole', avatar: photoURL });
                    this.props.history.push('/mydecks');
                }

                const profile = userProfileRef.data();
                this.props.onLogin({ displayName: profile.displayName, role: profile.role, avatar: photoURL, uid });
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