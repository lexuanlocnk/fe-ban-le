"use client";
import React, { useState, useEffect, useCallback } from "react";
import { IoIosArrowDropup } from "react-icons/io";
import { TbEyeCheck } from "react-icons/tb";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Empty, Modal, Typography, Tooltip } from "antd";
import { UseAppContext } from "../app/lib/appProvider";
import Image from "next/image";
import { hostImage } from "../app/lib/config";
const ComponentButtonHomepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { status } = useSession();
  const { productViewed } = UseAppContext();

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const threshold = document.documentElement.scrollHeight * 0.15;
    setIsVisible(scrollPosition > threshold);
  }, []);

  useEffect(() => {
    const handleScrollThrottled = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", handleScrollThrottled);
    return () => window.removeEventListener("scroll", handleScrollThrottled);
  }, [handleScroll]);

  if (!isVisible) return null;

  const showModal = () => {
    Modal.confirm({
      width: 800,
      title: "Sản phẩm đã xem",
      content: (
        <div className="container_modal_viewed_products custom_scroll">
          {productViewed && productViewed.length > 0 ? (
            <div className="box_card_viewed_product py-1 px-3">
              {productViewed.map((item, index) => (
                <Link key={index} href={`/detail-product/${item.UrlProduct}`}>
                  <div className="card_product_viewed_modal row mx-0">
                    <div className="col-3 box_image_viewed_product">
                      <Image
                        src={hostImage + item?.Image}
                        width={90}
                        height={80}
                        alt={item?.ProductName}
                      />
                    </div>
                    <div className="col-9">
                      <div className="box_name_product_viewed_modal">
                        <span>{item?.ProductName}</span>
                      </div>
                      <div className="box_price_product_viewed_modal">
                        <span>
                          {item.Price.toLocaleString("vi", {
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={
                <Typography.Text>Chưa có sản phẩm nào!</Typography.Text>
              }
            />
          )}
        </div>
      ),
      icon: null,
      cancelText: "Đóng",
      onCancel: () => {},
    });
  };

  return (
    <>
      <div className="box_component_button_homepage">
        <div
          onClick={() => window.scroll(0, 0)}
          className="box_btn_scroll_top button_homepage_common"
        >
          <IoIosArrowDropup />
        </div>
        <Tooltip title="Sản phẩm đã xem">
          {status === "authenticated" ? (
            <Link href="/account/viewed-products">
              <div className="box_btn_viewed_products button_homepage_common">
                <TbEyeCheck />
              </div>
            </Link>
          ) : (
            <div
              onClick={showModal}
              className="box_btn_viewed_products button_homepage_common"
            >
              <TbEyeCheck />
            </div>
          )}
        </Tooltip>
      </div>
    </>
  );
};

export default ComponentButtonHomepage;
