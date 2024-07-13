"use client";
import Image from "next/image";
import Link from "next/link";
import { hostImage } from "../app/lib/config";
import { useEffect } from "react";

const ContentHoverCart = ({ dataCart, total, status, dispatch }) => {
  useEffect(() => {
    dispatch({
      type: "TOTAL_COST_ALL_PRODUCTS",
      payload: status == "unauthenticated" ? "productNotAccount" : "products",
    });
  }, [dataCart]);

  return (
    <div className="container_hover_cart">
      {dataCart && dataCart.length > 0 && (
        <>
          <div className="box_cart custom_scroll">
            {dataCart &&
              dataCart?.length &&
              dataCart.map((item, index) => (
                <div
                  key={index}
                  className="item_product_cart_hover row ms-0 me-1"
                >
                  <div className="col-3 px-0 d-flex justify-content-center align-items-center">
                    <div className="box_image_item_product_cart_hover">
                      <Image
                        quality={100}
                        height={70}
                        width={70}
                        src={
                          hostImage + (item.Image ? item.Image : item.Picture)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-9">
                    <div className="item_infor_product_cart_hover">
                      <span className="name_product_cart_hover text_genaral_two_line_2">
                        {item.ProductName}
                      </span>
                      <span className="color_product_cart_hover"></span>
                      <span className="color_product_cart_hover">
                        Số lượng: {item.quantity}
                      </span>
                      <span className="price_product_cart_hover d-block">
                        {status == "unauthenticated"
                          ? item?.Price?.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })
                          : item?.PriceOld?.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="text_total_product_cart">
            <span className="text_title_total_product_cart">
              Tổng tiền {dataCart.length} sản phẩm{" "}
            </span>
            <span className="text_total__products_cart">
              {total.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}{" "}
            </span>
          </div>
        </>
      )}

      <div className="btn_to_cart text-center">
        <Link href={"/cart"}>Đi đến giỏ hàng</Link>
      </div>
    </div>
  );
};
export default ContentHoverCart;
