"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import Image from "next/image";
import "../../public/css/cssContentHomePage.css";
import { useEffect, useState } from "react";
import { hostApi } from "./lib/config";
import Link from "next/link";
import { loader } from "./lib/functions";

function Slider3dHotProducts({ session }) {
  const [slides, setSlides] = useState([]);

  const fetchDataItem = async () => {
    try {
      const response = await fetch(`${hostApi}/member/product-hot`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSlides(data);
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  useEffect(() => {
    fetchDataItem();
  }, []);

  return (
    <div className="container-slide-hot-products pb-3">
      <div className="related-product px-3 pt-2 d-flex justify-content-between align-items-center color_red">
        <span>TOP SẢN PHẨM BÁN CHẠY</span>
        <div className="d-inline ">
          <button className="btn_show_more_home_page">
            <span className="text_btn_show_more">Xem thêm</span>{" "}
          </button>
        </div>
      </div>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 80,
          modifier: 2.0,
          slideShadows: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Navigation]}
        className="swiper_container"
      >
        {slides &&
          slides?.productHot?.length > 0 &&
          slides?.productHot?.map((item, index) => (
            <SwiperSlide className=" swiper_slide_3d bg-white " key={index}>
              <Link href={"#"}>
                <div className="row box_swiper_lide_3d mx-0">
                  <div className=" col-12 box_img_slide_3d image is-4by3">
                    <Image
                      loader={loader}
                      quality={100}
                      height={0}
                      width={0}
                      sizes="100vw"
                      src={item.Image}
                      className="w-100 h-100 img_slide_3d"
                      alt="slide_image"
                    />
                  </div>
                  <div className="col-12 px-md-2 px-1">
                    <div className="box_infor_product mb-2">
                      <div className="name_product_sale">
                        <span className="text_genaral_two_line">
                          {item.ProductName}
                        </span>
                      </div>
                      <div className="box_price_product d-flex justify-content-between  align-items-center mx-1">
                        <span className="price_product_3d">
                          {session
                            ? item.PriceOld.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })
                            : item.Price.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}
                        </span>
                        <span className="price_3d">
                          {/* {item.price.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })} */}
                        </span>
                      </div>
                    </div>
                    {/* <div className="row mb-2 mx-0">
                    {specifications.map((specification, index) => (
                      <div
                        className="col-6 col_icon_specifications text_genaral_one_line"
                        key={index}
                      >
                        <Image
                          quality={75}
                          height={0}
                          width={0}
                          sizes="100vw"
                          src={specification.icon}
                          className="icon_specifications"
                          alt="img_icon_share"
                        />
                        <span className="text_specifications">
                          {item[specification.key]}
                        </span>
                      </div>
                    ))}
                  </div> */}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default Slider3dHotProducts;
