import { useLocation } from "react-router-dom";

function ErrorPage() {
    const { err } = useLocation();
    const errStyle = {
        textAlign: "center",
        fontSize: "3rem",
        color: "red",
    };

    return (
        <div className="errPage">
            <div style={errStyle}>
                <p>{err || "Something went wrong !!!"}</p>
            </div>
        </div>
    );
}

export default ErrorPage;
