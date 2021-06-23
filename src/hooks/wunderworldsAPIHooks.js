import axios from "axios";
import useAxios from "axios-hooks";
import Firebase from "../firebase";

const firebase = new Firebase();

axios.defaults.baseURL = process.env.REACT_APP_WUNDERWORLDS_API_ORIGIN;
axios.interceptors.request.use(
    async (config) => {
        const token = await firebase.getTokenId();

        if (token) {
            config.headers = {
                authtoken: token,
            };
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const useGetUserDecks = () => useAxios('/api/v1/user-decks');
export const useDeleteUserDeck = () => useAxios({ method: 'DELETE', }, { manual: true });
