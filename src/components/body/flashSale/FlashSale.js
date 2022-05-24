import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import numberWithCommas from "utils/formatPrice/numberWithCommas";

function FlashSale() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let isSuccess = true;
        axios
            .get(`${process.env.REACT_APP_API_URL}/products?limit=10`)
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

    const handleSlideChange = (number) => {
        const slide = document.querySelector(".flash-sale-items");
        const nextBtn = document.querySelector(".sale-next");
        const prevBtn = document.querySelector(".sale-prev");
        switch (number) {
            case 1: {
                slide.style.transform = "translateX(-1215px)";
                nextBtn.style.display = "none";
                prevBtn.style.display = "block";
                break;
            }
            case -1: {
                slide.style.transform = "translateX(0)";
                nextBtn.style.display = "block";
                prevBtn.style.display = "none";
                break;
            }
            default:
        }
    };

    const handleProduct = (id) => {
        navigate(`/product/details/${id}`, { state: products[id - 1] });
    };

    return (
        <div className="flash-sale">
            <div className="flash-sale-header">
                <Link to="">
                    <img
                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/flashsale/fb1088de81e42c4e538967ec12cb5caa.png"
                        alt=""
                        width="114px"
                        height="30px"
                    />
                </Link>
            </div>
            <button className="sale-btn sale-prev" onClick={() => handleSlideChange(-1)}>
                <i
                    className="fas fa-chevron-left"
                    style={{ fontSize: "15px", color: "rgba(0,0,0,0.4)" }}
                ></i>
            </button>
            <button className="sale-btn sale-next" onClick={() => handleSlideChange(1)}>
                <i
                    className="fas fa-chevron-right"
                    style={{ fontSize: "15px", color: "rgba(0,0,0,0.4)" }}
                ></i>
            </button>
            <div className="flash-sale-body">
                <div className="flash-sale-items">
                    {products.map((product) => (
                        <div
                            className="flash-sale-item"
                            onClick={() => handleProduct(product._id)}
                            key={product._id}
                            style={{ border: "1px solid #ccc" }}
                        >
                            <div className="sticker-wrapper">
                                <div className="sticker-sale">
                                    <span
                                        style={{
                                            fontSize: "1.8rem",
                                            color: "#ee4d2d",
                                            display: "block",
                                        }}
                                    >
                                        50%
                                    </span>
                                    <span style={{ textTransform: "uppercase" }}>Giảm</span>
                                </div>
                            </div>
                            <div className="item-image">
                                <img src={product.image} alt={product.desc} />
                            </div>
                            <div className="item-desc">{product.desc}</div>
                            <div
                                className="price-sale"
                                style={{
                                    color: "#ee4d2d",
                                    fontSize: "2.2rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <div>
                                    <span
                                        style={{
                                            fontSize: "1.2rem",
                                            display: "inline-block",
                                            paddingRight: "3px",
                                        }}
                                    >
                                        ₫
                                    </span>
                                    {numberWithCommas(product.price)}
                                </div>
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "156px",
                                        height: "15px",
                                        lineHeight: "15px",
                                        borderRadius: "10px",
                                        fontSize: "1.2rem",
                                        textAlign: "center",
                                        color: "#fff",
                                        backgroundColor: "rgb(255 189 166)",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Đã bán 12,5k
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FlashSale;
