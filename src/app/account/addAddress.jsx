"use client";

import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Form } from "antd";
import { FaEdit } from "react-icons/fa";
import ModalAddAddress from "./modalAddAddress";
import { UseAppContext } from "../lib/appProvider";
import { hostApi } from "../lib/config";

const AddAddress = ({ dataUser }) => {
  const { openNotificationWithIcon } = UseAppContext();

  const [addressDefault, setAddressDefault] = useState();
  const [isModalOpenAddress, setIsModalOpenAddress] = useState({
    defaultAddress: true,
    isOpen: false,
  });
  const [form] = Form.useForm();

  const showModalAddress = () => {
    setIsModalOpenAddress((prev) => {
      return {
        ...prev,
        isOpen: true,
      };
    });
  };

  useEffect(() => {
    fetchAddressDefault();
  }, []);

  const fetchAddressDefault = async () => {
    try {
      const response = await fetch(
        `${hostApi}/member/show-address-member/${dataUser.user.id}/main`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("fetchAddressDefault Network response was not ok");
      }
      const data = await response.json();
      setAddressDefault(data.address);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  const handleCancelAddress = () => {
    setIsModalOpenAddress(false);
  };

  const onFinish = async (values) => {
    let address = {
      Status: values["status"],
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
        `${hostApi}/member/upload-address-member/${dataUser.user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(address),
        }
      );

      const dataRes = await response.json();

      if (dataRes.status) {
        setIsModalOpenAddress((prev) => {
          return {
            ...prev,
            isOpen: false,
          };
        });
        setAddressDefault(dataRes.address);
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

  return (
    <>
      <div className="box_add_address">
        <div className="box_title_address">
          {!addressDefault ? (
            <>
              <span className="text_title_common d-block mb-2">
                Địa chỉ mặc định
              </span>
              <p className="description_address mb-0">
                Bạn chưa có địa chỉ nhận hàng mặc định. Vui lòng chọn Thêm địa
                chỉ nhận hàng.
              </p>
            </>
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <span className="text_title_common d-block  ">
                Địa chỉ mặc định
              </span>
              <FaEdit className="icon_edit" onClick={showModalAddress} />
            </div>
          )}
        </div>
        <div className="box_address">
          {addressDefault ? (
            <div className="box_address_default">
              <div className="item_address_default">
                <span className="text_title">Tỉnh/Thành phố</span>
                <span className="text_value">{addressDefault.province}</span>
              </div>

              <div className="item_address_default">
                <span className="text_title">Quận/Huyện</span>
                <span className="text_value">{addressDefault.district}</span>
              </div>

              <div className="item_address_default">
                <span className="text_title">Phường/Xã</span>
                <span className="text_value">{addressDefault.ward}</span>
              </div>
              <div className="item_address_default">
                <span className="text_title">Số nhà/đường</span>
                <span className="text_value">{addressDefault.address}</span>
              </div>
            </div>
          ) : (
            <div
              onClick={showModalAddress}
              className="box_item_add_address mt-2"
            >
              <FiPlus />
              <span>Thêm địa chỉ nhận hàng</span>
            </div>
          )}
        </div>
      </div>

      {isModalOpenAddress.isOpen && (
        <ModalAddAddress
          form={form}
          onFinish={onFinish}
          handleCancelAddress={handleCancelAddress}
          addressDefault={addressDefault}
          isModalOpenAddress={isModalOpenAddress.isOpen}
          defaultAdd={isModalOpenAddress.defaultAddress}
        />
      )}
    </>
  );
};

export default AddAddress;
