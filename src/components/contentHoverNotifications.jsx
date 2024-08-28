"use client";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import Link from "next/link";

const ContentHoverNotifications = ({}) => {
  const { data, status } = useSession();

  const router = useRouter();
  const [dataNotification, setDataNotification] = useState();
  useEffect(() => {
    localStorage.removeItem("notification");

    const socket = io("http://192.168.245.190:3000");

    socket.on("notify", (dataSocket) => {
      try {
        // Parse the data if it's a string
        const dataConvert =
          typeof dataSocket === "string" ? JSON.parse(dataSocket) : dataSocket;
        const convert =
          typeof dataConvert.message === "string"
            ? JSON.parse(dataConvert.message)
            : dataConvert.message;

        // Check if the status is either authenticated or unauthenticated and match conditions
        const isRelevantNotification =
          (status === "authenticated" && convert.memberId === data?.user?.id) ||
          (status !== "loading" &&
            status === "unauthenticated" &&
            convert.type !== "orderStatus");

        if (isRelevantNotification) {
          setDataNotification((prev) => {
            const updatedNotifications = [
              convert,
              ...(prev?.slice(0, 9) || []),
            ];
            localStorage.setItem(
              "notification",
              JSON.stringify(updatedNotifications)
            );
            return updatedNotifications;
          });
        }
      } catch (error) {
        console.error("Error parsing notification data:", error);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const formatTimeDifference = (createdAt) => {
    const now = new Date();
    const daysDiff = differenceInDays(now, createdAt);

    if (daysDiff >= 365) {
      return `${Math.floor(daysDiff / 365)} năm ${daysDiff % 365} ngày`;
    } else if (daysDiff > 0) {
      return `${daysDiff} ngày`;
    } else {
      const hoursDiff = differenceInHours(now, createdAt);
      const minutesDiff = differenceInMinutes(now, createdAt) % 60;
      return `${
        hoursDiff > 0 ? `${hoursDiff} giờ` : ``
      }  ${minutesDiff} phút trước`;
    }
  };

  return (
    <div className="container_content_hover">
      <div className="container_hover_notification custom_scroll">
        {dataNotification?.map((item, index) => {
          const isOrderStatus = item?.type === "orderStatus";
          const isPromotion = item?.type === "promotion";
          const isCoupon = item?.type === "coupon";

          const content = (
            <div className="item_notification_hover row ms-0 me-1" key={index}>
              <div className="col-3 d-flex justify-content-center align-items-center flex-column">
                <Image
                  width={40}
                  height={40}
                  alt="ring"
                  src="/image/icon_image/bell-ring.png"
                />
                <span className="type_notification_time_hover">
                  {formatTimeDifference(item?.date)}
                </span>
              </div>
              <div className="col-9">
                <span className="title_notification_hover">
                  {isOrderStatus
                    ? "Trạng thái đơn hàng"
                    : isCoupon
                    ? "Mã khuyến mãi"
                    : ""}
                </span>
                <span className="text_genaral_two_line">
                  {isOrderStatus ? (
                    `Đơn hàng ${
                      item.codeOrder
                    } ${item.statusOrder.toLowerCase()}`
                  ) : isCoupon ? (
                    <Tooltip
                      title={`Mã giảm giá ${
                        item.codeCoupon
                      } trị giá ${(+item.priceCoupon).toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}`}
                    >
                      {`Mã giảm giá ${
                        item.codeCoupon
                      } trị giá ${(+item.priceCoupon).toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}`}
                    </Tooltip>
                  ) : (
                    item?.titlePromotion
                  )}
                </span>
              </div>
            </div>
          );

          return isOrderStatus || isPromotion ? (
            <Link
              href={
                isOrderStatus
                  ? `/account/order/${item?.idOrder}`
                  : `/news/tin-khuyen-mai/${item?.linkPromotion}`
              }
              key={index}
            >
              {content}
            </Link>
          ) : (
            content
          );
        })}
      </div>
    </div>
  );
};
export default ContentHoverNotifications;
