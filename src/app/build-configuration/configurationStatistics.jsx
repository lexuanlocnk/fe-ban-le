"use client";
import { Collapse, ConfigProvider, Empty } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { hostApi } from "../lib/config";
import { UseAppContext } from "../lib/appProvider";

const ConfigurationStatistics = ({ accessories, idConfiguration }) => {
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = UseAppContext();

  const isEmpty =
    !accessories[idConfiguration] ||
    !Object.keys(accessories[idConfiguration]).length;

  const total = useMemo(() => {
    if (!accessories[idConfiguration]) {
      return 0; // Trả về 0 nếu accessories không tồn tại hoặc không phải là một object
    }

    // Trích xuất các giá trị của object và tính tổng
    return Object.values(accessories[idConfiguration]).reduce(
      (acc, item) =>
        acc +
        (status === "unauthenticated"
          ? item.quantity * item.Price
          : item.quantity * item.PriceOld),
      0
    );
  }, [accessories[idConfiguration]]);

  useEffect(() => {
    if (Object.keys(accessories).length !== 0) {
      localStorage.setItem("accessories", JSON.stringify(accessories));
    }
  }, [accessories]);

  const addMultipleCart = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch(
        `${hostApi}/member/add-array-cart/${data.user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: accessories[idConfiguration],
          }),
        }
      );

      // Kiểm tra status code của phản hồi
      if (!response.ok) {
        // In ra nội dung lỗi nếu có
        console.error("Error Response Text:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const dataRes = await response.json();
      if (dataRes.status == true) {
        dispatch({
          type: "ADD_TO_PRODUCT_MULTIPLE_TO_CART",
          payload: dataRes.product,
        });
      }
    } catch (error) {
      console.error("Err:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addMultipleCartNotAccount = () => {
    const outputArray = Object.values(accessories[idConfiguration]);

    if (outputArray.length === 0 || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      dispatch({
        type: "ADD_TO_PRODUCT_MULTIPLE_TO_CART_NOT_ACCOUNT",
        payload: outputArray,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const text = (
    <div>
      <a className=" " href="mailto:cskh@chinhnhan.vn">
        Chăm sóc khách hàng: cskh@chinhnhan.vn
      </a>
      <a className=" " href="tel:+0948275005">
        Tư vấn kỹ thuật: 0948.275.005
      </a>

      <a
        rel="nofollow"
        title="Tư vấn Zalo"
        href={`https://zalo.me/0912246137`}
        target="_blank"
        className=" "
      >
        Tư vấn Zalo: 0912.246.137
      </a>
      <a className=" " href="tel:+0912246137">
        Tư vấn trực tiếp: 0912.246.137
      </a>
    </div>
  );

  return (
    <div className=" mt-2">
      {isEmpty ? (
        <div className="box_empty_configuration mb-2">
          <Empty description={false} />
        </div>
      ) : (
        <div className="box_empty_configuration mb-2 ">
          <div className="box_price_empty_configuration text-center">
            <span className="title_price_configuration">Chi phí dự tính:</span>
            <span className="total_price_configuration">
              {total?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>

          <div className="box_price_empty_configuration">
            <span className="click_buy_now">Mua ngay</span>
          </div>

          {status && status === "unauthenticated" ? (
            <div
              onClick={() => addMultipleCartNotAccount()}
              className="box_price_empty_configuration"
            >
              <span className="btn_contact_consulting text-center ">
                Thêm vào giỏ hàng
              </span>
            </div>
          ) : (
            <div
              onClick={() => addMultipleCart()}
              className="box_price_empty_configuration"
            >
              <span className="btn_contact_consulting text-center ">
                Thêm vào giỏ hàng
              </span>
            </div>
          )}
        </div>
      )}

      <div className="box_contact_consulting text-center">
        <ConfigProvider
          theme={{
            components: {
              Collapse: {
                headerBg: "#edf3fd",
                contentBg: "#edf3fd",
              },
            },
          }}
        >
          <Collapse
            className="box_item_collapse"
            items={[
              {
                key: "1",
                label: "Nhận tư vấn từ chuyên gia",
                children: <p>{text}</p>,
              },
            ]}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default ConfigurationStatistics;
