"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
const ComponentBannerTwoImage = () => {
  const imgBanner = [
    "/image/banner-two-image/banner1.png",
    "/image/banner-two-image/banner2.png",
    "/image/banner-two-image/banner3.png",
    "/image/banner-two-image/banner4.png",
  ];

  return (
    <div className="col-12 main-content mt-2">
      <div className="container_banner_two_image ">
        <Swiper
          loop={true}
          spaceBetween={5}
          slidesPerView={2}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper_banner_two_image"
        >
          {imgBanner &&
            imgBanner.length > 0 &&
            imgBanner.map((item, index) => (
              <SwiperSlide key={index}>
                <div className=" item_image_banner ">
                  <div className="box_image_banner overflow-hidden">
                    <Image
                      quality={100}
                      alt="banner-image"
                      height={0}
                      width={0}
                      sizes="100vw"
                      src={item}
                      className="img_hover_news_common w-100 h-100"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};
export default ComponentBannerTwoImage;
