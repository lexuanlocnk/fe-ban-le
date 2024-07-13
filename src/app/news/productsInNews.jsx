"use client";
import ComponentCardProductSwiper from "../../components/componentCardProductSwiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const ProductsInNews = () => {
  const [swiper, setSwiper] = useState(null);
  const isPhone = useMediaQuery({ query: "(max-width:480px)" });

  const dataProducts = [
    {
      name: "Laptop Microsoft Surface Laptop 4",
      thumbnail: "/image/macbook2.png",
      description:
        "Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item",
      price: 3090000,
      discountPercentage: "",
    },
    {
      name: "Laptop MSI GS66 Stealth",
      thumbnail: "/image/macbook2.png",
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 18490000,
      discountPercentage: "",
    },
    {
      name: "Laptop ASUS ZenBook 14",
      thumbnail: "/image/iphone1.png",
      description: "OPPO F19 is officially announced on April 2021.",
      price: 22690000,
      discountPercentage: "",
    },
    {
      name: "Laptop Acer Predator Helios 300",
      thumbnail: "/image/iphone2.png",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: 3690000,
      discountPercentage: "",
    },
    {
      name: "Laptop HP Spectre x360",
      thumbnail: "/image/iphone3.png",
      description:
        "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
      price: 9190000,
      discountPercentage: "",
    },
    {
      name: "Laptop Dell XPS 13",
      thumbnail: "/image/macbook2.png",
      description:
        "Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
      price: 8390000,
      discountPercentage: "",
    },
    {
      name: "MacBook Pro",
      thumbnail: "/image/laptop-lenovo-thinkpad-p52-core-i7-8850h-1 (1).jpg",
      description:
        "Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
      price: 8390000,
      discountPercentage: "",
    },
    {
      name: "HP Spectre x360",
      thumbnail: "/image/laptop-lenovo-thinkpad-p52-core-i7-8850h-3.jpg",
      description:
        "Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
      price: 8390000,
      discountPercentage: "",
    },
    {
      name: "MacBook Air",
      thumbnail: "/image/macbook_pro_14_inch_mac24h.png",
      description:
        "Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
      price: 8390000,
      discountPercentage: "",
    },
  ];

  const nextSlideCustom = () => {
    if (
      isNaN(swiper?.realIndex) ||
      swiper?.realIndex + 2 >= dataProducts.length - 1
    ) {
      swiper.slideTo(0, 1000);
    } else {
      swiper?.slideToLoop(
        isPhone ? swiper?.realIndex + 2 : swiper?.realIndex + 3,
        1000
      );
    }
  };

  const prevSlideCustom = () => {
    if (isNaN(swiper?.realIndex) || swiper?.realIndex == 0) {
      swiper.slideTo(dataProducts.length - 1, 1000);
    } else {
      swiper?.slideToLoop(
        isPhone ? swiper?.realIndex - 2 : swiper?.realIndex - 3,
        1000
      );
    }
  };
  return (
    <div className="row mx-0 product-in-news bg-white mb-3">
      <div className="col-12 mb-2">
        <Image
          src={"/image/fireworks.png"}
          width={50}
          height={50}
          alt="Pháo hoa"
        />

        <span className="text_products-in-news ms-2">
          Sản phẩm dành riêng cho bạn
        </span>
      </div>
      <div className="col-12 box-product-in-news position-relative">
        <div onClick={nextSlideCustom} className="btn_next_slide_custom">
          <RightCircleOutlined />
        </div>
        <div onClick={prevSlideCustom} className="btn_prev_slide_custom">
          <LeftCircleOutlined />
        </div>
        {/* <Swiper
          loop={true}
          onSwiper={setSwiper}
          loopAdditionalSlides={6}
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
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          className="mySwiper"
        >
          {dataProducts &&
            dataProducts?.length > 0 &&
            dataProducts?.map((item, index) => (
              <SwiperSlide key={index}>
                <ComponentCardProductSwiper item={item} />
              </SwiperSlide>
            ))}
        </Swiper> */}
      </div>
    </div>
  );
};

export default ProductsInNews;
