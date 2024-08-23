import Image from "next/image";
import Link from "next/link";

const InfoClientPayment = ({ dataOrder, userId }) => {
  return (
    <>
      <span className="title_pay">
        Cảm ơn {dataOrder.orderSum.gender == "male" ? "anh" : "chị"}
        <p className="name_pay mb-0">{dataOrder.orderSum.d_name}</p> đã cho
        QUANGBAO cơ hội được phục vụ.
      </span>
      <div className="info_order">
        <div className="box_text_order_management">
          <Link href="/account/orders">
            <span className="text_management">Quản lý đơn hàng</span>
          </Link>
        </div>
        <ul>
          <li>
            <span className="text_title">Người nhận hàng:</span>{" "}
            <span className="text_value">
              {dataOrder.orderSum.gender === "male" ? "anh" : "chị"}{" "}
              {dataOrder.orderSum.d_name}, {dataOrder.orderSum.d_phone}
            </span>
          </li>

          {dataOrder && dataOrder.orderSum.shipping_method == "pickUpStore" ? (
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
                {dataOrder?.orderSum?.order_address?.address},{" "}
                {dataOrder?.orderSum?.order_address?.district},{" "}
                {dataOrder?.orderSum?.order_address?.province} (nhân viên sẽ gọi
                xác nhận trước khi giao).
              </span>
            </li>
          )}

          {dataOrder && dataOrder.orderSum.comment && (
            <li>
              <span className="text_title">Yêu cầu khác:</span>{" "}
              <span className="text_value">{dataOrder.orderSum.comment}</span>
            </li>
          )}

          {dataOrder &&
            dataOrder.orderSum.invoice_order &&
            Object.keys(dataOrder.orderSum.invoice_order).length > 1 && (
              <li className="">
                <span className="text_title">Thông tin xuất hóa đơn:</span>{" "}
                <div className="flex-column d-flex ms-5 ">
                  <span className="text_title_company">
                    Tên công ty: {dataOrder.orderSum.invoice_order.nameCompany}
                  </span>

                  <span className="text_title_company">
                    Địa chỉ công ty:{" "}
                    {dataOrder.orderSum.invoice_order.addressCompany}
                  </span>
                  <span className="text_title_company">
                    Mã số thuế:{" "}
                    {dataOrder.orderSum.invoice_order.taxCodeCompany}
                  </span>
                </div>
              </li>
            )}

          {dataOrder &&
          dataOrder.orderSum.accumulatedPoints &&
          dataOrder.orderSum.accumulatedPoints > 0 ? (
            <li>
              <span className="text_title">Điểm tích lũy sử dụng:</span>{" "}
              <span className="text_value">
                {dataOrder.orderSum.accumulatedPoints} điểm -{" "}
                {(dataOrder.orderSum.accumulatedPoints * 5000).toLocaleString(
                  "vi",
                  {
                    style: "currency",
                    currency: "VND",
                  }
                )}
              </span>
            </li>
          ) : (
            <></>
          )}
          {dataOrder && dataOrder.inforVoucher && (
            <li>
              <span className="text_title">Mã khuyến mãi:</span>{" "}
              <span className="text_value">
                {dataOrder.inforVoucher.MaCouponDes} -{" "}
                {dataOrder.inforVoucher.coupon.GiaTriCoupon.toLocaleString(
                  "vi",
                  {
                    style: "currency",
                    currency: "VND",
                  }
                )}
              </span>
            </li>
          )}

          <li>
            <span className="text_title">Tổng tiền:</span>{" "}
            <span className="text_value money">
              {dataOrder?.orderSum?.total_cart?.toLocaleString("vi", {
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
            Bạn tích được {dataOrder.orderSum.accumulatedPoints} điểm cho đơn
            hàng này
          </span>
        ) : (
          <span className="text_title">
            Đơn hàng nhận được {dataOrder.orderSum.accumulatedPoints} điểm (Đăng
            nhập để tích thêm điểm cho những đơn hàng sau)
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
