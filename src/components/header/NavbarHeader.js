import { Link, useNavigate } from "react-router-dom";
import shopeeQR from "../../assets/img/mainImg/QRcode/shopeeQR.png";
import appleQR from "../../assets/img/mainImg/QRcode/appleQR.png";
import googleQR from "../../assets/img/mainImg/QRcode/googleQR.png";
import galleryQR from "../../assets/img/mainImg/QRcode/galleryQR.png";
import { useContext, memo } from "react";
import UserContext from "../../store/Context";
import { logout } from "../../store/Actions";
import axios from "axios";

function NavbarHeader() {
    const { user, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        axios
            .post("/user/logout", { _id: user._id })
            .then(() => {
                dispatch(logout());
                navigate("/");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="navbar__header">
            <div className="navbar__headerLeft">
                <div className="navbar__list">
                    <a
                        href="https://banhang.shopee.vn/"
                        rel="noreferrer"
                        target="_blank"
                        className="navbar__hover separate-item"
                    >
                        Kênh người bán
                    </a>
                    <a
                        href="https://shopee.vn/m/sell-on-shopee"
                        className="navbar__hover separate-item "
                    >
                        Trở thành người bán shopee
                    </a>
                    <a
                        href="https://shopee.vn/web"
                        target="_blank"
                        rel="noreferrer"
                        className="navbar__hover separate-item qr__hover"
                    >
                        Tải ứng dụng
                        <div className="navbar-qr">
                            <a href="https://shopee.vn/web" target="_blank" rel="noreferrer">
                                <img src={shopeeQR} width="100%" className="qr-shopee" alt="" />
                            </a>
                            <div className="qr-apps">
                                <a href="https://shopee.vn/web" target="_blank" rel="noreferrer">
                                    <img src={appleQR} className="qr-apple" alt="" />
                                </a>
                                <a href="https://shopee.vn/web" target="_blank" rel="noreferrer">
                                    <img src={googleQR} className="qr-google" alt="" />
                                </a>
                                <a href="https://shopee.vn/web" target="_blank" rel="noreferrer">
                                    <img src={galleryQR} className="qr-gallery" alt="" />
                                </a>
                            </div>
                        </div>
                    </a>
                    <a href="#">
                        Kết nối
                        <a
                            href="https://www.facebook.com/ShopeeVN"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a
                            href="https://www.instagram.com/Shopee_VN/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                    </a>
                </div>
            </div>
            <div className="navbar__headerRight">
                <div className="navbar__list">
                    <a href="" className="navbar__hover">
                        <i className="far fa-bell mr-right"></i>
                        Thông báo
                    </a>
                    <div className="notify__hover">
                        <ul className="notify-list">
                            <li className="notify-list-item"></li>
                        </ul>
                        <button className="all-notify">Xem tất cả</button>
                    </div>
                    <a
                        href="https://help.shopee.vn/vn/s/"
                        target="_blank"
                        rel="noreferrer"
                        className="navbar__hover"
                    >
                        <i className="far fa-question-circle mr-right"></i>
                        Hỗ trợ
                    </a>
                    <a href="" className="navbar__hover">
                        <i className="far fa-question-circle mr-right"></i>
                        Tiếng việt
                        <i className="fas fa-chevron-down mr-left"></i>
                    </a>
                    {user ? (
                        <>
                            <a href="" className="user-avatar navbar__hover">
                                <i className="fas fa-user"></i>
                                <span className="username">{user.username}</span>
                                <div className="user__hover">
                                    <Link to={`user/account/profile/id=${user._id}`}>
                                        Tài khoản của tôi
                                    </Link>
                                    <Link to="" onClick={handleLogout}>
                                        Đăng xuất
                                    </Link>
                                </div>
                            </a>
                        </>
                    ) : (
                        <>
                            <Link to="/user/register" className="navbar__hover register">
                                Đăng ký
                            </Link>
                            <Link to="/user/login" className="navbar__hover">
                                Đăng nhập
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default memo(NavbarHeader);
