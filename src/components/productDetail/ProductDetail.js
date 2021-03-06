import "styles/products/ProductDetail.css";

import { useContext, useState, useRef } from "react";
import UserContext from "store/Context";
import { updateUser } from "store/Actions";
import { useLocation, useNavigate } from "react-router-dom";
import numberWithCommas from "utils/formatPrice/numberWithCommas";
import axios from "axios";
// import axiosJWT from "utils/RefreshToken/refreshToken";

const handleUpdate = (userId, data) => {
    axios.put(`${process.env.REACT_APP_API_URL}/user/${userId}`, { cart: data });
};

function ProductDetail() {
    const { state } = useLocation();
    const [currentProduct, setCurrentProduct] = useState(state);
    const navigate = useNavigate();
    const { user, dispatch } = useContext(UserContext);
    const [addToCart, setAddToCart] = useState(false);
    const currentValue = useRef("");

    const handleQuantity = (product) => {
        const currentCart = user.cart;
        const updateItemIndex = currentCart.findIndex((item) => item._id === product._id);
        console.log(updateItemIndex);
        if (updateItemIndex < 0) {
            currentCart.push(product);
        } else {
            const updateItem = { ...currentCart[updateItemIndex] };

            updateItem.qtySelected = Number(updateItem.qtySelected) + Number(product.qtySelected);
            currentCart[updateItemIndex] = updateItem;
        }
        return currentCart;
    };

    const handleAddToCart = () => {
        if (user) {
            const type = "add";
            setAddToCart(true);
            setTimeout(() => {
                handleBuy(type);
                setAddToCart(false);
            }, 500);
        } else {
            setTimeout(() => {
                navigate("/user/login");
            }, 1000);
        }
    };

    const handleBuy = (type) => {
        const qtyBuy = currentValue.current.defaultValue;
        if (user) {
            axios
                .get(`${process.env.REACT_APP_API_URL}/products/${state._id}?qty=${qtyBuy}`)
                .then((res) => {
                    const newUser = { ...user, cart: handleQuantity(res.data) };
                    dispatch(updateUser(newUser));
                })
                .catch((err) => navigate("/error", { error: err }));

            setTimeout(() => {
                localStorage.setItem("user", JSON.stringify(user));
                handleUpdate(user._id, user.cart);
                type !== "add" && navigate("/user/cart");
            }, 1000);
        } else {
            setTimeout(() => navigate("/user/login"), 1000);
        }
    };

    const handleChangeValue = (type) => {
        switch (type) {
            case "plus":
                if (currentProduct.qtySelected < currentProduct.quantity) {
                    setCurrentProduct({
                        ...currentProduct,
                        qtySelected: currentProduct.qtySelected + 1,
                    });
                }
                console.log(currentProduct);
                return currentProduct;
            case "minus":
                currentProduct.qtySelected > 1 &&
                    setCurrentProduct({
                        ...currentProduct,
                        qtySelected: currentProduct.qtySelected - 1,
                    });

                break;
            default:
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
                    S???n ph???m ???? ???????c th??m v??o gi??? h??ng
                </div>
            )}
            <div className="productDetail__body">
                <div className="productDetail">
                    <div className="productDetail-left">
                        <div className="product-img">
                            <img src={currentProduct.image} alt="" />
                        </div>
                        <div className="social-media">
                            <span>Chia se??: </span>
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
                        <div className="product-desc">{currentProduct.desc}</div>
                        <div className="product-price">
                            <span className="currency-unit">???</span>
                            {numberWithCommas(currentProduct.price)}
                        </div>
                        <div className="transport">
                            <div className="transport-left">V???n chuy???n</div>
                            <div className="transport-right">
                                <div className="free-transport">
                                    <img
                                        className="transport-icon"
                                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/pdp/1cdd37339544d858f4d0ade5723cd477.png"
                                        alt=""
                                        width="25px"
                                        height="15px"
                                    />
                                    Mi???n ph?? v???n chuy???n
                                    <div style={{ color: "rgba(0,0,0,.54)" }}>
                                        Mi???n ph?? v???n chuy???n cho ????n h??ng tr??n 300.000 VND
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-qty">
                            <div className="product-qty-left">S??? l?????ng</div>
                            <div className="product-qty-right">
                                <button
                                    className="minus"
                                    onClick={() => handleChangeValue("minus")}
                                >
                                    <i className="fas fa-minus"></i>
                                </button>
                                <input
                                    type="text"
                                    ref={currentValue}
                                    value={currentProduct.qtySelected}
                                    // defaultValue={state.qtySelected}
                                    onChange={handleChangeValue}
                                    className="product-quantity"
                                />
                                <button className="plus" onClick={() => handleChangeValue("plus")}>
                                    <i className="fas fa-plus"></i>
                                </button>
                                <div className="product-available" style={{ color: "#757575" }}>
                                    {currentProduct.quantity} s???n ph???m c?? s???n
                                </div>
                            </div>
                        </div>
                        <div className="product-buy">
                            <button className="add" onClick={handleAddToCart}>
                                Th??m va??o gio?? ha??ng
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
