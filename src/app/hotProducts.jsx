import ContentHotProduct from "./contentHotProduct";
import { hostApi } from "./lib/config";

async function fetchRecommendedProducts(pageValue) {
  try {
    const response = await fetch(
      `${hostApi}/member/recommend-product?page=${pageValue}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("fetchRecommendedProducts Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

async function HotProducts({ session, page }) {
  const dataHotProducts = await fetchRecommendedProducts(page);

  return (
    <div className="container_hot_products row mx-0">
      <div className="col-12 box_text_hot_products">
        <div className="box_name_hot_products  px-3">
          {" "}
          <span className="name_hot_products related-product">
            SẢN PHẨM NỔI BẬT
          </span>{" "}
        </div>
      </div>

      <ContentHotProduct
        dataHotProducts={dataHotProducts}
        session={session}
        page={page}
      />
    </div>
  );
}
export default HotProducts;
