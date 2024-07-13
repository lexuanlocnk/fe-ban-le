import { Suspense } from "react";
import ProductListCategory from "./productListCategory";
import ProductsCategory from "./productsCategory";
import { Skeleton } from "antd";

const categories = {
  laptop: "LAPTOP",
  "may-tinh-van-phong": "MÁY TÍNH ĐỂ BÀN",
  workstation: "WORKSTATION",
  "may-chu": "SERVER",
  "may-in": "MÁY IN",
  "linh-kien": "LINH KIỆN PC",
  "phu-kien": "PHỤ KIỆN",
  "phan-mem": "PHẦN MỀM",
  smarthome: "SMART HOME",
  "thiet-bi-mang": "THIẾT BỊ MẠNG",
  "thiet-bi-van-phong": "THIẾT BỊ VĂN PHÒNG",
  "thiet-bi-dan-dung": "THIẾT BỊ DÂN DỤNG",
  "muc-in-chinh-hang": "MỰC IN CHÍNH HÃNG",
  "man-hinh": "MÀN HÌNH MÁY TÍNH",
  "dich-vu-bao-hanh-mo-rong": "DỊCH VỤ BẢO HÀNH MỞ RỘNG",
  "linh-kien-server": "LINH KIỆN SERVER",
  "linh-phu-kien-laptop": "LINH PHỤ KIỆN LAPTOP",
  "may-scan": "MÁY SCAN",
};

const FeaturedProductsCategory = ({ category, session, dataCategory }) => {
  return (
    <div className="container_featured_products_category row mx-1">
      <div className="col-12 px-3 mb-1">
        <span className="related-product">DANH MỤC {categories[category]}</span>
      </div>

      <ProductsCategory
        category={category}
        session={session}
        dataCategory={dataCategory}
      />

      <Suspense
        fallback={
          <Skeleton
            avatar
            paragraph={{
              rows: 15,
            }}
          />
        }
      >
        <ProductListCategory session={session} category={category} />
      </Suspense>
    </div>
  );
};
export default FeaturedProductsCategory;
