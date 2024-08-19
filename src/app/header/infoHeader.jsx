"use client";
import ContentHoverMenuAccount from "../../components/contentHoverMenuAccount";
import ContentHoverNotifications from "../../components/contentHoverNotifications";
import ContentHoverCart from "../../components/contentHoverCart";
import { Popover, Skeleton } from "antd";
import {
  UserOutlined,
  BellOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { UseAppContext } from "../lib/appProvider";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { hostApi } from "../lib/config";
import { useSession } from "next-auth/react";

const InfoHeader = () => {
  const { data, status } = useSession();

  const {
    dispatch,
    stateCart: { products, total, productNotAccount },
  } = UseAppContext();

  useEffect(() => {
    if (status && status === "authenticated") {
      fetchDataProductsCart();
    }
  }, [status]);

  const fetchDataProductsCart = useCallback(async () => {
    try {
      const response = await fetch(
        `${hostApi}/member/show-cart?id=${data.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataRes = await response.json();

      dispatch({ type: "FETCH_PRODUCT_CART", payload: dataRes.data });
    } catch (error) {
      console.error("Err:", error);
    }
  }, []);

  const contentAccount = <ContentHoverMenuAccount />;
  const contentNotifications = <ContentHoverNotifications />;
  const contentCart =
    status === "loading" ? (
      <div className="skeleton">
        <Skeleton
          avatar
          paragraph={{ rows: 3 }}
          size={"small"}
          active
          className=""
        />
      </div>
    ) : (
      <ContentHoverCart
        dispatch={dispatch}
        status={status}
        total={total}
        dataCart={status === "unauthenticated" ? productNotAccount : products}
      />
    );

  return (
    <>
      {status == "loading" ? (
        <div className="col-md-5  box_skeleton_info_header">
          <Skeleton
            active
            paragraph={{
              rows: 4,
            }}
          />
        </div>
      ) : (
        <div className="box_menu_header col-md-5 col-12 py-1  ">
          {status && status == "loading" ? (
            <div
              className={`item_menu_header ${
                status == "loading" ? "skeleton" : ""
              }`}
            >
              <Skeleton
                avatar
                paragraph={{
                  rows: 3,
                }}
                size={"small"}
                active
                className=""
              />
            </div>
          ) : status === "unauthenticated" ? (
            <div className="item_property_header">
              <Link href={"/login"}>
                <div className="item_menu_header">
                  <UserOutlined className="icon_item_menu" />
                  <span className="text_item_menu">Đăng nhập</span>
                </div>
              </Link>
            </div>
          ) : (
            <div className="item_property_header">
              <Popover
                className="item_menu_header"
                placement="bottomRight"
                content={contentAccount}
              >
                <UserOutlined className="icon_item_menu" />
                <span className="text_item_menu">
                  Chào bạn{" "}
                  {data?.user?.full_name?.split(" ").pop() ||
                    data?.user?.username?.split(" ").pop()}
                </span>
              </Popover>
            </div>
          )}

          <div className="item_property_header">
            <Popover
              className="item_menu_header"
              placement="bottomRight"
              content={contentNotifications}
            >
              <BellOutlined className="icon_item_menu" />
              <span className="text_item_menu">Thông báo</span>
            </Popover>
          </div>

          <div className="item_property_header">
            <Popover
              className="item_menu_header"
              placement="bottomRight"
              content={contentCart}
            >
              <ShoppingCartOutlined className="icon_item_menu" />
              <span className="text_item_menu">
                {status === "loading"
                  ? `Đang cập nhật`
                  : status === "unauthenticated"
                  ? `Giỏ hàng: ${productNotAccount?.length} sản phẩm`
                  : `Giỏ hàng: ${products?.length} sản phẩm`}
              </span>
            </Popover>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoHeader;
