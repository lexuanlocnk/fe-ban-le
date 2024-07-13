"use client";

import { useEffect, useState } from "react";
import ListOrder from "./listOrder";
const OrderManagement = ({}) => {
  const [statusOrder, setStatusOrder] = useState([
    {
      key: "waitForPay",
      name: "Chờ thanh toán",
      status: true,
    },

    {
      key: "waitForDelivery",
      name: "Chờ giao hàng",
      status: false,
    },

    {
      key: "paid",
      name: "Đã thanh toán",
      status: false,
    },
  ]);

  const [dataOrder, setDataOrder] = useState();

  const data = [
    {
      imageUrl: "/image/iphone1.png",
      codeOrder: "ABC123",
      dayShopping: "2024-05-21",
      product: "iPhone 12 Pro 256GB",
      totalAmount: 12950000,
      statusOrder: "waitForPay",
      quantity: 2,
    },
    {
      imageUrl: "/image/iphone2.png",
      codeOrder: "DEF456",
      dayShopping: "2024-05-20",
      product: "iPhone 12 128GB",
      totalAmount: 20900000,
      statusOrder: "paid",
      quantity: 1,
    },
    {
      imageUrl: "/image/iphone3.png",
      codeOrder: "GHI789",
      dayShopping: "2024-05-19",
      product: "iPhone 11 Pro Max 512GB",
      totalAmount: 25000000,
      statusOrder: "waitForDelivery",
      quantity: 3,
    },
    {
      imageUrl: "/image/img_iphone10.png",
      codeOrder: "JKL012",
      dayShopping: "2024-05-18",
      product: "iPhone X 64GB",
      totalAmount: 20950000,
      statusOrder: "waitForPay",
      quantity: 1,
    },
    {
      imageUrl: "/image/img_iphone8.png",
      codeOrder: "MNO345",
      dayShopping: "2024-05-17",
      product: " iPhone 8 256GB",
      totalAmount: 22950000,
      statusOrder: "paid",
      quantity: 2,
    },
    {
      imageUrl: "/image/img_iphone3.png",
      codeOrder: "PQR678",
      dayShopping: "2024-05-16",
      product: "iPhone SE 128GB ",
      totalAmount: 19950000,
      statusOrder: "waitForDelivery",
      quantity: 1,
    },
    {
      imageUrl: "/image/linhkien3.jpg",
      codeOrder: "STU901",
      dayShopping: "2024-05-15",
      product: "Phụ kiện điện thoại ",
      totalAmount: 22000000,
      statusOrder: "waitForPay",
      quantity: 1,
    },
  ];

  const handleSetDataOrder = () => {
    const activeStatus = statusOrder.find((item) => item.status === true);
    const dataUpdate = data.filter(
      (item) => item.statusOrder === activeStatus.key
    );

    setDataOrder(dataUpdate);
  };

  useEffect(() => {
    handleSetDataOrder();
  }, [statusOrder]);

  const handleItemClick = (key) => {
    setStatusOrder(
      statusOrder.map((item) => ({
        ...item,
        status: item.key === key,
      }))
    );
  };

  return (
    <div className="container_order_management row">
      <div className="col-12 box_title_status_order d-flex justify-content-between align-items-center">
        <span className="text_title_common ">Quản lý đơn hàng</span>
        <div className="box_status_order">
          {statusOrder &&
            statusOrder.length > 0 &&
            statusOrder.map((item, index) => (
              <span
                onClick={() => handleItemClick(item.key)}
                key={index}
                className={`item_status ${
                  item.key === "waitForDelivery" ? "item_middle" : ""
                } ${item.status ? "item_status_active" : ""} `}
              >
                {item.name}
              </span>
            ))}
        </div>
      </div>
      <div className="col-12 ">
        {" "}
        <ListOrder dataOrder={dataOrder} />
      </div>
    </div>
  );
};

export default OrderManagement;
