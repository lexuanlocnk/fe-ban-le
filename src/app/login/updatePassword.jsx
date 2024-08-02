import { Button, Form, Input, Space, Spin } from "antd";
import { hostApi } from "../lib/config";
import { UseAppContext } from "../lib/appProvider";
import { useState } from "react";

const UpdatePassword = ({ setStatusAccount }) => {
  const [form] = Form.useForm();
  const { openNotificationWithIcon } = UseAppContext();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${hostApi}/member/forget-password-change`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const dataRes = await response.json();

      if (dataRes.status) {
        openNotificationWithIcon(
          "success",
          "Đổi mật khẩu",
          `Đổi mật khẩu thành công`,
          "top"
        );
        setLoading(false);

        setStatusAccount(null);
      } else {
        openNotificationWithIcon(
          "error",
          "Đổi mật khẩu",
          `Đổi mật khẩu thất bại`,
          "top"
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Err:", error);
    } finally {
      setLoading(false);
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <>
      <Spin spinning={loading} fullscreen />

      <div className="text_or mb-2">
        <span>Nhập mã OTP và mật khẩu mới để lấy lại tài khoản!</span>
      </div>

      <div className="  w-100  ">
        <Form
          form={form}
          requiredMark="optional"
          {...formItemLayout}
          name="register"
          onFinish={onFinish}
        >
          <Form.Item
            hasFeedback
            name="OTP"
            label="Mã OTP"
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu!",
              },
            ]}
          >
            <Input.OTP
              placeholder={"Nhập mã OTP"}
              formatter={(str) => str.toUpperCase()}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu mới"
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu!",
              },
              {
                pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])/,
                message:
                  "Mật khẩu phải chứa ít nhất một chữ cái viết hoa và một ký tự đặc biệt!",
              },
              {
                min: 8,
                message: "Mật khẩu phải dài hơn 8 ký tự!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder={"Mật khẩu"} />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Nhập lại mật khẩu"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Hãy nhập lại mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu không trùng khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder={"Nhập lại mật khẩu"} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Space>
              <Button
                loading={loading}
                className="btn_register_login"
                htmlType="submit"
                style={{ flex: 1 }}
              >
                Đổi mật khẩu
              </Button>
              <Button
                className="back_to_login"
                onClick={() => setStatusAccount(null)}
              >
                Về trang phần đăng nhập
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UpdatePassword;
