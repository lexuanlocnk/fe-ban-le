"use client";
import { Input } from "antd";
import { useState } from "react";

const ComponentNumberPhoneForm = ({ size, value = "", onChange }) => {
  const [error, setError] = useState({ description: "", error: false });

  const validatePhoneNumber = (number) => {
    // Định dạng số điện thoại chuẩn Việt Nam (bắt đầu bằng 0 và có 10 chữ số)
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(number);
  };

  const onNumberChange = (e) => {
    const newNumber = e.target.value;

    // Kiểm tra nếu chỉ chứa ký tự số và độ dài không quá 10 ký tự
    if (/^\d{0,10}$/.test(newNumber)) {
      onChange?.(newNumber);

      // Kiểm tra định dạng số điện thoại khi độ dài bằng 10
      if (newNumber.length === 10 && validatePhoneNumber(newNumber)) {
        setError({
          description: "",
          error: false,
        });
      }
    }
  };

  return (
    <>
      <Input
        size={size}
        type="text"
        placeholder={"Nhập số điện thoại !"}
        value={value}
        onChange={onNumberChange}
      />
    </>
  );
};

export default ComponentNumberPhoneForm;
