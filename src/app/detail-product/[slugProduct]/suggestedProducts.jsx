import React from "react";
import Link from "next/link";

const SuggestedProducts = () => {
  const categories = ["Laptop HP", "Máy tính", "RAM DDR5", "RAM DDR4", "HPE"];

  return (
    <>
      {categories &&
        categories.map((category, index) => (
          <Link className="suggest-product   " key={index} href="">
            {category}
          </Link> // Sử dụng Link từ antd
        ))}
    </>
  );
};

export default SuggestedProducts;
