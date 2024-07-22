import Image from "next/image";
import CardProductPayment from "./cardProductsPayment";

const InfoMethodPayment = ({ dataOrder, methodPayment }) => {
  return (
    <>
      {methodPayment == "banking" && (
        <div className="box_info_banking mt-2">
          <div className="text_item_info">
            <span className="text_title_banking">Ngân hàng:</span>
            <span className="text_value_banking">
              Ngân hàng TNHH MTV Standard Chartered Bank Việt Nam
            </span>
          </div>

          <div className="text_item_info">
            <span className="text_title_banking">Số tài khoản:</span>
            <span className="text_value_banking">99438425199</span>
          </div>

          <div className="text_item_info">
            <span className="text_title_banking">Thụ hưởng:</span>
            <span className="text_value_banking">
              CONG TY TNHH VI TINH NGUYEN KIM
            </span>
          </div>
          <div className="text_item_info">
            <span className="text_title_banking">Nội dung CK:</span>
            <div className="flex-column d-flex">
              <span className="text_value_banking">
                Mã đơn hàng - Tên khách hàng
              </span>
              <span className="example">
                VÍ DỤ: Mã đơn hàng: 123456789, Tên: Nguyễn Văn A
              </span>
            </div>
          </div>

          <div className="text_item_info">
            <span className="text_title_banking">Số tiền:</span>

            <span className="text_money_banking">
              {dataOrder?.total_cart?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <div className="image_qr_banking">
            <Image
              alt="logo_banking"
              width={200}
              height={200}
              src={"/image/icon_image/banking_logo_qr.png"}
            />
          </div>
          <div className="text_remind">
            <span>Dùng ứng dụng ngân hàng quét mã QR để chuyển khoản</span>
          </div>
        </div>
      )}
      <div className="text_delivery_time pt-2">
        <span>
          THỜI GIAN NHẬN HÀNG:{" "}
          <span className="time_ship">
            {dataOrder?.order_address?.time}{" "}
            {dataOrder?.order_address?.from_day}{" "}
          </span>
        </span>
      </div>
      {dataOrder &&
        dataOrder?.listProduct?.length > 0 &&
        dataOrder?.listProduct?.map((item, index) => (
          <CardProductPayment key={index} item={item} />
        ))}
    </>
  );
};

export default InfoMethodPayment;
