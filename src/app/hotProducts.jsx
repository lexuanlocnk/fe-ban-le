import { Skeleton } from "antd";
import ContentHotProduct from "./contentHotProduct";
import { Suspense } from "react";

async function HotProducts({ session, page }) {
  return (
    <div className="container_hot_products row">
      <div className="col-12 box_text_hot_products">
        <div className="box_name_hot_products  px-3">
          {" "}
          <span className="name_hot_products related-product">
            GỢI Ý HÔM NAY
          </span>{" "}
        </div>
      </div>

      {/* <Suspense
        fallback={
          <Skeleton
            avatar
            paragraph={{
              rows: 3,
            }}
          />
        }
      > */}
      <ContentHotProduct session={session} page={page} />
      {/* </Suspense> */}
    </div>
  );
}
export default HotProducts;
