"use client";
import { Button, Form, Input, Modal, Space } from "antd";
import { SendOutlined } from "@ant-design/icons";
import ComponentNumberPhoneForm from "../../../components/componentNumberPhoneForm";

const ModalInfoComment = ({
  isModalOpen,
  setIsModalOpen,
  handleSubmitComment,
  form,
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    handleSubmitComment(values);
  };

  return (
    <Modal
      title={"Thông tin bình luận"}
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        onFinish={onFinish}
        requiredMark="optional"
        name="nest-messages"
      >
        <Space className="w-100 space_select_address">
          <Form.Item
            name="fullName"
            rules={[
              {
                required: true,
                message: "Hãy nhập họ và tên!",
              },
            ]}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>
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
            <Input placeholder="email" />
          </Form.Item>
        </Space>

        <Space className="w-100 space_select_address">
          <Form.Item
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
            name={"numberPhone"}
          >
            <ComponentNumberPhoneForm />
          </Form.Item>

          <Form.Item>
            <Button
              className="btn_submit_comment"
              type="primary"
              htmlType="submit"
            >
              <span>Gửi</span>
              <SendOutlined className="ms-1" />
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default ModalInfoComment;
