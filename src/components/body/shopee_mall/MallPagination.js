function Pagination(props) {
    let items = [];
    const { onPageChange, filters } = props;
    const maxPage = Math.ceil(50 / filters.limit);

    for (let number = 1; number <= maxPage; number++) {
        items.push(number);
    }

    // style
    const paginationStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "40px",
        fontSize: "1.4rem",
    };

    const itemStyle = {
        width: "30px",
        height: "30px",
        lineHeight: "30px",
        textAlign: "center",
        border: "1px solid #ccc",
        cursor: "pointer",
    };

    const btnStyle = {
        width: "50px",
        height: "30px",
        border: "1px solid #ccc",
        cursor: "pointer",
    };

    return (
        <div className="mall-pagination" style={paginationStyle}>
            <button
                disabled={filters.page === 1}
                style={btnStyle}
                onClick={() => onPageChange(filters.page - 1)}
            >
                Prev
            </button>
            {items.map((item) => (
                <div
                    className="page-index"
                    key={item}
                    onClick={() => onPageChange(item)}
                    style={itemStyle}
                >
                    {item}
                </div>
            ))}
            <button
                disabled={filters.page === maxPage}
                style={btnStyle}
                onClick={() => onPageChange(filters.page + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
