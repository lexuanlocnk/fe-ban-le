"use client";
import { useState } from "react";
import { hostApi } from "../../../lib/config";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { UseAppContext } from "../../../lib/appProvider";
import { Spin } from "antd";
const ButtonRepurchase = ({ arrProduct }) => {
  const { dispatch } = UseAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSession();
  const router = useRouter();

  const handleRepurchase = async () => {
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
            value: arrProduct,
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
        const arrId = [
          {
            idProduct: dataRes.product.map((item) => item.ProductId),
            idCart: dataRes.product.map((item) => item.CartId),
          },
        ];
        dispatch({
          type: "ADD_TO_PRODUCT_MULTIPLE_TO_CART",
          payload: dataRes.product,
        });

        dispatch({
          type: "CLICK_BUY_NOW",
          payload: {
            status: "multiple",

            idCart: arrId[0]["idCart"],
            idProduct: arrId[0]["idProduct"],
          },
        });
      }

      router.push("/cart");
    } catch (error) {
      console.error("Err:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div onClick={handleRepurchase} className="btn_repurchase">
        <span>Mua lại sản phẩm</span>
      </div>
      <Spin spinning={isLoading} fullscreen />
    </>
  );
};

export default ButtonRepurchase;
