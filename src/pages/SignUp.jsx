import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AvatarPicker from "../components/AvatarPicker";
import { MY_DECKS } from "../constants/routes";
import { FirebaseContext } from "../firebase";
import { useCreateUser } from "../hooks/wunderworldsAPIHooks";

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

function SignUp() {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);
    const [, create] = useCreateUser();
    const [signUpError, setError] = useState(null);
    const [displayName, setDisplayName] = useState("");
    const [avatar, setAvatar] = useState("garreks-reavers");

    const handleSignUp = async (username, password) => {
        try {
            setError(null);

            await firebase.createUserWithEmailAndPassword(username, password);
            
            const payload = {
                displayName,
                avatar,
            };

            await create({ data: payload });

            history.push(MY_DECKS);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex-1 text-gray-900">
            <div className="w-full sm:w-2/4 lg:w-1/4 mx-auto p-4 space-y-4">
                <h1 className="text-xl">Create new WUnderworlds account</h1>
                <input
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Username"
                    value={displayName}
                    type="text"
                    className="px-3 py-2 w-full border border-purple-300 focus:ring focus:ring-purple-500 focus:outline-none"
                />
                <EmailPasswordForm
                    purpose="Sign up"
                    onUseCredentials={handleSignUp}
                />

                <p>Pick your avatar image: </p>
                <AvatarPicker
                    current={avatar}
                    onSelectionChange={(v) => setAvatar(v)}
                />
                
                <p className="text-red-500">{signUpError}</p>
            </div>
        </div>
    );
}

export default SignUp;
