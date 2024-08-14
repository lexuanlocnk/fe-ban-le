"use client";

import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { RiRefundLine } from "react-icons/ri";
import { MdPriceCheck } from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
import { IoMdCopy } from "react-icons/io";

import Breadcrumb from "../../../components/breadcrumb";
import CompareProducts from "./compareProducts";
import { scrollToElement } from "../../lib/functions";
import { useSession } from "next-auth/react";
import { memo, useEffect, useState } from "react";
import { Modal, Tag } from "antd";
import { UseAppContext } from "../../lib/appProvider";
import GalleryImage from "./galleryImage";
import dayjs from "dayjs";
import { FiGift } from "react-icons/fi";
import { hostApi } from "../../lib/config";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";

const InfoProduct = ({
  dataProduct,
  dataProductsCompare,
  dataGiftProduct,
  breadcrumbData,
}) => {
  const { data, status } = useSession();
  const [elementBoxDescription, setElementBoxDescription] = useState(null);
  const [checkShowInfo, setCheckShowInfo] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const {
    handleAddProductViewed,
    stateCart: { valueVoucherDetail },
    dispatch,
    openNotificationWithIcon,
  } = UseAppContext();
  const router = useRouter();

  const handleShowHide = (status) => {
    setCheckShowInfo(!checkShowInfo);

    if (status === "hide") {
      scrollToElement(elementBoxDescription);
    }
  };

  const handleCancel = () => {
    setModalDetail(false);
  };

  useEffect(() => {
    const element = document?.getElementById("box_description-much");
    setElementBoxDescription(element);
  }, []);

  useEffect(() => {
    handleAddProductViewed(dataProduct);
  }, []);

  const addToCartNotAccount = () => {
    const { parameter, listPictures, ...dataAddCart } = dataProduct;

    openNotificationWithIcon(
      "success",
      "Thêm vào giỏ hàng thành công",
      `Đã thêm sản phẩm ${dataAddCart.ProductName} vào giỏ hàng`
    );
    dispatch({ type: "ADD_TO_CART_NOT_ACCOUNT", payload: dataAddCart });
  };

  const addProductToCart = useDebouncedCallback(async () => {
    const { parameter, listPictures, ...dataAddCart } = dataProduct;

    try {
      const response = await fetch(
        `${hostApi}/member/add-update-cart/${data.user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: dataAddCart,
          }),
        }
      );

      const dataRes = await response.json();

      if (dataRes.status) {
        openNotificationWithIcon(
          "success",
          "Thêm vào giỏ hàng thành công",
          `Đã thêm sản phẩm ${dataRes.product.ProductName} vào giỏ hàng`
        );

        dispatch({ type: "ADD_TO_PRODUCT_TO_CART", payload: dataRes.product });
      }
    } catch (error) {
      console.error("Err:", error);
    }
  }, 200);

  const handleBuyNowNotAccount = () => {
    const { parameter, listPictures, ...dataAddCart } = dataProduct;

    dispatch({
      type: "CLICK_BUY_NOW",
      payload: {
        status: "only",

        idCart: null,
        idProduct: dataAddCart.ProductId,
      },
    });
    dispatch({ type: "ADD_TO_CART_NOT_ACCOUNT", payload: dataAddCart });

    router.push("/cart");
  };

  const handleBuyNow = useDebouncedCallback(async () => {
    const { parameter, listPictures, ...dataAddCart } = dataProduct;

    try {
      const response = await fetch(
        `${hostApi}/member/add-update-cart/${data.user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: dataAddCart,
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
            idProduct: dataRes.product.ProductId,
          },
        });

        dispatch({ type: "ADD_TO_PRODUCT_TO_CART", payload: dataRes.product });
      }
    } catch (error) {
      console.error("Err:", error);
    }
  }, 200);

  console.log("dataProduct", dataProduct);

  return (
    <>
      <div className="row container-content-detail-product ">
        <div className="my-2">
          <Breadcrumb
            breadcrumbData={breadcrumbData}
            nameItem={dataProduct.ProductName}
          />
        </div>

        <div className="col-md-9 col-12      ps-0 ">
          <div className="row mx-0 box_info_detail_product bg-white">
            <div className="col-5 px-0">
              <GalleryImage
                imageMain={dataProduct?.Image || ""}
                listImages={
                  dataProduct?.listPictures ? dataProduct.listPictures : []
                }

                // listImages={
                //   dataProduct?.listPictures
                //     ? dataProduct.listPictures.slice(0, 1)
                //     : []
                // }
              />
              <div>
                <span className="text-technical-specifications">
                  Thông số kĩ thuật
                </span>
                {dataProduct &&
                  dataProduct.parameter &&
                  dataProduct.parameter.length > 0 &&
                  dataProduct.parameter.slice(0, 6).map((item, index) => {
                    return (
                      <span
                        key={index}
                        className=" text-infor-product my-1 text_genaral_two_line_2"
                      >
                        <strong className="me-1">{item.catOption}:</strong>{" "}
                        {item.nameCatOption || "Chưa cập nhật"}
                      </span>
                    );
                  })}
                <span
                  onClick={() => setModalDetail(true)}
                  className="see-detail d-block text-center"
                >
                  Xem chi tiết sản phẩm
                </span>
              </div>
            </div>
            <div className="col-7">
              <div className="container_info_product">
                <div className="box_name_product_detail">
                  <span>{dataProduct.ProductName}</span>
                </div>
              </div>
              <div className="box_brand_product_detail">
                <span className="title_brand_product_detail">Thương hiệu:</span>{" "}
                <span className="value_brand_product_detail">
                  {dataProduct?.BrandName}
                </span>
              </div>
              <div className="box_brand_product_detail">
                <span className="title_brand_product_detail">Tình trạng:</span>{" "}
                <span className="value_brand_product_detail">
                  {dataProduct?.stock === 1
                    ? "Còn hàng"
                    : dataProduct?.stock === 0
                    ? "Liên hệ"
                    : "Ngừng kinh doanh"}
                </span>
              </div>
              <div className="box_brand_product_detail">
                <span className="title_brand_product_detail">Mã sản phẩm:</span>{" "}
                <span className="value_brand_product_detail">
                  {dataProduct?.maso}
                </span>
              </div>

              <div className="box_price_product_detail mt-2">
                <div className="box_price_main">
                  {valueVoucherDetail ? (
                    <div>
                      <span>
                        {(
                          dataProduct.PriceOld - valueVoucherDetail.valueVoucher
                        ).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                      <span className="include_vat"> (Đã bao gồm VAT)</span>
                    </div>
                  ) : (
                    <div>
                      <span>
                        {dataProduct.PriceOld.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                      <span className="include_vat"> (Đã bao gồm VAT)</span>
                    </div>
                  )}
                </div>
                <div className="box_price_sale">
                  <s>
                    {dataProduct.Price.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </s>
                  <span>-13.049%</span>
                </div>
              </div>

              <div className="box_text_copy">
                <IoMdCopy />
                <span>COPY đường dẫn sản phẩm</span>
              </div>

              {dataGiftProduct?.checkPresent &&
                dataGiftProduct.checkPresent.length > 0 && (
                  <div className="box_gift_coupon">
                    <span className="title_gift_product">
                      QUÀ TẶNG SẢN PHẨM
                    </span>
                    {dataGiftProduct.checkPresent.map((item) => (
                      <div className="box_gift_product" key={item.id}>
                        <div
                          className="box_content_gift_product"
                          dangerouslySetInnerHTML={{
                            __html: item.content,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

              {dataGiftProduct?.checkCoupon &&
                dataGiftProduct.checkCoupon.length > 0 && (
                  <div className="box_coupon_product">
                    <span className="title_gift_product">
                      CHỌN 1 TRONG NHỮNG KHUYẾN MÃI SAU
                    </span>
                    {dataGiftProduct.checkCoupon.map((item) => (
                      <div className="my-2" key={item.id}>
                        {item?.coupon_desc &&
                          item.coupon_desc.length > 0 &&
                          item.coupon_desc.map((itemVoucher, index) => {
                            const customItemVoucher = {
                              releaseCode: item.MaPhatHanh,
                              valueVoucher: item.GiaTriCoupon,
                              status: "add",
                              ...itemVoucher,
                            };

                            const handleClick = () => {
                              if (
                                valueVoucherDetail?.MaCouponDes ===
                                itemVoucher.MaCouponDes
                              ) {
                                dispatch({
                                  type: "ADD_VOUCHER_DETAIL",
                                  payload: {
                                    valueVoucherOld: item.GiaTriCoupon || 0,
                                    status: "remove",
                                  },
                                });
                              } else {
                                dispatch({
                                  type: "ADD_VOUCHER_DETAIL",
                                  payload: customItemVoucher,
                                });
                              }
                            };

                            return (
                              <div
                                key={index}
                                className={` ${
                                  valueVoucherDetail?.MaCouponDes ===
                                  itemVoucher.MaCouponDes
                                    ? " active_voucher"
                                    : "border_solid_common"
                                } row mx-0 mt-2 item-voucher cursor-pointer `}
                                onClick={handleClick}
                              >
                                <div className="col-2 box-img-voucher">
                                  <div>
                                    <FiGift className="icon_voucher" />
                                  </div>
                                </div>
                                <div className="col-10 d-flex justify-content-between align-items-center">
                                  <div>
                                    <div className="name_voucher">
                                      <Tag color="geekblue">
                                        {itemVoucher.MaCouponDes}
                                      </Tag>
                                      <p>
                                        {item.GiaTriCoupon.toLocaleString(
                                          "vi",
                                          { style: "currency", currency: "VND" }
                                        )}
                                      </p>
                                    </div>
                                    <div className="text-voucher">
                                      Đơn tối thiểu:{" "}
                                      {item.DonHangChapNhanTu.toLocaleString(
                                        "vi",
                                        { style: "currency", currency: "VND" }
                                      )}{" "}
                                    </div>
                                    <div className="text-voucher">
                                      HSD:{" "}
                                      {dayjs
                                        .unix(item.EndCouponDate)
                                        .format("DD/MM/YYYY")}
                                    </div>
                                  </div>
                                  <div className="btn_choose">
                                    {valueVoucherDetail?.MaCouponDes ===
                                    itemVoucher?.MaCouponDes ? (
                                      <div className="box_choose">
                                        <span className="text_choose_voucher">
                                          Bỏ chọn
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="box_choose">
                                        <span className="text_choose_voucher">
                                          Áp dụng
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    ))}
                  </div>
                )}

              <div className="box_btn_buy_now_add_cart_detail row mx-0 mt-2">
                <div className="  ps-0 pe-1 col-6">
                  {status === "unauthenticated" ? (
                    <div
                      onClick={handleBuyNowNotAccount}
                      className="btn_buy_now btn_detail border_solid_common"
                    >
                      <span>MUA NGAY</span>
                    </div>
                  ) : (
                    <div
                      onClick={handleBuyNow}
                      className="btn_buy_now btn_detail border_solid_common"
                    >
                      <span>MUA NGAY</span>
                    </div>
                  )}
                </div>
                <div className="pe-0 ps-1  col-6">
                  {status === "unauthenticated" ? (
                    <div
                      onClick={addToCartNotAccount}
                      className="btn_add_cart btn_detail border_solid_common"
                    >
                      <span>THÊM VÀO GIỎ HÀNG</span>
                    </div>
                  ) : (
                    <div
                      onClick={addProductToCart}
                      className="btn_add_cart btn_detail border_solid_common"
                    >
                      <span>THÊM VÀO GIỎ HÀNG</span>
                    </div>
                  )}
                </div>
              </div>

              {dataGiftProduct?.checkGiftPromotion &&
                dataGiftProduct.checkGiftPromotion.length > 0 && (
                  <div className="box_news_promotion_related">
                    <span className="title_promotion_related">
                      Khuyến mãi liên quan
                    </span>
                    {dataGiftProduct.checkGiftPromotion.map((item) => (
                      <div className="box_gift_product" key={item.id}>
                        <div
                          className="box_content_gift_product"
                          dangerouslySetInnerHTML={{
                            __html: item.content,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className="col-md-3 col-12 buy-product-detail py-3 px-1">
          <div className="row  mx-1 pb-1">
            <div className="col-12 px-0">
              {/* <div className="name-store ">
                <span>{dataProduct.ProductName}</span>
              </div> */}
            </div>
          </div>
          <div className="row mx-1 pt-0">
            <div className="col-12 px-0  "></div>

            <div className="col-12 ">
              <div className=" value-count">
                <span>Chính sách bán hàng</span>
              </div>
              <div className="box_text_commit">
                <IoShieldCheckmarkOutline />
                <span>Cam kết chính hãng 100%</span>
              </div>
              <div className="box_text_commit">
                <RiRefundLine />
                <span>Chính sách hoàn tiền</span>
              </div>
              <div className="box_text_commit">
                <MdPriceCheck />
                <span> Giá cạnh tranh nhất thị trường</span>
              </div>{" "}
              <div className="box_text_commit">
                <GiAutoRepair />
                <span> Bảo hành tại nơi sử dụng</span>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="row box-description-much pb-3">
        {dataProduct && dataProduct.productDescription && (
          <div className="col-12 description-much bg-white my-2 p-3">
            <div
              id="box_description-much"
              className={`${
                checkShowInfo ? "" : "box_description-much_hide"
              }  `}
            >
              {dataProduct && dataProduct.productDescription && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataProduct.productDescription,
                  }}
                />
              )}
            </div>
            {elementBoxDescription &&
              elementBoxDescription.offsetHeight > 400 && (
                <div className=" text-center btn-show-hide ">
                  {!checkShowInfo ? (
                    <span onClick={() => handleShowHide("show")}>Xem thêm</span>
                  ) : (
                    <span onClick={() => handleShowHide("hide")}>Thu gọn</span>
                  )}
                </div>
              )}
          </div>
        )}

        {dataProductsCompare && Object.keys(dataProductsCompare).length > 1 && (
          <CompareProducts
            status={status}
            dataProductsCompare={dataProductsCompare}
          />
        )}

        <Modal
          title={`Thông số kĩ thuật`}
          open={modalDetail}
          footer={null}
          onCancel={handleCancel}
          width={800}
        >
          <div className="box_content_parameter custom_scroll">
            {dataProduct &&
              dataProduct.parameter &&
              dataProduct.parameter.length > 0 &&
              dataProduct.parameter.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      index % 2 == 0 ? "bg_parameter" : ""
                    } box_parameter `}
                  >
                    <span className="title_parameter">{item.catOption}:</span>{" "}
                    <span className="value_parameter">
                      {item.nameCatOption || "Chưa cập nhật"}
                    </span>
                  </div>
                );
              })}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default memo(InfoProduct);
