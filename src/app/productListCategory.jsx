import { Empty } from "antd";
import ComponentCardProductMain from "../components/componentCardProductMain";
import { hostApi } from "./lib/config";
import Link from "next/link";

async function fetchDataProducts(valueCategory) {
  try {
    const response = await fetch(
      `${hostApi}/member/category?slug=${valueCategory}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.listProduct;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

// import required modules
export default async function ProductListCategory({ category, session }) {
  const dataProducts = await fetchDataProducts(category);

  return (
    <div className="col-12">
      <div className="row mx-0 ">
        {dataProducts && dataProducts.length > 0 ? (
          dataProducts.map((item, index) => (
            <ComponentCardProductMain
              col={"col-md-custom-3 col-6"}
              key={index}
              item={item}
            />
          ))
        ) : (
          <div className="col-12 text-center my-5">
            <Empty description={<span>Không có sản phẩm</span>} />
          </div>
        )}
        {dataProducts && dataProducts.length > 0 && (
          <div className="col-12 d-flex justify-content-center mt-2">
            <Link href={"/category/" + category}>
              <div className="btn_show_more_category">
                <span>Xem tất cả </span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
