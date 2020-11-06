function auth(state = null, action) {
    switch (action.type) {
        case "SET_USER":
            return action.user;
        case "CLEAR_USER":
            return null;
        default:
            return state;
    }
}

export const mergeLoadedStateWithInitial = (loadedState) => {
    return { ...loadedState.auth };
};

export default auth;
