"use client";
import { Pagination } from "antd";
import ComponentCardProductBasic from "../../../components/componentCardProductBasic";
import EmptyProduct from "../../../components/emptyProduct";
import { UseAppContext } from "../../lib/appProvider";

const ViewedProducts = ({}) => {
  const { productViewed } = UseAppContext();

  return (
    <div className="box_products_viewed row">
      <div className="col-12 mb-1">
        <span className="text_title_common ">Sản phẩm đã xem</span>
      </div>
      {productViewed && productViewed.length > 0 ? (
        productViewed.map((item, index) => (
          <ComponentCardProductBasic
            key={index}
            col="col-3"
            item={item}
            allowCompare={false}
          />
        ))
      ) : (
        <EmptyProduct text="Chưa có sản phẩm nào được xem!" />
      )}
    </div>
  );
};

export default ViewedProducts;
