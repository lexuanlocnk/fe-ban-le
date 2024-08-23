"use client";

import React, { useState } from "react";
import { hostImage } from "../lib/config";
import { Image as ImageAntd } from "antd";
import Link from "next/link";

const TableCompareProducts = ({ dataCompare }) => {
  const [statusShowHideCompare, setStatusShowHideCompare] = useState(false);
  const handleShowHideDetailCompare = () => {
    setStatusShowHideCompare(!statusShowHideCompare);
  };

  return (
    <div className="box_table_compare">
      <table
        id="table_compare"
        className="table table-hover table-striped table-bordered  table-hover"
      >
        <thead>
          <tr className="h-100">
            <th className="product-comparison-th h-100">&nbsp;</th>
            {dataCompare.map((item, index) => (
              <th className="product-comparison-th" key={item.ProductId}>
                <Link href={"/detail-product/" + item.UrlProduct}>
                  <h5>{item.ProductName}</h5>
                </Link>
              </th>
            ))}
          </tr>

          <tr className="h-100">
            <th className="product-comparison-th h-100">&nbsp;</th>
            {dataCompare.map((item, index) => (
              <th className="product-comparison-th" key={item.ProductId}>
                <ImageAntd
                  className=" img_compare "
                  src={hostImage + item.Image}
                />
              </th>
            ))}
          </tr>
          <tr className="h-100">
            <th className="product-comparison-th h-100">&nbsp;</th>
            {dataCompare.map((item, index) => (
              <th className="product-comparison-th" key={item.ProductId}>
                <Link href={"/detail-product/" + item.UrlProduct}>
                  <h5 className="price_detail_product text-center">
                    {item.Price.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </h5>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataCompare[0]?.dataTechnology
            .slice(
              0,
              statusShowHideCompare ? dataCompare[0]?.dataTechnology.length : 7
            )
            .map((compareProductItem, index) => (
              <tr className="h-100" key={compareProductItem.catOption}>
                <td className="h-100 text-content-compare">
                  {compareProductItem.catOption}
                </td>
                {dataCompare.map((product, idx) => (
                  <td className="h-100 text-content-compare" key={idx}>
                    <div
                      className=""
                      spec-title="Label"
                      dangerouslySetInnerHTML={{
                        __html:
                          product.dataTechnology[index]?.nameCatOption ||
                          "Không có",
                      }}
                    ></div>
                  </td>
                ))}
              </tr>
            ))}
          <tr>
            <td
              onClick={() =>
                handleShowHideDetailCompare(
                  statusShowHideCompare ? "hide" : "show"
                )
              }
              colSpan={4}
              className="text-center see-detail text-primary"
            >
              {statusShowHideCompare ? "Thu gọn" : "Xem thêm"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableCompareProducts;
