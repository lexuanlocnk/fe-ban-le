"use client";

import React, { useEffect, useState } from "react";
import { Input, Spin } from "antd"; // Import Input từ antd
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import Image from "next/image";
import { UseAppContext } from "../../lib/appProvider";
import { useDebouncedCallback } from "use-debounce";
import { hostApi, hostImage } from "../../lib/config";
import { useSession } from "next-auth/react";
import Link from "next/link";
const SearchProduct = ({}) => {
  const { statusSearch, setStatusSearch } = UseAppContext();
  const { status } = useSession();
  const [loading, setLoading] = useState(false);

  const [dataSearchProducts, setDataSearchProducts] = useState();
  const [historySearch, setHistorySearch] = useState(
    typeof window !== "undefined" && localStorage.getItem("history_search")
      ? JSON.parse(localStorage.getItem("history_search"))
      : []
  );

  const HandleSearchProduct = () => {
    setStatusSearch(!statusSearch);
  };

  const handleSearch = useDebouncedCallback((term) => {
    if (term.length >= 2) {
      setLoading(true);
      fetchDataProducts(term);
    } else {
      setDataSearchProducts({});
    }
  }, 500);

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
      setHistorySearch((prev) => [value, ...prev]);

      const data = await response.json();

      if (data.status) {
        setLoading(false);
        setDataSearchProducts(data.product);
        setStatusSearch(true);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setStatusSearch(false);
  }, []);
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
          <div
            onMouseLeave={() => setStatusSearch(false)}
            className="box-content-search"
          >
            <div className={`    row mx-0`}>
              <div className="col-12 py-2">
                <span className="name-category-first-research">
                  {" "}
                  Kết quả tìm kiếm
                </span>
              </div>
              {loading ? (
                <div className="load_search_product my-2 text-center">
                  <Spin tip="Loading" />
                </div>
              ) : (
                <div className="container_result_search custom_scroll">
                  {dataSearchProducts &&
                    dataSearchProducts?.length > 0 &&
                    dataSearchProducts.map((item, index) => (
                      <Link href={`detail-product/${item.friendLyUrl}`}>
                        <div
                          className="col-12 px-4 py-2 box_cart_product_search"
                          key={index}
                        >
                          <div className="row mx-0 card_product_search">
                            <div className="col-3 box_img_card_product_search_container">
                              <div className="box_img_card_product_search">
                                <Image
                                  src={hostImage + item.picture}
                                  width={100}
                                  height={80}
                                  alt={item.productName}
                                />
                              </div>
                            </div>
                            <div className="col-9 box_name_price_product_search_container">
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
              )}
            </div>
            {/* <div className="popular-searches  row mx-0">
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
            </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchProduct;
