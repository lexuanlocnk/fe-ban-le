"use client";
import { useEffect, useState } from "react";
import CountdownTimer from "../components/countDownTimer";
import Link from "next/link";
import { Tooltip } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { UseAppContext } from "./lib/appProvider";
import { Autoplay, Navigation } from "swiper/modules";
import Progressbar from "../components/componentProccessbar";
import Image from "next/image";
import { hostImage } from "./lib/config";

const ProductsFlashSale = ({ productsFlashSale }) => {
  const { showModal } = UseAppContext();

  const deadline = getTimeLeft(); // Dayjs is also OK
  function getTimeLeft() {
    return new Date().setHours(24, 0, 0, 0) - Date.now();
  }
  useEffect(() => {}, []);

  return (
    <div className="container_flash_sale row px-3">
      <div className=" col-12 box_flash_sale d-flex justify-content-between align-items-center">
        <div className="box_image_time d-inline d-flex   align-items-center ">
          <div className="box_image mr-2">
            <Image
              quality={75}
              height={0}
              width={0}
              sizes="100vw"
              src="/image/flash-sales.png"
              alt="image-flash-sale"
              className="image_flash_sale"
            />
          </div>
          <CountdownTimer duration={deadline} />
        </div>
        <Link className="text-decoration-none link-show-more" href="#">
          Xem tất cả <RightCircleOutlined />
        </Link>
      </div>
      <div className="col-12 box_products_flash_sale">
        <div className="container_products_flash_sale ">
          <Swiper
            autoplay={{ delay: 2000 }}
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
                spaceBetween: 50,
              },
            }}
            loop={true}
            spaceBetween={35}
            slidesPerView={2}
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper px-4 py-2"
          >
            {productsFlashSale &&
              productsFlashSale?.length > 0 &&
              productsFlashSale?.map((item, index) => (
                <SwiperSlide key={item.ProductId}>
                  <Link href={`/detail-product/${item.UrlProduct}`}>
                    <div className="row   item_product_sale ">
                      <div className="col-12 overflow-hidden box_image_product_sale  image custom-product-selling">
                        <Image
                          quality={100}
                          height={0}
                          width={0}
                          sizes="100vw"
                          src={hostImage + item.Image}
                          className="w-100 h-100 img_product_sale"
                          alt="img_icon_share"
                        />
                        <div className="icon_flash_sale">
                          <Image
                            quality={75}
                            height={0}
                            width={0}
                            sizes="100vw"
                            className="w-100 h-100"
                            src={hostImage + item.ImageStatus}
                            alt="img_icon_share"
                          />
                        </div>
                        <div className="percent_sale d-flex align-items-center justify-content-center">
                          <div>
                            <div className="text_sale text-center">
                              Giảm đến
                            </div>
                            <div className="text_sale text-center ">
                              {((item.PriceOld - item.discountPrice) /
                                item.discountPrice) *
                                100}
                              %
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 my-1">
                        <div className="name_product_sale  d-flex justify-content-center align-items-center">
                          <span className="text_genaral_two_line">
                            {item.ProductName}
                          </span>
                        </div>
                        <div className="price_product text-center">
                          <span className="">
                            {item.discountPrice.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>

                        <div className="my-1 d-flex align-items-center justify-content-around">
                          <Tooltip
                            placement="top"
                            title="Thêm vào giỏ hàng"
                            arrow={false}
                          >
                            <div className="item_btn_hot_product w-100">
                              <Image
                                quality={75}
                                height={0}
                                width={0}
                                sizes="100vw"
                                src="/image/shopping-cart.png"
                                className="img_btn_hot_product_2"
                                alt="img_icon_share"
                              />
                            </div>
                          </Tooltip>

                          <Tooltip
                            placement="top"
                            title="Mua sản phẩm"
                            arrow={false}
                          >
                            <div className="item_btn_hot_product w-100 py-1">
                              {" "}
                              <Image
                                quality={75}
                                height={0}
                                width={0}
                                sizes="100vw"
                                src="/image/buy.png"
                                className="img_btn_hot_product_2"
                                alt="img_icon_share"
                              />
                            </div>
                          </Tooltip>

                          <Tooltip
                            placement="top"
                            title="So sánh sản phẩm"
                            arrow={false}
                          >
                            <div
                              onClick={showModal}
                              className="item_btn_hot_product w-100"
                            >
                              {" "}
                              <Image
                                quality={75}
                                height={0}
                                width={0}
                                sizes="100vw"
                                src="/image/compare.png"
                                className="img_btn_hot_product_2"
                                alt="img_icon_share"
                              />
                            </div>
                          </Tooltip>
                        </div>
                        <div className="my-1">
                          <Progressbar soldQuantity={16} />
                        </div>
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
export default ProductsFlashSale;
