import React, { useEffect, useState } from "react";
import Link from "next/link";
import { hostApi } from "../../lib/config";

const SuggestedProducts = () => {
  const [dataCategoriesHeader, setDataCategoriesHeader] = useState();

  const categoriesHeader = async () => {
    try {
      const response = await fetch(`${hostApi}/member/show-category-header`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDataCategoriesHeader(data.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    categoriesHeader();
  }, []);

  return (
    <>
      {dataCategoriesHeader &&
        dataCategoriesHeader.map((category, index) => (
          <Link
            className="suggest-product   "
            key={category?.CatId}
            href={`/category/${category.CatUrl}`}
          >
            {category?.Category}
          </Link> //
        ))}
    </>
  );
};

export default SuggestedProducts;
