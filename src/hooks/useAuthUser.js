import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";

function useAuthUser() {
    const [authUser, setAuthUser] = useState(
        JSON.parse(localStorage.getItem("yawudb_authUser"))
    );
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        firebase.auth.getRedirectResult().then(r => console.log(r)).catch(e => console.error(e));
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

    return authUser;
}

export default useAuthUser;
