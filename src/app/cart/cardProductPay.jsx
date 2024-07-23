"use client";
import { Form, Input, Radio, Space } from "antd";
import Image from "next/image";
import { hostImage } from "../lib/config";
import { useEffect } from "react";

const CardProductPay = ({ item, status, formOrder }) => {
  const onChange = (value, productId) => {
    // Tìm productOrder và promotionChoose
    const productOrderNew = dataOrder.map((item) =>
      item.ProductId === productId
        ? {
            ...item,
            presentOrder: item.checkPresent.find(({ id }) => id == value),
          }
        : item
    );

    formOrder.setFieldsValue({ dataOrder: productOrderNew });
  };

  const setPresentOrder = (value) => {
    const dataOrder = formOrder.getFieldValue("dataOrder");

    if (value.checkPresent && value.checkPresent.length === 1) {
      const updatedDataOrder = dataOrder.map((itemOrder) =>
        itemOrder.checkPresent && itemOrder.checkPresent.length == 1
          ? { ...itemOrder, presentOrder: itemOrder.checkPresent[0] }
          : itemOrder
      );
      console.log("updatedDataOrder", updatedDataOrder);

      formOrder.setFieldsValue({ dataOrder: updatedDataOrder });
    }
  };

  useEffect(() => {
    setPresentOrder(item);
  }, []);

  return (
    <div className="pro_box_product_checked">
      <Form.Item
        key={item.ProductId}
        className="mb-0"
        name={`id_product_` + item.ProductId}
      >
        <Input type="hidden" value={item.ProductId} />

        <div className="">
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
                <span className="">
                  Giá:{" "}
                  {(item.quantity * parseFloat(item.PriceOld)).toLocaleString(
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
        </div>
      </Form.Item>

      {item.checkPresent && item.checkPresent.length > 1 && (
        <Form.Item
          name="itemPresent"
          rules={[
            {
              required: true,
              message: "Hãy chọn phần quà tặng!",
            },
          ]}
        >
          <Radio.Group
            onChange={(e) => onChange(e.target.value, item.ProductId)}
          >
            <Space direction="vertical">
              {item.checkPresent.map((itemPromotion, indexPromotion) => (
                <Radio key={itemPromotion.id} value={itemPromotion.id}>
                  <div
                    className="box_promotion_product"
                    dangerouslySetInnerHTML={{ __html: itemPromotion.content }}
                  />
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
      )}

      {item.checkPresent &&
        item.checkPresent.length == 1 &&
        item.checkPresent.map((item, index) => (
          <Form.Item>
            <div
              key={index} // Thêm key để React có thể theo dõi các phần tử
              className="box_promotion_product"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </Form.Item>
        ))}
    </div>
  );
};

export default CardProductPay;
