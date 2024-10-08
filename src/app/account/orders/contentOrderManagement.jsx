import MenuAccount from "../menuAccount";
import OrderManagement from "./orderManagement";

import Breadcrumb from "../../../components/breadcrumb";

const ContentOrderManagement = ({
  dataStatusOrder,
  activeStatusOrder,
  dataOrder,
}) => {
  const defaultMenuItem = {
    id: 3,
    name: "Quản lý đơn hàng",
  };
  return (
    <div className="box-container-content-account mb-3">
      <div className="in-box-container-content-account pt-1">
        <div className="row box-content-account mx-0">
          <div className="col-12 ">
            <Breadcrumb nameItem={defaultMenuItem.name} />
          </div>

          <MenuAccount defaultMenuItem={defaultMenuItem} />
          <div className="col-9  mt-2">
            <OrderManagement
              dataOrder={dataOrder}
              activeStatusOrder={activeStatusOrder}
              dataStatusOrder={dataStatusOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentOrderManagement;
