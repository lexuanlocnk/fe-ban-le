"use client";

import Image from "next/image";
import React from "react"; // Import React để sử dụng JSX và React component
import { hostImage } from "../app/lib/config";

const ComponentCardItemOrder = ({ item }) => {
  return (
    <div className="row item_card_order mx-0 my-2">
      <div className="col-2">
        <div className="box_image_card_item_order">
          <Image
            src={hostImage + item.Image}
            alt={item.ProductName}
            width={100}
            height={80}
          />
        </div>
      </div>
      <div className="col-10 d-flex justify-content-center  flex-column">
        <div className="item_infor_card_item_order">
          <span className="name_card_item_order text_genaral_two_line_2">
            {item.ProductName}
          </span>
          <span className="price_card_item_order">
            {item.subtotal.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
        <div className="item_infor_card_item_order my-1">
          <span className="text_info_basic_card_item_order">
            Thương hiệu: {item.Category}
          </span>
          <span className="text_info_basic_card_item_order">
            X{item.quantity}
          </span>
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
