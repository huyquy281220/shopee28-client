import "styles/products/ProductDetail.css";

import { useContext, useState, useRef } from "react";
import UserContext from "store/Context";
import { useLocation, useNavigate } from "react-router-dom";
import numberWithCommas from "utils/formatPrice/numberWithCommas";
import axios from "axios";
// import axiosJWT from "../../utils/RefreshToken/refreshToken";

const handleUpdate = (user, data) => {
    axios.put(`${process.env.REACT_APP_API_URL}/user/${user._id}`, { cart: data });
};

function ProductDetail() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [addToCart, setAddToCart] = useState(false);
    const currentValue = useRef("");

    const handleQuantity = (product) => {
        console.log(product);
        const updateCart = user.cart;
        const updateItemIndex = updateCart.findIndex((item) => item._id === product._id);

        if (updateItemIndex < 0) {
            updateCart.push(product);
        } else {
            const updateItem = { ...updateCart[updateItemIndex] };
            updateItem.qtySelected++;
            updateCart[updateItemIndex] = updateItem;
        }
        return updateCart;
    };

    const handleAddToCart = (type = "add") => {
        setAddToCart(true);
        setTimeout(() => {
            handleBuy(type);
            setAddToCart(false);
        }, 2000);
    };

    const handleBuy = (type) => {
        const qtyBuy = currentValue.current.defaultValue;
        console.log(type);
        if (user) {
            axios
                .get(`${process.env.REACT_APP_API_URL}/products/${state._id}?qty=${qtyBuy}`)
                .then((res) => {
                    handleQuantity(res.data);
                })
                .catch((err) => navigate("/error", { error: err }));

            localStorage.setItem("user", JSON.stringify(user));
            handleUpdate(user, user.cart);
            type !== "add" && navigate("/user/cart", { replace: true });
        } else {
            navigate("/user/login");
        }
    };

    return (
        <div className="productDetail-wrapper">
            {addToCart === true && (
                <div className="overlay">
                    <i
                        style={{ display: "block", fontSize: "7rem", padding: "10px 0 15px" }}
                        className="fas fa-check-circle"
                    ></i>
                    Sản phẩm đã được thêm vào giỏ hàng
                </div>
            )}
            <div className="productDetail__body">
                <div className="productDetail">
                    <div className="productDetail-left">
                        <div className="product-img">
                            <img src={state.image} alt="" />
                        </div>
                        <div className="social-media">
                            <span>Chia sẻ: </span>
                            <button>
                                <i className="fab fa-facebook"></i>
                            </button>
                            <button>
                                <i className="fab fa-facebook-messenger"></i>
                            </button>
                            <button>
                                <i className="fab fa-pinterest"></i>
                            </button>
                            <button>
                                <i className="fab fa-twitter"></i>
                            </button>
                        </div>
                    </div>
                    <div className="productDetail-right">
                        <div className="product-desc">{state.desc}</div>
                        <div className="product-price">
                            <span className="currency-unit">₫</span>
                            {numberWithCommas(state.price)}
                        </div>
                        <div className="transport">
                            <div className="transport-left">Vận chuyển</div>
                            <div className="transport-right">
                                <div className="free-transport">
                                    <img
                                        className="transport-icon"
                                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/pdp/1cdd37339544d858f4d0ade5723cd477.png"
                                        alt=""
                                        width="25px"
                                        height="15px"
                                    />
                                    Miễn phí vận chuyển
                                    <div style={{ color: "rgba(0,0,0,.54)" }}>
                                        Miễn phí vận chuyển cho đơn hàng trên 300.000 VND
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-qty">
                            <div className="product-qty-left">Số lượng</div>
                            <div className="product-qty-right">
                                <button className="minus">
                                    <i className="fas fa-minus"></i>
                                </button>
                                <input
                                    type="text"
                                    ref={currentValue}
                                    defaultValue="1"
                                    className="product-quantity"
                                />
                                <button className="plus">
                                    <i className="fas fa-plus"></i>
                                </button>
                                <div className="product-available" style={{ color: "#757575" }}>
                                    {state.quantity} sản phẩm có sẵn
                                </div>
                            </div>
                        </div>
                        <div className="product-buy">
                            <button className="add" onClick={handleAddToCart}>
                                Thêm vào giỏ hàng
                            </button>
                            <button className="buy" onClick={() => handleBuy("buy")}>
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
export { handleUpdate };
