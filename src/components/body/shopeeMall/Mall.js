import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import numberWithCommas from "utils/formatPrice/numberWithCommas";
import Pagination from "./MallPagination";

function Mall() {
    const [postList, setPostList] = useState([]);
    const [filters, setFilters] = useState({
        limit: 10,
        page: 1,
        type: null,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const paramsString = queryString.stringify(filters);
        if (filters.type == null) {
            axios
                .get(`${process.env.REACT_APP_API_URL}/mall?${paramsString}`)
                .then((res) => setPostList(res.data))
                .catch((err) => navigate("/error", { err }));
        } else {
            axios
                .get(`${process.env.REACT_APP_API_URL}/mall/sort?${paramsString}`)
                .then((res) => setPostList(res.data))
                .catch((err) => navigate("/error", { err }));
        }
    }, [filters]);

    const handleProduct = (currentId) => {
        navigate("/product/details", { state: postList[currentId - 1] });
    };

    const handlePageChange = useCallback(
        (newPage) => {
            setFilters({ ...filters, page: newPage });
        },
        [filters]
    );

    return (
        <div className="mall">
            <div className="mall-wrapper">
                <div className="mall-sort">
                    <span>Sắp xếp theo: </span>
                    <select
                        name=""
                        label="Giá"
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    >
                        <option value="">Giá</option>
                        <option value="1">Thấp đến cao</option>
                        <option value="-1">Cao đến thấp</option>
                    </select>
                </div>
                <div className="mall-body">
                    <div className="mall-items">
                        {postList.map((product) => (
                            <div
                                className="mall-item"
                                key={product._id}
                                onClick={() => handleProduct(product._id)}
                            >
                                <div className="mall-item-image">
                                    <img src={product.image} alt="" />
                                </div>
                                <div className="mall-item-desc">{product.desc}</div>
                                <div className="mall-item-price">
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <span>₫</span>
                                        {numberWithCommas(product.price)}
                                    </div>
                                    <span style={{ color: "rgba(0, 0, 0, 0.54)" }}>
                                        Đã bán 12,5k
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination onPageChange={handlePageChange} filters={filters} />
                </div>
            </div>
        </div>
    );
}

export default Mall;
