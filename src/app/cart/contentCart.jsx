"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "../../components/breadcrumb";
import ContentProductsCart from "./contentProductsCart";
import { UseAppContext } from "../lib/appProvider";
import { MdNextWeek } from "react-icons/md";
import Link from "next/link";
import { Form } from "antd";
import { useRouter } from "next/navigation";
import { Skeleton } from "antd";
import { useSession } from "next-auth/react";
import { handleOrder } from "../lib/action";
const ContentCart = () => {
  const { data, status } = useSession();

  const router = useRouter();
  const [stateCheck, setStateCheck] = useState({
    billCompany: false,
    otherReceive: false,
    useAccumulatedPoints: false,
  });
  const [points, setPoints] = useState(0);
  const [formOrder] = Form.useForm();
  const [checkedProducts, setCheckedProducts] = useState({
    idsCard: [],
    idsProduct: [],
  });
  const {
    setItemCart,
    stateCart: {
      idClickBuyNow,
      products,
      stateCheckedProducts,
      total,
      totalPoints,
      orderPoints,
      productNotAccount,
    },
    dispatch,
  } = UseAppContext();

  const [confirmTerm, setConfirmTerm] = useState({
    check: true,
    message: false,
  });

  useEffect(() => {
    dispatch({
      type: "CALCULATE_TOTAL_COST",
      payload: {
        checkedProducts: checkedProducts,
        points: points,
        statusProducts:
          status === "unauthenticated" ? "productNotAccount" : "products",
      },
    });

    dispatch({
      type: "CHECKED_PRODUCTS",
      payload: {
        checkedProducts: checkedProducts,
        statusProducts:
          status === "unauthenticated" ? "productNotAccount" : "products",
      },
    });
  }, [products, checkedProducts.idsProduct, points, productNotAccount]);

  const handleSetConfirmTerm = (value, nameProperty) => {
    if (nameProperty === "check" && value === true) {
      setConfirmTerm((prev) => ({
        ...prev,
        [nameProperty]: value,
        message: false,
      }));
    } else {
      setConfirmTerm((prev) => ({
        ...prev,
        [nameProperty]: value,
      }));
    }
  };

  useEffect(() => {
    if (idClickBuyNow.idCart || idClickBuyNow.idProduct) {
      setCheckedProducts({
        idsCard: idClickBuyNow.idCart ? [idClickBuyNow.idCart] : [],
        idsProduct: idClickBuyNow.idProduct ? [idClickBuyNow.idProduct] : [],
      });
    }
  }, [idClickBuyNow]);

  const onFinish = async (values) => {
    handleSetConfirmTerm(confirmTerm.check ? false : true, "message");
    if (confirmTerm && confirmTerm.check) {
      const dataRes = await handleOrder(
        values,
        status,
        total,
        data,
        orderPoints
      );

      if (dataRes.status) {
        const productIds = values.dataOrder.map((item) => item.ProductId);
        const isUnauthenticated = status === "unauthenticated";
        const payload = {
          ids: productIds,
          statusProducts: isUnauthenticated ? "productNotAccount" : "products",
        };

        dispatch({
          type: "REMOVE_ALL_CART",
          payload,
        });

        router.replace(`/pay?order=success&orderId=${dataRes.orderId}`);
      }
    }
  };

  return (
    <div className="box-container-content-cart  ">
      <div className="in-box-container-content-cart pt-1">
        <div className="row box-content-cart mx-0">
          <div className="col-12 ">
            <div className="row mx-0 container_content_layout_cart">
              <div className="col-12 w-100 mt-2">
                <div className="box_breadcrumbs_cart d-flex justify-content-between">
                  <Breadcrumb nameItem={"Giỏ hàng"} />
                  <div className="box_text_buy_other  d-flex align-items-center">
                    <Link href={"/"}>
                      <span className="me-1">Mua thêm sản phẩm khác</span>
                      <MdNextWeek />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-12 d-flex justify-content-center">
                <div className="box-content-products-cart mt-2 bg-white mb-3  ">
                  <div className="custom_table_cart">
                    {status == "loading" ? (
                      <Skeleton
                        active
                        paragraph={{
                          rows: 10,
                        }}
                      />
                    ) : (
                      <ContentProductsCart
                        dataUser={data}
                        stateCheck={stateCheck}
                        setStateCheck={setStateCheck}
                        totalPoints={totalPoints}
                        handleSetConfirmTerm={handleSetConfirmTerm}
                        confirmTerm={confirmTerm}
                        stateCheckedProducts={stateCheckedProducts}
                        onFinish={onFinish}
                        formOrder={formOrder}
                        total={total}
                        checkedProducts={checkedProducts}
                        setCheckedProducts={setCheckedProducts}
                        dispatch={dispatch}
                        itemCart={
                          status == "unauthenticated"
                            ? productNotAccount
                            : products
                        }
                        status={status}
                        setItemCart={setItemCart}
                        orderPoints={orderPoints}
                        points={points}
                        setPoints={setPoints}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCart;
