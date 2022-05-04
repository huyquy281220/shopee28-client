import Banner from "./banner/Banner";
import Category from "./category/Category";
import SubMall from "./shopee_mall/SubMall";
import TodaySuggestion from "./today/Today";
import "../../styles/body/Body.css";

function Body() {
    return (
        <div className="container">
            <Banner />
            <Category />
            <SubMall />
            <TodaySuggestion />
        </div>
    );
}

export default Body;
