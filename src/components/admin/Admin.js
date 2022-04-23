import "../../styles/admin/Admin.css";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../../store/Context";
import { logout } from "../../store/Actions";
import axios from "axios";
import axiosJWT from "../../utils/RefreshToken/refreshToken";

function IsAdmin() {
    const { user, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const [allUser, setAllUser] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const admin = JSON.parse(localStorage.getItem("user"));

    const handleGetAllUser = () => {
        axiosJWT
            .get("/admin/get-users", {
                headers: {
                    token: "Bearer " + admin.accessTokenAuth,
                },
            })
            .then((res) => setAllUser(res.data))
            .catch((err) => console.log(err));
    };

    const handleGetAllProduct = () => {
        axiosJWT
            .get("/admin/get-products", {
                headers: {
                    token: "Bearer " + admin.accessTokenAuth,
                },
            })
            .then((res) => setAllProducts(res.data))
            .catch((err) => navigate("/error", { err }));
    };

    const handleLogout = () => {
        axios
            .post("/user/logout", { _id: user._id })
            .then(() => {
                dispatch(logout());
            })
            .catch((err) => console.log(err));
    };

    const handleDeleteUser = (userId) => {
        axiosJWT
            .delete(
                `/admin/delete-user?id=${userId}`,
                {
                    headers: {
                        token: "Bearer " + admin.accessTokenAuth,
                    },
                },
                { _id: userId }
            )
            .then()
            .catch((err) => console.log(err));
    };

    return (
        <div className="admin-dashboard">
            <div className="header-dashboard">Hello {user.username}</div>
            <Link to="/" onClick={handleLogout}>
                Đăng xuất
            </Link>
            <div className="body-dashboard">
                <div className="admin-sidebar">
                    <div className="sidebar-title">My Dashboard</div>
                    <ul>
                        <li onClick={handleGetAllUser}>
                            {/* <i className="fas fa-user"></i> */}
                            User
                        </li>
                        <li onClick={handleGetAllProduct}>Product</li>
                    </ul>
                </div>
                <div className="admin-data">
                    {allUser.map((user) => (
                        <div className="user-data" key={user.userId}>
                            <div className="user-pic">{user.profilePic}</div>
                            <div className="user-desc">
                                <div className="user-name">
                                    {user.username} ({user.isAdmin ? "admin" : "user"})
                                </div>
                                <div
                                    className={"active-status" + (user.isOnline ? " online" : "")}
                                ></div>
                            </div>
                            <div className="delete-user">
                                <button onClick={() => handleDeleteUser(user._id)}>Xóa</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default IsAdmin;
