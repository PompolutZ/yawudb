import React from 'react';
import useAuthUser from '../../hooks/useAuthUser';
import MyDecksAuth from './MyDecksAuth2';
import MyDecksAnon from './MyDecksAnon';

function MyDecksPage() {
    const authUser = useAuthUser();
    return (
        <>{
            authUser 
            ? <MyDecksAuth />
            : <MyDecksAnon />
        }</>
    )
}

export default MyDecksPage;