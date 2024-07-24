import dayjs from "dayjs";
import { Tag } from "antd";
import ComponentCardItemOrder from "../../../../components/componentCardItemOrder";
import "dayjs/locale/vi";
import ButtonRepurchase from "./buttonRepurchase";

dayjs.locale("vi");
const ContentDetailOrder = ({ dataDetailOrder }) => {
  return (
    <>
      <div className="top_content_detail_order ">
        <div className="item_top_content_order w-100 ">
          <span className="title_top_content_order">Thông tin người nhận</span>

          <div className="box_item_info_top">
            <div className="item_info_top_content">
              <span className="title_top_content">Người nhận:</span>
              <span className="value_top_content">
                {dataDetailOrder.d_name}
              </span>
            </div>
            <div className="item_info_top_content">
              <span className="title_top_content">Hình thức nhận hàng:</span>
              <span className="value_top_content">
                {dataDetailOrder.shipping_method}
              </span>
            </div>

            {dataDetailOrder.shipping_method != "Nhận tại cửa hàng" ? (
              <div className="item_info_top_content">
                <span className="title_top_content">Địa chỉ:</span>
                <span className="value_top_content">
                  {dataDetailOrder.address.address}{" "}
                  {dataDetailOrder.address.ward}{" "}
                  {dataDetailOrder.address.district}{" "}
                  {dataDetailOrder.address.province}
                </span>
              </div>
            ) : (
              <div className="item_info_top_content">
                <span className="title_top_content">Nhận tại cửa hàng:</span>
                <span className="value_top_content">
                  245B Trần Quang Khải, phường Tân Định, thành phố Hồ Chí Minh
                </span>
              </div>
            )}

            <div className="item_info_top_content">
              <span className="title_top_content">Điện thoại: </span>
              <span className="value_top_content">
                {dataDetailOrder.d_phone}
              </span>
            </div>
          </div>
        </div>
        <div className="item_top_content_order w-100 ">
          <span className="title_top_content_order">Thông tin đơn hàng</span>

          <div className="box_item_info_top">
            <div className="item_info_top_content">
              <span className="title_top_content">Trạng thái đơn hàng:</span>
              <span className="value_top_content">
                {dataDetailOrder.order_status}
              </span>
            </div>
            <div className="item_info_top_content">
              <span className="title_top_content">Thời gian tạo: </span>
              <span className="value_top_content">
                {/* {dataDetailOrder.order_status} */}

                {dayjs
                  .unix(dataDetailOrder.date_order)
                  .format("dddd, HH:mm DD-MM-YYYY")
                  .replace(/^\w/, (c) => c.toUpperCase())}
              </span>
            </div>
            {dataDetailOrder.comment && (
              <div className="item_info_top_content">
                <span className="title_top_content">Yêu cầu khác:</span>
                <span className="value_top_content">
                  {dataDetailOrder.comment}
                </span>
              </div>
            )}

            {dataDetailOrder.accumulatedPoints &&
              dataDetailOrder.accumulatedPoints > 0 && (
                <div className="item_info_top_content">
                  <span className="title_top_content">Điểm sử dụng:</span>

                  <span className="value_top_content">
                    {dataDetailOrder.accumulatedPoints} điểm
                  </span>
                </div>
              )}

            <div className="item_info_top_content">
              <span className="title_top_content">
                Điểm tích lũy từ đơn hàng:
              </span>

              {dataDetailOrder.keyStatus !== "finished" ? (
                <span className="value_top_content">
                  {dataDetailOrder.orderPoints} điểm (Chờ hoàn thành)
                </span>
              ) : (
                <span className="value_top_content">
                  {dataDetailOrder.orderPoints} điểm (Đã nhận)
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="item_top_content_order w-100 ">
          <span className="title_top_content_order">
            Thông tin xuất hóa đơn
          </span>
          {dataDetailOrder && dataDetailOrder.invoiceOrder && (
            <div className="box_item_info_top">
              <div className="item_info_top_content">
                <span className="title_top_content">Tên công ty</span>
                <span className="value_top_content">
                  {dataDetailOrder.invoiceOrder.nameCompany}
                </span>
              </div>
              <div className="item_info_top_content">
                <span className="title_top_content">Mã số thuế: </span>
                <span className="value_top_content">
                  {dataDetailOrder.invoiceOrder.taxCodeCompany}
                </span>
              </div>
              <div className="item_info_top_content">
                <span className="title_top_content">Email công ty: </span>
                <span className="value_top_content">
                  {dataDetailOrder.invoiceOrder.emailCompany}
                </span>
              </div>

              <div className="item_info_top_content">
                <span className="title_top_content">Địa chỉ công ty: </span>
                <span className="value_top_content">
                  {dataDetailOrder.invoiceOrder.addressCompany}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="middle_content_detail_order my-2">
        <span className="text_title_common mb-2">Sản phẩm</span>
        {dataDetailOrder.orderDetail &&
          dataDetailOrder.orderDetail.length > 0 &&
          dataDetailOrder.orderDetail.map((item, index) => (
            <ComponentCardItemOrder item={item} key={index} />
          ))}
      </div>

      <div className="bottom_content_detail_order mb-2">
        <div className="d-flex flex-row justify-content-end">
          <div>
            <div className="item_info_top_content d-flex justify-content-between align-items-center">
              <span className=" value_top_content">Tổng tạm tính :</span>
              <span className="title_top_content ">
                {dataDetailOrder.total_price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>

            {dataDetailOrder.shipping_method === "Nhận tại cửa hàng" ? (
              <div className="item_info_top_content d-flex justify-content-between align-items-center">
                <span className="value_top_content">Phí vận chuyển :</span>
                <span className="title_top_content">Miễn phí</span>
              </div>
            ) : dataDetailOrder.address &&
              dataDetailOrder.address.province === "Thành phố Hồ Chí Minh" ? (
              <div className="item_info_top_content d-flex justify-content-between align-items-center">
                <span className="value_top_content">Phí vận chuyển :</span>
                <span className="title_top_content">Miễn phí</span>
              </div>
            ) : (
              <div className="item_info_top_content d-flex justify-content-between align-items-center">
                <span className="value_top_content">Phí vận chuyển :</span>
                <span className="title_top_content">Liên hệ</span>
              </div>
            )}

            {dataDetailOrder.accumulatedPoints &&
              dataDetailOrder.accumulatedPoints > 0 && (
                <div className="item_info_top_content d-flex justify-content-between align-items-center">
                  <span className=" value_top_content">
                    Chiết khấu từ điểm:
                  </span>
                  <span className="title_top_content ">
                    <Tag color="geekblue">
                      {dataDetailOrder.accumulatedPoints} điểm
                    </Tag>
                    -{" "}
                    {dataDetailOrder.totalValueOfPoint.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
              )}

            {dataDetailOrder.coupon && dataDetailOrder.coupon.MaCouponDes && (
              <div className="item_info_top_content d-flex justify-content-between align-items-center">
                <span className=" value_top_content">Mã giảm giá : </span>
                <span className="title_top_content ">
                  <Tag color="geekblue">
                    {dataDetailOrder.coupon.MaCouponDes}
                  </Tag>
                  -{" "}
                  {dataDetailOrder.coupon.coupon.GiaTriCoupon.toLocaleString(
                    "vi",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}
                </span>
              </div>
            )}

            <div className="item_info_top_content d-flex justify-content-between align-items-center">
              <span className=" value_top_content">Thành tiền :</span>
              <d d-flex iv>
                <span className="value_total_money ">
                  {" "}
                  {dataDetailOrder.total_cart.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>

                <span className="text_vat">(Đã bao gồm VAT)</span>
              </d>
            </div>
          </div>
        </div>
      </div>

      <div className="middle_content_detail_order mb-3 ">
        <div className="box_method_payment">
          <span className="text_title_common">Thông tin thanh toán</span>
        </div>
        <div className="box_method_payment_2">
          <span className="">Phương thức thanh toán:</span>
          <span className="title_top_content">Thanh toán khi nhận hàng</span>
        </div>

        <ButtonRepurchase arrProduct={dataDetailOrder.orderDetail} />
      </div>
    </>
  );
};

export default ContentDetailOrder;
