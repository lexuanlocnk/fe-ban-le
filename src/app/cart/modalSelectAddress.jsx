"use client";
import { Modal } from "antd";
import Link from "next/link";
import { useState } from "react";

const ModalSelectAddress = ({
  isModalAddressOpen,
  handleCancel,
  dataAddress,
  addressSelected,
  setAddressSelected,
}) => {
  const [active, setActive] = useState(addressSelected?.id);

  return (
    <Modal
      footer={null}
      title="Chọn địa chỉ"
      open={isModalAddressOpen}
      onCancel={handleCancel}
    >
      <div className="box_all_address">
        {dataAddress && dataAddress.length > 0 ? (
          <div>
            {dataAddress.map((item, index) => (
              <div
                onClick={() => setActive(item.id)}
                className={`address-card ${
                  active === item.id ? "selected_address" : ""
                }`}
                key={index}
              >
                <div className="address-card-info">
                  <h6>
                    {item.fullName}{" "}
                    {item.status === 1 && (
                      <span className="address-card-default-badge">
                        Mặc định
                      </span>
                    )}
                  </h6>
                  <p>
                    Địa chỉ: {item.address} {item.district}, {item.province}
                  </p>
                  <p>Số điện thoại: {item.Phone}</p>
                </div>
                <button
                  className="address-card-select-button"
                  onClick={() => {
                    setAddressSelected(item);
                    handleCancel();
                  }}
                >
                  Chọn
                </button>
              </div>
            ))}
            <Link className="btn_add_address" href={"/account/address-account"}>
              Thêm địa chỉ mới
            </Link>
          </div>
        ) : (
          <div className="box_empty_address">
            Chưa có địa chỉ được thêm:{" "}
            <Link className="btn_add_address" href={"/account/address-account"}>
              Thêm địa chỉ tại đây
            </Link>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalSelectAddress;
