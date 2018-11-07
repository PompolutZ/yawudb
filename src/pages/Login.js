import React, { Component } from 'react';
import firebase from '../firebase';
import GoogleButton from 'react-google-button';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import EmailAndPasswordForm from '../components/EmailAndPasswordForm';


const OrSeparator = () => (
    <div style={{ display: 'flex', margin: '0 1rem', width: '20rem'}}>
        <div style={{ flex: '1 1 auto'}}>
            <div style={{ height: '48%', margin: '0 .5rem 0 0', borderBottom: '1px solid gray'}}></div>
            <div></div>
        </div>
        <div style={{ flex: '0 1 auto', color: 'gray'}}>
            OR
        </div>
        <div style={{ flex: '1 1 auto'}}>
            <div style={{ height: '48%', margin: '0 0 0 .5rem', borderBottom: '1px solid gray'}}></div>
            <div></div>
        </div>
    </div>
)

const CreateAccount = withRouter(({ history, styles }) => {
    const redirectToSignUpPage = () => {
        history.push('/user/signup');
    }

    return (
        <div style={{ display: 'flex', ...styles}}>
            <div style={{ margin: '0 .3rem 0 0'}}>New to the YAWUDB?</div>
            <div style={{ color: '#3B9979', cursor: 'pointer' }} onClick={redirectToSignUpPage}><b>SIGN UP</b></div>
        </div>
    );
})

const ErrorMessage = ({ error }) => {
    if(!error) {
        return <span></span>
    }

    return (
        <div style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'center', maxWidth: '20rem' }}>
            <div style={{ color: 'red', margin: '1rem' }}>{error}</div>            
        </div>
    )
}

class Login extends Component {

    state = {
        loginError: null
    }

    render() {
        return(
            <div style={{display: 'flex', alignItems: 'center', flexFlow: 'column nowrap'}}>
                <FacebookLoginButton onClick={this.handleFacebookLogin} style={{margin: '1rem', width: '19rem'}} />
                <GoogleButton onClick={this.handleGoogleLogin} style={{margin: '0 1rem 1rem 1rem', width: '20rem'}} />

                <OrSeparator />

                <EmailAndPasswordForm purpose="Sign in" onUseCredentials={this.handleEmailAndPasswordLogin} />
                <ErrorMessage error={this.state.loginError} />
                <CreateAccount styles={{ margin: '1rem 0 2rem 0'}} />
            </div>
        );
    }

    handleFacebookLogin = () => {
        this.handleLogin(new firebase.auth.FacebookAuthProvider());
    }

    handleGoogleLogin = () => {
        this.handleLogin(new firebase.auth.GoogleAuthProvider());
    }

    handleEmailAndPasswordLogin = async (username, password) => {
        try {
            this.setState({ loginError: null });
            await firebase.auth().signInWithEmailAndPassword(username, password);
        } catch(err) {
            if(err.code === 'auth/user-not-found') {
                this.setState({ loginError: "Sorry, but you either mistyped your email and/or password or you need to sign up." });
            } else {
                this.setState({ loginError: err.message });
            }
        }
    }

    handleLogin = provider => {
        firebase.auth().signInWithRedirect(provider);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch({type: 'SET_USER', user: user})
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Login));