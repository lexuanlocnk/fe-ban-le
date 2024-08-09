import { hostApi } from "../lib/config";
import BannerPromotion from "./bannerPromotion";
import ProductsPromotion from "./productsPromotion";
import AllProductsPromotion from "./allProductsPromotion";

async function fetchDataFlashSaleCategory() {
  try {
    const response = await fetch(
      `${hostApi}/member/show-flash-sale-for-category`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const ContentPromotionType = async ({}) => {
  const dataFlashSale = await fetchDataFlashSaleCategory();

  return (
    <div>
      <BannerPromotion />
      <div className="box_container_type_promotion">
        <div className="container_type_promotion">
          <AllProductsPromotion data={dataFlashSale} />
          {dataFlashSale &&
            dataFlashSale.ProductFlashSale.length > 0 &&
            dataFlashSale.ProductFlashSale.map((item, index) => (
              <ProductsPromotion products={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default ContentPromotionType;
