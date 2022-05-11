import { Link, useNavigate } from "react-router-dom";
import shopeeQR from "../../assets/img/mainImg/QRcode/shopeeQR.png";
import appleQR from "../../assets/img/mainImg/QRcode/appleQR.png";
import googleQR from "../../assets/img/mainImg/QRcode/googleQR.png";
import galleryQR from "../../assets/img/mainImg/QRcode/galleryQR.png";
import { useState, useEffect, useContext, memo } from "react";
import UserContext from "store/Context";
import { logout } from "store/Actions";
import axios from "axios";

function NavbarHeader() {
    const { user, dispatch } = useContext(UserContext);
    const [notifyList, setNotifyList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/notify?limit=5`)
            .then((res) => setNotifyList(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleLogout = () => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/user/logout`, { _id: user._id })
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
                    <Link
                        to="https://banhang.shopee.vn/"
                        rel="noreferrer"
                        target="_blank"
                        className="navbar__hover separate-item"
                    >
                        Kênh người bán
                    </Link>
                    <Link
                        to="https://shopee.vn/m/sell-on-shopee"
                        className="navbar__hover separate-item "
                    >
                        Trở thành người bán shopee
                    </Link>
                    <Link
                        to="https://shopee.vn/web"
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
                    </Link>
                    <Link to="#">
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
                    </Link>
                </div>
            </div>
            <div className="navbar__headerRight">
                <div className="navbar__list">
                    <Link
                        to=""
                        className="navbar__hover notify-header"
                    >
                        <i className="far fa-bell mr-right"></i>
                        Thông báo
                        <div className="notify__hover">
                            <div className="notify-title">Thông báo mới nhận</div>
                            <ul className="notify-list">
                                {notifyList.map((item, key) => (
                                    <li className="notify-list-item" key={key}>
                                        <Link to="">
                                            <img
                                                src={item.image}
                                                alt=""
                                                width="35px"
                                                height="35px"
                                            />
                                            <div className="notify-body">
                                                <div className="notify-name">{item.title}</div>
                                                <div className="notify-content">{item.content}</div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <Link to="" className="all-notify">
                                Xem tất cả
                            </Link>
                        </div>
                    </Link>
                    <Link
                        to="https://help.shopee.vn/vn/s/"
                        target="_blank"
                        rel="noreferrer"
                        className="navbar__hover"
                    >
                        <i className="far fa-question-circle mr-right"></i>
                        Hỗ trợ
                    </Link>
                    <Link to="" className="navbar__hover">
                        <i className="far fa-question-circle mr-right"></i>
                        Tiếng việt
                        <i className="fas fa-chevron-down mr-left"></i>
                    </Link>
                    {user ? (
                        <>
                            <Link to="" className="user-avatar navbar__hover">
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
                            </Link>
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
