import ProductListCategory from "./productListCategory";
import Link from "next/link";
import { GrNext } from "react-icons/gr";
import ComponentSlideProduct from "../components/componentSlideProduct";
import { hostImage } from "./lib/config";
import Image from "next/image";
const FeaturedProductsCategory = ({ item }) => {
  return (
    <div className="container_featured_products_category row mx-1">
      <div className="col-12 px-3 mb-1 d-flex justify-content-between align-items-center text-light">
        <span className="related-product">
          DANH MỤC {item.Category.toUpperCase()}
        </span>

        <Link href={"/category/" + item.CatUrl}>
          <div className="text_show_more_category d-flex align-items-center">
            <span>Xem tất cả </span>
            <GrNext />
          </div>
        </Link>
      </div>

      {item?.Banner[0] && item?.Banner[0]?.picture && (
        <div className="col-12">
          <div className="box_banner_category_product mb-3">
            <Image
              quality={75}
              height={100}
              width={0}
              sizes="100vw"
              src={hostImage + item?.Banner[0]?.picture}
            />
          </div>
        </div>
      )}

      <ComponentSlideProduct dataProducts={item.ProductChild} />

      {/* <ProductListCategory
        dataProducts={item.ProductChild}
        category={category}
      /> */}
    </div>
  );
};
export default FeaturedProductsCategory;
