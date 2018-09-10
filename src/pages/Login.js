import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
// import GoogleIcon from 'material-ui-community-icons/icons/google';
import SvgIcon from '@material-ui/core/SvgIcon';


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
            // this.props.OnLogin(email, uid, displayName);
            // this.props.history.push('/mydecks');
        }

        // const uiConfig = {
        //     callbacks: {
        //       signInSuccessWithAuthResult: onSuccessfulAuth,
        //       uiShown: function() {
        //         // The widget is rendered.
        //         // Hide the loader.
        //         document.getElementById('loader').style.display = 'none';
        //       }
        //     },
        //     // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        //     signInFlow: 'popup',
        //     // signInSuccessUrl: '/',
        //     signInOptions: [
        //       // Leave the lines as is for the providers you want to offer your users.
        //       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //       firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //       firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //       firebase.auth.GithubAuthProvider.PROVIDER_ID,
        //       firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //       firebase.auth.PhoneAuthProvider.PROVIDER_ID
        //     ],
        //     // Terms of service url.
        //     tosUrl: '<your-tos-url>',
        //     // Privacy policy url.
        //     privacyPolicyUrl: '<your-privacy-policy-url>'
        //   };

        //   const ui = new firebaseui.auth.AuthUI(firebase.auth());
        //   // The start method will wait until the DOM is loaded.
        // ui.start('#firebaseui-auth-container', uiConfig);
    }

    render() {
        return(
            <div>
                <Button variant="contained">
                    <SvgIcon>
                        <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
                    </SvgIcon>
                    Login with Google
                </Button>
            </div>
        );
    }
}

export default Login;