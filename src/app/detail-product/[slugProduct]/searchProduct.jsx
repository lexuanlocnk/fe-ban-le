"use client";

import React, { useState } from "react";
import { Input } from "antd"; // Import Input từ antd
import { SearchOutlined, ClockCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { UseAppContext } from "../../lib/appProvider";
import { useDebouncedCallback } from "use-debounce";
import { hostApi, hostImage } from "../../lib/config";
import { useSession } from "next-auth/react";
import Link from "next/link";
const SearchProduct = ({}) => {
  const { statusSearch, setStatusSearch } = UseAppContext();
  const { data, status } = useSession();

  const [dataSearchProducts, setDataSearchProducts] = useState();

  const HandleSearchProduct = () => {
    setStatusSearch(!statusSearch);
  };

  const [hotProduct, setHotProduct] = useState([
    { link: "/image/linhkien-1.jpg", name: "Thiết bị phát WiFi di động" },
    { link: "/image/linhkien2.jpg", name: "Ổ cứng di động WD" },
    {
      link: "/image/linhkien3.jpg",
      name: "Card đồ họa Nvidia GeForce RTX 3080",
    },
    { link: "/image/linhkien4.jpg", name: "Bàn phím cơ Corsair" },
    { link: "/image/linhkien5.jpg", name: "Loa Bluetooth JBL" },
    { link: "/image/linhkien6.jpg", name: "Phụ kiện máy tính" },
  ]);

  const handleSearch = useDebouncedCallback((term) => {
    if (term.length >= 4) {
      fetchDataProducts(term);
    } else {
      setDataSearchProducts({});
    }
  }, 700);

  const fetchDataProducts = async (value) => {
    try {
      const response = await fetch(
        `${hostApi}/member/search-product?key=${value}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDataSearchProducts(data.product);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <>
      <div className="w-100 position-relative">
        <Input
          className="input-search-product"
          onClick={HandleSearchProduct}
          prefix={<SearchOutlined />}
          placeholder="Nhập từ khóa tìm kiếm"
          allowClear
          onChange={(e) => handleSearch(e.target.value)}
          size="large"
        />
        {statusSearch && (
          <div className="box-content-search">
            <div className={`  "category-sale" } row mx-0`}>
              <div className="col-12 py-2">
                <span className="name-category-first-research">
                  {" "}
                  Kết quả tìm kiếm
                </span>
              </div>

              <div className="container_result_search custom_scroll">
                {dataSearchProducts &&
                  dataSearchProducts?.length > 0 &&
                  dataSearchProducts.map((item, index) => (
                    <Link href={"#"}>
                      <div className="col-12 px-4 py-2 " key={index}>
                        <div className="row mx-0 card_product_search">
                          <div className="col-3">
                            <div className="box_img_card_product_search">
                              <Image
                                src={hostImage + item.picture}
                                width={100}
                                height={80}
                                alt={item.productName}
                              />
                            </div>
                          </div>
                          <div className="col-9">
                            <div className="box_name_price_product_search">
                              <span className="name_product_search">
                                {item.productName}
                              </span>
                              <span className="price_product_search">
                                {status == "unauthenticated"
                                  ? item.price.toLocaleString("vi", {
                                      style: "currency",
                                      currency: "VND",
                                    })
                                  : item.priceOld.toLocaleString("vi", {
                                      style: "currency",
                                      currency: "VND",
                                    })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
            <div className="popular-searches  row mx-0">
              <div className="col-12 py-2">
                <span className="name-category-first-research d-flex align-items-center">
                  <Image
                    quality={75}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="img-research mr-1"
                    src="/image/growth.svg"
                    alt="img_icon_share"
                  />
                  <span> Tìm Kiếm Phổ Biến</span>
                </span>
              </div>
              <div className="col-12 py-2 px-1 custom-responsive">
                <div className="row mx-0 ">
                  {hotProduct &&
                    hotProduct.length > 0 &&
                    hotProduct.map((item, index) => (
                      <div className="col-md-4 col-6 px-0 py-1" key={index}>
                        <div className="row mx-0 box-item-hot p-1">
                          <div className="image is-1by1-custom col-4 d-flex justify-content-center">
                            <Image
                              quality={75}
                              height={0}
                              width={0}
                              sizes="100vw"
                              src={item.link}
                              className="w-100 h-100 img-hot-item"
                              alt="img_icon_share"
                            />
                          </div>
                          <div className="col-8 item-hot px-2  ">
                            <span className="name-item">{item.name}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchProduct;
