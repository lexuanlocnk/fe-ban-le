"use client";
import { useState } from "react";
import Breadcrumb from "./breadcrumb";
import SortProduct from "../app/category/[nameCategory]/sortProduct";
import FilterProducts from "../app/category/[nameCategory]/filterProducts";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Drawer, Space } from "antd";

const MobileFilterProduct = ({ searchParams, dataProperties }) => {
  const [isFilered, setIsFiltered] = useState(false);
  const [placement, setPlacement] = useState("right");

  const onClose = () => {
    setIsFiltered(false);
  };

  return (
    <div className="mobile_box_sort_container">
      <div className="mobile_breadcrumb_sort">
        <div className="mobile_breadcrumb">
          <Breadcrumb nameItem={"Laptop văn phòng"} />
        </div>
        <div className="mobile_sort_product">
          <SortProduct getValueParams={searchParams} />
          <div
            className="filter_product"
            onClick={() => setIsFiltered(!isFilered)}
          >
            <span>Bộ lọc</span>
            <FilterOutlined />
          </div>
        </div>
      </div>
      {isFilered && (
        <Drawer
          title="Bộ lọc"
          placement={placement}
          width={500}
          onClose={onClose}
          open={isFilered}
          extra={
            <Space>
              <Button className="drawerButtonCancel" onClick={onClose}>Huỷ</Button>
              <Button className="drawerButtonAccept" type="primary" onClick={onClose}>
                OK
              </Button>
            </Space>
          }
        >
          <div className="mobile_filter_products custom_scroll">
            <FilterProducts
              searchParams={searchParams}
              dataProperties={dataProperties}
            ></FilterProducts>
          </div>
        </Drawer>
      )}
    </div>
  );
};

export default MobileFilterProduct;
