"use client";
import Image from "next/image";
import { hostApi, hostImage } from "../app/lib/config";
import { UseAppContext } from "../app/lib/appProvider";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";

const ComponentCardProductMain = ({ item, col }) => {
  const { showModal, dispatch, openNotificationWithIcon } = UseAppContext();
  const { data, status } = useSession();
  const router = useRouter();

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

  const handleBuyNowNotAccount = (value) => {
    const { ProductId } = value;

    dispatch({
      type: "CLICK_BUY_NOW",
      payload: {
        idCart: null,
        idProduct: ProductId,
      },
    });
    dispatch({ type: "ADD_TO_CART_NOT_ACCOUNT", payload: value });

    router.push("/cart");
  };

  const handleBuyNow = useDebouncedCallback(async (value) => {
    const { ProductId } = value;

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
        router.push("/cart");

        dispatch({
          type: "CLICK_BUY_NOW",
          payload: {
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
    <div className={`${col} p-1`}>
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
              {status === "loading"
                ? "Đang cập nhật"
                : item.Price.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
            </span>
            <s className="price_yet_sale">
              {item.PriceOld.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </s>
          </div>
          <div className="box_price_card_product_basic"></div>

          {item && item.compareStatus && item.compareStatus == true && (
            <div
              onClick={() => showModal(item)}
              className="btn_add_product_cart_basic bg_compare_btn_product color_three_btn_action"
            >
              {" "}
              <span>So sánh sản phẩm</span>
            </div>
          )}

          {item && item.compareStatus == false && (
            <div className="btn_add_product_cart_basic no_compare">
              <span>So thể so sánh</span>
            </div>
          )}

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

          {status === "unauthenticated" ? (
            <div
              onClick={() => handleBuyNowNotAccount(item)}
              className="btn_add_product_cart_basic bg_buy_btn_products color_three_btn_action"
            >
              <span>Mua ngay</span>
            </div>
          ) : (
            <div
              onClick={() => handleBuyNow(item)}
              className="btn_add_product_cart_basic bg_buy_btn_products color_three_btn_action"
            >
              {" "}
              <span>Mua ngay </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ComponentCardProductMain;
