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
      url: "/image/banner_1.png",
    },
    {
      url: "/image/banner_2.png",
    },
    {
      url: "/image/banner_3.png",
    },
    {
      url: "/image/banner_4.png",
    },
    {
      url: "/image/banner_5.png",
    },
  ]);

  return (
    <div className="row ">
      <div className="col-md-8 col-12 box_main_banner">
        <Swiper
          autoplay={{ delay: 2000 }}
          navigation={true}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
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
      <div className="col-md-4 col-12">
        <div className="row row_banner_small">
          <div className="col-md-12 col-6 pb-2  box_banner_small">
            <div className="img_banner_small">
              <Image
                quality={100}
                alt="banner-image"
                height={0}
                width={0}
                sizes="100vw"
                src="/image/banner_5.png"
                className="img_banner_genaral banner_small  w-100 h-100"
              />
            </div>
          </div>
          <div className="col-md-12 col-6 box_banner_small  ">
            <div className="img_banner_small">
              <Image
                quality={100}
                height={0}
                width={0}
                sizes="100vw"
                className="img_banner_genaral banner_small  w-100 h-100"
                alt="banner-image"
                src="/image/banner_6.png"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12 col-12">
        <div className="px-3 my-2">
          <span className="related-product">DANH MỤC SẢN PHẨM</span>
        </div>
        <div className="container_swiper_category mx-2 mb-2">
          <Swiper
            slidesPerView="auto"
            spaceBetween={30}
            grid={{
              rows: 2,
              fill: "row",
            }}
            navigation={true}
            modules={[Navigation, Grid]}
            className="mySwiper my-1 px-4"
          >
            {dataCategory &&
              dataCategory?.length > 0 &&
              dataCategory?.map((item, index) => (
                <SwiperSlide key={index} className="custom_swiper mt-0">
                  <Link href={`/category/${item.friendly_url}`}>
                    <div
                      style={{ width: "0px" }}
                      className="row item_category my-1  "
                    >
                      <div className="col-12 pt-2  custom_padding_category">
                        <div className="container_img_cate image custom_category_homepage">
                          <Image
                            quality={100}
                            height={0}
                            width={0}
                            sizes="100vw"
                            src={hostImage + item.category.picture}
                            className="image_category w-100 h-100"
                            alt="laptop"
                          />
                        </div>
                      </div>
                      <div className="col-12 text-center text_category">
                        <span>{item.cat_name}</span>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default BannerHomePage;
