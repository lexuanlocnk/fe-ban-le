"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import BoxMenuCategory from "../../components/boxMenuCategory";

const LeftHeaderDetail = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isBoxRendered, setIsBoxRendered] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen((prev) => !prev);
    if (!isBoxRendered) {
      setIsBoxRendered(true); // Chỉ render BoxMenuCategory một lần
    }
  };

  useEffect(() => {
    const updateScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1025);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        if (isOpen) {
          // Đóng menu khi cuộn lên đầu trang
          setIsOpen(false);
        }
      }
    };

    // Kiểm tra kích thước màn hình ngay khi component mount
    updateScreenSize();

    // Lắng nghe sự kiện cuộn và thay đổi kích thước
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateScreenSize);

    // Cleanup sự kiện khi component bị hủy
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScreenSize);
    };
  }, [isOpen]);

  return (
    <div className="left-header-detail col-xl-2 col-md-2 col-12 px-0 ">
      {isScrolled && isLargeScreen ? (
        <div className="transformed-left-header-detail">
          <div className="transformed-logo">
            <Link href="/">
              <Image
                quality={100}
                height={35}
                width={36}
                src="/image/transformed_logo.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="transformed-category-menu" onClick={handleOpenMenu}>
            <MenuOutlined />
            <span>Danh mục sản phẩm</span>
          </div>
        </div>
      ) : (
        <div className="logo-header">
          <Link href="/">
            <Image
              quality={100}
              height={0}
              width={0}
              sizes="100vw"
              src="/image/logo.jpg"
              alt="logo"
            />
          </Link>
        </div>
      )}
      <div
        className={`box_category_menu_container ${
          isOpen ? "show-menu" : "hide-menu"
        }`}
      >
        <BoxMenuCategory />
      </div>
      {isScrolled && isLargeScreen && isOpen && (
        <div
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            }
          }}
          className="transformed_menu_category_container"
        ></div>
      )}
    </div>
  );
};

export default LeftHeaderDetail;
