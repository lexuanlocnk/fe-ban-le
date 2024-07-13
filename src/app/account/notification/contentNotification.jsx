"use client";
import Image from "next/image";
import Breadcrumb from "../../../components/breadcrumb";
import MenuAccount from "../menuAccount";
import { SiHomeadvisor, SiAzuredataexplorer } from "react-icons/si";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaGift } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { Popover, Tooltip } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const ContentNotification = () => {
  const [typeNotification, setTypeNotification] = useState("publicNotice");
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

  const defaultMenuItem = {
    id: 6,
    name: "Thông báo của bạn",
  };

  const typeNotifications = [
    {
      key: "publicNotice",
      name: "Thông báo chung",
      icon: <SiHomeadvisor />,
    },
    {
      key: "promotionalNotification",
      name: "Thông báo khuyến mãi",
      icon: <FaGift />,
    },
    {
      key: "orderNotification",
      name: "Thông báo đơn hàng",
      icon: <GiNotebook />,
    },
    {
      key: "systemNotification",
      name: "Thông báo hệ thống",
      icon: <SiAzuredataexplorer />,
    },
  ];

  const handleReadAll = (type) => {
    setNotifications((prevState) => ({
      ...prevState,
      [type]: prevState[type].map((notification) => ({
        ...notification,
        isRead: true,
      })),
    }));
  };

  const handleRemoveAllNotifications = (type) => {
    setNotifications((prevState) => ({
      ...prevState,
      [type]: [],
    }));
  };

  const handleClickRead = (id, type) => {
    setNotifications((prevState) => ({
      ...prevState,
      [type]: prevState[type].map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      ),
    }));
  };
  const handleRemoveNotification = (id, type) => {
    setNotifications((prevState) => ({
      ...prevState,
      [type]: prevState[type].filter((notification) => notification.id !== id),
    }));
  };

  const content = (
    <div>
      <span
        onClick={() => handleReadAll(typeNotification)}
        className="text_in_dot"
      >
        Đánh dấu đã đọc tất cả
      </span>
      <span
        onClick={() => handleRemoveAllNotifications(typeNotification)}
        className="text_in_dot"
      >
        Xóa tất cả thông báo
      </span>
    </div>
  );

  return (
    <div className="box-container-content-account">
      <div className="in-box-container-content-account pt-2">
        <div className="row box-content-account mx-0">
          <div className="col-12 ">
            <Breadcrumb nameItem={defaultMenuItem.name} />
          </div>

          <MenuAccount defaultMenuItem={defaultMenuItem} />
          <div className="col-9  mt-2">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text_title_common ">{defaultMenuItem.name}</span>
              <span className="text_seen_notification "></span>
            </div>
            <div className={` box_notification   `}>
              <div className="box_type_notification">
                <div className="type_notification">
                  {typeNotifications &&
                    typeNotifications?.length > 0 &&
                    typeNotifications.map((item, index) => (
                      <Tooltip placement="top" key={index} title={item.name}>
                        <div
                          onClick={() => setTypeNotification(item.key)}
                          className={`box_icon_notification ${
                            item.key == typeNotification
                              ? "active_type_notification"
                              : ""
                          } `}
                        >
                          {item.icon}
                        </div>
                      </Tooltip>
                    ))}
                </div>

                <Popover placement="bottomLeft" content={content}>
                  <HiOutlineDotsVertical className="icon_dot" />
                </Popover>
              </div>

              {notifications &&
              Object.keys(notifications).length > 0 &&
              notifications[typeNotification].length > 0 ? (
                <>
                  {notifications[typeNotification].map((item, index) => (
                    <div
                      className={`item_notification row mx-0 ${
                        item.isRead ? "" : "bg_is_read"
                      }`}
                      key={index}
                    >
                      <div className="col-2 d-flex justify-content-center align-items-center flex-column">
                        <div className="date_notification">
                          {item.isRead ? (
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
                        <div className="type_notification_time">
                          <span>{dayjs(item.date).format("DD/MM/YYYY")}</span>
                        </div>
                      </div>
                      <div className="col-8">
                        <div className="title_notification">
                          <span>{item.title}</span>
                        </div>
                        <div className="title_content">
                          <span>{item.message}</span>
                        </div>
                      </div>
                      <div className="col-2 d-flex justify-content-center align-items-end flex-column">
                        <span
                          onClick={() =>
                            handleRemoveNotification(item.id, typeNotification)
                          }
                          className="btn_delete_notification"
                        >
                          Xóa
                        </span>
                        <span
                          onClick={() =>
                            handleClickRead(item.id, typeNotification)
                          }
                          className="btn_read_notification "
                        >
                          Đã đọc
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="box_notification_empty">
                  <Image
                    alt="notification"
                    width={150}
                    height={150}
                    src={"/image/icon_image/notification.png"}
                  />
                  <span className="description_notification">
                    Bạn chưa có thông báo mới
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentNotification;
