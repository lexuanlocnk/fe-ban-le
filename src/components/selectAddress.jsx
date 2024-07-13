import { Form, Input, Select, Space } from "antd";
import Address from "../components/address";
import { useState } from "react";

const SelectAddress = ({ form }) => {
  const [address, setAddress] = useState(() => ({
    cityAddress: Address.map((city) => ({
      value: city.name,
      label: city.name,
    })),
    districtAddress: [],
    wardAddress: [],
  }));

  const handleChangeAddress = (value, type) => {
    setAddress((prev) => {
      if (type === "SelectCityAddress") {
        const foundCity = Address.find((city) => city.name === value);
        if (!foundCity) return prev;

        form?.resetFields(["wardAddress", "districtAddress"]);

        return {
          ...prev,
          citySelect: value,
          districtAddress: foundCity.districts.map((district) => ({
            value: district.name,
            label: district.name,
          })),
          wardAddress: [],
        };
      }

      if (type === "SelectDistrictAddress") {
        const foundDistrict = Address.find(
          (city) => city.name === address.citySelect
        )?.districts.find((district) => district.name === value);
        if (!foundDistrict) return prev;

        form?.resetFields(["wardAddress"]);

        return {
          ...prev,
          districtSelect: value,
          wardAddress: foundDistrict.wards.map((ward) => ({
            value: ward.name,
            label: ward.name,
          })),
        };
      }

      return prev;
    });
  };

  return (
    <>
      <Space className="w-100 space_select_address">
        <Form.Item
          className="mb-2"
          name="cityAddress"
          rules={[
            {
              required: true,
              message: "Hãy chọn thành phố!",
            },
          ]}
        >
          <Select
            onChange={(e) => handleChangeAddress(e, "SelectCityAddress")}
            placeholder="Thành Phố"
            options={address.cityAddress}
          />
        </Form.Item>
        <Form.Item
          name="districtAddress"
          className="mb-2"
          rules={[
            {
              required: true,
              message: "Hãy chọn quận/huyện!",
            },
          ]}
        >
          <Select
            onChange={(e) => handleChangeAddress(e, "SelectDistrictAddress")}
            placeholder="Quận/huyện"
            options={address.districtAddress}
          />
        </Form.Item>
      </Space>
      <Space className="w-100 space_select_address">
        <Form.Item
          className="mb-0"
          name="wardAddress"
          rules={[
            {
              required: true,
              message: "Hãy chọn phường/xã!",
            },
          ]}
        >
          <Select
            onChange={(e) => handleChangeAddress(e, "SelectWardAddress")}
            placeholder="Phường/xã"
            options={address.wardAddress}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Hãy chọn đường/số nhà!",
            },
          ]}
          className="mb-0 "
          name="streetAddress"
        >
          <Input
            className="bg-white"
            addonBefore="Đường/số nhà"
            placeholder="Đường/số nhà"
          />
        </Form.Item>
      </Space>
    </>
  );
};

export default SelectAddress;
