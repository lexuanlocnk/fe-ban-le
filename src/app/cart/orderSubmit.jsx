"use client";
import { Button } from "antd";

const OrderSubmit = ({ formOrder }) => {
  return (
    <div className="d-flex justify-content-center mt-3">
      <Button
        className="btn_order d-flex justify-content-center align-items-center"
        onClick={() => formOrder.submit()}
      >
        Đặt hàng
      </Button>
    </div>
  );
};

export default OrderSubmit;
