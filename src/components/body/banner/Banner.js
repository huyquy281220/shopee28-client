import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import axios from "axios";
import slide1 from "assets/img/slider/slide1.png";
import slide2 from "assets/img/slider/slide2.png";
import slide3 from "assets/img/slider/slide3.png";
import slide4 from "assets/img/slider/slide4.png";
import slide5 from "assets/img/slider/slide5.png";
import slide6 from "assets/img/slider/slide6.png";
import ads1 from "assets/img/ads/ads1.png";
import ads2 from "assets/img/ads/ads2.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

function Banner() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        let isSuccess = true;
        axios
            .get(`${process.env.REACT_APP_API_URL}/test`)
            .then((res) => {
                if (isSuccess) {
                    setProducts(res.data);
                }
            })
            .catch((err) => console.error(err));

        return () => {
            isSuccess = false;
        };
    }, []);

    return (
        <div className="banner__body">
            <div className="banner-wrapper">
                <div className="banner">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        autoplay={{ delay: 2000 }}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img src={slide1} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={slide2} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={slide3} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={slide4} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={slide5} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={slide6} alt="" />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="banner-ads">
                    <div className="ads1">
                        <img src={ads1} alt="" className="ads" />
                    </div>
                    <div className="ads2">
                        <img src={ads2} alt="" className="ads" />
                    </div>
                </div>
            </div>
            <div className="navbar__banner">
                <div className="navbar__banner-wrapper">
                    {products.map((product) => (
                        <a href="" key={product._id}>
                            <img src={product.image} alt="" />
                            <p>{product.description}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Banner;
