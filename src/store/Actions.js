export const loginStart = () => ({
    type: "LOGIN_START",
});
export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});
export const loginFailure = () => ({
    type: "LOGIN_FAILURE",
});

//logout

export const logout = () => ({
    type: "LOGOUT",
});

//cart
export const addToCart = (item) => ({
    type: "ADD_TO_CART",
    payload: item,
});

export const removeFromCart = (itemId) => ({
    type: "REMOVE_FROM_CART",
    payload: itemId,
})

//refresh token