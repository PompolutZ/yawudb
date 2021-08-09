import React, { useState, useEffect, useContext, createContext } from "react";
import { FirebaseContext } from "../firebase";

const AuthUserContext = createContext();

function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = useState(
        JSON.parse(localStorage.getItem("yawudb_authUser"))
    );
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const releaseAuthListener = firebase.onAuthUserListener(
            (authUser) => {
                localStorage.setItem(
                    "yawudb_authUser",
                    JSON.stringify(authUser)
                );
                setAuthUser(authUser);
            },
            () => {
                localStorage.removeItem("yawudb_authUser");
                setAuthUser(null);
            }
        );

        return () => releaseAuthListener();
    }, [firebase]);

    return (
        <AuthUserContext.Provider value={authUser}>
            { children }
        </AuthUserContext.Provider>
    )
}

function useAuthUser() {
    const authUser = useContext(AuthUserContext);
    if (authUser === undefined) {
        throw Error(
            "useAuthUser should be used within AuthContextProvider"
        );
    }

    return authUser;
}

export { AuthContextProvider };

export default useAuthUser;
