import { Empty } from "antd";
import ComponentCardProductMain from "../components/componentCardProductMain";

// import required modules
export default async function ProductListCategory({ dataProducts }) {
  return (
    <div className="col-12">
      <div className="row mx-0 ">
        {dataProducts && dataProducts.length > 0 ? (
          dataProducts.map((item, index) => (
            <ComponentCardProductMain
              col={"col-md-custom-3 col-6"}
              key={index}
              item={item}
            />
          ))
        ) : (
          <div className="col-12 text-center my-5">
            <Empty description={<span>Không có sản phẩm</span>} />
          </div>
        )}
      </div>
    </div>
  );
}
