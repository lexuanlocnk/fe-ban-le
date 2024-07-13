"use client";
import { Button, Form, Space } from "antd";
import InfoClientForm from "../../components/infoClientForm";
import ChooseDeliveryTime from "../../components/chooseDeliveryTime";
import { useState } from "react";
import dayjs from "dayjs";
import CardProductInstallment from "./cardProductInstallment";

const InfoClientInstallment = () => {
  const [form] = Form.useForm();

  const [valueDays, setValueDays] = useState({
    dayOfWeek: "Hôm nay",
    time: "8h00 - 12h00",
    day: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "numeric",
    }),
  });

  const onChangeDateTime = (dateString) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const selectedDate = new Date(dateString);

    form.setFieldsValue({
      ["day_receiving"]: dayjs(new Date(selectedDate)).format("DD/MM/YYYY"),
    });

    // Kiểm tra nếu ngày được chọn là hôm nay
    if (selectedDate.toDateString() === today.toDateString()) {
      setValueDays((prev) => ({
        ...prev,
        dayOfWeek: "hôm nay",
        day: today.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "numeric",
        }),
      }));
    }
    // Kiểm tra nếu ngày được chọn là ngày mai
    else if (selectedDate.toDateString() === tomorrow.toDateString()) {
      setValueDays((prev) => ({
        ...prev,
        dayOfWeek: "ngày mai",
        day: tomorrow.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "numeric",
        }),
      }));
    }
    // Ngày không phải là hôm nay hoặc ngày mai
    else {
      const dayOfWeek = selectedDate.getDay();
      const daysOfWeek = [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
      ];

      setValueDays((prev) => ({
        ...prev,
        dayOfWeek: daysOfWeek[dayOfWeek],
        day: selectedDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "numeric",
        }),
      }));
    }
  };

  const handleChangeSelectTime = (value) => {
    setValueDays((prev) => ({
      ...prev,
      time: value,
    }));
  };

  return (
    <div className="  box-content-installment-info mt-2 ">
      <span className="title_info_user">Nhập thông tin người mua</span>
      <Form form={form}>
        <InfoClientForm
          nameEmail={"email"}
          nameGender={"sex"}
          nameFull={"fullName"}
          numberPhone={"numberPhone"}
        />

        <Space className="w-100 space_installment">
          <div className="text-center">
            <span className="address_company">
              Nhận hàng tại 245B Trần Quang Khải, phường Tân Định, quận 1
            </span>
          </div>
          <ChooseDeliveryTime
            textChoose={"Nhận hàng"}
            valueDays={valueDays}
            onChangeDateTime={onChangeDateTime}
            handleChangeSelectTime={handleChangeSelectTime}
          />
          <CardProductInstallment colorBg={"bg-white"} />
        </Space>
      </Form>

      <div className="d-flex justify-content-center mt-3">
        <Button className="btn_order d-flex justify-content-center align-items-center">
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default InfoClientInstallment;
