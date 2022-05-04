import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import UserContext from "../../../store/Context";
import numberWithCommas from "../../../utils/formatPrice/numberWithCommas";
import axios from "axios";

function SubMall() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let isSuccess = true;
        axios
            .get(`${process.env.REACT_APP_API_URL}/products?limit=5`)
            .then((res) => {
                if (isSuccess) {
                    setProducts(res.data);
                }
            })
            .catch((err) => navigate("/error", { err }));

        return () => {
            isSuccess = false;
        };
    }, []);

    const handleProduct = (e) => {
        // const parent = e.target.parentElement;
        const currentId = e.target.getAttribute("item-id");
        navigate(`/product/details/${currentId}`, { state: products[currentId - 1] });
    };

    return (
        <div className="subMall">
            <div className="subMall__header">
                <Link to="/mall">Shopee mall</Link>
                <Link to="/mall">
                    Xem tất cả
                    <i className="fas fa-chevron-right"></i>
                </Link>
            </div>
            <div className="subMall__body-content">
                <div className="subMall-items">
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
