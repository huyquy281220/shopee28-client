export const initState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
};

export default function reducer(state, action) {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
            };
        default:
            return { ...state };
    }
}
