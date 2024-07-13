"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ComponentCardProductBasic from "../../../components/componentCardProductBasic";

const ComponentSwiper = ({ dataSwiper, timeLoop, classCss, marginRight }) => {
  return (
    <Swiper
      autoplay={{ delay: timeLoop }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: marginRight || 0,
        },
      }}
      loop={true}
      navigation={true}
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={marginRight || 0}
      slidesPerView={2}
      className={`mySwiper ${classCss}`}
    >
      {dataSwiper &&
        dataSwiper.length > 0 &&
        dataSwiper.map((item, index) => (
          <SwiperSlide key={index}>
            <ComponentCardProductBasic item={item} col={"col-auto"} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default ComponentSwiper;
