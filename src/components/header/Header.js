import "../../styles/header/Header.css";

import { memo } from "react";
import NavbarHeader from "./NavbarHeader";
import SearchHeader from "./SearchHeader";

function Header() {
    console.log("Header");
    return (
        <div className="header">
            <NavbarHeader />
            <SearchHeader />
        </div>
    );
}

export default memo(Header);
