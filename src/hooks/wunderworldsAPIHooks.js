import axios from "axios";
import useAxios from "axios-hooks";
import Firebase from "../firebase";

axios.defaults.baseURL = process.env.REACT_APP_WUNDERWORLDS_API_ORIGIN;
axios.interceptors.request.use(
    async (config) => {
        try {
            const token = await Firebase.getTokenId();
            if (token) {
                config.headers = {
                    authtoken: token,
                };
            }
            return config;
        } catch(e) {
            console.error(e);
            return config;
        } 
    },
    (error) => {
        console.error(error);
        Promise.reject(error)
    }
);

export const useCardsRatings = (manual = false) => useAxios({}, { manual });

export const useListAllPublicDecks = (manual = false) =>
    useAxios({ method: "POST", url: "/api/v1/public-decks" }, { manual });

export const useGetUserDecks = (manual = false) =>
    useAxios("/api/v1/user-decks", { manual });

export const useGetUserDeckById = (deckId, manual = false) =>
    useAxios(`/api/v1/user-decks/${deckId}`, { manual });

export const usePostUserDeck = () =>
    useAxios({ method: "POST", url: "/api/v1/user-decks" }, { manual: true });

export const useUpdateUserDeck = () =>
    useAxios({ method: "PUT", url: "/api/v1/user-decks" }, { manual: true });

export const useDeleteUserDeck = () =>
    useAxios({ method: "DELETE" }, { manual: true });

export const useGetUserData = (manual = false) =>
    useAxios("/api/v1/users", { manual });

export const useUpdateUser = () => 
    useAxios({ method: "PUT", url: "/api/v1/users" }, { manual: true });

export const useCreateUser = () => 
    useAxios({ method: "POST", url: "/api/v1/users" }, { manual: true });

