import React, { createContext } from "react";
import { openDB } from 'idb';

const IndexDbContext = createContext();

class IndexDb {
    indexdb = null;
    
    constructor() {
        this.indexdb = openDB('wunderworldsdb', 1);
    }
}

const IndexDbProvider = ({ children }) => {
    return <IndexDbContext.Provider value={new IndexDb()}>{children}</IndexDbContext.Provider>;
};

export default IndexDbProvider;
