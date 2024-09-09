"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { hostApi } from "../../lib/config";
import { Skeleton } from "antd";

const SuggestedProducts = () => {
  const [loading, setLoading] = useState(true);
  const [dataMostSearch, setDataMostSearch] = useState([]);

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
    } finally {
      setLoading(false); // Khi fetch hoàn thành, chuyển loading về false
    }
  };

  useEffect(() => {
    categoriesHeader();
  }, []);

  return (
    <>
      {loading ? (
        <div className="box_skeleton_info_header">
          <Skeleton
            active
          ></Skeleton>
        </div>
      ) : (
        dataMostSearch &&
        dataMostSearch.map((item, index) => (
          <Link
            className="suggest-product"
            key={index}
            href={
              item?.type == "product"
                ? `/detail-product/${item?.url}`
                : `/category/${item?.url}`
            }
          >
            {item?.name}
          </Link>
        ))
      )}
    </>
  );
};

export default SuggestedProducts;
