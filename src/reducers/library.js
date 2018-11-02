export const SET_SCROLL_INDEX = 'SET_SCROLL_INDEX';

const initialState = {
    scrollIndex: 0
}

const library = (state = initialState, action) => {
    switch(action.type) {
        case SET_SCROLL_INDEX:
            return { ...state, scrollIndex: action.payload };
        default:
            return state;    
    }
}

export default library;