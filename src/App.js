import "./App.css";
import { useEffect, useState, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";

//
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import Body from "components/body/Body";
import Wrapper from "components/body/Wrapper";
import Register from "components/users/Register";
import Login from "components/users/Login";
import Admin from "components/admin/Admin";
//
import MyAccount from "components/users/MyAccount";
import Profile from "components/users/Profile";
import Cart from "components/cart/Cart";
import Mall from "components/body/shopeeMall/Mall";
import ErrorPage from "utils/error/Error";
import ProductDetail from "components/productDetail/ProductDetail";
import PrivateRoute from "utils/privateRoute/PrivateRoute";

//

function App() {
    const popupRef = useRef();
    const [popup, setPopup] = useState(true);

    useEffect(() => {
        const handleClosePopup = (e) => {
            if (e.target.contains(popupRef.current)) {
                setPopup(false);
            }
        };
        document.body.addEventListener("click", handleClosePopup);

        return () => {
            document.body.removeEventListener("click", handleClosePopup);
        };
    }, []);

    return (
        <div className="App">
            {popup && window.location.pathname === "/" && (
                <div className="popup">
                    <Link to="" ref={popupRef}>
                        <img
                            src="https://cf.shopee.vn/file/8668365043688f109a192604e11a2d3c"
                            alt=""
                            width="483px"
                            height="543px"
                        />
                    </Link>
                    <button className="close-btn" onClick={() => setPopup(false)}>
                        <svg viewBox="0 0 16 16" stroke="#000" className="home-popup__close-button">
                            <path stroke-linecap="round" d="M1.1,1.1L15.2,15.2"></path>
                            <path stroke-linecap="round" d="M15,1L0.9,15.1"></path>
                        </svg>
                    </button>
                </div>
            )}
            <Routes>
                <Route path="/user/register" element={<Register />}></Route>
                <Route path="/user/login" element={<Login />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
                <Route
                    path="/*"
                    element={
                        <>
                            <Header />
                            <Body>
                                <Routes>
                                    <Route path="/" element={<Wrapper />} />
                                    <Route path="/mall" element={<Mall />} />
                                    <Route
                                        path="/user/account/profile/id=:id"
                                        element={
                                            <PrivateRoute>
                                                <MyAccount />
                                            </PrivateRoute>
                                        }
                                    />
                                    <Route
                                        path="/user/cart"
                                        element={
                                            <PrivateRoute>
                                                <Cart />
                                            </PrivateRoute>
                                        }
                                    />
                                    <Route
                                        path="/product/details/:id"
                                        element={<ProductDetail />}
                                    />
                                    <Route path="/error" element={<ErrorPage />} />
                                </Routes>
                            </Body>
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/user/account/*"
                    element={
                        <PrivateRoute>
                            <Header />
                            <MyAccount>
                                <Profile />
                            </MyAccount>
                            <Footer />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
