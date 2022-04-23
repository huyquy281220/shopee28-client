import "../../styles/products/Cart.css";
import { useState, useContext } from "react";
import UserContext from "../../store/Context";
import { handleUpdate } from "../products/ProductDetail";
import numberWithCommas from "../../utils/formatPrice/numberWithCommas"

function Cart() {
    const { user } = useContext(UserContext);
    const newCart = user.cart;
    // const productSelected = [];
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [newQty, setNewQty] = useState(
        newCart.map((product) => ({
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

    const handleChecked = (e) => {
        const checkboxAll = document.querySelector(".checkAll");
        const checkbox = document.querySelectorAll(".productCart-check:checked");

        console.log(e.target.getAttribute("product-id"));
        // if (e.target.checked == true) {
        // }

        // e.target.checked = true;
        if (checkbox.length === newCart.length) {
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

    const handlePlus = (e) => {
        const a = e.target.getAttribute("product-id");
        newCart.forEach((product) => {
            if (product._id == a) {
                product.qtySelected++;
                handleQty(product.qtySelected, product._id);
                handleUpdate(user, user.cart);
                localStorage.setItem("user", JSON.stringify(user));
            }
        });
    };

    const handleMinus = (e) => {
        const a = e.target.getAttribute("product-id");
        newCart.forEach((product) => {
            if (product._id == a && product.qtySelected > 0) {
                product.qtySelected--;
                handleQty(product.qtySelected, product._id);
                handleUpdate(user, user.cart);
                localStorage.setItem("user", JSON.stringify(user));
            }
        });
    };

    const a = newCart.reduce((total, product) => {
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
                                        defaultChecked={isCheckedAll}
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
                            {newCart.map((product) => (
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
                                        <button
                                            className="minus"
                                            product-id={product._id}
                                            onClick={handleMinus}
                                        >
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <input
                                            type="text"
                                            className="product-quantity"
                                            value={product.qtySelected}
                                        />
                                        <button
                                            className="plus"
                                            product-id={product._id}
                                            onClick={handlePlus}
                                        >
                                            <i className="fas fa-plus"></i>
                                        </button>
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
                                        <a href="">Xóa</a>
                                    </td>
                                </tr>
                            ))}
                            <tr className="row2"></tr>
                            <tr>
                                <td>
                                    <div>
                                        Tổng thanh toán (sản phẩm) : {a} <span>VND</span>
                                    </div>
                                    <button>Mua Hàng</button>
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
