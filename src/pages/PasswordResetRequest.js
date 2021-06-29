import React, { useContext, useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../firebase";

function PasswordResetRequest() {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [redirectCountdown, setRedirectCountdown] = useState(3);
    const [errorMessage, setErrorMessage] = useState("");
    const firebase = useContext(FirebaseContext);
    const intervalRef = useRef();
    const history = useHistory();

    useEffect(() => {
        if (redirectCountdown <= 0) {
            clearInterval(intervalRef.current);
            history.replace("/login");
        }
    }, [redirectCountdown, history]);

    const handleClick = async () => {
        try {
            await firebase.auth.sendPasswordResetEmail(email);

            setEmailSent(true);

            intervalRef.current = setInterval(() => {
                setRedirectCountdown((prev) => prev - 1);
            }, 1000);
        } catch (err) {
            setErrorMessage(err.message)
        }
    };

    if (emailSent) {
        return (
            <div className="flex-1 text-gray-900">
                <div className="w-full sm:w-2/4 lg:w-1/4 mx-auto p-4 space-y-4">
                    <div>
                        Email with a link to reset your password has been sent.
                    </div>
                    <div>
                        Back to the gates in {this.state.redirectCountdown}{" "}
                        seconds...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 text-gray-900">
            <div className="w-full sm:w-2/4 lg:w-1/4 mx-auto p-4 space-y-4">
                <h1>You will receive an email with a link to reset your password.</h1>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    value={email}
                    type="email"
                    className="px-3 py-2 w-full border border-purple-300 focus:ring focus:ring-purple-500 focus:outline-none"
                />

                <button
                    className="w-full focus:bg-purple-500 btn btn-purple mr-8 cursor-pointer hover:font-semibold px-4 py-2 font-bold"
                    onClick={handleClick}
                >
                    Request password reset
                </button>
                <div className="text-red-500">{errorMessage}</div>
            </div>
        </div>
    );
}

export default PasswordResetRequest;