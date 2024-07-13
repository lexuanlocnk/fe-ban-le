"use client";

import { Input, Modal } from "antd";
import { Fragment, useState } from "react";
import Image from "next/image";
const ComponentModalVoucher = ({
  isModalVoucherOpen,
  setIsModalVoucherOpen,
}) => {
  const [voucherDiscount, setVoucherDiscount] = useState([
    {
      code: "DISCOUNT10",
      expiration: "2024-12-31",
      maxDiscount: 1000000,
      minPurchase: 500000,
      url: "/image/voucher.png",
    },
    {
      code: "SALE20",
      expiration: "2024-06-30",
      maxDiscount: 5000000,
      minPurchase: 200000,
      url: "/image/voucher.png",
    },
    {
      code: "HALFOFF",
      expiration: "2024-09-30",
      maxDiscount: 2000000,
      minPurchase: 100000,
      url: "/image/voucher.png",
    },
    {
      code: "NEWUSER25",
      expiration: "2024-12-31",
      maxDiscount: 7500000,
      minPurchase: 300000,
      url: "/image/voucher.png",
    },
    {
      code: "FREESHIP",
      expiration: "2024-12-31",
      maxDiscount: 150,
      minPurchase: 0, // không yêu cầu mức đơn hàng tối thiểu
      url: "/image/voucher.png",
    },
  ]);

  const HandleApply = () => <span className="cursor-pointer">Áp dụng</span>;

  const handleOk = () => {
    setIsModalVoucherOpen(false);
  };

  const handleCancel = () => {
    setIsModalVoucherOpen(false);
  };

  return (
    <Modal
      title="Chọn mã giảm giá"
      open={isModalVoucherOpen}
      cancelText="Trở lại"
      okText="Xác nhận"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="row w-100 mx-0">
        <div className="col-12 px-0 d-flex align-items-center">
          <span className="mr-2 text-nowrap code-sale">Mã giảm</span>
          <Input
            addonAfter={<HandleApply />}
            placeholder="Mã giảm giá"
            allowClear
          />
        </div>
        {voucherDiscount && voucherDiscount.length > 0 && (
          <div className="col-12 px-0  mt-2 box-voucher custom_scroll">
            {voucherDiscount.map((item, index) => (
              <div
                key={index}
                className="row mx-0 p-2 mt-2 item-voucher cursor-pointer"
              >
                <div className="col-4 bg-danger box-img-voucher">
                  <Image
                    quality={100}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="w-100 h-100"
                    src={item.url}
                    alt="img_icon_share"
                  />
                </div>
                <div className="col-8 d-flex align-items-center">
                  <div>
                    <div className="text-voucher">
                      Giảm tối đa: {item.maxDiscount}{" "}
                    </div>
                    <div className="text-voucher">
                      Giảm tối thiểu: {item.minPurchase}{" "}
                    </div>
                    <div className="text-voucher">HSD: {item.expiration} </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ComponentModalVoucher;
