import { Input } from "antd";
import { useState } from "react";

const InputNumberAntd = ({
  value,
  onChange,
  placeholder,
  prefix,
  size,
  addonBefore,
}) => {
  const [number, setNumber] = useState(value || "");

  const triggerChange = (changedValue) => {
    onChange?.(changedValue);
  };

  // const onNumberChange = (e) => {
  //   const newNumber = parseInt(e.target.value || 0, 10);

  //   if (Number.isNaN(newNumber)) {
  //     return;
  //   }
  //   setNumber(newNumber);
  //   triggerChange(newNumber);
  // };

  const onNumberChange = (e) => {
    const newNumber = e.target.value;

    // Kiểm tra nếu chỉ chứa ký tự số và độ dài không quá 10 ký tự
    if (/^\d{0,10}$/.test(newNumber)) {
      setNumber(newNumber);
      triggerChange(newNumber);
    }
  };

  return (
    <Input
      size={size || ""}
      prefix={prefix || ""}
      type="text"
      placeholder={placeholder || ""}
      value={value || number}
      onChange={onNumberChange}
      addonBefore={addonBefore || ""}
    />
  );
};

export default InputNumberAntd;
