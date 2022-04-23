import { useState, useEffect } from "react";
import axios from "axios";

function Category() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/category`)
            .then((res) => setCategories(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="category">
            <div className="category-title">
                <span>Danh mục</span>
            </div>
            <div className="category-content">
                {categories.map((category) => (
                    <div className="category-item" key={category._id}>
                        <a href="">
                            <img src={category.image} alt="" />
                        </a>
                        <p>{category.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Category;
