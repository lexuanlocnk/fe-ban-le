"use client";

import React, { Fragment, useState } from "react";
import TableCompareProducts from "./tableCompareProduct";
import { useRouter } from "next/navigation";

import "../../../public/css/cssCompareProduct.css";
import "../../../public/css/cssContentHomePage.css";
import "../../../public/css/detail-product.css";

import { Image } from "antd";
import { hostApi, hostImage } from "../lib/config";
import { UseAppContext } from "../lib/appProvider";
import { useSession } from "next-auth/react";
import { useDebouncedCallback } from "use-debounce";

const ContentCompareProduct = ({ dataCompare }) => {
  const imagesPreview = (value) => {
    return value.map((itemPicture) => `${hostImage}${itemPicture.picture}`);
  };
  const { dispatch } = UseAppContext();
  const { data, status } = useSession();

  const router = useRouter();

  const handleBuyNowNotAccount = (value) => {
    const { ProductId } = value;
    const { dataTechnology, listPictures, ...valueAddCart } = value;

    dispatch({
      type: "CLICK_BUY_NOW",
      payload: {
        status: "only",
        idCart: null,
        idProduct: ProductId,
      },
    });
    dispatch({ type: "ADD_TO_CART_NOT_ACCOUNT", payload: valueAddCart });

    router.push("/cart");
  };

  const handleBuyNow = useDebouncedCallback(async (value) => {
    const { ProductId } = value;
    const { dataTechnology, listPictures, ...valueAddCart } = value;

    try {
      const response = await fetch(
        `${hostApi}/member/add-update-cart/${data.user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: valueAddCart,
          }),
        }
      );

      const dataRes = await response.json();

      if (dataRes.status) {
        router.push("/cart");

        dispatch({
          type: "CLICK_BUY_NOW",
          payload: {
            status: "only",

            idCart: dataRes.product.CartId,
            idProduct: ProductId,
          },
        });

        dispatch({ type: "ADD_TO_PRODUCT_TO_CART", payload: dataRes.product });
      }
    } catch (error) {
      console.error("Err:", error);
    }
  }, 200);

  return (
    <Fragment>
      <div className="box_container_content_compare_product">
        <div className="container_content_compare_product row">
          <div className="mt-2 col-12 box_image_product_compare_page">
            <div className="bg-white content_info_compare_page">
              <div className="row mx-0 box_compare_container">
                <div className="col-6 col-lg-4  px-3 mb-2 mt-1 compare_title_container">
                  <span className="related-product">SO SÁNH SẢN PHẨM</span>

                  <div className="box_name_product_compare_2">
                    {dataCompare &&
                      dataCompare?.map((item, index) => (
                        <Fragment key={item.ProductId || index}>
                          <div>
                            <span className="name_title_product">
                              {item.ProductName}
                            </span>
                            <div className="brand_product_compare">
                              <span className="title_brand_product_compare">
                                Thương hiệu:
                              </span>{" "}
                              <span className="value_brand_product_compare">
                                {item.brandName}
                              </span>{" "}
                            </div>
                          </div>
                          {index === 0 && (
                            <Image
                              src="/image/vs.png"
                              alt="image vs"
                              width={50}
                              height={50}
                            />
                          )}
                        </Fragment>
                      ))}
                  </div>
                </div>
                <div className="col-6 col-lg-8 mt-1 box_info_product_compare_container">
                  <div className="box_info_product_compare row">
                    {dataCompare &&
                      dataCompare.map((item, index) => (
                        <div className="card_product_compare col-6">
                          <div className="box_card_product_compare">
                            <div className="box_image_card_product_compare ">
                              <Image.PreviewGroup
                                items={imagesPreview(item.listPictures)}
                              >
                                <Image
                                  className=" image_antd_card_compare   w-100 h-100"
                                  src={hostImage + item.Image}
                                />
                              </Image.PreviewGroup>
                            </div>

                            <div className="title_card_product_compare mt-2">
                              <span className="name_product_compare text_genaral_two_line_2">
                                {item.ProductName}
                              </span>
                              <span className="price_product_compare">
                                {item.Price.toLocaleString("vi", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </span>
                              <s className="price_sale_product_compare">
                                {item.PriceOld.toLocaleString("vi", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </s>
                            </div>
                            {status === "unauthenticated" ? (
                              <div
                                onClick={() => handleBuyNowNotAccount(item)}
                                className="btn_buy_now  bg_buy_btn_products"
                              >
                                <span>Mua ngay</span>
                              </div>
                            ) : (
                              <div
                                onClick={() => handleBuyNow(item)}
                                className="btn_buy_now  bg_buy_btn_products"
                              >
                                <span>Mua ngay</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" my-2 col-12 box_content_compare_product">
            <TableCompareProducts dataCompare={dataCompare} />
          </div>
        </div>
      </div>

      {/*
      
   <Lightbox
        carousel={{ finite: slides.length <= 1 }}
        render={{
          buttonPrev: slides.length <= 1 ? () => null : undefined,
          buttonNext: slides.length <= 1 ? () => null : undefined,
        }}
        open={isOpenLightBox}
        close={() => setIsOpenLightBox(false)}
        slides={slides}
        plugins={[Fullscreen, Thumbnails, Zoom]}
      />

      <Lightbox
        carousel={{ finite: slides.length <= 1 }}
        render={{
          buttonPrev: slideVideo.length <= 1 ? () => null : undefined,
          buttonNext: slideVideo.length <= 1 ? () => null : undefined,
        }}
        slides={slideVideo}
        open={openLightBoxVideo}
        close={() => setOpenLightBoxVideo(false)}
        plugins={[Youtube]}
      />

      <Lightbox
        carousel={{ finite: slides360.length <= 1 }}
        slides={slides360}
        open={openLightBoxImg36O}
        close={() => setOpenLightBoxImg36O(false)}
        plugins={[Youtube]}
        render={{
          buttonPrev: slides360.length <= 1 ? () => null : undefined,
          buttonNext: slides360.length <= 1 ? () => null : undefined,
          slide: ({ slide, rect }) =>
            isImageSlide(slide) ? (
              <ComponentImage3D slide={slide} />
            ) : undefined,
        }}
      /> */}
    </Fragment>
  );
};

export default ContentCompareProduct;
