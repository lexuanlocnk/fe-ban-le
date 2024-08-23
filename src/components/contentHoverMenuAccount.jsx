"use client";
import Link from "next/link";
import { FaEye, FaUserCircle } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import { IoNotifications, IoLogOut, IoKeySharp } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";

const ContentHoverMenuAccount = () => {
  const { data } = useSession();
  const MenuAccount = [
    {
      id: 1,
      name: "Thông tin cá nhân",
      link: "/account",
      icon: <FaUserCircle />,
      key: "infoAccount",
    },

    {
      id: 3,
      name: "Quản lý đơn hàng",
      link: "/account/orders",
      icon: <GiNotebook />,
      key: "orderManagement",
    },

    {
      id: 4,
      name: "Sản phẩm đã xem",
      link: "/account/viewed-products",
      icon: <FaEye />,
      key: "viewedProducts",
    },
    {
      id: 5,
      name: "Sổ địa chỉ",
      link: "/account/address-account",
      icon: <FaMapLocationDot />,
      key: "address",
    },

    {
      id: 7,
      name: "Đổi mật khẩu",
      link: "/account/change-password",
      icon: <IoKeySharp />,
      key: "changePassword",
    },
    {
      id: 8,
      name: "Đăng xuất",
      signOut: "/account/notification",
      icon: <IoLogOut />,
      key: "signOut",
    },
  ];

  return (
    <div className="container_hover_account">
      <div className="d-flex justify-content-start align-items-center">
        <div className="box_avatar_account">
          <div className=" box_image_account">
            <span className="avatar_name">
              {data.user.full_name
                ? data.user.full_name.split(" ").pop().charAt(0)
                : data.user.username.split(" ").pop().charAt(0)}
            </span>
          </div>
        </div>
        <div className="box_name_mail_account">
          <span className="name_account">
            {data.user.full_name || data.user.username}
          </span>
          <span className="mail_account">{data.user.email}</span>
        </div>
      </div>
      <div className="box_menu_hover_account mt-2">
        {MenuAccount &&
          MenuAccount.length > 0 &&
          MenuAccount.map((item, index) => {
            if (!item) return null;

            if (
              item.key === "changePassword" &&
              data?.user?.provider === "credentials"
            ) {
              return (
                <Link key={index} href={item.link}>
                  <div className="box_item_hover_account">
                    <span className="icon_hover_account">{item.icon}</span>
                    <span className="text_hover_account">{item.name}</span>
                  </div>
                </Link>
              );
            } else if (item.key === "signOut") {
              return (
                <span
                  className="cursor-pointer"
                  key={index}
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <div className="box_item_hover_account">
                    <span className="icon_hover_account">{item.icon}</span>
                    <span className="text_hover_account">{item.name}</span>
                  </div>
                </span>
              );
            } else if (item.key !== "changePassword") {
              return (
                <Link key={index} href={item.link}>
                  <div className="box_item_hover_account">
                    <span className="icon_hover_account">{item.icon}</span>
                    <span className="text_hover_account">{item.name}</span>
                  </div>
                </Link>
              );
            }

            return null;
          })}
      </div>
    </div>
  );
};
export default ContentHoverMenuAccount;
