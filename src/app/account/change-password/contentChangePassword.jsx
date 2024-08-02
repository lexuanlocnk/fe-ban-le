"use client";
import { Form, Input, Space } from "antd";

import SubmitButton from "../../../components/submitButton";
import { hostApi } from "../../lib/config";
import { signOut, useSession } from "next-auth/react";
import { UseAppContext } from "../../lib/appProvider";

const ContentChangePassword = ({ nameItem }) => {
  const [form] = Form.useForm();
  const { data } = useSession();
  const { openNotificationWithIcon } = UseAppContext();

  const onFinish = async (values) => {
    try {
      const response = await fetch(
        `${hostApi}/member/change-password/${data.user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const dataRes = await response.json();

      if (dataRes.status) {
        openNotificationWithIcon(
          "success",
          "Đổi mật khẩu",
          `Đổi mật khẩu thành công`
        );

        signOut({ callbackUrl: "/login" });
      } else {
        form.setFields([
          {
            name: "currentPassword",
            errors: ["Mật khẩu hiện tại không đúng!"],
          },
        ]);
      }
    } catch (error) {
      console.error("Err:", error);
    }
  };

  return (
    <div className="col-9  mt-2">
      <div className="mb-1">
        <span className="text_title_common">{nameItem}</span>
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
              name="currentPassword"
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
              name="newPassword"
              validateDebounce={1000}
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
                    if (!value || getFieldValue("newPassword") === value) {
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
  );
};

export default ContentChangePassword;
