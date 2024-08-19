import FilterProducts from "../[nameCategory]/filterProducts";
import StandardCategoryProduct from "./standardCategoryProduct";
import SortProduct from "./sortProduct";
import ProductCategory from "./productCategory";
import SecondaryBanner from "../../secondaryBanner";
// import ComponentSwiper from "../../detail-product/componentSwiper";
import Breadcrumb from "../../../components/breadcrumb";
import PostCategory from "./postCategory";
import BoxModalCompare from "../../boxModalCompare";
import MobileFilterProducts from "../../../components/componentMobileFilterProduct";

const ContentCategory = ({
  dataProperties,
  searchParams,
  dataProducts,
  page,
}) => {
  return (
    <div className="box-container-content-category  ">
      <MobileFilterProducts
        dataProperties={dataProperties}
        searchParams={searchParams}
      ></MobileFilterProducts>
      <div className="in-box-container-content-category pt-1">
        <div className="row box-content-category mx-0">
          <div className="col-12 ">
            <Breadcrumb nameItem={"Laptop văn phòng"} />
          </div>
          <div className="col-12 col-lg-3 box_filter_products_container">
            <FilterProducts
              searchParams={searchParams}
              dataProperties={dataProperties}
            />
          </div>
          <div className="col-12 col-lg-9 mb-3 standar_category_container">
            <StandardCategoryProduct
              totalProduct={dataProducts.total}
              nameCategory={dataProperties.nameCategory}
              getValueParams={searchParams}
              listBrand={dataProperties.listBrand}
            />
            <SortProduct getValueParams={searchParams} />
            <ProductCategory page={page} dataProducts={dataProducts} />
          </div>
          <div className="col-12 mb-3 banner_category_container">
            <div className="banner_category bg-white">
              <SecondaryBanner />
            </div>
          </div>
          {/* <div className="col-12 mb-3 "> */}
            {/* <div className="box_products_seen bg-white">
              <div className="text_product_seen mb-1">
                <span>Sản phẩm đã xem</span>
              </div>
              <div className="  swiper_product_seen">
                <ComponentSwiper
                  marginRight={35}
                  timeLoop={10000000000}
                  classCss={""}
                  dataSwiper={dataProductSeen}
                />
              </div>
            </div> */}
          {/* </div> */}
          <div className="col-12 mb-3 post_category_container">
            <PostCategory />
          </div>
        </div>
      </div>

      <BoxModalCompare />
    </div>
  );
};

export default ContentCategory;
