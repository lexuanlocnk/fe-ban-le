"use client";

import { Checkbox, Popconfirm } from "antd";
import Image from "next/image";
import React, { Fragment } from "react"; // Import React để sử dụng JSX và React component
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { hostImage } from "../app/lib/config";

const CardItemCard = ({
  item,

  handleUpQuantity,
  handleDownQuantity,
  handleRemoveProduct,
  handleCheckedProduct,
  checkedProduct,
  status,
}) => {
  return (
    <Fragment>
      <div className="box_item_card_cart  ">
        <div className="check_box_cart">
          <Checkbox
            checked={checkedProduct}
            onChange={(e) => handleCheckedProduct(e)}
            value={item}
          />
        </div>
        <div className=" w-100 row">
          <div className="col-lg-10 box_name_img_product_cart col-10 ">
            <div className="box_img_product_cart">
              <Image
                width={130}
                height={100}
                alt={item.ProductName}
                src={hostImage + item.Image}
                className="img_product_cart "
              />
            </div>
            <div className="box_name_product_cart flex-column d-flex justify-content-between">
              <div>
                <span className="name_product_cart text_genaral_three_line_2">
                  {item.ProductName}
                </span>
                <div>
                  {item.brandName && (
                    <span className="brand_product">
                      Thương hiệu: {item.brandName}
                    </span>
                  )}
                </div>
              </div>

              <div className="box_price_card_cart">
                <span className="price_product_cart  ">
                  {item?.PriceOld?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>

                <s className="price_sale_product_cart  ">
                  {item?.Price?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </s>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-2 flex-column d-flex align-items-end flex-column justify-content-between  ">
            <Popconfirm
              onConfirm={() => handleRemoveProduct(item)}
              okText="Chắc chắn"
              cancelText="Hủy"
              title="Xác nhận"
              description={"Bạn có chắc muốn xóa sản phẩm ra khỏi giỏ hàng"}
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
            >
              <div className="box_icon_trash">
                <FaRegTrashCan />
              </div>
            </Popconfirm>

            <div className="box_up_down_quantity">
              {item.quantity && item.quantity > 1 ? (
                <div
                  className="box_up_quantity"
                  onClick={() =>
                    handleDownQuantity({ ...item, quantity: item.quantity - 1 })
                  }
                >
                  <span className="btn_up_quantity">
                    <FaMinus />
                  </span>
                </div>
              ) : (
                <div className="box_up_quantity btn_disabled_minus">
                  <span className="btn_up_quantity">
                    <FaMinus />
                  </span>
                </div>
              )}

              <div className="box_quantity">
                <span className="quantity">{item.quantity}</span>
              </div>

              <div
                className="box_down_quantity"
                onClick={() =>
                  handleUpQuantity({ ...item, quantity: item.quantity + 1 })
                }
              >
                <span className="btn_down_quantity">
                  <FaPlus />
                </span>
              </div>
            </div>
          </div>

          {/* {item.checkPresent && item.checkPresent.length > 0 && (
            <div className="col-2"></div>
          )} */}

          {item.checkPresent &&
            item.checkPresent.length > 0 &&
            item.checkPresent.map((item, index) => (
              <div className="col-12 ">
                <div
                  className="box_promotion_product"
                  key={index}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default CardItemCard;
