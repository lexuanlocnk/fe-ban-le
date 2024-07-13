"use client";

import { Checkbox, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const TitleBoxCart = ({
  checkedProducts,
  handleRemoveAll,
  itemCart,
  handleCheckedAll,
  total,
  dispatch,
}) => {
  useEffect(() => {
    dispatch({
      type: "REWARD_POINT",
      payload: total,
    });
  }, [total]);

  return (
    <div className="box_title_cart">
      <div className="d-flex align-items-center">
        <Checkbox onChange={(e) => handleCheckedAll(e.target.checked)} />
        <span className="text_cart ms-3">Đơn hàng của bạn</span>
      </div>
      {checkedProducts?.idsProduct &&
      checkedProducts?.idsProduct?.length > 0 ? (
        <Popconfirm
          onConfirm={handleRemoveAll}
          okText="Chắc chắn"
          cancelText="Hủy"
          title="Xác nhận"
          description={"Bạn có chắc muốn xóa tất cả sản phẩm ra khỏi giỏ hàng"}
          icon={
            <QuestionCircleOutlined
              style={{
                color: "red",
              }}
            />
          }
        >
          <span className="text_delete_item">Xóa tất cả</span>
        </Popconfirm>
      ) : (
        <span className=" text_delete_item_2">Xóa tất cả</span>
      )}
    </div>
  );
};

export default TitleBoxCart;
