import { Checkbox } from "antd";
import CardItemCard from "../../components/cardItemCard";
import TitleBoxCart from "./titleBoxCart";
import EmptyProduct from "../../components/emptyProduct";
import InfoClientPay from "./infoClientPay";
import PriceInformation from "./priceInformation";
import OrderSubmit from "./orderSubmit";
import { Fragment, useCallback, useEffect } from "react";
import { PiWarningCircleFill } from "react-icons/pi";
import { hostApi } from "../lib/config";
import { useDebouncedCallback } from "use-debounce";

const ContentProductsCart = ({
  valueVoucher,
  itemCart,
  dispatch,
  setCheckedProducts,
  checkedProducts,
  total,
  formOrder,
  onFinish,
  stateCheckedProducts,
  handleSetConfirmTerm,
  confirmTerm,
  orderPoints,
  stateCheck,
  setStateCheck,
  points,
  setPoints,
  status,
  dataUser,
  dataMethodShipping,
}) => {
  const handleUpQuantity = useDebouncedCallback(async (value) => {
    const isUnauthenticated = status === "unauthenticated";
    const payload = {
      id: value.ProductId,
      statusProducts: isUnauthenticated ? "productNotAccount" : "products",
    };

    if (isUnauthenticated) {
      dispatch({
        type: "INCREASE_NUMBER_PRODUCT",
        payload,
      });
      return;
    }

    try {
      const response = await fetch(
        `${hostApi}/member/update-cart/${value.Id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value,
            userId: dataUser.user.id,
          }),
        }
      );

      const dataRes = await response.json();
      if (dataRes.status) {
        dispatch({
          type: "INCREASE_NUMBER_PRODUCT",
          payload,
        });
      }
    } catch (error) {
      console.error("Err:", error);
    }
  }, 500); // 500ms debounce time

  const handleDownQuantity = useDebouncedCallback(async (value) => {
    const isUnauthenticated = status === "unauthenticated";
    const payload = {
      id: value.ProductId,
      statusProducts: isUnauthenticated ? "productNotAccount" : "products",
    };

    if (isUnauthenticated) {
      dispatch({
        type: "REDUCE_NUMBER_PRODUCT",
        payload,
      });
      return;
    }

    try {
      const response = await fetch(
        `${hostApi}/member/update-cart/${value.Id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value,
            userId: dataUser.user.id,
          }),
        }
      );

      const dataRes = await response.json();
      if (dataRes.status) {
        dispatch({
          type: "REDUCE_NUMBER_PRODUCT",
          payload,
        });
      }
    } catch (error) {
      console.error("Err:", error);
    }
  }, 500); // 500ms debounce time

  const handleRemoveProduct = async (value) => {
    const isUnauthenticated = status === "unauthenticated";
    const payload = {
      id: value.ProductId,
      statusProducts: isUnauthenticated ? "productNotAccount" : "products",
    };

    if (isUnauthenticated) {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload,
      });
      return;
    }

    try {
      const response = await fetch(`${hostApi}/member/delete-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          arrId: [value.Id],
        }),
      });

      const dataRes = await response.json();
      if (dataRes.status) {
        dispatch({
          type: "REMOVE_FROM_CART",
          payload,
        });
      }
    } catch (error) {
      console.error("Err:", error);
    }
  };

  const handleRemoveAll = async () => {
    const isUnauthenticated = status === "unauthenticated";
    const payload = {
      ids: checkedProducts.idsProduct,
      statusProducts: isUnauthenticated ? "productNotAccount" : "products",
    };

    if (isUnauthenticated) {
      dispatch({
        type: "REMOVE_ALL_CART",
        payload,
      });
      return;
    }

    try {
      const response = await fetch(`${hostApi}/member/delete-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          arrId: checkedProducts.idsCard,
        }),
      });

      const dataRes = await response.json();
      if (dataRes.status) {
        dispatch({
          type: "REMOVE_ALL_CART",
          payload,
        });
      }
    } catch (error) {
      console.error("Err:", error);
    }
  };

  const handleCheckedProduct = (e) => {
    const id = e.target.value.ProductId;
    const idCart = e.target.value.Id;

    setCheckedProducts((prev) => ({
      idsCard: e.target.checked
        ? [...prev.idsCard, idCart]
        : prev.idsCard.filter((itemIdCart) => itemIdCart !== idCart),
      idsProduct: e.target.checked
        ? [...prev.idsProduct, id]
        : prev.idsProduct.filter((productId) => productId !== id),
    }));
  };

  const handleCheckedAll = (checked) => {
    setCheckedProducts({
      idsCard: checked ? itemCart.map((product) => product.Id) : [],
      idsProduct: checked ? itemCart.map((product) => product.ProductId) : [],
    });
  };

  useEffect(() => {
    updateOrder();
  }, [checkedProducts]);

  const updateOrder = useCallback(() => {
    const updatedItems = itemCart.filter((item) =>
      checkedProducts.idsProduct.includes(item.ProductId)
    );

    formOrder.setFieldsValue({
      dataOrder: updatedItems,
    });
  }, [checkedProducts]);

  return (
    <Fragment>
      <div className="head_table">
        <TitleBoxCart
          checkedProducts={checkedProducts}
          dispatch={dispatch}
          total={total}
          handleRemoveAll={handleRemoveAll}
          handleCheckedAll={handleCheckedAll}
          itemCart={itemCart}
          handleRemoveProduct={handleRemoveProduct}
        />
        {itemCart && itemCart?.length > 0 ? (
          <>
            <div className="box_body_content_table">
              {itemCart.map((item, index) => (
                <CardItemCard
                  status={status}
                  checkedProduct={checkedProducts?.idsProduct?.includes(
                    item?.ProductId
                  )}
                  handleCheckedProduct={handleCheckedProduct}
                  handleRemoveProduct={handleRemoveProduct}
                  handleUpQuantity={handleUpQuantity}
                  handleDownQuantity={handleDownQuantity}
                  item={item}
                  key={index}
                />
              ))}
            </div>
            <InfoClientPay
              dataMethodShipping={dataMethodShipping}
              dataUser={status == "unauthenticated" ? [] : dataUser.user}
              status={status}
              points={points}
              setPoints={setPoints}
              stateCheckedProducts={stateCheckedProducts}
              onFinish={onFinish}
              formOrder={formOrder}
              stateCheck={stateCheck}
              setStateCheck={setStateCheck}
            />
          </>
        ) : (
          <EmptyProduct text={"Không có sản phẩm nào trong giỏ hàng"} />
        )}
      </div>
      {stateCheckedProducts && stateCheckedProducts.length > 0 && (
        <PriceInformation
          valueVoucher={valueVoucher}
          stateCheck={stateCheck}
          orderPoints={orderPoints}
          total={total}
          points={points}
        />
      )}

      {stateCheckedProducts && stateCheckedProducts.length > 0 && (
        <>
          <div className="box_info_security_policy">
            <Checkbox
              checked={confirmTerm.check}
              onChange={(e) => handleSetConfirmTerm(e.target.checked, "check")}
            >
              Tôi đồng ý và tuân theo những{" "}
              <span className="under_line">Điều khoản và Điều kiện</span> của
              Website Bán Lẻ QUANGBAO
            </Checkbox>
          </div>

          {confirmTerm && confirmTerm.message && (
            <div className="text_warning">
              <PiWarningCircleFill />
              <span>Vui lòng đồng ý để tiếp tục</span>
            </div>
          )}
          <OrderSubmit formOrder={formOrder} />
        </>
      )}

      <br />
    </Fragment>
  );
};

export default ContentProductsCart;
