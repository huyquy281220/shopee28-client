import Banner from "./banner/Banner";
import Category from "./category/Category";
import SubMall from "./shopeeMall/SubMall";
import FlashSale from "./flashSale/FlashSale";
import SubBanner from "./subBanner/SubBanner";
import TodaySuggestion from "./today/Today";

function Wrapper() {
    return (
        <div className="wrapper" style={{ width: "100%", padding: " 30px 100px 20px 100px" }}>
                <Banner />
                <Category />
                <FlashSale />
                <SubBanner />
                <SubMall />
                <TodaySuggestion />
        </div>
    );
}

export default Wrapper;
