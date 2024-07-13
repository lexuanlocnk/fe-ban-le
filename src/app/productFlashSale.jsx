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

const ProductsFlashSale = () => {
  const { showModal } = UseAppContext();

  const deadline = getTimeLeft(); // Dayjs is also OK
  const [productsSale, setProductsSale] = useState([]);
  function getTimeLeft() {
    return new Date().setHours(24, 0, 0, 0) - Date.now();
  }
  useEffect(() => {
    setProductsSale([
      {
        imageUrl: "/image/macbook2.png",
        productName: "Laptop Dell XPS 13",
        price: 15000000,
        discountPercentage: 50,
        soldQuantity: 50,
      },
      {
        imageUrl: "/image/macbook2.png",
        productName: "Laptop ASUS ZenBook 14",
        price: 12000000,
        discountPercentage: 25,
        soldQuantity: 30,
      },
      {
        imageUrl: "/image/iphone1.png",
        productName: "Laptop HP Spectre x360",
        price: 14000000,
        discountPercentage: 40,
        soldQuantity: 40,
      },
      {
        imageUrl: "/image/iphone2.png",
        productName: "Laptop Lenovo ThinkPad X1 Carbon",
        price: 16900000,
        discountPercentage: 30,
        soldQuantity: 25,
      },
      {
        imageUrl: "/image/iphone3.png",
        productName: "Laptop Apple MacBook Pro 13",
        price: 18990000,
        discountPercentage: 25,
        soldQuantity: 60,
      },
      {
        imageUrl: "/image/macbook2.png",
        productName: "Laptop Microsoft Surface Laptop 4",
        price: 13900000,
        discountPercentage: 23,
        soldQuantity: 35,
      },
      {
        imageUrl: "/image/tannhiet.png",
        productName: "Laptop Razer Blade 15",
        price: 20000000,
        discountPercentage: 28,
        soldQuantity: 20,
      },
      {
        imageUrl: "/image/ipad1.png",
        productName: "Laptop Acer Predator Helios 300",
        price: 150090000,
        discountPercentage: 35,
        soldQuantity: 45,
      },
      {
        imageUrl: "/image/magicmouse.png",
        productName: "Laptop MSI GS66 Stealth",
        price: 17990000,
        discountPercentage: 25,
        soldQuantity: 55,
      },
      {
        imageUrl: "/image/macbook2.png",
        productName: "Laptop Gigabyte Aero 15 OLED",
        price: 19500000,
        discountPercentage: 33,
        soldQuantity: 70,
      },
    ]);
  }, []);

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
            {productsSale &&
              productsSale?.length > 0 &&
              productsSale?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="row   item_product_sale ">
                    <div className="col-12 overflow-hidden box_image_product_sale  image custom-product-selling">
                      <Image
                        quality={100}
                        height={0}
                        width={0}
                        sizes="100vw"
                        src={item.imageUrl}
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
                          src="/image/coupon.png"
                          alt="img_icon_share"
                        />
                      </div>
                      <div className="percent_sale d-flex align-items-center justify-content-center">
                        <div>
                          <div className="text_sale text-center">Giảm đến</div>
                          <div className="text_sale text-center ">
                            {item.discountPercentage}%
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 my-1">
                      <div className="name_product_sale  d-flex justify-content-center align-items-center">
                        <span className="text_genaral_two_line">
                          {item.productName}
                        </span>
                      </div>
                      <div className="price_product text-center">
                        <span className="">
                          {item.price.toLocaleString("vi", {
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
                        <Progressbar soldQuantity={item.soldQuantity} />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default ProductsFlashSale;
