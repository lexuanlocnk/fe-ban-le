import { hostApi } from "./lib/config";
import SlideTopProducts from "./slideTopProducts";

async function fetchDataItem() {
  try {
    const response = await fetch(`${hostApi}/member/product-hot`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

async function TopProducts({ session }) {
  const dataTopProducts = await fetchDataItem();
  // console.log("dataTopProducts", dataTopProducts);

  return (
    <div className="container_top_products py-2">
      <div className="px-3 mb-1">
        <span className="related-product text-white">
          TOP SẢN PHẨM BÁN CHẠY
        </span>
      </div>

      <SlideTopProducts session={session} dataTopProducts={dataTopProducts} />
    </div>
  );
}

export default TopProducts;
