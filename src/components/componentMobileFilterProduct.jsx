"use client";
import { useState } from "react";
import Breadcrumb from "./breadcrumb";
import SortProduct from "../app/category/[nameCategory]/sortProduct";
import FilterProducts from "../app/category/[nameCategory]/filterProducts";
import { FilterOutlined } from "@ant-design/icons";

const MobileFilterProduct = ({ searchParams, dataProperties }) => {
  const [isFilered, setIsFiltered] = useState(false);

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
        <div className="mobile_filter_products_container">
          <div className="mobile_filter_products">
            <FilterProducts
              searchParams={searchParams}
              dataProperties={dataProperties}
            ></FilterProducts>
            <div className="mobile_close_button">
              <button onClick={() => setIsFiltered(!isFilered)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileFilterProduct;
