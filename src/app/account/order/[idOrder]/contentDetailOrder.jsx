import ComponentCardItemOrder from "../../../../components/componentCardItemOrder";

const ContentDetailOrder = () => {
  let orderDetails = {
    customerInfo: {
      name: "Nguyễn Văn A",
      address: "40/4 Hào Nam, Phường Ô Chợ Dừa, Quận Đống Đa, TP. Hà Nội",
      phone: "0909123123",
      formReceipt: "Phí giao tiêu chuẩn",
    },
    orderInfo: {
      orderId: "123456789",
      status: "Đang xử lý",
      orderTime: "08:58:26 21/05/2024",
      deliveryMethod: "Phi giao tieu chuan",
      deliveryCost: "0 đ (Mien phi van chuyen)",
    },
    productInfo: {
      productName: "Nồi cơm điện cao tần IH Toshiba RC-18NMFVN(WT) Số lượng x1",
      productSKU: "SKU: 231103117",
      productPrice: "269.000 đ",
      quantity: "x1",
    },
    paymentInfo: {
      subtotal: "269.000 đ",
      discount: "-0 đ",
      shippingFee: "25.000 đ ",
      total: "294.000 đ",
      VATIncluded: "(Da bao gồm VAT)",
    },
    companyInvoiceInfo: {
      companyName: "Công Ty ABC",
      companyAddress: "123 Đường XYZ, Quận 1, TP. HCM",
      taxCode: "0123456789",
      emailCompany: "CongtyABC@gmail.com",
    },
    paymentMethod: "Thanh toán khi nhận hàng (COD)",
  };

  return (
    <>
      <div className="top_content_detail_order ">
        <div className="item_top_content_order w-100 ">
          <span className="title_top_content_order">Thông tin người nhận</span>
          {orderDetails && orderDetails.customerInfo && (
            <div className="box_item_info_top">
              <div className="item_info_top_content">
                <span className="title_top_content">Người nhận:</span>
                <span className="value_top_content">
                  {orderDetails.customerInfo.name}
                </span>
              </div>
              <div className="item_info_top_content">
                <span className="title_top_content">Hình thức nhận hàng:</span>
                <span className="value_top_content">
                  {orderDetails.customerInfo.formReceipt}
                </span>
              </div>
              <div className="item_info_top_content">
                <span className="title_top_content">Địa chỉ:</span>
                <span className="value_top_content">
                  {orderDetails.customerInfo.address}
                </span>
              </div>
              <div className="item_info_top_content">
                <span className="title_top_content">Điện thoại: </span>
                <span className="value_top_content">
                  {orderDetails.customerInfo.phone}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="item_top_content_order w-100 ">
          <span className="title_top_content_order">Thông tin đơn hàng</span>
          {orderDetails && orderDetails.orderInfo && (
            <div className="box_item_info_top">
              <div className="item_info_top_content">
                <span className="title_top_content">Trạng thái đơn hàng:</span>
                <span className="value_top_content">
                  {orderDetails.orderInfo.status}
                </span>
              </div>
              <div className="item_info_top_content">
                <span className="title_top_content">Thời gian tạo: </span>
                <span className="value_top_content">
                  {orderDetails.orderInfo.orderTime}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="item_top_content_order w-100 ">
          <span className="title_top_content_order">
            Thông tin xuất hóa đơn
          </span>
          {orderDetails && orderDetails.companyInvoiceInfo && (
            <div className="box_item_info_top">
              <div className="item_info_top_content">
                <span className="title_top_content">Tên công ty</span>
                <span className="value_top_content">
                  {orderDetails.companyInvoiceInfo.companyName}
                </span>
              </div>
              <div className="item_info_top_content">
                <span className="title_top_content">Mã số thuế: </span>
                <span className="value_top_content">
                  {orderDetails.companyInvoiceInfo.taxCode}
                </span>
              </div>
              <div className="item_info_top_content">
                <span className="title_top_content">Email công ty: </span>
                <span className="value_top_content">
                  {orderDetails.companyInvoiceInfo.emailCompany}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="middle_content_detail_order my-2">
        <span className="text_title_common mb-2">Sản phẩm</span>
        <ComponentCardItemOrder />
      </div>

      <div className="bottom_content_detail_order mb-2">
        {orderDetails && orderDetails.paymentInfo && (
          <div className="d-flex flex-row justify-content-end">
            <div>
              <div className="item_info_top_content d-flex justify-content-between align-items-center">
                <span className=" value_top_content">Tổng tạm tính :</span>
                <span className="title_top_content ">
                  {orderDetails.paymentInfo.total}
                </span>
              </div>
              <div className="item_info_top_content d-flex justify-content-between align-items-center">
                <span className=" value_top_content">Phí vận chuyển :</span>
                <span className="title_top_content ">
                  {orderDetails.paymentInfo.shippingFee}
                </span>
              </div>
              <div className="item_info_top_content d-flex justify-content-between align-items-center">
                <span className=" value_top_content">Giảm giá :</span>
                <span className="title_top_content ">
                  {orderDetails.paymentInfo.discount}
                </span>
              </div>
              <div className="item_info_top_content d-flex justify-content-between align-items-center">
                <span className=" value_top_content">Thành tiền :</span>
                <d d-flex iv>
                  <span className="value_total_money ">
                    {orderDetails.paymentInfo.subtotal}
                  </span>

                  <span className="text_vat">(Đã bao gồm VAT)</span>
                </d>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="middle_content_detail_order mb-3 ">
        <div className="box_method_payment">
          <span className="text_title_common">Phương thức thanh toán</span>
        </div>
        <div className="box_method_payment_2">
          <span className="">Phương thức thanh toán</span>
          <span className="title_top_content">294.000đ</span>
        </div>
        <div className="btn_repurchase">
          <span>Mua lại sản phẩm</span>
        </div>
      </div>
    </>
  );
};

export default ContentDetailOrder;
