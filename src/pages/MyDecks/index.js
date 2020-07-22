import React from 'react';
import useAuthUser from '../../hooks/useAuthUser';
import MyDecksAuth from './MyDecksAuth/index';
import MyDecksAnon from './MyDecksAnon';

function MyDecksPage() {
    const authUser = useAuthUser();
    return (
        <div>{
            authUser 
            ? <MyDecksAuth />
            : <MyDecksAnon />
        }</div>
    )
}

export default MyDecksPage;