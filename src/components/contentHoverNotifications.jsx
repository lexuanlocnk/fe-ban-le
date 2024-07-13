"use client";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ContentHoverNotifications = () => {
  const [notifications, setNotifications] = useState({
    publicNotice: [
      {
        id: 5,
        title: "Cập nhật thông tin cá nhân",
        message: "Thông tin cá nhân của bạn đã được cập nhật thành công.",
        type: "info",
        date: "2024-05-22",
        isRead: false, // Chưa đọc
      },
      {
        id: 7,
        title: "Đơn hàng đang xử lý",
        message:
          "Đơn hàng #12345 của bạn đang được xử lý. Chúng tôi sẽ thông báo khi đơn hàng được giao đi.",
        type: "info",
        date: "2024-05-22",
        isRead: true, // Chưa đọc
      },
      {
        id: 8,
        title: "Đơn hàng đã gửi đi",
        message:
          "Đơn hàng #12345 của bạn đã được gửi đi. Bạn có thể theo dõi đơn hàng tại đây.",
        type: "info",
        date: "2024-05-22",
        isRead: true, // Chưa đọc
      },
      {
        id: 9,
        title: "Đơn hàng đã bị hủy",
        message:
          "Đơn hàng #12345 của bạn đã bị hủy. Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi.",
        type: "warning",
        date: "2024-05-22",
        isRead: true, // Chưa đọc
      },
    ],
    promotionalNotification: [
      {
        id: 16,
        title: "Khuyến mãi đặc biệt",
        message:
          "Khuyến mãi đặc biệt! Giảm giá 20% cho tất cả các sản phẩm trong tuần này. Mua ngay!",
        type: "promotion",
        date: "2024-05-22",
        isRead: false, // Chưa đọc
      },
      {
        id: 17,
        title: "Mã giảm giá",
        message:
          "Mã giảm giá của bạn: SAVE20. Sử dụng mã này để được giảm 20% cho đơn hàng tiếp theo.",
        type: "promotion",
        date: "2024-05-22",
        isRead: false, // Chưa đọc
      },
      {
        id: 18,
        title: "Sự kiện giảm giá Black Friday",
        message:
          "Sự kiện Black Friday đang diễn ra! Giảm giá tới 50% cho hàng ngàn sản phẩm. Không thể bỏ lỡ!",
        type: "promotion",
        date: "2024-05-22",
        isRead: true, // Chưa đọc
      },
    ],
    orderNotification: [
      {
        id: 3,
        title: "Đăng ký tài khoản mới",
        message:
          "Chúc mừng! Tài khoản của bạn đã được tạo thành công. Bắt đầu mua sắm ngay thôi nào!",
        type: "success",
        date: "2024-05-22",
        isRead: false, // Chưa đọc
      },
      {
        id: 4,
        title: "Thay đổi mật khẩu thành công",
        message: "Mật khẩu của bạn đã được thay đổi thành công.",
        type: "success",
        date: "2024-05-22",
        isRead: false, // Chưa đọc
      },
      {
        id: 6,
        title: "Xác nhận đơn hàng",
        message:
          "Cảm ơn bạn đã đặt hàng! Đơn hàng #12345 của bạn đã được xác nhận.",
        type: "success",
        date: "2024-05-22",
        isRead: true, // Chưa đọc
      },
      {
        id: 10,
        title: "Giao hàng thành công",
        message:
          "Đơn hàng #12345 của bạn đã được giao thành công. Cảm ơn bạn đã mua sắm cùng chúng tôi!",
        type: "success",
        date: "2024-05-22",
        isRead: true, // Chưa đọc
      },
      {
        id: 12,
        title: "Hoàn tiền đơn hàng",
        message:
          "Bạn đã được hoàn tiền cho đơn hàng #12345. Số tiền sẽ sớm có trong tài khoản của bạn.",
        type: "success",
        date: "2024-05-22",
        isRead: true, // Chưa đọc
      },
      {
        id: 13,
        title: "Thanh toán thành công",
        message: "Thanh toán cho đơn hàng #12345 của bạn đã thành công.",
        type: "success",
        date: "2024-05-22",
        isRead: true, // Chưa đọc
      },
      {
        id: 14,
        title: "Thanh toán không thành công",
        message:
          "Thanh toán cho đơn hàng #12345 của bạn không thành công. Vui lòng thử lại hoặc chọn phương thức thanh toán khác.",
        type: "error",
        date: "2024-05-22",
        isRead: true, // Chưa đọc
      },
    ],
    systemNotification: [
      {
        id: 25,
        title: "Thông báo bảo trì",
        message:
          "Trang web của chúng tôi sẽ được bảo trì từ 2:00 AM đến 4:00 AM ngày mai. Mong bạn thông cảm vì sự bất tiện này.",
        type: "warning",
        date: "2024-05-22",
        isRead: false, // Chưa đọc
      },
      {
        id: 26,
        title: "Thông báo lỗi hệ thống",
        message:
          "Chúng tôi đang gặp một số vấn đề kỹ thuật. Đội ngũ của chúng tôi đang làm việc để khắc phục nhanh nhất có thể. Cảm ơn bạn đã kiên nhẫn.",
        type: "error",
        date: "2024-05-22",
        isRead: true, // Chưa đọc
      },
      {
        id: 27,
        title: "Cập nhật tính năng mới",
        message:
          "Chúng tôi vừa cập nhật thêm một số tính năng mới! Hãy khám phá ngay để có trải nghiệm mua sắm tốt hơn.",
        type: "info",
        date: "2024-05-22",
        isRead: true, // Chưa đọc
      },
    ],
  });

  const [seen, setSeen] = useState(false);

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
        {notifications &&
          Object.values(notifications)
            .flat()
            .filter((notification) => notification.isRead === seen)
            .map((notification, index) => (
              <div
                className={`item_notification_hover row ms-0 me-1 ${
                  notification.isRead ? "" : "bg_is_read_hover"
                }`}
                key={index}
              >
                <div className="col-2 d-flex justify-content-center align-items-center flex-column">
                  <div className="date_notification_hover">
                    {notification.isRead ? (
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
                    <span>{dayjs(notification.date).format("DD/MM/YYYY")}</span>
                  </div>
                </div>
                <div className="col-10">
                  <div className="title_notification_hover">
                    <span>{notification.title}</span>
                  </div>
                  <div className="title_content_hover">
                    <span className="text_genaral_two_line">
                      {notification.message}
                    </span>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <div className="btn_show_all_nitifications text-center mt-2">
        <Link href={"/account/notification"}>Xem tất cả các thông báo</Link>
      </div>
    </>
  );
};
export default ContentHoverNotifications;
