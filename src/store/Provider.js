import Context from "./Context";
import { useReducer, useEffect } from "react";
import reducer, { initState } from "./reducer";

function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <Context.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export default Provider;
