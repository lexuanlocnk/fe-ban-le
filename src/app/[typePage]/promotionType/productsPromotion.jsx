import Image from "next/image";
import ComponentCardProductBasic from "../../../components/componentCardProductBasic";

const ProductsPromotion = ({ products }) => {
  const banner = "/image/banner_laptop.png";

  return (
    <>
      {products?.product?.length > 0 && (
        <div className="box_container_products_promotion my-3">
          <div className="box_products_promotion_main">
            <div className="box_banner_product_promotion my-2">
              <Image
                src={banner}
                quality={100}
                height={150}
                width={0}
                sizes="100vw"
                className="w-100 h-100"
                alt="Product Promotion Banner"
              />
            </div>
            <div className="products_promotion_box row mx-0">
              {products.product.map((item, index) => (
                <ComponentCardProductBasic
                  key={index}
                  item={item}
                  col="col-md-custom-3 col-6"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPromotion;
