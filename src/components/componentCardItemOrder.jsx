"use client";

import Image from "next/image";
import React, { Fragment } from "react"; // Import React để sử dụng JSX và React component
import { FaPlus, FaMinus } from "react-icons/fa";

const ComponentCardItemOrder = ({}) => {
  const item = {
    id: 3,

    name: "Laptop Lenovo ThinkPad T470s Core i7-7600U",
    imageUrl:
      "/image/laptop-lenovo-thinkpad-t470s-i7-7600u-ram-16gb-ssd-512gb-140-inch-fhd-5.jpg",
    color: "Xám",
    originalPrice: 12000000,
    discountCode: "DISC20",
    priceSale: 9950000,
    codeSale: 300000,
    quantity: 5,
  };

  return (
    <div className="row item_card_order mx-0">
      <div className="col-2">
        <div className="box_image_card_item_order">
          <Image src={item.imageUrl} alt={item.name} width={100} height={80} />
        </div>
      </div>
      <div className="col-10 d-flex justify-content-center  flex-column">
        <div className="item_infor_card_item_order">
          <span className="name_card_item_order">{item.name}</span>
          <span className="price_card_item_order">
            {item.priceSale.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
        <div className="item_infor_card_item_order my-1">
          <span className="text_info_basic_card_item_order">
            SKU: 231103117
          </span>
          <span className="text_info_basic_card_item_order">X2</span>
        </div>

        <div className="item_infor_card_item_order">
          <div>
            <span className="text_info_basic_card_item_order">
              Cung cấp bởi:
            </span>{" "}
            <span className="name_web">QuangBao</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentCardItemOrder;
