"use client";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import ComponentCardProductMain from "../components/componentCardProductMain";

function SlideTopProducts({ session, dataTopProducts }) {
  return (
    <div className="px-3">
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 30,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {dataTopProducts &&
          dataTopProducts?.productHot?.length > 0 &&
          dataTopProducts?.productHot?.map((item, index) => (
            <SwiperSlide key={index}>
              <ComponentCardProductMain item={item} col={"col-auto"} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default SlideTopProducts;
