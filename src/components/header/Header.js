import "../../styles/header/Header.css";

import NavbarHeader from "./NavbarHeader";
import SearchHeader from "./SearchHeader";
// import { memo } from "react";

function Header() {
    return (
        <div className="header">
            <NavbarHeader />
            <SearchHeader />
            {console.log("render")}
        </div>
    );
}

export default Header;
