import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../../../store/Context";
import numberWithCommas from "../../../utils/formatPrice/numberWithCommas";
import axios from "axios";

function SubMall() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products`)
            .then((res) => setProducts(res.data))
            .catch((err) => navigate("/error", { err }));

        return setProducts([]);
    }, []);

    const handleProduct = (e) => {
        // const parent = e.target.parentElement;
        const currentId = e.target.getAttribute("item-id");
        navigate("/product/details", { state: products[currentId - 1] });
    };

    return (
        <div className="subMall">
            <div className="subMall__header">
                <a href="">Shopee mall</a>
                <Link to="/mall">
                    Xem tất cả
                    <i className="fas fa-chevron-right"></i>
                </Link>
            </div>
            <div className="subMall__header-content">
                <div className="subMall__header-slider"></div>
                <div className="subMall__header-items">
                    {products.map((product) => (
                        <div
                            className="subMall-item"
                            item-id={product._id}
                            onClick={handleProduct}
                            key={product._id}
                        >
                            <div className="item-image" item-id={product._id}>
                                <img src={product.image} alt="" item-id={product._id} />
                            </div>
                            <div className="item-desc" item-id={product._id}>
                                {product.desc}
                            </div>
                            <div className="item-price" item-id={product._id}>
                                <span>₫</span>
                                {numberWithCommas(product.price)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SubMall;
