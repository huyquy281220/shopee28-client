import "styles/users/MyAccount.css";
import { Link } from "react-router-dom";
import UserContext from "../../store/Context";
import { useContext } from "react";

function MyAccount({ children }) {
    const { user } = useContext(UserContext);
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
                            <Link to="" className="account ">
                                <i className="fas fa-user mr-15"></i>
                                <span>Tài khoản của tôi</span>
                            </Link>
                            <ul>
                                <li>
                                    <Link to="/user/account/profile/">Hồ sơ</Link>
                                </li>
                                <li>
                                    <Link to="/user/account/payment">Ngân hàng</Link>
                                </li>
                                <li>
                                    <Link to="">Địa chỉ </Link>
                                </li>
                                <li>
                                    <Link to="">Đổi mật khẩu</Link>
                                </li>
                            </ul>
                            <Link to="" className="purchase-order">
                                <i className="fas fa-clipboard-list mr-15"></i>
                                <span>Đơn mua</span>
                            </Link>
                            <Link to="" className="notify ">
                                <i className="fas fa-bell mr-15"></i>
                                <span>Thông báo</span>
                            </Link>
                            <Link to="" className="voucher-repository ">
                                <i className="fas fa-warehouse mr-15"></i>
                                <span>Kho Voucher</span>
                            </Link>
                            <Link to="" className="shopee-coin ">
                                <i className="fas fa-coins mr-15"></i>
                                <span>Shopee xu</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="myAccount__body-right">{children}</div>
            </div>
        </div>
    );
}

export default MyAccount;
