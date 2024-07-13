"use client";
import { Form, Input, Space } from "antd";
import Breadcrumb from "../../../components/breadcrumb";
import MenuAccount from "../menuAccount";
import SubmitButton from "../../../components/submitButton";

const ContentChangePassword = () => {
  const [form] = Form.useForm();

  const defaultMenuItem = {
    id: 2,
    name: "Đổi mật khẩu",
  };

  const onFinish = (values) => {};

  return (
    <div className="box-container-content-account">
      <div className="in-box-container-content-account pt-2">
        <div className="row box-content-account mx-0">
          <div className="col-12 ">
            <Breadcrumb nameItem={defaultMenuItem.name} />
          </div>

          <MenuAccount defaultMenuItem={defaultMenuItem} />
          <div className="col-9  mt-2">
            <div className="mb-1">
              <span className="text_title_common">{defaultMenuItem.name}</span>
            </div>
            <div className="box_change_password d-flex justify-content-center d-flex align-items-center">
              <div className="box_form_change_pass">
                <Form
                  requiredMark="optional"
                  onFinish={onFinish}
                  form={form}
                  style={{
                    minWidth: 500,
                  }}
                  layout="vertical"
                  autoComplete="off"
                >
                  <Form.Item
                    hasFeedback
                    label="Mật khẩu hiện tại"
                    name="passOld"
                    validateTrigger="onBlur"
                    rules={[
                      {
                        required: true,
                        message: "Nhập mật khẩu hiện tại",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Nhập mật khẩu hiện tại" />
                  </Form.Item>

                  <Form.Item
                    hasFeedback
                    label="Mật khẩu mới"
                    name="passNew"
                    validateDebounce={1000}
                    rules={[
                      {
                        required: true,
                        message: "Nhập mật khẩu mới",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Nhập mật khẩu mới" />
                  </Form.Item>

                  <Form.Item
                    dependencies={["passNew"]}
                    hasFeedback
                    label="Nhập lại mật khẩu mới"
                    name="enterNewPassword"
                    validateFirst
                    rules={[
                      {
                        required: true,
                        message: "Nhập lại mật khẩu mới",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("passNew") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Mật khẩu chưa trùng khớp")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="Nhập lại mật khẩu mới" />
                  </Form.Item>

                  <Form.Item className="mb-0">
                    <Space className="d-flex justify-content-center">
                      <SubmitButton form={form}>Lưu thay đổi</SubmitButton>
                    </Space>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentChangePassword;
