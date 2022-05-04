import "./App.css";
import { Routes, Route } from "react-router-dom";

//
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Body from "./components/body/Body";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Admin from "./components/admin/Admin";
//
import MyAccount from "./components/users/MyAccount";
import Cart from "./components/products/Cart";
import Mall from "./components/body/shopee_mall/Mall";
// import Notify from "./components/"
import ErrorPage from "./utils/error/Error";
import ProductDetail from "./components/products/ProductDetail";
import PrivateRoute from "./components/users/PrivateRoute";
//

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/user/register" element={<Register />}></Route>
                <Route path="/user/login" element={<Login />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
                <Route
                    path="/*"
                    element={
                        <>
                            <Header />
                            <Routes>
                                <Route path="/" element={<Body />}></Route>
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
                                <Route path="/product/details/:id" element={<ProductDetail />} />
                                <Route path="/error" element={<ErrorPage />} />
                            </Routes>
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
