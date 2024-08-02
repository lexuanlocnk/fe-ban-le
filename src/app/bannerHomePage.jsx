"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
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
      url: "/image/banner_property1.jpg",
    },
    {
      url: "/image/banner_property2.jpg",
    },
    {
      url: "/image/banner_property3.jpg",
    },
    {
      url: "/image/banner_property4.jpg",
    },
  ];

  return (
    <div style={{ height: "570px " }} className="position-relative ">
      <div className="row container_banner_swiper_menu_category h-100">
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
                    width={300}
                    height={140}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BannerHomePage;
