import Link from "next/link";
import ComponentContentVoucherStatistics from "../../components/componentContentVoucherStatistics";

const CartStatistics = ({ total }) => {
  return (
    <>
      <ComponentContentVoucherStatistics />

      <div className="box-content-cart-statistics-price mt-2 bg-white mb-3  ">
        <div className="box_price_cart">
          <div className="text_pay mb-2">
            <span>Thanh toán</span>
          </div>
          <div className="text_pay_price">
            <div className="sum_price d-flex justify-content-between mb-1">
              <span className="text_main">Tổng tạm tính</span>
              <span>
                {" "}
                {total && total > 0 ? (
                  total?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                ) : (
                  <>
                    0<sup>đ</sup>
                  </>
                )}
              </span>
            </div>
            <div className="into money d-flex justify-content-between ">
              <span className="text_main">Thành tiền</span>
              <div className="text-end">
                <span>
                  {total && total > 0 ? (
                    total?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  ) : (
                    <>
                      0<sup>đ</sup>
                    </>
                  )}
                  <span className="text_vat">(Đã bao gồm VAT)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <Link href={"/pay"}>
          <div className="continue_pay ">
            <div className="text-center btn_continue">
              <span>Tiếp tục</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CartStatistics;
