import { Space } from "antd";
import { UseAppContext } from "../lib/appProvider";
import CardProductPay from "./cardProductPay";
import ChooseDeliveryTime from "../../components/chooseDeliveryTime";
const ReceivedStore = ({
  valueDays,
  onChangeDateTime,
  handleChangeSelectTime,
  formOrder,
  status,
}) => {
  const {
    stateCart: { stateCheckedProducts },
  } = UseAppContext();

  return (
    <Space direction="vertical" className="w-100 box_receiving_address">
      <div className="box_text_received_store">
        <span>Nhận hàng tại 245B Trần Quang Khải, phường Tân Định, quận 1</span>
      </div>
      <ChooseDeliveryTime
        textChoose={"Nhận hàng"}
        valueDays={valueDays}
        onChangeDateTime={onChangeDateTime}
        handleChangeSelectTime={handleChangeSelectTime}
      />
      {stateCheckedProducts &&
        stateCheckedProducts?.length > 0 &&
        stateCheckedProducts?.map((item, index) => (
          <CardProductPay
            formOrder={formOrder}
            status={status}
            key={index}
            item={item}
          />
        ))}
    </Space>
  );
};

export default ReceivedStore;
