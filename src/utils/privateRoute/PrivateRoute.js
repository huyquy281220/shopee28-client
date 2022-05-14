import UserContext from "store/Context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const { user } = useContext(UserContext);
    return user ? children : <Navigate to="/user/login" />;
}
