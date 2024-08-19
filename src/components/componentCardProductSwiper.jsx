"use client";
import Image from "next/image";
import { PlusCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { hostApi, hostImage } from "../app/lib/config";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import { UseAppContext } from "../app/lib/appProvider";

const ComponentCardProductSwiper = ({ item }) => {
  const { data, status } = useSession();
  const { openNotificationWithIcon, dispatch } = UseAppContext();

  const addToCartNotAccount = (value) => {
    openNotificationWithIcon(
      "success",
      "Thêm vào giỏ hàng thành công",
      `Đã thêm sản phẩm ${value.ProductName} vào giỏ hàng`
    );

    dispatch({ type: "ADD_TO_CART_NOT_ACCOUNT", payload: value });
  };

  const addProductToCart = useDebouncedCallback(async (value) => {
    try {
      const response = await fetch(
        `${hostApi}/member/add-update-cart/${data.user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value,
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

  return (
    <div className="w-100 bg-white px-2 pt-2 pb-2   box-card-selling-product mt-2 mb-3 cursor-pointer">
      <Link className="" href={"/detail-product/" + item.UrlProduct}>
        <div className="box-img-selling-product image custom-product-selling ">
          <Image
            quality={100}
            height={45}
            width={45}
            sizes="100vw"
            src={hostImage + item.Image}
            alt={item.ProductName}
            className="w-100 h-100"
          />
        </div>
      </Link>

      <div className="box-info-selling-product">
        <div className="info-selling-product p-md-3 p-2">
          <div className="box-name-selling-product color-product-selling">
            <Tooltip title={item.ProductName} color={"#2db7f5"}>
              <Link className="" href={"/detail-product/" + item.UrlProduct}>
                <h6 className="name-selling-product mb-1  text_genaral_two_line_2">
                  {item.ProductName}
                </h6>
              </Link>
            </Tooltip>
          </div>
          <div className="box-detail-selling-product color-product-selling mb-2">
            <span className="css-text-general">{item.DesShort}</span>
          </div>
          <div className="box-price-selling-product color-product-selling  d-flex align-items-center justify-content-between cursor-pointer">
            <div className="box_price_card_swiper">
              <span>
                {item?.PriceOld?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              <s>
                {item?.Price?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </s>
            </div>

            {status === "unauthenticated" ? (
              <div
                onClick={() => addToCartNotAccount(item)}
                className="d-inline float-right mr-1 "
              >
                <PlusCircleOutlined className="icon-plus" />
              </div>
            ) : (
              <div
                onClick={() => addProductToCart(item)}
                className="d-inline float-right mr-1 "
              >
                <PlusCircleOutlined className="icon-plus" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ComponentCardProductSwiper;
