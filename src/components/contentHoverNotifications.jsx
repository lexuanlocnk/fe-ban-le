"use client";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Tooltip } from "antd";

const ContentHoverNotifications = ({ dataNotification, status }) => {
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

  return (
    <>
      <div className="btn_click_filter">
        <span
          className={`item_filter_notification ${seen ? "active_filer" : ""}`}
          onClick={() => setSeen(true)}
        >
          Đã đọc
        </span>
        <span
          className={`item_filter_notification ${!seen ? "active_filer" : ""}`}
          onClick={() => setSeen(false)}
        >
          Chưa đọc
        </span>
      </div>
      <div className="container_hover_notification custom_scroll">
        {dataNotification && dataNotification.length > 0 ? (
          <>
            {dataNotification.map((item, index) => (
              <div
                className={`item_notification_hover row ms-0 me-1 ${
                  item?.isRead ? "" : "bg_is_read_hover"
                }`}
                key={index}
              >
                <div className="col-3 d-flex justify-content-center align-items-center flex-column ">
                  <div className="date_notification_hover">
                    {item?.isRead ? (
                      <Image
                        width={40}
                        height={40}
                        alt="ring"
                        src={"/image/icon_image/bell.png"}
                      />
                    ) : (
                      <Image
                        width={40}
                        height={40}
                        alt="ring"
                        src={"/image/icon_image/bell-ring.png"}
                      />
                    )}
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
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="btn_show_all_nitifications text-center mt-2">
        <Link href={"/account/notification"}>Xem tất cả các thông báo</Link>
      </div>
    </>
  );
};
export default ContentHoverNotifications;
