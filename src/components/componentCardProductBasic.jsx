"use client";
import Image from "next/image";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { hostApi, hostImage } from "../app/lib/config";
import { useDebouncedCallback } from "use-debounce";
import { UseAppContext } from "../app/lib/appProvider";
const ComponentCardProductBasic = ({ item, col }) => {
  const { dispatch, openNotificationWithIcon } = UseAppContext();
  const { data, status } = useSession();

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
    <div className={`${col} p-1 viewed_product_card_container`}>
      <div className="item_card_product_basic bg-white">
        <Link className="" href={"/detail-product/" + item.UrlProduct}>
          <div className="img_card_product_basic  overflow-hidden   image custom-product-selling">
            <Image
              quality={100}
              height={200}
              width={200}
              sizes="100vw"
              src={hostImage + item.Image}
              alt={item.ProductName}
              className="w-100 h-100"
            />
          </div>
        </Link>

        <div className="info_card_product_basic">
          <div className="name_card_product_basic ">
            <Link className="" href={"/detail-product/" + item.UrlProduct}>
              <span className="text_genaral_two_line">{item.ProductName}</span>
            </Link>
          </div>

          <div className="description_card_product_basic mb-1">
            {/* <span className="text_genaral_two_line">{item.DesShort}</span> */}
          </div>

          <div className="price_discount_card_product_basic">
            <span>
              {item.PriceOld.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </span>
            <s className="price_yet_sale">
              {item.Price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </s>
          </div>
          <div className="box_price_card_product_basic"></div>
          {status === "unauthenticated" ? (
            <div
              onClick={() => addToCartNotAccount(item)}
              className="btn_add_product_cart_basic bg_add_btn_cart color_three_btn_action"
            >
              <span>Thêm vào giỏ hàng </span>
            </div>
          ) : (
            <div
              onClick={() => addProductToCart(item)}
              className="btn_add_product_cart_basic bg_add_btn_cart color_three_btn_action"
            >
              <span>Thêm vào giỏ hàng </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ComponentCardProductBasic;
