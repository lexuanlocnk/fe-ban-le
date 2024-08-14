import Link from "next/link";
import { hostApi } from "./lib/config";
import SlideTopProducts from "./slideTopProducts";
import { RightCircleOutlined } from "@ant-design/icons";

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

async function TopProducts({}) {
  const dataTopProducts = await fetchDataItem();

  return (
    <div className="container_top_products py-2">
      <div className="px-3 mb-1 d-flex justify-content-between align-items-center">
        <span className="related-product text-white">
          TOP SẢN PHẨM BÁN CHẠY
        </span>

        <Link
          className="text-decoration-none link-show-more text-white"
          href="/hot-products"
        >
          Xem tất cả <RightCircleOutlined />
        </Link>
      </div>

      <SlideTopProducts dataTopProducts={dataTopProducts} />
    </div>
  );
}

export default TopProducts;
