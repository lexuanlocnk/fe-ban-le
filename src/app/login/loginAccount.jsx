import { Button, Form, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { signIn } from "next-auth/react";
import { header, hostApi } from "../lib/config";

const LoginAccount = ({}) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch(`${hostApi}/member/login`, {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      const dataRes = await response.json();

      console.log("dataRes chinh la taoa", dataRes);
      // Check if the response is valid and contains user data
      if (dataRes.status) {
        // Return user object
        await signIn("credentials", {
          callbackUrl: window.location.origin,
          id: dataRes.member.id,
          username: dataRes.member.username,
          email: dataRes.member.email,
        });
      } else {
        if (dataRes.message == "userNotExist") {
          form.setFields([
            {
              name: "username",
              errors: ["Tên tài khoản không đúng!"],
            },
          ]);
        }
        if (dataRes.message == "wrongPassword") {
          form.setFields([
            {
              name: "password",
              errors: ["Mật khẩu không đúng!"],
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Error during user information saving:", error);
      return null;
    }
  };

  return (
    <>
      <div className="text_or">
        <span>
          Sử dụng số tài khoản để Đăng nhập hoặc Đăng ký tài khoản của bạn
        </span>
      </div>

      <div className="  w-100  ">
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[
              {
                required: true,
                message: "Hãy nhập tài khoản!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" icon={<SendOutlined />} htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default LoginAccount;
