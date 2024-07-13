"use client";
import { useEffect } from "react";
import InfoClientForm from "../../components/infoClientForm";
import SelectAddress from "../../components/selectAddress";
import { Form, Input, Modal, Switch } from "antd";

const ModalAddAddress = ({
  form,
  isModalOpenAddress,
  handleCancelAddress,
  onFinish,
  addressDefault,
  statusAddress,
  defaultAdd,
}) => {
  useEffect(() => {
    if (addressDefault) {
      form.setFieldsValue({
        ["cityAddress"]: addressDefault.province,
        ["districtAddress"]: addressDefault.district,
        ["email"]: addressDefault.email,
        ["fullName"]: addressDefault.fullName,
        ["numberPhone"]: addressDefault.Phone,
        ["sex"]: addressDefault.gender,
        ["streetAddress"]: addressDefault.address,
        ["wardAddress"]: addressDefault.ward,
        ["id"]: addressDefault.id,
      });
    }

    if (defaultAdd) {
      form.setFieldsValue({
        ["status"]: 1,
      });
    }
  }, []);

  return (
    <Modal
      maskClosable={false}
      onOk={() => form.submit()}
      className="modal_add_address"
      title="Thông tin người nhận hàng"
      open={isModalOpenAddress}
      onCancel={handleCancelAddress}
      cancelText="Hủy bỏ"
      okText="Lưu địa chỉ"
    >
      <Form onFinish={onFinish} form={form} autoComplete="off">
        {defaultAdd && (
          <Form.Item name="status" className="mb-0 form_item_hidden">
            <Input type="hidden" />
          </Form.Item>
        )}

        <Form.Item name="id" className="mb-0 form_item_hidden">
          <Input type="hidden" />
        </Form.Item>
        <InfoClientForm
          nameEmail={"email"}
          nameGender={"sex"}
          nameFull={"fullName"}
          numberPhone={"numberPhone"}
        />
        <div className="box_form_item_address">
          <div className="title_address">
            <span>Địa chỉ nhận hàng</span>
          </div>
          <SelectAddress form={form} />
        </div>

        {statusAddress && statusAddress === "default" && (
          <Form.Item
            label="Địa chỉ mặc định"
            name="addressDefault"
            className="mt-2"
          >
            <Switch />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ModalAddAddress;
