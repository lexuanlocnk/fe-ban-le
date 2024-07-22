import ProductReviews from "./productReviews.jsx";
import InfoProduct from "./infoProduct.jsx";
import SellingProducts from "./sellingProducts.jsx";
import ComponentSwiper from "./componentSwiper.jsx";
import NotFoundProduct from "./notFoundProduct.jsx";

const ContentDetailProduct = ({
  dataProduct,
  dataProductsCompare,
  params,
  dataRelated,
  dataGiftProduct,
}) => {
  return dataProduct ? (
    <div className="box-container-detail-product">
      <div className="in-box-container-detail-product">
        <InfoProduct
          dataGiftProduct={dataGiftProduct}
          dataProductsCompare={dataProductsCompare}
          dataProduct={dataProduct}
        />

        <div className="row box-description-much pb-3">
          <SellingProducts params={params} />

          <div className="col-12 box-related-product bg-white mt-2 p-3">
            <div className="row row-related-product ">
              <div
                className="related-product col-12 
"
              >
                <span>Sản phẩm liên quan</span>
              </div>

              <div className="col-12 related-product">
                <ComponentSwiper
                  timeLoop={2500}
                  classCss={""}
                  dataSwiper={dataRelated}
                />
              </div>
            </div>
          </div>

          <ProductReviews />
        </div>
      </div>
    </div>
  ) : (
    <NotFoundProduct />
  );
};

export default ContentDetailProduct;
