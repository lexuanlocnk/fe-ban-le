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

const BannerHomePage = ({ dataMenuCategories }) => {
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
  const imageAdvertisingTest = [
    {
      url: "/image/sale_banner1.jpg",
    },
    {
      url: "/image/sale_banner2.jpg",
    },
  ];

  const imageAdvertising = [
    {
      url: "/image/banner_sale1.gif",
    },
    {
      url: "/image/banner_sale2.gif",
    },
  ];

  const imageAdvertising2 = [
    {
      url: "/image/banner_property1.png",
    },
    {
      url: "/image/banner_property2.png",
    },
    {
      url: "/image/banner_property3.png",
    },
    {
      url: "/image/banner_property4.png",
    },
  ];

  return (
    <div
      className="container_menu_category_and_swiper position-relative"
    >
      <div className="row container_banner_swiper_menu_category">
        <div className="col-md-12 col-12 box_banner_swiper_menu_category">
          <div className="box_menu_category">
            <div className="box_content_menu_category">
              {dataMenuCategories &&
                dataMenuCategories.length > 0 &&
                dataMenuCategories.map((item, index) => (
                  <div className="item_category_menu" key={item.menu_id}>
                    <Link
                      className="text_category_menu"
                      href={`/category/${item?.menu_desc?.link}`}
                    >
                      {item?.menu_desc?.title}
                    </Link>

                    <div className="box_menu_categories_children">
                      {item?.parenty?.map((i) => {
                        return (
                          <div key={i.menu_id} className="box_full_sub_menu ">
                            <Link
                              title={i.menu_desc.title}
                              href=""
                              className="text_sub_category_menu "
                            >
                              {i.menu_desc.title}
                            </Link>

                            <div className="mt-3">
                              {i.parentx
                                .filter((item) => item.menu_desc.link != "#")
                                .map((i2, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="box_value_menu_sub "
                                    >
                                      <Link
                                        title={i2.menu_desc.title}
                                        href={`/category/${i2.menu_desc.link}`}
                                        className=" "
                                      >
                                        {i2.menu_desc.title}
                                      </Link>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        );
                      })}
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
              {imageBanner &&
                imageBanner.length > 0 &&
                imageBanner.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="container_img_banner">
                      <Image
                        quality={100}
                        height={0}
                        width={0}
                        sizes="100vw"
                        src={item.url}
                        className="img_banner_genaral"
                        alt="banner-image"
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {imageAdvertising && imageAdvertising.length > 0 && (
            <div className="banner_pr_in_home w-100  ">
              {imageAdvertising.map((item, index) => (
                <div key={index} className="box_image_advertising">
                  <Image
                    alt={`image_${index}`}
                    src={item.url}
                    width={220}
                    height={200}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className=" container_img_news_sale">
          {imageAdvertising2 && imageAdvertising2.length > 0 && (
            <div className="box_img_news_sale w-100">
              {imageAdvertising2.map((item, index) => (
                <div key={index} className="box_image_news_sale_item">
                  <Image
                    alt={`image_${index}`}
                    src={item.url}
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
              {imageBanner &&
                imageBanner.length > 0 &&
                imageBanner.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="mobile_container_img_banner h-100">
                      <Image
                        quality={100}
                        height={0}
                        width={0}
                        sizes="100vw"
                        src={item.url}
                        className="mobile_img_banner_genaral"
                        alt="banner-image"
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
            {imageAdvertisingTest && imageAdvertisingTest.length > 0 && (
              <div className="col mobile_banner_pr_in_home  ">
                {imageAdvertisingTest.map((item, index) => (
                  <div key={index} className="mobile_box_image_advertising">
                    <Image
                      alt={`image_${index}`}
                      src={item.url}
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
                            height={75}
                            width={75}
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
