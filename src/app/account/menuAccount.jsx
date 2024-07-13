import { FaMapLocationDot } from "react-icons/fa6";
import { IoLogOut, IoNotifications } from "react-icons/io5";
import { FaUserCircle, FaUserLock, FaEye } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import ButtonSignOut from "./buttonSignOut";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/nextAuth";
import { Skeleton } from "antd";
import InfoUserUpdate from "./InfoUserUpdate";

const MenuAccount = async ({ defaultMenuItem }) => {
  const session = await getServerSession(authOptions);

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
      id: 6,
      name: "Thông báo",
      link: "/account/notification",
      icon: <IoNotifications />,
      key: "notification",
    },
    {
      id: 7,
      name: "Đăng xuất",
      signOut: "/account/notification",
      icon: <IoLogOut />,
      key: "notification",
    },
  ];

  return (
    <div className="col-3 menu-account mt-2">
      <div className="container_account_user">
        {session && session.user ? (
          <div className="box_account_user">
            <div className="box_image_account">
              <div className="box_avatar_name">
                <span className="avatar_name">
                  {session.user.full_name
                    ? session.user.full_name.split(" ").pop().charAt(0)
                    : "?".split(" ").pop().charAt(0)}
                </span>
              </div>
            </div>

            <InfoUserUpdate user={session.user} />
          </div>
        ) : (
          <div className="box_skeleton_menu_account">
            <Skeleton
              active
              paragraph={{
                rows: 4,
              }}
            />
          </div>
        )}

        <div className="box_image_points">
          <div className="title_points">
            <div className="title">
              <span className="text_point">Điểm thưởng</span>
              <div className="points">
                <Image
                  alt="coin"
                  src={"/image/icon_image/coin.png"}
                  width={30}
                  height={30}
                />
                <span className="menu_account_points">1000 </span>
              </div>
            </div>
            <div className="image_bg_coin">
              <Image
                alt="coin"
                src={"/image/goldenpot1.png"}
                width={80}
                height={90}
                quality={100}
              />
            </div>
          </div>
          <div className="description_point">
            <span>
              Mua sắm để tích điểm và đổi quà tại QUANGBAO nhé!{" "}
              <Link href={"/"}>Mua sắm ngay</Link>{" "}
            </span>
          </div>
        </div>
      </div>

      <div className="box_all_item_menu  mt-2">
        {MenuAccount &&
          MenuAccount.length > 0 &&
          MenuAccount.map((item, index) => {
            return item && item.link ? (
              <Link key={index} href={item.link}>
                <div
                  className={`item-menu-account ${
                    defaultMenuItem.id === item.id ? "active" : ""
                  }`}
                >
                  <div className="icon_menu_account">{item.icon}</div>
                  <span>{item.name}</span>
                </div>
              </Link>
            ) : (
              <ButtonSignOut item={item} key={index} />
            );
          })}
      </div>
    </div>
  );
};

export default MenuAccount;
