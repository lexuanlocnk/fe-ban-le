"use client";
import { Button, DatePicker, Form, Input, Radio, Space } from "antd";
import InputNumberAntd from "../../components/inputNumberAntd";
import AddAddress from "./addAddress";
import ComponentSkeleton from "../../components/componentSkeleton";
import { useSession } from "next-auth/react";
import { UseAppContext } from "../lib/appProvider";
import { hostApi } from "../lib/config";
import dayjs from "dayjs";

const InfoAccount = ({}) => {
  const [form] = Form.useForm();
  const { data: session, status, update } = useSession();
  const { openNotificationWithIcon, setInfoUpdate } = UseAppContext();

  const onFinish = async (values) => {
    let user = {
      FullName: values["fullName"],
      Phone: values["numberPhone"],
      Gender: values["gender"],
      DateOfBirth: values["birthday"].format("DD-MM-YYYY"),
      email: values["email"],
      provider: session.user.provider,
    };

    try {
      const response = await fetch(
        `${hostApi}/member/upload-information-member/${session.user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const dataRes = await response.json();

      if (dataRes.status) {
        update();
        setInfoUpdate(dataRes.member);
        openNotificationWithIcon(
          "success",
          "Cập nhật thông tin",
          `Đã cập nhật thông tin thành công`
        );
      }
    } catch (error) {
      console.error("Err:", error);
    }
  };

  return status === "loading" ? (
    <ComponentSkeleton />
  ) : (
    <div className="item_info_account row">
      <div className="col-8 ">
        <div className="box_info_account">
          <div className="mb-1">
            <span className="text_title_common ">Thông tin tài khoản</span>
          </div>

          <div className="box_form_update_info">
            <Form
              onFinish={onFinish}
              initialValues={{
                fullName: session.user.full_name || "",
                email: session.user.email || "",
                numberPhone:
                  session.user.phone && session.user.phone !== "NULL"
                    ? session.user.phone
                    : "",
                gender: session.user
                  ? session.user.gender == "male"
                    ? "male"
                    : "female"
                  : null,
                birthday:
                  session.user && session.user.dateOfBirth
                    ? dayjs(session.user.dateOfBirth, "DD-MM-YYYY")
                    : dayjs("01-01-1990", "DD-MM-YYYY"),
              }}
              requiredMark="optional"
              form={form}
              layout="vertical"
              autoComplete="off"
            >
              <Form.Item
                name="fullName"
                label="Họ và tên"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ và tên!",
                  },
                  {
                    pattern: /^[\p{L}\s]*$/u,
                    message:
                      "Họ và tên không được chứa ký tự đặc biệt hoặc số!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email!",
                  },

                  {
                    type: "email",
                    message: "E-mail không đúng định dạng!",
                  },
                ]}
              >
                <Input
                  readOnly={
                    session.user.provider !== "google" &&
                    session.user.provider !== "facebook"
                      ? false
                      : true
                  }
                />
              </Form.Item>

              <Form.Item
                name="numberPhone"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                ]}
              >
                <InputNumberAntd />
              </Form.Item>

              <Form.Item
                name="birthday"
                label="Ngày sinh"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày sinh!",
                  },
                ]}
              >
                <DatePicker
                  disabledDate={(current) => {
                    const minDate = dayjs().subtract(100, "year");
                    const maxDate = dayjs().subtract(10, "year");
                    return current && (current < minDate || current > maxDate);
                  }}
                  className="w-100"
                  format={{
                    format: "DD-MM-YYYY",
                    type: "mask",
                  }}
                />
              </Form.Item>

              <Form.Item
                className="mb-2"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn giới tính!",
                  },
                ]}
                name="gender"
                label="Giới tính"
              >
                <Radio.Group>
                  <Radio value="male">Nam</Radio>
                  <Radio value="female">Nữ</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Space className="d-flex justify-content-center mt-3">
                  <Button
                    className="btn_order d-flex justify-content-center align-items-center"
                    onClick={() => form.submit()}
                  >
                    Cập nhật
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <div className="col-4 ">
        <AddAddress dataUser={session} />
      </div>
    </div>
  );
};

export default InfoAccount;
