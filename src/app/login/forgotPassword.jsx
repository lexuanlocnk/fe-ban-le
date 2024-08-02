import { Button, Form, Input, Select, Space } from "antd";
import ComponentNumberPhoneForm from "../../components/componentNumberPhoneForm";
import { hostApi } from "../lib/config";
import { UseAppContext } from "../lib/appProvider";
import { useState } from "react";
import UpdatePassword from "./updatePassword";
const ForgotPassword = ({ setStatusAccount }) => {
  const [form] = Form.useForm();
  const { openNotificationWithIcon } = UseAppContext();
  const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${hostApi}/member/forget-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const dataRes = await response.json();

      if (dataRes.status == false) {
        openNotificationWithIcon(
          "warning",
          "Quên mật khẩu",
          `Email chưa được đăng ký tài khoản`,
          "top"
        );
      } else {
        openNotificationWithIcon(
          "success",
          "Email đã được gửi",
          `Vui lòng kiểm tra Email của bạn để nhận mã OTP.`,
          "top"
        );
        setOTP(true);
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
      {OTP ? (
        <UpdatePassword setStatusAccount={setStatusAccount} />
      ) : (
        <>
          <div className="text_or mb-2">
            <span>
              Vui lòng nhập email của tài khoản bạn muốn lấy lại mật khẩu!
            </span>
          </div>

          <div className="  w-100  ">
            <Form
              form={form}
              {...formItemLayout}
              name="forgotPassword"
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                label="Nhập mail "
                rules={[
                  {
                    type: "email",
                    message: "E-mail không đúng định dạng!",
                  },
                  {
                    required: true,
                    message: "Hãy nhập E-mail!",
                  },
                ]}
              >
                <Input placeholder={"Vui lòng nhập mail để lấy lại mật khẩu"} />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Space>
                  <Button
                    loading={loading}
                    className="btn_register_login"
                    htmlType="submit"
                    style={{ flex: 1 }}
                  >
                    Gửi OTP
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
      )}
    </>
  );
};

export default ForgotPassword;
