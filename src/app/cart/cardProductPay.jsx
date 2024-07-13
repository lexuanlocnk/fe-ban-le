"use client";
import { Form, Input } from "antd";
import Image from "next/image";
import { useEffect } from "react";
import { hostImage } from "../lib/config";

const CardProductPay = ({ item, status, formOrder }) => {
  useEffect(() => {
    formOrder.setFieldsValue({
      ["id_product_" + item.ProductId]: item.ProductId,
    });
  }, []);

  return (
    <Form.Item
      key={item.ProductId}
      className="mb-0"
      name={`id_product_` + item.ProductId}
    >
      <Input type="hidden" value={item.ProductId} />
      <div className="box_product_checked  ">
        <div className="box_image_product_checked">
          <Image
            width={80}
            height={75}
            alt={item.ProductName}
            src={hostImage + item.Image}
          />
        </div>
        <div className="box_content_product_checked">
          <div className="box_name_product_checked">
            <span className="">{item.ProductName}</span>
          </div>
          <div className="info_basic_product_checked">
            <span className="">Thương hiệu: {item.Brand}</span>
            <span className="">số lượng: {item.quantity}</span>
          </div>
          <div className="price_card_product_pay">
            <span className=" ">
              Giá:{" "}
              {status === "unauthenticated"
                ? (item.quantity * parseFloat(item.Price)).toLocaleString(
                    "vi",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )
                : (item.quantity * parseFloat(item.PriceOld)).toLocaleString(
                    "vi",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}
            </span>
          </div>
        </div>
      </div>
    </Form.Item>
  );
};

export default CardProductPay;
