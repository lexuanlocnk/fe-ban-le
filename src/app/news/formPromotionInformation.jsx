"use client";

import {
  UserOutlined,
  FieldNumberOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Radio, Space } from "antd";
import InputNumberAntd from "../../components/inputNumberAntd";
import { useState } from "react";

const FormPromotionInformation = () => {
  const [valueRatio, setValueRatio] = useState(1);

  const onFinish = (values) => {};
  const onChangeRatio = (e) => {
    setValueRatio(e.target.value);
  };

  return (
    <div className="row mx-0 form-promotion-infor bg-white mb-3">
      <div className="col-12 box_form-promotion-infor">
        <div className="row mx-0">
          <div className="col-12 text_form_information">
            <span>Trở thành người đầu tiên</span>
          </div>
          <div className="col-12 text_form_information">
            <span>nhận thông tin ưu đãi</span>
          </div>
          <div className="col-12 form_submit_infor mt-4">
            <Form
              name="normal_login"
              className="customer-form_promotion-infor"
              onFinish={onFinish}
            >
              <Form.Item className="mb-0" name="gender">
                <Radio.Group onChange={onChangeRatio} value={valueRatio}>
                  <Radio value="male"> Anh </Radio>
                  <Radio value="female"> Chị </Radio>
                </Radio.Group>
              </Form.Item>

              <Space
                className="space_form_information "
                style={{
                  display: "flex",
                  marginBottom: 17,
                }}
                align="baseline"
              >
                <Form.Item
                  className="mb-0"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập họ và tên!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Nhập họ và tên"
                  />
                </Form.Item>
                <Form.Item
                  className="mb-0"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập số điện thoại!",
                    },
                  ]}
                >
                  <InputNumberAntd
                    size={"large"}
                    prefix={
                      <FieldNumberOutlined className="site-form-item-icon" />
                    }
                    placeholder={"Nhập số điện thoại"}
                  />
                </Form.Item>
              </Space>

              <Form.Item
                className="mb-3"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập email",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  type="email"
                  placeholder="Nhập email"
                />
              </Form.Item>

              <Form.Item className="text-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="customer_registered"
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPromotionInformation;
