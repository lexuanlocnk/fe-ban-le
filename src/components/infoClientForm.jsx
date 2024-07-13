"use client";
import { Form, Input, Radio, Space } from "antd";
import InputNumberAntd from "../components/inputNumberAntd";

const InfoClientForm = ({ nameEmail, nameFull, numberPhone, nameGender }) => {
  return (
    <>
      <Form.Item
        className="mb-2"
        name={nameGender}
        rules={[
          {
            required: true,
            message: "Hãy chọn giới tính!",
          },
        ]}
      >
        <Radio.Group>
          <Radio value="anh" className="position-relative">
            {" "}
            Anh
          </Radio>

          <Radio value="chị" className="position-relative">
            Chị
          </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
            message: "Hãy nhập họ và tên!",
          },
        ]}
        className="mb-2"
        name={nameFull}
      >
        <Input addonBefore="Họ và tên" placeholder="Họ và tên" />
      </Form.Item>

      <Space className="w-100 space_info_client_form">
        <Form.Item
          className="mb-3"
          name={nameEmail}
          rules={[
            {
              required: true,

              type: "email",
              message: "Email chưa chính xác!",
            },
          ]}
        >
          <Input placeholder="Email" addonBefore="Email" />
        </Form.Item>
        <Form.Item
          className="mb-3"
          rules={[
            {
              required: true,
              message: "Hãy nhập số điện thoại!",
            },
          ]}
          name={numberPhone}
        >
          <InputNumberAntd
            addonBefore="Số điện thoại"
            placeholder={"Nhập số điện thoại"}
          />
        </Form.Item>
      </Space>
    </>
  );
};

export default InfoClientForm;
