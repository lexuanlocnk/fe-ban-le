import StatusOrder from "./statusOrder";

import ListOrder from "./listOrder";
const OrderManagement = ({ dataStatusOrder, activeStatusOrder, dataOrder }) => {
  return (
    <div className="container_order_management row">
      <div className="col-12 box_title_status_order mb-3    ">
        <span className="text_title_common ">Quản lý đơn hàng</span>
      </div>
      <div className="col-12 d-flex justify-content-end mb-1">
        <StatusOrder
          activeStatusOrder={activeStatusOrder}
          dataStatusOrder={dataStatusOrder}
        />
      </div>
      <div className="col-12 ">
        {" "}
        <ListOrder
          activeStatusOrder={activeStatusOrder}
          dataOrder={dataOrder}
        />
      </div>
    </div>
  );
};

export default OrderManagement;
