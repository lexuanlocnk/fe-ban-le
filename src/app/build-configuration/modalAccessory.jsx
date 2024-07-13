"use client";
import { Input, Modal, Pagination, Select } from "antd";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { hostApi, hostImage } from "../lib/config";
import { useDebouncedCallback } from "use-debounce";
import { useSession } from "next-auth/react";
import { Empty, Spin } from "antd";
import { FaCheck } from "react-icons/fa6";

const ModalAccessory = ({
  checkedConfiguration,
  setAccessories,
  keyAccessory,
  nameAccessory,
  item,
  isModalOpenAccessory,
  setIsModalOpenAccessory,
  optionFilter,
}) => {
  const { status } = useSession();
  const [valueOptionFilter, setValueOptionFilter] = useState({
    brandId: null,
    configurationId: null,
    bestSeller: null,
    priceIncreases: false,
    priceReduced: false,
    pageCurrent: 1,
    nameProduct: null,
  });

  const [itemCart, setItemCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDataAccessories();
  }, [valueOptionFilter]);

  const fetchDataAccessories = async () => {
    setLoading(true);
    try {
      const { catId } = item;
      const {
        priceIncreases,
        priceReduced,
        brandId,
        configurationId,
        bestSeller,
        nameProduct,
        pageCurrent,
      } = valueOptionFilter;

      const sortOrder = priceIncreases ? "asc" : priceReduced ? "desc" : "";
      const params = new URLSearchParams({
        key: catId,
        Sort: sortOrder,
        BrandId: brandId || "",
        OpSearch: configurationId || "",
        View: bestSeller || "",
        NameProduct: nameProduct || "",
        page: pageCurrent || 1,
      });

      const response = await fetch(
        `${hostApi}/member/build-pc?${params.toString()}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setItemCart(data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpenAccessory(false);
  };

  const handleSetValueOptionFilter = (key, value) => {
    setValueOptionFilter((prev) => {
      const newFilter = { ...prev, [key]: value };

      if (key === "priceReduced") {
        newFilter.priceIncreases = false;
      } else if (key === "priceIncreases") {
        newFilter.priceReduced = false;
      } else if (key === "bestSeller" && prev.bestSeller === "Desc") {
        newFilter[key] = null;
      }

      return newFilter;
    });
  };
  const handleChangeBrand = (value) => {
    handleSetValueOptionFilter(
      "brandId",
      value && value.value ? value.value : null
    );
  };

  const handleChangeConfig = (value) => {
    handleSetValueOptionFilter(
      "configurationId",
      value && value.value ? value.value : null
    );
  };

  const searchConfig = useDebouncedCallback((e) => {
    handleSetValueOptionFilter("nameProduct", e.target.value);
  }, 500);

  const chooseAccessory = (item) => {
    const updatedProduct = {
      [keyAccessory]: {
        ...item,
        quantity: 1,
      },
    };
    setAccessories((prev) => ({
      ...prev,
      [checkedConfiguration.idConfiguration]: {
        ...prev[checkedConfiguration.idConfiguration],
        ...updatedProduct,
      },
    }));
    setIsModalOpenAccessory(false);
  };

  const onChangePage = (page) => {
    handleSetValueOptionFilter("pageCurrent", page);
  };

  return (
    <Modal
      width={850}
      className="modal_select_accessory"
      title={`Bộ lọc ${nameAccessory}`}
      open={isModalOpenAccessory}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="box_modal_select_accessory">
        <div className="filter_accessory ">
          <div className="item_filter  ">
            <Select
              labelInValue
              onChange={handleChangeBrand}
              // mode="tags"
              placeholder="Thương hiệu"
              style={{
                width: "100%",
              }}
              options={optionFilter.brand}
            />
          </div>

          <div className="item_filter  ">
            <Select
              labelInValue
              onChange={handleChangeConfig}
              // mode="tags"
              placeholder="Cấu hình"
              style={{
                width: "100%",
              }}
              options={optionFilter.opSearch}
            />
          </div>
        </div>
        <div className="filter_sorted  ">
          <div className="box_sorted">
            <span className="title_sort">Sắp xếp theo</span>

            <span
              className={`item_sort ${
                valueOptionFilter &&
                valueOptionFilter.bestSeller &&
                "border_active"
              }`}
              onClick={() => handleSetValueOptionFilter("bestSeller", "Desc")}
            >
              Bán chạy
              {valueOptionFilter && valueOptionFilter.bestSeller && (
                <Fragment>
                  <div className="bg_swoosh"></div>
                  <FaCheck className="icon_swoosh" />
                </Fragment>
              )}
            </span>

            <span
              className={`item_sort ${
                valueOptionFilter &&
                valueOptionFilter.bestSeller &&
                "border_active"
              }`}
              onClick={() => handleSetValueOptionFilter("priceIncreases", true)}
            >
              Gía tăng dần
              {valueOptionFilter && valueOptionFilter.priceIncreases && (
                <Fragment>
                  <div className="bg_swoosh"></div>
                  <FaCheck className="icon_swoosh" />
                </Fragment>
              )}
            </span>

            <span
              className={`item_sort ${
                valueOptionFilter &&
                valueOptionFilter.bestSeller &&
                "border_active"
              }`}
              onClick={() => handleSetValueOptionFilter("priceReduced", true)}
            >
              {valueOptionFilter && valueOptionFilter.priceReduced && (
                <Fragment>
                  <div className="bg_swoosh"></div>
                  <FaCheck className="icon_swoosh" />
                </Fragment>
              )}
              Gía giảm dần
            </span>
          </div>
          <Input
            onChange={(e) => searchConfig(e)}
            placeholder="Tìm linh kiện"
          />
        </div>
        <div className="box_products_accessory custom_scroll">
          {loading ? (
            <div className="box_empty_accessory">
              <Spin size="large" />
            </div>
          ) : itemCart && itemCart?.productResult?.length > 0 ? (
            itemCart.productResult.map((item, index) => (
              <div key={index}>
                <div className="item_products_accessory row mx-0">
                  <div className="col-2">
                    <div className="box_img_accessory">
                      <Image
                        src={hostImage + item.Picture}
                        width={90}
                        height={80}
                        quality={100}
                        alt={item.ProductName}
                      />
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="name_accessory">
                      <span>{item.ProductName}</span>
                    </div>
                    <div className="info_accessory">
                      <div>
                        <span className="label_info_accessory">
                          Thương hiệu:
                        </span>
                        <span className="value_info_accessory">
                          {item.brandName}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-3 d-flex justify-content-between align-items-center">
                    <div>
                      <div className="price_sale_accessory">
                        <span>
                          {status === "unauthenticated"
                            ? // Đoạn mã khi không xác thực
                              item.Price.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })
                            : // Đoạn mã khi đã xác thực
                            status === "loading"
                            ? "Đang cập nhật"
                            : item.PriceOld.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}
                        </span>
                      </div>

                      <div className="price_accessory"></div>
                    </div>

                    <div
                      className="btn_choose_accessory"
                      onClick={() => chooseAccessory(item)}
                    >
                      <span>Chọn</span>
                    </div>
                  </div>
                </div>{" "}
                <span className="line"></span>
              </div>
            ))
          ) : (
            <div className="box_empty_accessory">
              <Empty description={<span>Không có sản phẩm</span>} />
            </div>
          )}
        </div>
        <div className="box_pagination_accessory">
          <Pagination
            onChange={onChangePage}
            current={valueOptionFilter.pageCurrent}
            total={itemCart.total}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalAccessory;
