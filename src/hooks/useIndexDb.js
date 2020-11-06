import React, { createContext, useEffect, useState } from "react";
import { openDB } from "idb";

function useIndexDB(name, version, upgrade) {
    const [db, setDB] = useState(null);

    useEffect(() => {
        if (upgrade) {
            openDB(name, version, { upgrade })
                .then((db) => setDB(db))
                .catch((err) => console.error(err));
        } else {
            openDB(name, version)
                .then((db) => setDB(db))
                .catch((err) => console.error(err));
        }
    }, []);

    return db;
}

export default useIndexDB;
