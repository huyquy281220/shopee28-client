import "./App.css";
import { useEffect, useState } from "react";
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
import Cart from "components/products/Cart";
import Mall from "components/body/shopee_mall/Mall";
import ErrorPage from "utils/error/Error";
import ProductDetail from "components/products/ProductDetail";
import PrivateRoute from "components/users/PrivateRoute";

//

function App() {
    const [popup, setPopup] = useState(true);

    useEffect(() => {
        const handleClosePopup = () => setPopup(false);
        window.addEventListener("click", handleClosePopup);

        return window.removeEventListener("click", handleClosePopup);
    }, []);

    return (
        <div className="App">
            {popup && (
                <div className="popup">
                    <Link to="">
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
            </Routes>
        </div>
    );
}

export default App;

//useEffect
// cập nhật lại state
// cập nhật DOM
// render lại ui
// gọi cleanup nếu deps thay đổi
// gọi callback

// useLayoutEffect
// cập nhật lại state
// cập nhật DOM
// gọi cleanup nếu deps thay đổi(sync)
// gọi callback(sync)
// render ui

// useRef
//memo() -> HOC higher order components
//tránh re-render components k cần thiết
// useCallBack tạo tham chiếu ngoài components
// useMemo tránh lặp logic k cần thiết
// useReducer [state,dispatch] = useReducer(reducer, initial):
// init state
// actions
//reducer
//dispatch

// context:
//create context
//provider
//consumer
