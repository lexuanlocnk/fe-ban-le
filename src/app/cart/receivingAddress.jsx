"use client";
import { Space } from "antd";

import { Fragment, useEffect, useState } from "react";
import { UseAppContext } from "../lib/appProvider";
import { FaShippingFast } from "react-icons/fa";
import CardProductPay from "./cardProductPay";
import ChooseDeliveryTime from "../../components/chooseDeliveryTime";

import SelectAddress from "../../components/selectAddress";

const ReceivingAddress = ({
  valueDays,
  onChangeDateTime,
  handleChangeSelectTime,
  formOrder,
  status,
}) => {
  const {
    stateCart: { stateCheckedProducts },
  } = UseAppContext();

  return (
    <Fragment>
      <Space direction="vertical" className="w-100 box_receiving_address">
        <span className="text_ship">
          Giao hàng miễn phí tận nơi trong nội thành Thành Phố Hồ Chí Minh
        </span>

        <SelectAddress form={formOrder} />

        <ChooseDeliveryTime
          textChoose={"Giao hàng"}
          valueDays={valueDays}
          onChangeDateTime={onChangeDateTime}
          handleChangeSelectTime={handleChangeSelectTime}
        />

        {stateCheckedProducts && stateCheckedProducts?.length > 0 ? (
          stateCheckedProducts.map((item, index) => (
            <CardProductPay
              status={status}
              formOrder={formOrder}
              key={index}
              item={item}
            />
          ))
        ) : (
          <div className="please_add_ship">
            <span>Hãy chọn địa chỉ nhận hàng</span>
            <FaShippingFast className="icon_add_ship" />
          </div>
        )}
      </Space>
    </Fragment>
  );
};

export default ReceivingAddress;
