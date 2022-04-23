import "../../styles/products/ProductDetail.css";

import { useContext } from "react";
import UserContext from "../../store/Context";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosJWT from "../../utils/RefreshToken/refreshToken";

const handleUpdate = (user, data) => {
    axios
        .put(`${process.env.API_URL}/user/${user._id}`, { cart: data })
        .then()
        .catch()
};

function ProductDetail() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user, dispatch } = useContext(UserContext);

    const handleQuantity = (product) => {
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

    const handleBuy = () => {
        if (user) {
            axiosJWT
                .get(`${process.env.REACT_APP_API_URL}/products/${state._id}`)
                .then((res) => {
                    handleQuantity(res.data);
                })
                .catch((err) => navigate("/error", { error: err }));

            localStorage.setItem("user", JSON.stringify(user));
            console.log(user.cart);
            handleUpdate(user, user.cart);
            navigate("/user/cart");
        } else {
            navigate("/user/login");
        }
    };

    return (
        <div className="productDetail-wrapper">
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
                            <span>₫</span>
                            {state.price}
                        </div>
                        <div className="transport">
                            <div className="transport-left">Vận chuyển</div>
                            <div className="transport-right">
                                {/* <div className="pre-order">
                                    <svg viewBox="0 0 18 18" class="shopee-svg-icon icon-preorder">
                                        <path d="M14.6 12.7h-1.3v-1.3c0-.2-.2-.4-.4-.4s-.4.2-.4.4V13c0 .2.2.4.4.4h1.7c.2 0 .4-.2.4-.4s-.2-.3-.4-.3z"></path>
                                        <path d="M12.9 8.8c-2.3 0-4.1 1.8-4.1 4.1s1.8 4.1 4.1 4.1 4.1-1.8 4.1-4.1c0-2.2-1.8-4.1-4.1-4.1zm0 7.4c-1.8 0-3.3-1.5-3.3-3.3s1.5-3.3 3.3-3.3 3.3 1.5 3.3 3.3c0 1.9-1.4 3.3-3.3 3.3z"></path>
                                        <path d="M8 15.2H2.5c-.4 0-.7-.3-.7-.7V7.8H16V3.6c0-.7-.6-1.4-1.4-1.4h-2v-1c0-.1-.1-.2-.2-.2h-.6c-.1 0-.2.1-.2.2v1.1H5.3V1.2c0-.1-.1-.2-.2-.2h-.6c-.1 0-.2.1-.2.2v1.1H2.4c-.8 0-1.4.6-1.4 1.3v11c0 .8.6 1.4 1.4 1.4H8c.2 0 .4-.2.4-.4s-.2-.4-.4-.4zM1.8 3.8c0-.4.3-.7.7-.7h1.8v.7c0 .1.1.2.2.2h.6c.1 0 .2-.1.2-.2v-.7h6.3v.7c0 .1.1.2.2.2h.6c.1 0 .2-.1.2-.2v-.7h1.9c.4 0 .7.3.7.7V7H1.8z"></path>
                                        <path d="M5.1 13.4c.2 0 .4-.2.4-.4v-1.3h1.3c.2 0 .4-.2.4-.4-.1-.1-.2-.3-.4-.3H5.5V9.8c0-.2-.2-.4-.4-.4s-.4.2-.4.4V11H3.5c-.2 0-.4.2-.4.4s.2.4.4.4h1.3V13c-.1.2.1.4.3.4z"></path>
                                    </svg>
                                </div> */}
                                <div className="free">
                                    <img
                                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/pdp/1cdd37339544d858f4d0ade5723cd477.png"
                                        alt=""
                                        width="25px"
                                        height="15px"
                                    />
                                    Miễn phí vận chuyển
                                    <div>
                                        Miễn phí vận chuyển cho đơn hàng trên <sup>₫</sup>300.000
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-qty">
                            <div className="product-qty-left">Số lượng</div>
                            <div className="product-qty-right">
                                <button
                                    className="minus"
                                    // product-id={product._id}
                                    // onClick={handleMinus}
                                >
                                    <i className="fas fa-minus"></i>
                                </button>
                                <input
                                    type="text"
                                    className="product-quantity"
                                    // value={product.qtySelected}
                                />
                                <button
                                    className="plus"
                                    // product-id={product._id}
                                    // onClick={handlePlus}
                                >
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div className="product-buy">
                            <button className="add">Thêm vào giỏ hàng</button>
                            <button className="buy" onClick={handleBuy}>
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
