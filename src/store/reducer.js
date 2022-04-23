export const initState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};

export default function reducer(state, action) {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            };
        // case "ADD_TO_CART":
        //     return {
        //         cart: [...state.cart, action.payload],
        //     };
        // case "REMOVE_FROM_CART": {
        //     return {
        //         cart: [...state.cart].splice(action.payload - 1, 1),
        //     };
        // }
        default:
            return { ...state };
    }
}
