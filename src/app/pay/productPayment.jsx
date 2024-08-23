"use client";

import Image from "next/image";
import { Button, Radio, Space } from "antd";
import { useState } from "react";
import InfoClientPayment from "./InfoClientPayment";
import { Empty } from "antd";
import InfoMethodPayment from "./infoMethodPayment";
import { hostApi } from "../lib/config";
import { useRouter } from "next/navigation";
import { UseAppContext } from "../lib/appProvider";

const ProductPayment = ({ dataOrder, userId, dataPaymentMethod }) => {
  const { openNotificationWithIcon } = UseAppContext();

  const [methodPayment, setMethodPayment] = useState({
    methodPayment: "atStore",
  });
  const [loadingPayment, setLoadingPayment] = useState(false);
  const router = useRouter();

  const handleChoosePayment = (value) => {
    setMethodPayment({ methodPayment: value });
  };

  function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }

  const handlePaymentOrder = async () => {
    setLoadingPayment(true);
    try {
      const response = await fetch(`${hostApi}/member/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_method: methodPayment.methodPayment,
          orderId: dataOrder.orderSum.order_id,
        }),
      });

      const dataRes = await response.json();
      if (dataRes.status) {
        router.replace(`/`);
        openNotificationWithIcon("success", "Đặt hàng", `Đặt hàng thành công`);

        setLoadingPayment(false);
      }
    } catch (error) {
      console.error("Err:", error);
    } finally {
      setLoadingPayment(false);
    }
  };

  return (
    <>
      {!isEmptyObject(dataOrder) ? (
        <>
          <div className="container_content_payment">
            <div className="head_table_pay">
              <Image
                width={50}
                height={50}
                alt="icon_success"
                src="/image/icon_image/search.png"
              />{" "}
              <span>ĐẶT HÀNG THÀNH CÔNG</span>
            </div>
            <div className="box-content-products-payment  bg-white ">
              <div className="body_pay">
                <InfoClientPayment userId={userId} dataOrder={dataOrder} />

                <div className="option_choose_payment">
                  <Radio.Group
                    disabled={
                      dataOrder?.orderSum?.payment_method ? true : false
                    }
                    onChange={(e) => handleChoosePayment(e.target.value)}
                    defaultValue={
                      dataOrder?.orderSum?.payment_method
                        ? dataOrder?.orderSum?.payment_method
                        : undefined
                    }
                  >
                    <Space direction="vertical">
                      {dataPaymentMethod &&
                        dataPaymentMethod.length > 0 &&
                        dataPaymentMethod.map((item, index) => (
                          <Radio
                            disabled={
                              (item.name == "company" &&
                                dataOrder.orderSum.shipping_method !==
                                  "pickUpStore") ||
                              item.name == "vnpay_transfer"
                            }
                            key={index}
                            value={item.name}
                          >
                            {item.title}
                          </Radio>
                        ))}
                    </Space>
                  </Radio.Group>
                </div>

                <InfoMethodPayment
                  dataOrder={dataOrder}
                  methodPayment={methodPayment.methodPayment}
                />

                {dataOrder?.orderSum?.payment_method ? (
                  <></>
                ) : (
                  <div className="mt-3 d-flex justify-content-center">
                    <Button
                      loading={loadingPayment}
                      onClick={handlePaymentOrder}
                      className="btn_order d-flex justify-content-center align-items-center"
                    >
                      Thanh toán
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container_content_payment_empty">
          <Empty description={<span>Đơn hàng không tồn tại</span>} />
        </div>
      )}
    </>
  );
};

export default ProductPayment;
