import React from "react";
import Header from "../header/header";
import "../../../public/css/detail-product.css";

import ContentCompareProduct from "./contentCompareProduct";
import Footer from "../../components/footer";
import { hostApi } from "../lib/config";

async function fetchDataCompare(slug) {
  const regex = /keyId=(\d+)/g;
  const ids = [...slug.matchAll(regex)].map((match) => match[1]);

  try {
    const response = await fetch(
      `${hostApi}/member/compare-products?key1=${ids[0]}&key2=${ids[1]}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const CompareProduct = async ({ searchParams }) => {
  const dataCompare = await fetchDataCompare(searchParams["so-sanh-san-pham"]);

  return (
    <div className="container-fluid px-0">
      <Header />
      <ContentCompareProduct dataCompare={dataCompare} />
      <Footer />
    </div>
  );
};

export default CompareProduct;
