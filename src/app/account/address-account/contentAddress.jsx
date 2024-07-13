"use client";
import { Form, Popconfirm, Tag } from "antd";

import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";

import ModalAddAddress from "../modalAddAddress";
import { hostApi } from "../../lib/config";
import { useSession } from "next-auth/react";
import { UseAppContext } from "../../lib/appProvider";

const ContentAddress = ({ dataAdd }) => {
  const { data } = useSession();
  const [dataAddress, setDataAddress] = useState(dataAdd);
  const [isModalOpenAddress, setIsModalOpenAddress] = useState(false);
  const [form] = Form.useForm();
  const { openNotificationWithIcon } = UseAppContext();

  const onFinish = async (values) => {
    let addressNew = {
      Status: values["addressDefault"] == true ? 1 : 0,
      Gender: values["sex"],
      FullName: values["fullName"],
      Phone: values["numberPhone"],
      Address: values["streetAddress"],
      Province: values["cityAddress"],
      District: values["districtAddress"],
      Ward: values["wardAddress"],
      Email: values["email"],
      addressId: values["id"] ? values["id"] : null,
    };

    try {
      const response = await fetch(
        `${hostApi}/member/upload-address-member/${data.user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addressNew),
        }
      );

      const dataRes = await response.json();

      if (dataRes.status) {
        setIsModalOpenAddress(false);

        setDataAddress((prev) => {
          let updatedData = prev.map((item) =>
            dataRes.address.status == 1 ? { ...item, status: 0 } : item
          );

          if (dataRes.address.id) {
            const itemIndex = updatedData.findIndex(
              (item) => item.id === dataRes.address.id
            );

            if (itemIndex !== -1) {
              updatedData[itemIndex] = {
                ...updatedData[itemIndex],
                ...dataRes.address,
              };
            } else {
              updatedData.push({
                ...dataRes.address,
              });
            }
          }

          return updatedData;
        });

        openNotificationWithIcon(
          "success",
          "Thêm địa chỉ ",
          `Đã thêm địa chỉ thành công`
        );
      }
    } catch (error) {
      console.error("Err:", error);
    }
  };

  const showModalAddress = () => {
    form.resetFields();

    setIsModalOpenAddress(true);
  };

  const handleCancelAddress = () => {
    setIsModalOpenAddress(false);
  };

  const handleEditAddress = (address) => {
    setIsModalOpenAddress(true);
    if (address) {
      form.setFieldsValue({
        ["cityAddress"]: address.province,
        ["districtAddress"]: address.district,
        ["email"]: address.email,
        ["fullName"]: address.fullName,
        ["numberPhone"]: address.Phone,
        ["sex"]: address.gender === "anh" ? "anh" : "chị",
        ["streetAddress"]: address.address,
        ["wardAddress"]: address.ward,
        ["addressDefault"]: address.status === 1 ? true : false,
        ["id"]: address.id,
      });
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const response = await fetch(
        `${hostApi}/member/delete-address-member/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataRes = await response.json();

      if (dataRes.status) {
        setDataAddress((prev) => prev.filter((item) => item.id !== id));

        openNotificationWithIcon(
          "success",
          "Xóa địa chỉ",
          `Đã xóa địa chỉ thành công`
        );
      }
    } catch (error) {
      console.error("Err:", error);
    }
  };

  return (
    <>
      <div className="col-9  mt-2">
        <div className="mb-1">
          <span className="text_title_common ">Sổ địa chỉ</span>
        </div>
        <div onClick={showModalAddress} className="btn_click_add_address">
          <FaPlus className="icon_plus" />
          <span>Thêm địa chỉ mới</span>
        </div>

        <div className="box_address mt-2">
          {dataAddress && dataAddress.length > 0 ? (
            <>
              {dataAddress.map((item, index) => (
                <div className="item_address row mx-0" key={index}>
                  <div className="col-8 box_inf_address d-flex flex-column">
                    {item && item.status == 1 ? (
                      <div className="d-flex align-items-center mb-2">
                        <span className="name_user_address me-2">
                          {item.fullName}
                        </span>
                        <Tag color="blue">Mặc định</Tag>
                      </div>
                    ) : (
                      <span className="name_user_address mb-2">
                        {item.fullName}
                      </span>
                    )}

                    <span className="inf_user_address">
                      Địa chỉ: {item.address} {item.district} {item.province}
                    </span>
                    <span className="inf_user_address">
                      Số điện thoại: {item.Phone}
                    </span>
                  </div>
                  <div className="col-4">
                    {item && item.status == 1 ? (
                      <div className="btn_address_default">
                        <span
                          onClick={() => handleEditAddress(item)}
                          className="btn_edit_address"
                        >
                          Chỉnh sửa
                        </span>
                      </div>
                    ) : (
                      <div className="btn_address">
                        <span
                          onClick={() => handleEditAddress(item)}
                          className="btn_edit_address"
                        >
                          Chỉnh sửa
                        </span>

                        <Popconfirm
                          onConfirm={() => handleRemoveItem(item.id)}
                          okText="Chắc chắn"
                          cancelText="Hủy"
                          title="Xác nhận"
                          description={"Bạn có chắc chắn muốn xóa!"}
                          icon={
                            <QuestionCircleOutlined
                              style={{
                                color: "red",
                              }}
                            />
                          }
                        >
                          <span className="btn_delete_address">Xóa</span>
                        </Popconfirm>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <ModalAddAddress
        statusAddress={"default"}
        form={form}
        onFinish={onFinish}
        handleCancelAddress={handleCancelAddress}
        isModalOpenAddress={isModalOpenAddress}
      />
    </>
  );
};

export default ContentAddress;
