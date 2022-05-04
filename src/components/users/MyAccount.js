import "../../styles/users/MyAccount.css";
import { NavLink, Routes, Route } from "react-router-dom";
import UserContext from "../../store/Context";
import { useContext } from "react";
// import Header from "../header/Header";
// import Profile from "../users/Profile";
// import Payment from "../users/Payment";

function MyAccount() {
    const { user } = useContext(UserContext);
    let activeStyle = { color: "#ee4d2d" };
    return (
        <div className="myAccount">
            <div className="myAccount__body">
                <div className="myAccount__body-left">
                    <div className="header-left">
                        <div className="avatar">
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="name">
                            <span>{user.username}</span>
                        </div>
                    </div>
                    <div className="body-left">
                        <div className="list-features">
                            <a href="" className="account ">
                                <i className="fas fa-user mr-15"></i>
                                <span>Tài khoản của tôi</span>
                            </a>
                            <ul>
                                <li>
                                    <NavLink
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                        to="/user/account/profile"
                                    >
                                        Hồ sơ
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                        to="/user/account/payment"
                                    >
                                        Ngân hàng
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                        to=""
                                    >
                                        Địa chỉ{" "}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                        to=""
                                    >
                                        Đổi mật khẩu
                                    </NavLink>
                                </li>
                            </ul>
                            <a href="" className="purchase-order ">
                                <i className="fas fa-clipboard-list mr-15"></i>
                                <span>Đơn mua</span>
                            </a>
                            <a href="" className="notify ">
                                <i className="fas fa-bell mr-15"></i>
                                <span>Thông báo</span>
                            </a>
                            <a href="" className="voucher-repository ">
                                <i className="fas fa-warehouse mr-15"></i>
                                <span>Kho Voucher</span>
                            </a>
                            <a href="" className="shopee-coin ">
                                <i className="fas fa-coins mr-15"></i>
                                <span>Shopee xu</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="myAccount__body-right"></div>
            </div>
        </div>
    );
}

export default MyAccount;
