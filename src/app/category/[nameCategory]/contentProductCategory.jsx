import { Fragment } from "react";
import ComponentCardProductMain from "../../../components/componentCardProductMain";
import Image from "next/image";

const ContentProductCategory = ({ dataProducts }) => {
  return (
    <Fragment>
      {dataProducts &&
      dataProducts.listProduct &&
      dataProducts.listProduct.length > 0 ? (
        <div className="row main_content_product_category">
          {dataProducts &&
            dataProducts?.listProduct?.length > 0 &&
            dataProducts?.listProduct?.map((item, index) => (
              <ComponentCardProductMain
                col={"col-md-3"}
                item={item}
                key={index}
              />
            ))}
        </div>
      ) : (
        <div className="row main_content_product_category">
          <div className="box_icon_not_found_category">
            <Image
              width={150}
              height={150}
              alt="Not Found Product"
              src={"/image/img_not_found.png"}
            />
            <div className="text_not_found_product">
              <span className="description_not_found">
                Không tìm thấy sản phẩm nào
              </span>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ContentProductCategory;
