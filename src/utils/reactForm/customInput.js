import { useState } from "react";

export default function CustomInput() {
    const [showPass, setShowPass] = useState(false);

    const inputStyle = {
        position: "relative",
        width: "340px",
        height: "40px",
        marginBottom: "30px",
        padding: "8px",
        outline: "none",
        borderRadius: "2px",
        border: "1px solid rgba(0, 0, 0, 0.14)",
    };

    const eyeIcon = {
        position: "absolute",
        display: "block",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        fontSize: "1.5rem",
        cursor: "pointer",
    };

    return (
        <div className="field-input" style={inputStyle}>
            <input type="text" />
            <i
                className={showPass ? "fas fa-eye" : "fas fa-eye-slash"}
                style={eyeIcon}
                onClick={() => setShowPass(!showPass)}
            ></i>
        </div>
    );
}
