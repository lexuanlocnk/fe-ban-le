import { Tag } from "antd";

const PriceInformation = ({
  total,
  orderPoints,
  points,
  stateCheck,
  valueVoucher,
}) => {
  return (
    <div className="container_total ">
      {valueVoucher && valueVoucher?.valueVoucher && (
        <div className="box_sum_total  mt-2">
          <span className="title_points">Mã giảm giá:</span>
          <span className="points">
            <Tag color="purple">{valueVoucher.MaCouponDes}</Tag>-{" "}
            {valueVoucher?.valueVoucher.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      )}

      {stateCheck && stateCheck.useAccumulatedPoints && (
        <div className="box_sum_total  mt-1">
          <span className="title_points">Chiết khấu khi đổi điểm:</span>
          <span className="points">
            -{" "}
            {(points * 5000).toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      )}

      <div className="box_sum_total mt-2 mb-2">
        <span className="title_price">Tổng tiền:</span>
        <span className="price">
          {" "}
          {total && total > 0 ? (
            <>
              {total.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </>
          ) : (
            <>
              0<sup>đ</sup>{" "}
            </>
          )}
        </span>
      </div>
      <div className="box_sum_total custom_sum_total">
        <span className="title_points">Điểm tích lũy từ đơn hàng:</span>
        <span className="points"> {orderPoints} điểm</span>
      </div>
    </div>
  );
};

export default PriceInformation;
