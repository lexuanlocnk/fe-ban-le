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

  const [seen, setSeen] = useState(false);
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

  const clickSeenNotification = (i) => {
    if (i.type == "orderStatus") {
      router.push(`/account/order/${i?.idOrder}`);
    }
    setDataNotification((prev) => {
      // Tạo một mảng mới với các thông báo đã cập nhật
      const newDataNotification = prev.map((item) =>
        item.socketId === i.socketId ? { ...item, seen: true } : item
      );

      // Lưu mảng thông báo mới vào localStorage
      localStorage.setItem("notification", JSON.stringify(newDataNotification));

      // Trả về mảng thông báo mới để cập nhật state
      return newDataNotification;
    });
  };

  return (
    <div className="container_content_hover">
      <div className="btn_click_filter">
        <span
          onClick={() => setSeen(true)}
          className={`item_filter_notification   ${
            seen == true ? "active_filer" : ""
          }   `}
        >
          Đã đọc
        </span>
        <span
          onClick={() => setSeen(false)}
          className={`item_filter_notification ${
            seen == false ? "active_filer" : ""
          }   `}
        >
          Chưa đọc
        </span>
      </div>
      <div className="container_hover_notification custom_scroll">
        {dataNotification?.length > 0 &&
          dataNotification
            .filter((item) => item?.seen === seen) // Lọc theo giá trị của `seen`
            .map((item, index) => (
              <div
                onClick={() => clickSeenNotification(item)}
                className={`item_notification_hover row ms-0 me-1 ${
                  item?.isRead ? "" : "bg_is_read_hover"
                }`}
                key={index}
              >
                <div className="col-3 d-flex justify-content-center align-items-center flex-column">
                  <div className="date_notification_hover">
                    <Image
                      width={40}
                      height={40}
                      alt="ring"
                      src={
                        item?.seen
                          ? "/image/icon_image/bell.png"
                          : "/image/icon_image/bell-ring.png"
                      }
                    />
                  </div>
                  <div className="type_notification_time_hover">
                    <span>{formatTimeDifference(item?.date)}</span>
                  </div>
                </div>
                <div className="col-9">
                  <div className="title_notification_hover">
                    <span>
                      {item?.type === "orderStatus"
                        ? "Trạng thái đơn hàng"
                        : item?.type === "coupon"
                        ? "Mã khuyến mãi"
                        : ""}
                    </span>
                  </div>
                  <div className="title_content_hover">
                    <span className="text_genaral_two_line">
                      {item?.type === "orderStatus" ? (
                        `Đơn hàng ${
                          item.codeOrder
                        } ${item.statusOrder.toLowerCase()}`
                      ) : item?.type === "coupon" ? (
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
                        ""
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
export default ContentHoverNotifications;
