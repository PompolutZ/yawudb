import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: null,
    reducer: {
        setUser(state, action) {
            return action.payload;
        },
        clearUser(state, action) {
            return null;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
