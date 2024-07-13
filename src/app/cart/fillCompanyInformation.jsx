import { Form, Input, Space } from "antd";

const FillCompanyInformation = ({}) => {
  return (
    <Space direction="vertical" className={`w-100 box_receiving_address `}>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Hãy nhập tên công ty!",
          },
        ]}
        className="mt-3 mb-0"
        name="nameCompany"
      >
        <Input addonBefore="Tên công ty" placeholder="Tên công ty" />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Hãy nhập địa chỉ công ty!",
          },
        ]}
        className="mt-3 mb-0"
        name="addressCompany"
      >
        <Input addonBefore="Địa chỉ công ty" placeholder="Địa chỉ công ty" />
      </Form.Item>
      <Form.Item
        className="mt-3 mb-0"
        name={"emailCompany"}
        rules={[
          {
            required: true,

            type: "email",
            message: "Email chưa chính xác!",
          },
        ]}
      >
        <Input placeholder="Email công ty" addonBefore="Email công ty" />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
            message: "Hãy nhập mã số thuế!",
          },
        ]}
        className="my-3"
        name="taxCodeCompany"
      >
        <Input addonBefore="Mã số thuế" placeholder="Mã số thuế" />
      </Form.Item>
    </Space>
  );
};

export default FillCompanyInformation;
