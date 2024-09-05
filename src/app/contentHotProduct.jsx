import { hostApi } from "./lib/config";
import ComponentCardProductMain from "../components/componentCardProductMain";
import PaginationServer from "./paginationServer";

function ContentHotProducts({ session, page, dataHotProducts }) {
  return (
    <div className="col-12 box_item_products">
      <div className="row mx-md-3 mx-1 box_item_products_container">
        {dataHotProducts &&
          dataHotProducts?.listProductRecommend &&
          dataHotProducts?.listProductRecommend?.length > 0 &&
          dataHotProducts?.listProductRecommend?.map((item, index) => (
            <ComponentCardProductMain
              key={index}
              item={item}
              col={"col-md-custom-3 col-6"}
            />
          ))}
        <div className="col-12">
          <PaginationServer
            pageSize={15}
            page={page}
            data={dataHotProducts || null}
          />
        </div>
      </div>
    </div>
  );
}
export default ContentHotProducts;
