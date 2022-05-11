import { useEffect, useState } from "react";
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

    const handleProduct = (e) => {
        // const parent = e.target.parentElement;
        const currentId = e.target.getAttribute("item-id");
        navigate("/product/details", { state: postList[currentId - 1] });
    };

    const handlePageChange = (newPage) => {
        console.log(newPage);
        setFilters({ ...filters, page: newPage });
    };
    return (
        <div className="mall">
            <div className="mall-wrapper">
                <div className="mall-sort">
                    <span>Sắp xếp theo </span>
                    <select
                        name=""
                        label="Giá"
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    >
                        <option>Giá</option>
                        <option value="1">Thấp đến cao</option>
                        <option value="-1">Cao đến thấp</option>
                    </select>
                </div>
                <div className="mall-body">
                    <div className="mall-items">
                        {postList.map((product) => (
                            <div
                                className="mall-item"
                                item-id={product._id}
                                key={product._id}
                                onClick={handleProduct}
                            >
                                <div className="mall-item-image" item-id={product._id}>
                                    <img src={product.image} alt="" item-id={product._id} />
                                </div>
                                <div className="mall-item-desc" item-id={product._id}>
                                    {product.desc}
                                </div>
                                <div className="mall-item-price" item-id={product._id}>
                                    <span>₫</span>
                                    {numberWithCommas(product.price)}
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
