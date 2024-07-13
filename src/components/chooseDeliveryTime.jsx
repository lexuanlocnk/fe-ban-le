import { ConfigProvider, DatePicker, Form, Space, Select } from "antd";
import locale from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";

dayjs.locale("vi");

const ChooseDeliveryTime = ({
  valueDays,
  handleChangeSelectTime,
  onChangeDateTime,
  textChoose,
}) => {
  const dateFormat = "YYYY-MM-DD";

  return (
    <>
      <div className="box_title_receiving">
        <span>
          {textChoose} từ {valueDays.time} {valueDays.dayOfWeek} (
          {valueDays.day})
        </span>
      </div>
      <Space className="products_receiving w-100">
        <Form.Item
          className="mb-0"
          name="day_receiving"
          rules={[
            {
              required: false,
              message: "Hãy chọn ngày nhận hàng!",
            },
          ]}
        >
          <ConfigProvider locale={locale}>
            <DatePicker
              onChange={onChangeDateTime}
              className="custom_date_picker w-100"
              defaultValue={dayjs(new Date())}
              format={"MM/DD/YYYY"}
              minDate={dayjs(
                new Date(new Date().setDate(new Date().getDate()))
                  .toISOString()
                  .slice(0, 10),
                dateFormat
              )}
              maxDate={dayjs(
                new Date(new Date().setDate(new Date().getDate() + 10))
                  .toISOString()
                  .slice(0, 10),
                dateFormat
              )}
            />
          </ConfigProvider>
        </Form.Item>
        <Form.Item
          className="mb-0"
          name="time_address"
          rules={[
            {
              required: true,
              message: "Hãy chọn giờ nhận hàng!",
            },
          ]}
        >
          <Select
            onChange={handleChangeSelectTime}
            placeholder="Chọn thời gian giao hàng"
            options={[
              {
                value: "8h00 -12h00",
                label: "Buổi sáng: 8h00 -12h00",
              },
              {
                value: "12h00 - 18h00",
                label: "Buổi trưa: 12h00 - 18h00",
              },
              {
                value: "18h00 - 21h00",
                label: "Buổi tối: 18h00 - 21h00",
              },
              {
                value: "Cả ngày",
                label: "Cả ngày",
              },
            ]}
          />
        </Form.Item>
      </Space>
    </>
  );
};

export default ChooseDeliveryTime;
