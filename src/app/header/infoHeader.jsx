"use client";
import ContentHoverMenuAccount from "../../components/contentHoverMenuAccount";
import ContentHoverNotifications from "../../components/contentHoverNotifications";
import ContentHoverCart from "../../components/contentHoverCart";
import { Popover, Skeleton } from "antd";
import {
  UserOutlined,
  BellOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  AppstoreOutlined,
  HomeFilled,
  ShoppingFilled,
  ShoppingOutlined,
} from "@ant-design/icons";
import { UseAppContext } from "../lib/appProvider";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { hostApi } from "../lib/config";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import { FaRegUser, FaUser } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { Button, Drawer, Space } from "antd";
import MobileBoxMenuCategory from "../../components/mobileBoxMenuCategory";

const InfoHeader = () => {
  const [mobileOpenFilter, setMobileOpenFilter] = useState(false);
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(""); // Lưu trữ đường dẫn item được chọn

  const onClose = () => {
    setMobileOpenFilter(false);
  };

  const handleClick = (path) => {
    setActiveItem(path); // Cập nhật item đang chọn khi người dùng click
  };

  const { data, status } = useSession();

  const {
    dispatch,
    stateCart: { products, total, productNotAccount },
  } = UseAppContext();

  useEffect(() => {
    // Lưu đường dẫn hiện tại vào biến activeItem
    setActiveItem(pathname); // Lấy đường dẫn như "/cart"
  }, [pathname]);

  useEffect(() => {
    if (status && status === "authenticated") {
      fetchDataProductsCart();
    }
  }, [status]);

  const fetchDataProductsCart = useCallback(async () => {
    try {
      const response = await fetch(
        `${hostApi}/member/show-cart?id=${data?.user?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataRes = await response.json();

      if (dataRes.status) {
        dispatch({ type: "FETCH_PRODUCT_CART", payload: dataRes.data });
      }
    } catch (error) {
      console.error("Err:", error);
    }
  }, []);

  // const checkNotifications = (notifications) => {
  //   if (status && status === "authenticated") {
  //     return notifications
  //       .map((item) => {
  //         if (
  //           item.type === "orderStatus" &&
  //           item?.memberId === data?.user?.id
  //         ) {
  //           return item;
  //         }
  //         if (item.type !== "orderStatus") {
  //           return item;
  //         }
  //         return null; // or return undefined; if you want to skip the invalid items
  //       })
  //       .filter((item) => item !== null); // filter out null values
  //   } else {
  //     return notifications.filter((item) => item.type !== "orderStatus");
  //   }
  // };

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
            <div className="item_property_header" id="header-login">
              <Link href={"/login"}>
                <div className="item_menu_header">
                  <UserOutlined className="icon_item_menu" />
                  <span className="text_item_menu">Đăng nhập</span>
                </div>
              </Link>
            </div>
          ) : (
            <div className="item_property_header" id="header-login">
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

          <div className="item_property_header" id="header-noti">
            <Popover
              className="item_menu_header"
              placement="bottomRight"
              content={contentNotifications}
            >
              <BellOutlined className="icon_item_menu" />
              <span className="text_item_menu">Thông báo</span>
            </Popover>
          </div>

          <div className="item_property_header" id="header-cart">
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
      <div className="mobile_box_menu_header  ">
        <div className="item_property_header" id="mobile-header-home">
          <Link href={"/"} onClick={() => handleClick("/")}>
            <div
              className={`item_menu_header ${
                activeItem === "/" ? "active_bottom_tab" : ""
              }`}
            >
              {activeItem === "/" ? (
                <HomeFilled className="icon_item_menu" />
              ) : (
                <HomeOutlined className="icon_item_menu" />
              )}
              <span className="text_item_menu">Trang chủ</span>
            </div>
          </Link>
        </div>
        <div className="item_property_header" id="mobile-header-category">
          <div>
            <div
              className="item_menu_header"
              onClick={() => {
                setMobileOpenFilter(!mobileOpenFilter);
              }}
            >
              <AppstoreOutlined className="icon_item_menu" />
              <span className="text_item_menu">Danh mục</span>
            </div>
          </div>
          <Drawer
            title="Danh mục sản phẩm"
            placement={"bottom"}
            width={500}
            onClose={onClose}
            open={mobileOpenFilter}
          >
            <MobileBoxMenuCategory></MobileBoxMenuCategory>
          </Drawer>
        </div>
        <div className="item_property_header" id="mobile-header-cart">
          <Link
            className={`item_menu_header ${
              activeItem === "/cart" ? "active_bottom_tab" : ""
            }`}
            href={"/cart"}
            onClick={() => handleClick("/cart")}
          >
            {activeItem === "/cart" ? (
              <ShoppingFilled className="icon_item_menu" />
            ) : (
              <ShoppingOutlined className="icon_item_menu" />
            )}
            <div className="cart-product-number">
              <span>
                {status === "unauthenticated"
                  ? `${productNotAccount?.length}`
                  : `${products?.length}`}
              </span>
            </div>
            <span className="text_item_menu">
              {status === "loading"
                ? `Đang cập nhật`
                : status === "unauthenticated"
                ? `Giỏ hàng`
                : `Giỏ hàng`}
            </span>
          </Link>
        </div>
        {status === "unauthenticated" ? (
          <div
            className={`item_menu_header ${
              activeItem === "/login" ? "active_bottom_tab" : ""
            }`}
            id="mobile-header-login"
          >
            <Link href={"/login"} onClick={() => handleClick("/login")}>
              <div
                className={`item_menu_header ${
                  activeItem === "/login" ? "active_bottom_tab" : ""
                }`}
              >
                {activeItem === "/login" ? (
                  <FaUser className="icon_item_menu" />
                ) : (
                  <FaRegUser className="icon_item_menu" />
                )}
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
      </div>
    </>
  );
};

export default InfoHeader;
