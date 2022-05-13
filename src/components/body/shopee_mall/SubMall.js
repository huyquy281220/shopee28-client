import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import numberWithCommas from "utils/formatPrice/numberWithCommas";
import axios from "axios";

import Sticker from "assets/img/sticker/sticker_top.png";

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

    const handleProduct = (id) => {
        navigate(`/product/details/${id}`, { state: products[id - 1] });
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
                            onClick={() => handleProduct(product._id)}
                            key={product._id}
                            style={{ border: "1px solid #ccc" }}
                        >
                            <img
                                src={Sticker}
                                alt=""
                                width="32px"
                                height="40px"
                                className="sticker-top"
                            />
                            <div className="item-image">
                                <img src={product.image} alt={product.desc} />
                            </div>
                            <div className="item-desc">{product.desc}</div>
                            <div className="item-price">
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
