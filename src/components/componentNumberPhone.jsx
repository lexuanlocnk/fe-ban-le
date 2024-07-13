"use client";
import { Input, Alert } from "antd";
import { useState } from "react";

const ComponentNumberPhone = ({
  setError,
  size,
  numberPhone,
  setNumberPhone,
  onChange
}) => {
  //   const triggerChange = (changedValue) => {
  //     onChange?.(changedValue);
  //   };

  const validatePhoneNumber = (number) => {
    // Định dạng số điện thoại chuẩn Việt Nam (bắt đầu bằng 0 và có 10 chữ số)
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(number);
  };

  const onNumberChange = (e) => {
    const newNumber = e.target.value;

    // Kiểm tra nếu chỉ chứa ký tự số và độ dài không quá 10 ký tự
    if (/^\d{0,10}$/.test(newNumber)) {
      setNumberPhone(newNumber);

      // Kiểm tra định dạng số điện thoại khi độ dài bằng 10
      if (newNumber.length === 10 && validatePhoneNumber(newNumber)) {
        setError({
          description: "",
          error: false,
        });
      } else {
        setError({
          description: "Vui lòng nhập đúng định dạng số điện thoại",
          error: true,
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
        value={numberPhone}
        onChange={onNumberChange}
      />
    </>
  );
};

export default ComponentNumberPhone;
