"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { hostApi } from "../../lib/config";

const SuggestedProducts = () => {
  const [dataMostSearch, setDataMostSearch] = useState();

  const categoriesHeader = async () => {
    try {
      const response = await fetch(`${hostApi}/member/statistics-category`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDataMostSearch(data.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    categoriesHeader();
  }, []);

  return (
    <>
      {dataMostSearch &&
        dataMostSearch.map((item, index) => (
          <Link
            className="suggest-product   "
            key={index}
            href={
              item?.type == "product"
                ? `/detail-product/${item?.url}`
                : `/category/${item?.url}`
            }
          >
            {item?.name}
          </Link> //
        ))}
    </>
  );
};

export default SuggestedProducts;
