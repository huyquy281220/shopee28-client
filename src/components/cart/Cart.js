import "styles/products/Cart.css";
import { useState, useContext, useMemo } from "react";
import UserContext from "store/Context";
import { updateUser } from "store/Actions";
import { handleUpdate } from "components/productDetail/ProductDetail";
import numberWithCommas from "utils/formatPrice/numberWithCommas";

function Cart() {
    const { user, dispatch } = useContext(UserContext);

    const [newQty, setNewQty] = useState(
        user.cart.map((product) => ({
            qty: product.qtySelected,
            id: product._id,
        }))
    );

    const handleCheckAll = (e) => {
        const checkbox = document.querySelectorAll(".productCart-check");
        checkbox.forEach((item) => {
            item.checked = e.target.checked;
        });
    };

    const handleChecked = () => {
        const checkboxAll = document.querySelector(".checkAll");
        const checkbox = document.querySelectorAll(".productCart-check:checked");

        if (checkbox.length === user.cart.length) {
            checkboxAll.checked = true;
        } else {
            checkboxAll.checked = false;
        }
    };

    const handleQty = (qty, id) => {
        newQty.map((item) => {
            if (item.id === id) {
                item.qty = qty;
                setNewQty([...newQty], item);
            }
        });
    };

    const handlePlus = (id) => {
        user.cart.forEach((product) => {
            if (product._id === id && product.qtySelected <= product.quantity) {
                product.qtySelected++;
                handleQty(product.qtySelected, product._id);
                handleUpdate(user._id, user.cart);
                localStorage.setItem("user", JSON.stringify(user));
            }
        });
    };

    const handleMinus = (id) => {
        user.cart.forEach((product) => {
            if (product._id === id && product.qtySelected > 1) {
                product.qtySelected--;
                handleQty(product.qtySelected, product._id);
                handleUpdate(user._id, user.cart);
                localStorage.setItem("user", JSON.stringify(user));
            }
            dispatch(updateUser(user));
        });
    };

    const handleDelete = (id) => {
        const indexDelete = user.cart.findIndex((item) => item._id === id);
        user.cart.splice(indexDelete, 1);

        dispatch(updateUser(user));
        localStorage.setItem("user", JSON.stringify(user));
        handleUpdate(user._id, user.cart);
    };

    const handleChangeQty = () => {};

    const totalMoney = user.cart.reduce((total, product) => {
        return total + product.price * product.qtySelected;
    }, 0);

    return (
        <div className="cart">
            <div className="cart__body">
                <div className="cart-title">
                    <table className="cart-table">
                        <tbody>
                            <tr className="row1">
                                <th>
                                    <input
                                        type="checkbox"
                                        className="productsCart-check checkAll"
                                        onChange={(e) => handleCheckAll(e)}
                                    />
                                    Sản phẩm
                                </th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Số tiền</th>
                                <th>Thao tác</th>
                            </tr>
                            <tr className="row2"></tr>
                            {user.cart.map((product) => (
                                <tr className="row3" key={product._id}>
                                    <td className="row3-td">
                                        <div className="check">
                                            <input
                                                type="checkbox"
                                                name="checkbox"
                                                product-id={product._id}
                                                className="productCart-check"
                                                onChange={(e) => handleChecked(e)}
                                            />
                                        </div>
                                        <div className="productCart-desc">
                                            <div className="productCart-img">
                                                <img src={product.image} alt="" />
                                            </div>
                                            <div className="productCart-name">
                                                <span>{product.desc}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="td-price">
                                        {numberWithCommas(product.price)}
                                        <span>VND</span>
                                    </td>
                                    <td className="td-quantity">
                                        <div style={{ height: "32.5px" }}>
                                            <button
                                                className="minus"
                                                onClick={() => handleMinus(product._id)}
                                            >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <input
                                                type="text"
                                                className="product-quantity"
                                                value={product.qtySelected}
                                                defaultValue={product.qtySelected}
                                                onChange={handleChangeQty}
                                            />
                                            <button
                                                className="plus"
                                                onClick={() => handlePlus(product._id)}
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="td-money">
                                        <span
                                            className="money"
                                            total-money={product.price * product.qtySelected}
                                        >
                                            {numberWithCommas(product.price * product.qtySelected)}
                                        </span>
                                        <span>VND</span>
                                    </td>
                                    <td className="td-delete">
                                        <span
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            Xóa
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            <tr className="row2"></tr>
                            <tr
                                className="row3"
                                style={{
                                    marginTop: "20px",
                                }}
                            >
                                <td className="td-payment" colSpan={5}>
                                    <div className="payment">
                                        Tổng thanh toán ({user.cart.length} sản phẩm) :{" "}
                                        <span>{numberWithCommas(totalMoney)} VND</span>
                                    </div>
                                    <button
                                        style={{
                                            width: "180px",
                                            height: "35px",
                                            color: "#fff",
                                            backgroundColor: "rgb(238, 77, 45)",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Mua Hàng
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Cart;
