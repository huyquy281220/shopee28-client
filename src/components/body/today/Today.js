import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import numberWithCommas from "../../../utils/formatPrice/numberWithCommas";

function TodaySuggestion() {
    const [suggestProduct, setSuggestProduct] = useState({
        limit: 10,
        skip: 10,
    });
    const [productToday, setProductToday] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/products?${queryString.stringify(suggestProduct)}`
            )
            .then((res) => setProductToday(res.data))
            .catch((err) => console.error(err));
    }, [suggestProduct]);

    const handleLimit = () => {
        setSuggestProduct({
            ...suggestProduct,
            skip: suggestProduct.skip + 5,
        });
        setIsLoading(true);
    };
    console.log(queryString.stringify(suggestProduct));

    return (
        <div className="products-today">
            <div className="suggest__header">
                <Link to="">Gợi ý hôm nay</Link>
            </div>
            <div className="suggest__body-content">
                <div className="today-items">
                    {productToday.map((product, key) => (
                        <div className="today-item" key={key}>
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
                    {isLoading &&
                        Array(5)
                            .fill(0)
                            .map((key) => (
                                <div className="today-item" key={key}>
                                    <div
                                        className="item-image skeleton-box"
                                        style={{ height: "188px" }}
                                    ></div>
                                    <div
                                        className="item-desc skeleton-box"
                                        style={{ height: "28px" }}
                                    ></div>
                                    <div
                                        className="item-price skeleton-box"
                                        style={{ height: "24px" }}
                                    ></div>
                                </div>
                            ))}
                    <button className="btn btn-light" onClick={() => handleLimit()}>
                        Xem Thêm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodaySuggestion;
