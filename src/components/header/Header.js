import "../../styles/header/Header.css";

import NavbarHeader from "./NavbarHeader";
import SearchHeader from "./SearchHeader";

function Header() {
    return (
        <div className="header">
            <NavbarHeader />
            <SearchHeader />
        </div>
    );
}

export default Header;
