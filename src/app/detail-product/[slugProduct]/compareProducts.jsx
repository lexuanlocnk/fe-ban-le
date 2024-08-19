"use client";
import { useEffect, useState } from "react";
import { Image as ImageAntd } from "antd";
import { hostImage } from "../../lib/config";
import { scrollToElement } from "../../lib/functions";
import Link from "next/link";

const CompareProducts = ({ dataProductsCompare, status }) => {
  const [statusShowHideCompare, setStatusShowHideCompare] = useState(false);
  const [elementCompare, setElementCompare] = useState();

  useEffect(() => {
    const element = document?.getElementById("table_compare");
    setElementCompare(element);
  }, []);

  const handleShowHideDetailCompare = (status) => {
    setStatusShowHideCompare(!statusShowHideCompare);
    if (status == "hide") {
      scrollToElement(elementCompare);
    }
  };

  return (
    <div className="col-12 bg-white box-compare p-3 table-responsive-lg ">
      <table id="table_compare" className="table table-hover table-bordered">
        <thead>
          <tr className="h-100">
            <th className="product-comparison-th h-100">&nbsp;</th>
            {dataProductsCompare.map((item, index) => (
              <th className="product-comparison-th" key={index}>
                <Link href={"/detail-product/" + item.friendlyUrl}>
                  <h5>{item.productName}</h5>
                </Link>
              </th>
            ))}
          </tr>

          <tr className="h-100">
            <th className="product-comparison-th h-100">&nbsp;</th>
            {dataProductsCompare.map((item, index) => (
              <th className="product-comparison-th" key={index}>
                <ImageAntd
                  className="h-100 w-100 img_compare "
                  src={hostImage + item.picture}
                />
              </th>
            ))}
          </tr>
          <tr className="h-100">
            <th className="product-comparison-th h-100">&nbsp;</th>
            {dataProductsCompare.map((item, index) => (
              <th className="product-comparison-th" key={index}>
                <Link href={"/detail-product/" + item.friendlyUrl}>
                  <h5 className="price_detail_product text-center">
                    {item.priceOld.toLocaleString("vi", {
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
          {dataProductsCompare[0]?.technology
            .slice(
              0,
              statusShowHideCompare
                ? dataProductsCompare[0]?.technology.length
                : 7
            )
            .map((compareProductItem, index) => (
              <tr className="h-100" key={index}>
                <td className="h-100 text-content-compare">
                  {compareProductItem.catOption}
                </td>
                {dataProductsCompare.map((product, idx) => (
                  <td className="h-100 text-content-compare" key={idx}>
                    <div
                      className=""
                      spec-title="Label"
                      dangerouslySetInnerHTML={{
                        __html:
                          product.technology[index]?.nameCatOption ||
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

export default CompareProducts;
