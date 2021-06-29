import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FirebaseContext } from "../firebase";
import SectionTitle from "../v2/components/SectionTitle";
import { MY_DECKS, PROFILE, SIGN_UP } from "../constants/routes";
import GoogleButton from "react-google-button";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useEffect } from "react";

function EmailPasswordForm({ purpose, onUseCredentials }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () => {
        onUseCredentials(email, password);
    };

    return (
        <div className="space-y-4">
            <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                value={email}
                type="email"
                className="px-3 py-2 w-full border border-purple-300 focus:ring focus:ring-purple-500 focus:outline-none"
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                value={password}
                className="px-3 py-2 w-full border border-purple-300 focus:ring focus:ring-purple-500 focus:outline-none"
            />

            <div>
                <Link
                    className="text-sm font-bold text-purple-700"
                    to="/requestPasswordReset"
                >
                    Forgot your password?
                </Link>
            </div>
            <button
                className="w-full focus:bg-purple-500 btn btn-purple mr-8 cursor-pointer hover:font-semibold px-4 py-2 font-bold"
                onClick={handleClick}
                disabled={!email || !password}
            >
                {purpose}
            </button>
        </div>
    );
}

const CreateAccount = () => {
    return (
        <div className="flex space-x-2">
            <div>New to the WUnderworlds?</div>
            <Link className="text-purple-700 font-bold" to={SIGN_UP}>
                Sign Up
            </Link>
        </div>
    );
};

function Login() {
    const history = useHistory();
    const [loginError, setLoginError] = useState(undefined);
    const firebase = useContext(FirebaseContext);

    React.useEffect(() => {
        const unsubscribe = firebase.onAuthUserListener(
            async (user) => {
                if (user.isNew) {
                    history.replace({ pathname: PROFILE, state: user });
                } else {
                    history.replace(MY_DECKS)
                }
            },
            () => {}
        );

        return () => {
            unsubscribe();
        };
    }, [firebase, history]);

    const handleEmailAndPasswordLogin = async (username, password) => {
        try {
            setLoginError(null);
            
            const credentials = await firebase.signInWithEmailAndPassword(username, password);
            
            if (credentials.user) {
                history.replace(MY_DECKS);
            }
        } catch (err) {
            if (err.code === "auth/user-not-found") {
                setLoginError(
                    "Sorry, but you either mistyped your email and/or password or you need to sign up."
                );
            } else {
                setLoginError(err.message);
            }
        }
    };

    return (
        <div className="flex-1 text-gray-900">
            <div className="w-full sm:w-2/4 lg:w-1/4 mx-auto p-4 space-y-4">
                <h1 className="text-xl">Welcome to WUnderworlds, stranger!</h1>
                <FacebookLoginButton
                    style={{ margin: "1rem 0" }}
                    onClick={firebase.signInWithFacebookProvider}
                />
                <GoogleButton
                    style={{ width: "100%" }}
                    onClick={firebase.signInWithGoogleProvider}
                />

                <SectionTitle title="OR" />

                <EmailPasswordForm
                    purpose="Sign in"
                    onUseCredentials={handleEmailAndPasswordLogin}
                />
                
                <p className="text-red-500">{loginError}</p>
                
                <CreateAccount styles={{ margin: "1rem 0 2rem 0" }} />
            </div>
        </div>
    );
}

export default Login;
