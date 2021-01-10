import { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../firebase';

export default function useRealtimeDatabaseRefOnce(path) {
    const firebase = useContext(FirebaseContext);
    const [value, setValue] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        firebase.realdb
            .ref(path)
            .once("value")
            .then((snapshot) => {
                setValue(snapshot.val());
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [firebase, path]);

    return [loading, value, error];
}
