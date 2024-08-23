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
import { useCallback, useEffect, useState } from "react";
import { hostApi } from "../lib/config";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
const InfoHeader = () => {
  const { data, status } = useSession();
  const [dataNotification, setDataNotification] = useState(
    typeof window !== "undefined" && localStorage.getItem("notification")
      ? JSON.parse(localStorage.getItem("notification"))
      : []
  );

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
        `${hostApi}/member/show-cart?id=${data?.user?.id}`,
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

  useEffect(() => {
    const socket = io("http://192.168.245.190:3000");

    socket.on("notify", (data) => {
      try {
        // Check if data is a string, parse only if it is
        const dataConvert = typeof data === "string" ? JSON.parse(data) : data;
        const convert =
          typeof dataConvert.message === "string"
            ? JSON.parse(dataConvert.message)
            : dataConvert.message;

        setDataNotification((prev) => {
          if (!prev.some((item) => convert.socketId.includes(item.socketId))) {
            const updatedNotifications = [convert, ...prev.slice(0, 9)]; // Add new notification and keep only the first 10 items

            localStorage.setItem(
              "notification",
              JSON.stringify(updatedNotifications)
            );
            return updatedNotifications;
          }
          return prev;
        });
      } catch (error) {
        console.error("Error parsing notification data:", error);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const checkNotifications = (notifications) => {
    if (status && status === "authenticated") {
      return notifications
        .map((item) => {
          if (
            item.type === "orderStatus" &&
            item?.memberId === data?.user?.id
          ) {
            return item;
          }
          if (item.type !== "orderStatus") {
            return item;
          }
          return null; // or return undefined; if you want to skip the invalid items
        })
        .filter((item) => item !== null); // filter out null values
    } else {
      return notifications.filter((item) => item.type !== "orderStatus");
    }
  };

  const contentAccount = <ContentHoverMenuAccount />;
  const contentNotifications = (
    <ContentHoverNotifications
      setDataNotification={setDataNotification}
      dataNotification={checkNotifications(dataNotification)}
    />
  );
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
