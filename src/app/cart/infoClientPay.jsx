"use client";
import { useCallback, useEffect, useState } from "react";
import { Form, Input, Radio, Checkbox, Space, Slider } from "antd";
import InfoClientForm from "../../components/infoClientForm";
import ReceivingAddress from "./receivingAddress";
import ReceivedStore from "./receivedStore";
import FillCompanyInformation from "./fillCompanyInformation";
import ComponentModalVoucher from "../../components/componentModalVoucher";
import { GiTicket } from "react-icons/gi";
import dayjs from "dayjs";
import { useDebouncedCallback } from "use-debounce";
import { hostApi } from "../lib/config";
import ModalSelectAddress from "./modalSelectAddress";
import { Spin } from "antd";

const InfoClientPay = ({
  formOrder,
  onFinish,
  stateCheckedProducts,
  totalPoints,
  stateCheck,
  setStateCheck,
  points,
  setPoints,
  status,
  dataUser,
}) => {
  const formatter = (value) => `${value} điểm`;

  const [dataAddress, setDataAddress] = useState([]);
  const [addressSelected, setAddressSelected] = useState();

  const fetchAddressUser = useCallback(async () => {
    try {
      const response = await fetch(
        `${hostApi}/member/show-address-member/${dataUser.id}/all`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setDataAddress(data.address);
      setAddressSelected(() => {
        const addressActive = data.address.find((item) => item.status == 1);
        return addressActive;
      });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      fetchAddressUser();
    }
  }, [status]);

  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);

  const showModalAddress = () => {
    setIsModalAddressOpen(true);
  };

  const handleCancel = () => {
    setIsModalAddressOpen(false);
  };

  const marks = {
    0: "0 điểm",

    [totalPoints.toString()]: {
      style: {
        color: "#f50",
      },
      label: <strong>{totalPoints} điểm</strong>,
    },
  };
  const [showModalVoucher, setShowModalVoucher] = useState(false);
  const [checkReceivingAddress, setCheckReceivingAddress] = useState({
    ship: false,
    pickUpStore: false,
  });
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

    formOrder.setFieldsValue({
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

  const handleCheck = (e, nameCheck) => {
    if (nameCheck === "useAccumulatedPoints") {
      setPoints(e.target.checked ? 50 : 0);
      formOrder.setFieldsValue({
        accumulatedPoints: e.target.checked ? 50 : 0,
      });
    }
    if (nameCheck === "billCompany") {
      formOrder.setFieldsValue({
        companyInvoice: e.target.checked,
      });
    }

    if (nameCheck === "userManual") {
      formOrder.setFieldsValue({
        userManual: e.target.checked,
      });
    }

    setStateCheck((prev) => ({
      ...prev,
      [nameCheck]: e.target.checked,
    }));
  };
  const handleChangeSelectTime = (value) => {
    setValueDays((prev) => ({
      ...prev,
      time: value,
    }));
  };

  const onChangeCheckReceiving = (e) => {
    setCheckReceivingAddress((prev) => {
      return {
        ...prev,
        ship: e.target.value === "ship",
        pickUpStore: e.target.value === "pickUpStore",
      };
    });
  };
  const showModal = () => {
    setShowModalVoucher(true);
  };

  useEffect(() => {
    if (addressSelected) {
      formOrder.setFieldsValue({
        email: addressSelected?.email || "",
        fullName: addressSelected?.fullName || "",
        numberPhone:
          addressSelected?.Phone && addressSelected?.Phone !== "NULL"
            ? addressSelected?.Phone
            : "",
        sex: addressSelected?.gender
          ? addressSelected?.gender === "anh"
            ? "anh"
            : "chị"
          : "",
        cityAddress: addressSelected?.province || "",
        districtAddress: addressSelected?.district || "",
        wardAddress: addressSelected?.ward || "",
        streetAddress: addressSelected?.address || "",
      });
    }
  }, [addressSelected]);

  const handSliderUsePoint = useDebouncedCallback((value) => {
    setPoints(value);
    formOrder.setFieldsValue({ accumulatedPoints: value });
  }, 700);

  const initialValues = {
    shippingMethod: "pickUpStore",
    day_receiving: dayjs(new Date()).format("DD/MM/YYYY"),
    time_address: "Buổi sáng: 8h00 - 12h00",
    email:
      addressSelected && addressSelected.email ? addressSelected?.email : "",
    fullName: addressSelected?.fullName || "",
    numberPhone:
      addressSelected?.Phone && addressSelected?.Phone !== "NULL"
        ? addressSelected?.Phone
        : "",
    sex: addressSelected?.gender
      ? addressSelected?.gender === "anh"
        ? "anh"
        : "chị"
      : "",
    cityAddress:
      addressSelected && addressSelected.province && addressSelected.province,
    districtAddress:
      addressSelected && addressSelected?.district && addressSelected?.district,
    wardAddress:
      addressSelected && addressSelected?.ward && addressSelected?.ward,
    streetAddress: addressSelected?.address || "",
    dataOrder: [],
    companyInvoice: false,
    accumulatedPoints: 0,
  };

  const renderForm = () => (
    <Form
      initialValues={initialValues}
      form={formOrder}
      name="horizontal_login"
      onFinish={onFinish}
    >
      {stateCheckedProducts && stateCheckedProducts?.length > 0 && (
        <Form.Item name="dataOrder" style={{ display: "none" }}>
          <Input type="text" />
        </Form.Item>
      )}
      <InfoClientForm
        nameEmail={"email"}
        nameGender={"sex"}
        nameFull={"fullName"}
        numberPhone={"numberPhone"}
      />
      <div className="text_info_client">
        <span>CHỌN CÁCH THỨC NHẬN HÀNG</span>
      </div>
      <Form.Item
        className="mb-2"
        name="shippingMethod"
        rules={[
          {
            required: true,
            message: "Hãy chọn cách thức nhận hàng!",
          },
        ]}
      >
        <Radio.Group onChange={onChangeCheckReceiving}>
          <Radio value="ship" className="position-relative">
            <span
              className={checkReceivingAddress.ship ? "current_selected" : ""}
            >
              {" "}
              Giao tận nơi
            </span>
          </Radio>
          <Radio value="pickUpStore" className="position-relative">
            <span
              className={
                checkReceivingAddress.pickUpStore ? "current_selected" : ""
              }
            >
              Nhận tại cửa hàng
            </span>
          </Radio>
        </Radio.Group>
      </Form.Item>
      {checkReceivingAddress.ship ? (
        <ReceivingAddress
          status={status}
          formOrder={formOrder}
          valueDays={valueDays}
          onChangeDateTime={onChangeDateTime}
          handleChangeSelectTime={handleChangeSelectTime}
        />
      ) : (
        <ReceivedStore
          status={status}
          formOrder={formOrder}
          valueDays={valueDays}
          onChangeDateTime={onChangeDateTime}
          handleChangeSelectTime={handleChangeSelectTime}
        />
      )}

      <Form.Item className="mt-3 mb-2" name="otherRequirement">
        <Input
          addonBefore="Yêu cầu khác"
          placeholder="Yêu cầu khác (không bắt buộc)"
        />
      </Form.Item>

      {checkReceivingAddress.ship && (
        <Form.Item
          onChange={(e) => handleCheck(e, "userManual")}
          className="mt-0 mb-0"
          name="userManual"
        >
          <Checkbox> Hướng dẫn sử dụng, giải đáp thắc mắc sản phẩm</Checkbox>
        </Form.Item>
      )}

      {status === "authenticated" && (
        <Space
          align="center"
          className="w-100 space_accumulated_points"
          size={"large"}
        >
          <Form.Item className="mt-0 mb-0" name="accumulatedPoints">
            <Checkbox onChange={(e) => handleCheck(e, "useAccumulatedPoints")}>
              {stateCheck && stateCheck.useAccumulatedPoints
                ? `Sử dụng ${points} điểm tích lũy`
                : "Sử dụng điểm tích lũy"}
            </Checkbox>
          </Form.Item>

          {stateCheck && stateCheck.useAccumulatedPoints && (
            <Form.Item className="mt-0 mb-2 " name="accumulatedPoints">
              <Slider
                marks={marks}
                step={50}
                tooltip={{
                  formatter,
                }}
                className="mb-0"
                onChange={handSliderUsePoint}
                min={50}
                max={totalPoints}
              />
            </Form.Item>
          )}
        </Space>
      )}

      <Form.Item className="mt-0 mb-2" name="companyInvoice">
        <Checkbox onChange={(e) => handleCheck(e, "billCompany")}>
          <span className={stateCheck.billCompany ? "current_selected_2" : ""}>
            {" "}
            Xuất hóa đơn
          </span>
        </Checkbox>
      </Form.Item>
      {stateCheck.billCompany && <FillCompanyInformation />}
      {stateCheckedProducts.length > 0 && (
        <div className="text_voucher">
          <GiTicket />
          <span onClick={showModal}>Chọn hoặc nhập mã khuyến mãi</span>
        </div>
      )}

      <ComponentModalVoucher
        setIsModalVoucherOpen={setShowModalVoucher}
        isModalVoucherOpen={showModalVoucher}
      />
    </Form>
  );

  return (
    <div className="box_info_client ">
      <div className="text_info_client">
        <span>THÔNG TIN KHÁCH HÀNG</span>
      </div>

      {status == "authenticated" && (
        <div>
          <span className="select_address" onClick={showModalAddress}>
            Chọn địa chỉ
          </span>
        </div>
      )}

      {status == "loading" ? (
        <div className="box_loading_cart">
          <Spin size="large" />
        </div>
      ) : status === "authenticated" && addressSelected ? (
        renderForm()
      ) : (
        renderForm()
      )}
      {isModalAddressOpen && (
        <ModalSelectAddress
          setAddressSelected={setAddressSelected}
          addressSelected={addressSelected}
          dataAddress={dataAddress}
          handleCancel={handleCancel}
          isModalAddressOpen={isModalAddressOpen}
        />
      )}
    </div>
  );
};

export default InfoClientPay;
