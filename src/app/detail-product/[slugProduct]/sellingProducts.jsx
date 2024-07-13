// import { RightCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import ComponentCardProductSwiper from "../../../components/componentCardProductSwiper";
import { hostApi } from "../../lib/config";

async function fetchDataHotProducts(params) {
  try {
    const response = await fetch(
      `${hostApi}/member/top-sale-product?key=${params}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.topSaleProduct;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const SellingProducts = async ({ params }) => {
  const dataCategory = await fetchDataHotProducts(params);

  return (
    dataCategory &&
    dataCategory.length > 0 && (
      <div className="col-12 box-review-product bg-white mt-2 p-3">
        <div className="row">
          <div className=" col-12  d-flex justify-content-between align-items-center ">
            <span className="related-product">Top sản phẩm bán chạy</span>
            <Link className="text-decoration-none link-show-more" href="#">
              {/* Xem tất cả <RightCircleOutlined /> */}
            </Link>
          </div>

          {dataCategory &&
            dataCategory.length > 0 &&
            dataCategory.map((item, index) => (
              <div className="col-md-custom-3 col-6 px-1" key={index}>
                <ComponentCardProductSwiper item={item} />
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default SellingProducts;
