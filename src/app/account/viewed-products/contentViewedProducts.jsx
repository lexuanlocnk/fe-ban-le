import MenuAccount from "../menuAccount";
import Breadcrumb from "../../../components/breadcrumb";
import ViewedProducts from "./viewedProducts";
const ContentViewedProducts = () => {
  const defaultMenuItem = {
    id: 4,
    name: "Sản phẩm đã xem",
  };

  return (
    <div className="box-container-content-account">
      <div className="in-box-container-content-account pt-1">
        <div className="row box-content-account mx-0">
          <div className="col-12 ">
            <Breadcrumb nameItem={defaultMenuItem.name} />
          </div>
          <MenuAccount defaultMenuItem={defaultMenuItem} />
          <div className="col-9  mt-2">
            <ViewedProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentViewedProducts;
