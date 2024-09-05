"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/grid";

import Image from "next/image";
import ImageTest from "../../public/image/test_image/t-shirt-test.png";
import { Navigation, Pagination, Autoplay, Grid } from "swiper/modules";
import Link from "next/link";
import { hostImage } from "./lib/config";

const BannerHomePage = ({ dataMenuCategories, banner }) => {
  return (
    <div className="container_menu_category_and_swiper position-relative">
      <div className="row container_banner_swiper_menu_category">
        <div className="col-md-12 col-12 box_banner_swiper_menu_category">
          <div className="box_menu_category">
            <div className="box_content_menu_category">
              {dataMenuCategories?.length > 0 &&
                dataMenuCategories.map((item) => (
                  <div className="item_category_menu" key={item.menu_id}>
                    <Link
                      className="text_category_menu"
                      href={`/category/${item.menu_desc?.link}`}
                    >
                      {item.menu_desc?.title}
                    </Link>

                    <div className="box_menu_categories_children">
                      {item.parenty?.map((i) => (
                        <div key={i.menu_id} className="box_full_sub_menu">
                          <Link
                            title={i.menu_desc.title}
                            href=""
                            className="text_sub_category_menu"
                          >
                            {i.menu_desc.title}
                          </Link>

                          <div className="mt-3">
                            {i.parentx
                              .filter((i2) => i2.menu_desc.link !== "#")
                              .map((i2) => (
                                <div
                                  key={i2.menu_id}
                                  className="box_value_menu_sub"
                                >
                                  <Link
                                    title={i2.menu_desc.title}
                                    href={`/category/${i2.menu_desc.link}`}
                                  >
                                    {i2.menu_desc.title}
                                  </Link>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="box_swiper_in_home">
            <Swiper
              autoplay={{ delay: 2000 }}
              navigation={true}
              loop={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Navigation, Autoplay]}
              className="my_swiper_in_home"
            >
              {banner?.middle &&
                banner?.middle?.length > 0 &&
                banner?.middle?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="container_img_banner">
                      <Image
                        quality={100}
                        height={0}
                        width={0}
                        sizes="100vw"
                        src={hostImage + item.picture}
                        className="img_banner_genaral"
                        alt="banner-image"
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {banner?.bannerRight && banner?.bannerRight?.length > 0 && (
            <div className="banner_pr_in_home w-100  ">
              {banner?.bannerRight?.map((item, index) => (
                <div key={index} className="box_image_advertising">
                  <Image
                    alt={`image_${index}`}
                    src={hostImage + item.picture}
                    width={220}
                    height={200}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className=" container_img_news_sale">
          {banner?.bannerBottom && banner?.bannerBottom?.length > 0 && (
            <div className="box_img_news_sale w-100">
              {banner?.bannerBottom?.map((item, index) => (
                <div key={index} className="box_image_news_sale_item">
                  <Image
                    alt={`image_${index}`}
                    src={hostImage + item.picture}
                    quality={100}
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mobile_container_swiper_banner_pr">
        <div className="row mobile_box_banner_swiper_menu_category">
          <div className="row mobile_box_swiper_in_home">
            <Swiper
              autoplay={{ delay: 2000 }}
              rewind={true}
              navigation={true}
              loop={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Navigation, Autoplay]}
              className="col mobile_my_swiper_in_home"
            >
              {banner?.middle &&
                banner?.middle?.length > 0 &&
                banner?.middle?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="mobile_container_img_banner h-100">
                      <Image
                        quality={100}
                        height={0}
                        width={0}
                        sizes="100vw"
                        src={hostImage + item.picture}
                        className="mobile_img_banner_genaral"
                        alt="banner-image"
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
            {banner?.bannerRight && banner?.bannerRight?.length > 0 && (
              <div className="col mobile_banner_pr_in_home  ">
                {banner?.bannerRight?.map((item, index) => (
                  <div key={item.id} className="mobile_box_image_advertising">
                    <Image
                      alt={`image_${index}`}
                      src={hostImage + item.picture}
                      sizes="100vw"
                      width={0}
                      height={0}
                      quality={100}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="row mobile_category_menu_container">
            <div className="mobile_category_header">
              <div className="category_header_title">DANH MỤC</div>
            </div>
            <div className="mobile_category_menu">
              <Swiper
                breakpoints={{
                  769: {
                    grid: {
                      rows: 1,
                      slidesPerView: "auto",
                    },
                  },
                }}
                grid={{
                  rows: 2,
                }}
                slidesPerView={"auto"}
                spaceBetween={0}
                modules={[Grid, Pagination]}
                className="mobile_category_swiper"
              >
                {dataMenuCategories &&
                  dataMenuCategories.length > 0 &&
                  dataMenuCategories.map((item, index) => (
                    <SwiperSlide
                      className="item_swiper_slide_grid"
                      key={item.menu_id}
                    >
                      <Link
                        className="mobile_item_category_menu"
                        href={`/category/${item?.menu_desc?.link}`}
                      >
                        <div className="mobile_img_category_menu_item">
                          <Image
                            height={0}
                            width={0}
                            quality={100}
                            src={ImageTest}
                          ></Image>
                        </div>
                        <Link
                          className="mobile_text_category_menu"
                          href={`/category/${item?.menu_desc?.link}`}
                        >
                          {item?.menu_desc?.title}
                        </Link>
                      </Link>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BannerHomePage;
