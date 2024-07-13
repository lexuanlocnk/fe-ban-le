import { Button, Form, Input, Select, Space } from "antd";
import ComponentNumberPhoneForm from "../../components/componentNumberPhoneForm";
import { hostApi } from "../lib/config";
import { UseAppContext } from "../lib/appProvider";
import { useState } from "react";

const RegisterAccount = ({ setStatusAccount }) => {
  const [form] = Form.useForm();
  const { openNotificationWithIcon } = UseAppContext();
  const [loadingRegister, setLoadingRegister] = useState(false);

  const onFinish = async (values) => {
    setLoadingRegister(true);
    try {
      const response = await fetch(`${hostApi}/member/register`, {
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
          "Đăng ký",
          `Đăng ký tài khoản thành công`,
          "top"
        );
        setLoadingRegister(false);

        setStatusAccount(null);
      } else {
        if (dataRes.message == "existUserName") {
          form.setFields([
            {
              name: "accountName",
              errors: ["Tên tài khoản đã tồn tại!"],
            },
          ]);
        }
        if (dataRes.message == "existEmail") {
          form.setFields([
            {
              name: "email",
              errors: ["Email đã tồn tại!"],
            },
          ]);
        }
        setLoadingRegister(false);
      }

      console.log("dataRes  haha ha", dataRes);
    } catch (error) {
      console.error("Err:", error);
    } finally {
      setLoadingRegister(false);
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
      <div className="text_or mb-2">
        <span>Nhập đầy đủ thông tin để đăng kí tài khoản mua hàng!</span>
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
            name="accountName"
            label="Tên tài khoản"
            rules={[
              {
                required: true,
                message: "Hãy nhập tên tài khoản!",
              },
              {
                pattern: /^[a-zA-Z0-9]*$/,
                message: "Tên tài khoản không được chứa ký tự đặc biệt!",
              },
              {
                min: 8,
                message: "Tên tài khoản phải dài hơn 8 ký tự!",
              },
              {
                max: 30,
                message: "Tên tài khoản không được dài hơn 30 ký tự!",
              },
            ]}
          >
            <Input placeholder={"Tên tài khoản"} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
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

          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[
              {
                required: true,
                message: "Hãy nhập họ và tên!",
              },
              {
                pattern: /^[\p{L}\s]*$/u,
                message: "Họ và tên không được chứa ký tự đặc biệt hoặc số!",
              },
            ]}
          >
            <Input placeholder={"Họ và tên"} />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
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
            <Input placeholder={"E-mail"} />
          </Form.Item>

          <Form.Item
            name="numberPhone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Hãy nhập số điện thoại!",
              },
              {
                pattern: /^0\d{9}$/,
                message: "Số điện thoại không đúng định dạng!",
              },
            ]}
          >
            <ComponentNumberPhoneForm />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[
              {
                required: true,
                message: "Hãy chọn giới tính!",
              },
            ]}
          >
            <Select placeholder={"Giới tính"}>
              <Option value="anh">Anh</Option>
              <Option value="chị">Chị</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Space>
              <Button
                loading={loadingRegister}
                className="btn_register_login"
                htmlType="submit"
                style={{ flex: 1 }}
              >
                Đăng kí
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

export default RegisterAccount;
