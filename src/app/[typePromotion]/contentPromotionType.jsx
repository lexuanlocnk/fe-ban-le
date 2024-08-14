import { hostApi } from "../lib/config";
import BannerPromotion from "./bannerPromotion";
import ProductsPromotion from "./productsPromotion";
import AllProductsPromotion from "./allProductsPromotion";
import { redirect } from "next/navigation";

async function fetchData(category) {
  try {
    const response = await fetch(
      `${hostApi}/member/show-${category}-for-category`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const ContentPromotionType = async ({ typePromotion }) => {
  if (!["flash-sale", "hot-products"].includes(typePromotion)) {
    redirect("/");
  }

  const data = await fetchData(
    typePromotion === "flash-sale" ? "flash-sale" : "hot"
  );

  return (
    <div>
      <BannerPromotion />
      <div className="box_container_type_promotion">
        <div className="container_type_promotion">
          <AllProductsPromotion
            data={
              typePromotion === "flash-sale"
                ? data.showAllFlashSale
                : data.showAllHot
            }
          />
          {data &&
            data.ProductFlashSale &&
            data.ProductFlashSale.length > 0 &&
            typePromotion === "flash-sale" &&
            data.ProductFlashSale.map((item, index) => (
              <ProductsPromotion products={item} key={index} />
            ))}
          {data &&
            data.ProductHot &&
            data.ProductHot.length > 0 &&
            typePromotion === "hot-products" &&
            data.ProductHot.map((item, index) => (
              <ProductsPromotion products={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContentPromotionType;
