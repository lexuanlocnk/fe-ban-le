const PriceInformation = ({ total, orderPoints, points, stateCheck }) => {
  return (
    <div className="container_total ">
      <div className="box_sum_total  mt-2">
        <span className="title_points">Khuyến mãi:</span>
        <span className="points">
          {" "}
          -89.500 <sup>đ</sup>
        </span>
      </div>

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
      <div className="box_sum_total mt-1 mb-3">
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
