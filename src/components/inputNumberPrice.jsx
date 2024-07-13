import { Input } from "antd";
import React from "react";

const InputNumberPrice = ({
  value,
  onChange,
  placeholder,
  prefix,
  size,
  addonBefore,
  addonAfter,
}) => {
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const onInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, ""); // Remove non-digit characters
    onChange(numericValue);
  };

  return (
    <Input
      size={size || ""}
      prefix={prefix || ""}
      type="text"
      placeholder={placeholder || ""}
      value={value ? formatNumber(value) : ""}
      onChange={onInputChange}
      addonBefore={addonBefore || ""}
      addonAfter={addonAfter || ""}
    />
  );
};

export default InputNumberPrice;
