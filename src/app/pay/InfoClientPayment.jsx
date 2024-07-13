import Image from "next/image";

const InfoClientPayment = ({ dataOrder, userId }) => {
  return (
    <>
      <span className="title_pay">
        Cảm ơn {dataOrder.gender}
        <p className="name_pay mb-0">{dataOrder.d_name}</p> đã cho QUANGBAO cơ
        hội được phục vụ.
      </span>
      <div className="info_order">
        <div className="box_text_order_management">
          <span className="text_management">Quản lý đơn hàng</span>
          <span className="dot">•</span>
          <span className="text_cancel">Hủy</span>
        </div>
        <ul>
          <li>
            <span className="text_title">Người nhận hàng:</span>{" "}
            <span className="text_value">
              {dataOrder.gender} {dataOrder.d_name}, {dataOrder.d_phone}
            </span>
          </li>
          {dataOrder && dataOrder.shipping_method == "pickUpStore" ? (
            <li>
              <span className="text_title">Nhận hàng tại cửa hàng:</span>{" "}
              <span className="text_value">
                245B Trần Quang Khải, phường Tân Định, quận 1
              </span>
            </li>
          ) : (
            <li>
              <span className="text_title">Giao đến: </span>{" "}
              <span className="text_value">
                {dataOrder?.order_address?.address},{" "}
                {dataOrder?.order_address?.district},{" "}
                {dataOrder?.order_address?.province} (nhân viên sẽ gọi xác nhận
                trước khi giao).
              </span>
            </li>
          )}

          {dataOrder && dataOrder.comment && (
            <li>
              <span className="text_title">Yêu cầu khác:</span>{" "}
              <span className="text_value">{dataOrder.comment}</span>
            </li>
          )}

          {dataOrder &&
            dataOrder.invoice_order &&
            Object.keys(dataOrder.invoice_order).length > 1 && (
              <li className="">
                <span className="text_title">Thông tin xuất hóa đơn:</span>{" "}
                <div className="flex-column d-flex ms-5 ">
                  <span className="text_title_company">
                    Tên công ty: {dataOrder.invoice_order.nameCompany}
                  </span>

                  <span className="text_title_company">
                    Địa chỉ công ty: {dataOrder.invoice_order.addressCompany}
                  </span>
                  <span className="text_title_company">
                    Mã số thuế: {dataOrder.invoice_order.taxCodeCompany}
                  </span>
                </div>
              </li>
            )}

          {dataOrder &&
          dataOrder.accumulatedPoints &&
          dataOrder.accumulatedPoints > 0 ? (
            <li>
              <span className="text_title">Điểm tích lũy sử dụng:</span>{" "}
              <span className="text_value">
                {dataOrder.accumulatedPoints} điểm
              </span>
            </li>
          ) : (
            <></>
          )}

          <li>
            <span className="text_title">Tổng tiền:</span>{" "}
            <span className="text_value money">
              {dataOrder?.total_cart?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </li>
        </ul>
      </div>
      <div className="box_statistical_point mt-2">
        <Image
          alt="logo_scores"
          width={35}
          height={35}
          src={"/image/icon_image/stars.png"}
        />
        {userId ? (
          <span className="text_title">
            Bạn tích được {dataOrder.accumulatedPoints} điểm cho đơn hàng này
          </span>
        ) : (
          <span className="text_title">
            Đơn hàng nhận được {dataOrder.accumulatedPoints} điểm (Đăng nhập để
            tích thêm điểm cho những đơn hàng sau)
          </span>
        )}
      </div>
      <div className="status_order mt-2">
        <span>Đơn hàng chưa được thanh toán</span>
      </div>
      <div className="choose_payment mt-2">
        <span>Chọn phương thức thanh toán đơn hàng:</span>
      </div>
    </>
  );
};

export default InfoClientPayment;
