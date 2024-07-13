"use client";
import { hostApi } from "./lib/config";
import ComponentCardProductMain from "../components/componentCardProductMain";
import PaginationServer from "./paginationServer";
import { useEffect, useState } from "react";

function ContentHotProducts({ session, page }) {
  const [dataHotProducts, setDataHotProducts] = useState({});

  useEffect(() => {
    fetchRecommendedProducts(page);
  }, [page]);

  const fetchRecommendedProducts = async (pageValue) => {
    try {
      const response = await fetch(
        `${hostApi}/member/recommend-product?page=${pageValue}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDataHotProducts(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="col-12 box_item_products">
      <div className="row mx-md-3 mx-1">
        {dataHotProducts &&
          dataHotProducts?.listProductRecommend &&
          dataHotProducts?.listProductRecommend?.length > 0 &&
          dataHotProducts?.listProductRecommend?.map((item, index) => (
            <ComponentCardProductMain
              key={index}
              item={item}
              col={"col-md-custom-3 col-6"}
            />
          ))}
        <div className="col-12">
          <PaginationServer
            pageSize={15}
            page={page}
            data={dataHotProducts || null}
          />
        </div>
      </div>
    </div>
  );
}
export default ContentHotProducts;
