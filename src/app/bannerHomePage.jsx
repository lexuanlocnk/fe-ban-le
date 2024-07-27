"use client";

import React, { useState } from "react";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import "swiper/css/autoplay";
import Image from "next/image";
// import required modules
import { Navigation, Pagination, Grid, Autoplay } from "swiper/modules";
import { hostImage } from "./lib/config";

const BannerHomePage = ({ dataCategory }) => {
  const [imageBanner, setImageBanner] = useState([
    {
      url: "/image/bannernew1.jpg",
    },
    {
      url: "/image/bannernew2.jpg",
    },
    {
      url: "/image/bannernew3.jpg",
    },
    {
      url: "/image/bannernew4.jpg",
    },
  ]);

  return (
    <div style={{ height: "570px " }} className="position-relative ">
      <div className="row container_banner_swiper_menu_category h-100">
        <div className="col-md-12 col-12 box_banner_swiper_menu_category">
          <div className="box_menu_category">
            <div className="box_content_menu_category"></div>
          </div>

          <div className="box_swiper_in_home">
            <Swiper
              autoplay={{ delay: 20000000 }}
              navigation={true}
              loop={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Navigation, Autoplay]}
              className="my_swiper_in_home"
            >
              {imageBanner &&
                imageBanner.length > 0 &&
                imageBanner.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="container_img_banner  w-100 h-100">
                      <Image
                        quality={100}
                        height={0}
                        width={0}
                        sizes="100vw"
                        src={item.url}
                        className="w-100 h-100 img_banner_genaral"
                        alt="banner-image"
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          <div className="banner_pr_in_home"></div>
        </div>
      </div>
    </div>
  );
};
export default BannerHomePage;
