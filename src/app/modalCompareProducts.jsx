"use client";

import InputNumberPrice from "../components/inputNumberPrice";
import { useState, useEffect, Fragment } from "react";
import { Modal, Select, Spin } from "antd";
import { UseAppContext } from "./lib/appProvider";
import Link from "next/link";
import Image from "next/image";
import { hostApi, hostImage } from "./lib/config";
import { useDebouncedCallback } from "use-debounce";

const ModalCompareProducts = ({ session }) => {
  const initialOptionsFilter = {
    priceMin: 10000000,
    priceMax: 25000000,
    brand: "",
  };
  const { handleCancel, isModalOpen, itemCompare } = UseAppContext();
  const [brand, setBrand] = useState();
  const [optionsFilter, setOptionsFilter] = useState(initialOptionsFilter);
  const [urlCompare, setUrlCompare] = useState(
    `?so-sanh-san-pham=${itemCompare.UrlProduct}keyId=${itemCompare.ProductId}vs`
  );

  const [loadingSelect, setLoadingSelect] = useState({
    loadingCategory: false,
    loadingNameCate: false,
  });
  const [itemCompareTwo, setItemCompareTwo] = useState({});
  const [dataSearchName, setDataSearchName] = useState([]);

  const updateOptionsFilter = (key) => (value) => {
    setOptionsFilter((prevOptions) => ({
      ...prevOptions,
      [key]: value,
    }));
  };

  useEffect(() => {
    fetchDataBrand();
  }, [itemCompare]);

  const fetchDataBrand = async () => {
    try {
      const response = await fetch(
        `${hostApi}/member/brand-list/${itemCompare.CatId}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBrand(data.listBrand);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSearch = useDebouncedCallback((term) => {
    fetchDataProduct(term);
  }, 500);

  const fetchDataProduct = async (value) => {
    setLoadingSelect((prev) => ({
      ...prev,
      loadingNameCate: true,
    }));
    try {
      const response = await fetch(
        `${hostApi}/member/compare-product-search?&key=${
          itemCompare.CatId
        }&brand=${optionsFilter.brand.id ?? ""}&priceMin=${
          optionsFilter.priceMin
        }&priceMax=${optionsFilter.priceMax}&search=${value}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDataSearchName(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoadingSelect((prev) => ({
        ...prev,
        loadingNameCate: false,
      }));
    }
  };

  const closeModalCompare = () => {
    setOptionsFilter({ ...initialOptionsFilter });

    handleCancel();
    setItemCompareTwo({});
    setBrand({});
    setDataSearchName({});
  };

  const handleSelectValue = (data) => {
    setItemCompareTwo(data);
    setUrlCompare((prev) => {
      return `${prev}-${data.friendlyUrl}keyId=${data.productId}`;
    });
  };

  return (
    <Modal
      className="modal_compare_product"
      title="So sánh sản phẩm"
      open={isModalOpen}
      footer={null}
      onCancel={closeModalCompare}
    >
      <div className="container_body_modal_compare">
        <div className="row box_body_modal_compare mx-0">
          <div className="col-md-3 col-6 px-md-2 px-0">
            <Select
              className="w-100 custom_antd_select"
              showSearch
              value={optionsFilter.brand}
              optionFilterProp="children"
              placeholder="Thương hiệu sản phẩm"
              options={brand}
              optionRender={(option) => (
                <div
                  onClick={() => updateOptionsFilter("brand")(option.data)}
                  className="row mx-0"
                >
                  <div className="col-5 image box_image_select_antd custom-select-antd">
                    <img
                      src={"/image/macbook2.png"}
                      className="w-100 h-100  image_select_antd"
                    />
                  </div>
                  <div className="col-7 name_brand">
                    <span>{option.data.label}</span>
                  </div>
                </div>
              )}
            />
          </div>

          <div className="col-md-4 col-6 px-md-2 px-0">
            <div className="box_price_filter_compare">
              <span className="text_compare_price">Giá từ</span>
              <InputNumberPrice
                value={optionsFilter.priceMin}
                addonAfter="₫"
                onChange={updateOptionsFilter("priceMin")}
              />
              <span className="text_compare_price">Đến</span>
              <InputNumberPrice
                value={optionsFilter.priceMax}
                onChange={updateOptionsFilter("priceMax")}
                addonAfter="₫"
              />
            </div>
          </div>

          <div className="col-md-5 col-12 mt-md-0 mt-1 px-md-2 px-0">
            <Select
              value={itemCompareTwo.value}
              className="w-100 custom_antd_select"
              showSearch
              optionFilterProp="children"
              filterOption={false}
              onSearch={handleSearch}
              placeholder="Tên sản phẩm"
              options={dataSearchName}
              notFoundContent={
                loadingSelect.loadingNameCate ? <Spin size="small" /> : null
              }
              optionRender={(option) => (
                <div
                  onClick={() => handleSelectValue(option.data)}
                  className="row mx-0 "
                  key={option.data.productId}
                >
                  <div className="col-3 image box_image_select_antd  custom-select-antd-name">
                    <img
                      src={hostImage + option.data.picture}
                      className="w-100 image_select_antd h-100"
                    />
                  </div>
                  <div className="col-9 d-flex align-items-center">
                    <div>
                      <div className="name_select_compare">
                        <span>{option.data.productName}</span>
                      </div>
                      <div className="box_price_select_compare">
                        Giá chỉ:
                        {session ? (
                          <span className="ms-1 price_select_compare">
                            {option.data.price_old.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        ) : (
                          <span className="ms-1 price_select_compare">
                            {option.data.price.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
          <div className="col-12 px-md-2 px-0">
            <div className="row mx-0 box_product_compare">
              <div className="col-6 box_products box_products_right px-2">
                <div className="box_name_product_compare ">
                  <span>{itemCompare.ProductName || "Macbook Pro 2020"}</span>
                </div>
                <div className="box_image_product_compare">
                  <div className="container_image_product_compare  image custom-product-selling">
                    <Image
                      quality={75}
                      height={0}
                      width={0}
                      sizes="100vw"
                      src={
                        hostImage + itemCompare.Image || "/image/macbook2.png"
                      }
                      className="w-100 h-100"
                      alt={itemCompare.ProductName}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 box_products px-2">
                {!(Object.keys(itemCompareTwo).length === 0) && (
                  <Fragment>
                    <div className="box_name_product_compare ">
                      <span>{itemCompareTwo.productName}</span>
                    </div>
                    <div className="box_image_product_compare">
                      <div className="container_image_product_compare  image custom-product-selling">
                        <img
                          src={hostImage + itemCompareTwo.picture}
                          className="w-100 h-100"
                        />
                      </div>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 text-center">
            <div
              className={`btn_compare`}
              style={{
                cursor:
                  Object.keys(itemCompareTwo).length === 0
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {!(Object.keys(itemCompareTwo).length === 0) ? (
                <Link
                  className="link_general"
                  href={`/compare-product${urlCompare}`}
                >
                  So sánh
                </Link>
              ) : (
                <>So sánh</>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalCompareProducts;
