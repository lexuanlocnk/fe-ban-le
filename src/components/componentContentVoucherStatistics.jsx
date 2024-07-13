"use client";
import { useState } from "react";
import { GiPriceTag } from "react-icons/gi";
import ComponentModalVoucher from "./componentModalVoucher";

const ComponentContentVoucherStatistics = ({}) => {
  const [isModalVoucherOpen, setIsModalVoucherOpen] = useState(false);
  const showModal = () => {
    setIsModalVoucherOpen(true);
  };
  return (
    <>
      <div className="box-content-cart-statistics mt-2 bg-white mb-3  ">
        <div className="box_promotion">
          <span className="title_promotion">Khuyến mãi</span>
          <div onClick={showModal} className="box_text_show_code_promotion">
            <GiPriceTag />
            <span className="text_show_code_promotion ms-1">
              Chọn hoặc nhập khuyến mãi
            </span>
          </div>
        </div>
      </div>

      {isModalVoucherOpen && (
        <ComponentModalVoucher
          setIsModalVoucherOpen={setIsModalVoucherOpen}
          isModalVoucherOpen={isModalVoucherOpen}
        />
      )}
    </>
  );
};

export default ComponentContentVoucherStatistics;
