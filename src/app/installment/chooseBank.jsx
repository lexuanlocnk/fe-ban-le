"use client";

import Image from "next/image";
import { useState } from "react";
import TableInstallment from "./tableInstallment";

const ChooseBank = () => {
  const [selectedBank, setSelectedBank] = useState({
    bank: null,
    card: null,
    month: null,
  });

  const handleSelectBank = (id, name) => {
    setSelectedBank((prev) => ({
      ...prev,
      [name]: id,
    }));
  };

  const cardArray = [
    {
      id: 1,
      name: "JCB",
      pathimage: "/image/image-choose-card/jcb.png",
    },
    {
      id: 2,
      name: "Mastercard",
      pathimage: "/image/image-choose-card/mastercard.png",
    },
    {
      id: 3,
      name: "Visa",
      pathimage: "/image/image-choose-card/visa.png",
    },
  ];

  const banksArray = [
    {
      id: 1,
      name: "thương mại cổ phần Á Châu",
      pathimage: "/image/image-choose-bank/acb.png",
    },
    {
      id: 2,
      name: "TMCP Đầu tư và Phát triển Việt Nam",
      pathimage: "/image/image-choose-bank/bidv.png",
    },
    {
      id: 3,
      name: "TMCP Bản Việt ",
      pathimage: "/image/image-choose-bank/bvb.png",
    },
    {
      id: 4,
      name: "Citibank ",
      pathimage: "/image/image-choose-bank/ctb.png",
    },
    {
      id: 5,
      name: "thương mại cổ phần Xuất Nhập khẩu Việt Nam",
      pathimage: "/image/image-choose-bank/eximbank.png",
    },
    {
      id: 6,
      name: "thương mại cổ phần Phát triển Thành phố Hồ Chí Minh",
      pathimage: "/image/image-choose-bank/hdb.png",
    },
    {
      id: 7,
      name: "Hong Kong and Shanghai Banking Corporation",
      pathimage: "/image/image-choose-bank/hsbc.png",
    },
    {
      id: 8,
      name: "TMCP Kiên Long",
      pathimage: "/image/image-choose-bank/klb.png",
    },
    {
      id: 9,
      name: "Lotte Finance",
      pathimage: "/image/image-choose-bank/lotte.png",
    },
    {
      id: 10,
      name: "liên doanh Lào-Việt",
      pathimage: "/image/image-choose-bank/lvb.png",
    },
    {
      id: 11,
      name: "Thương mại Cổ phần Hàng Hải Việt Nam",
      pathimage: "/image/image-choose-bank/maritimebank.png",
    },
    {
      id: 12,
      name: "Thương mại cổ phần Quân đội",
      pathimage: "/image/image-choose-bank/mb.png",
    },
    {
      id: 13,
      name: "Công ty Tài chính TNHH MB Shinsei",
      pathimage: "/image/image-choose-bank/mcredit.png",
    },
    {
      id: 14,
      name: "TMCP Nam Á - NamABank.",
      pathimage: "/image/image-choose-bank/nab.png",
    },
    {
      id: 15,
      name: "TMCP Phương Đông – Orient Commercial Joint Stock Bank",
      pathimage: "/image/image-choose-bank/ocb.png",
    },
    {
      id: 16,
      name: "Đại Chúng Việt Nam",
      pathimage: "/image/image-choose-bank/pvcb.png",
    },
    {
      id: 17,
      name: "TMCP Sài Gòn Thương Tín",
      pathimage: "/image/image-choose-bank/sacombank.png",
    },
    {
      id: 18,
      name: "TMCP Sài gòn",
      pathimage: "/image/image-choose-bank/scb.png",
    },
    {
      id: 19,
      name: "TMCP Đông Nam Á",
      pathimage: "/image/image-choose-bank/seabank.png",
    },
    {
      id: 20,
      name: "NGÂN HÀNG SÀI GÒN - HÀ NỘI",
      pathimage: "/image/image-choose-bank/shb.png",
    },
    {
      id: 21,
      name: "TNHH Một Thành Viên Shinhan Việt Nam",
      pathimage: "/image/image-choose-bank/shinhanbank.png",
    },
    {
      id: 22,
      name: "Công Ty Tài Chính TNHH Một Thành Viên Shinhan Việt Nam",
      pathimage: "/image/image-choose-bank/svfc.png",
    },
    {
      id: 23,
      name: "TMCP Kỹ thương Việt Nam. Techcombank",
      pathimage: "/image/image-choose-bank/techcombank.png",
    },
    {
      id: 24,
      name: "Thương mại Cổ phần Tiên Phong",
      pathimage: "/image/image-choose-bank/tpb.png",
    },
    {
      id: 25,
      name: "thương mại cổ phần Ngoại thương Việt Nam",
      pathimage: "/image/image-choose-bank/vcb.png",
    },
    {
      id: 26,
      name: "Thương mại cổ phần (TMCP) Quốc Tế Việt Nam",
      pathimage: "/image/image-choose-bank/vib.png",
    },
    {
      id: 27,
      name: "TMCP Công thương Việt Nam",
      pathimage: "/image/image-choose-bank/vietinbank.png",
    },
    {
      id: 28,
      name: "TMCP Việt Nam Thịnh Vượng",
      pathimage: "/image/image-choose-bank/vpbank.png",
    },
    {
      id: 29,
      name: "TNHH MTV Woori Việt Nam",
      pathimage: "/image/image-choose-bank/wb.png",
    },
  ];

  const monthArray = [
    {
      id: 1,
      name: "Chọn 3 tháng",
    },
    {
      id: 2,
      name: "Chọn 6 tháng",
    },
    {
      id: 3,
      name: "Chọn 9 tháng",
    },
    {
      id: 4,
      name: "Chọn 12 tháng",
    },
  ];

  return (
    <div className="mt-2 row mx-0 box_choose_bank">
      <div className="col-12 d-flex justify-content-between align-items-center">
        <div className="box_title_choose_bank">
          <span className="number_progress">1</span>
          <span className="title_choose_bank">Chọn ngân hàng trả góp</span>
        </div>
        <span className="text_show_installment">
          Xem chi tiết chương trình trả góp
        </span>
      </div>
      <div className="container_choose_bank col-12 my-3">
        {banksArray &&
          banksArray?.length > 0 &&
          banksArray?.map((item, index) => (
            <div
              onClick={() => handleSelectBank(item.id, "bank")}
              className={`${
                selectedBank.bank === index + 1 ? "selected" : ""
              } d-flex justify-content-center align-items-center box_item_bank`}
              key={index + 1}
            >
              <div className="item_bank">
                <Image
                  quality={100}
                  height={50}
                  width={70}
                  sizes="100vw"
                  src={item.pathimage}
                  className=""
                />
              </div>
            </div>
          ))}
      </div>
      <div className="col-12 d-flex justify-content-between align-items-center">
        <div className="box_title_choose_bank">
          <span className="number_progress">2</span>
          <span className="title_choose_bank">Chọn loại thẻ thanh toán</span>
        </div>
      </div>
      <div className="container_choose_card col-12 my-3">
        {cardArray &&
          cardArray?.length > 0 &&
          cardArray?.map((item, index) => (
            <div
              onClick={() => handleSelectBank(item.id, "card")}
              className={`${
                selectedBank.card === index + 1 ? "selected" : ""
              } d-flex justify-content-center align-items-center box_item_bank`}
              key={index + 1}
            >
              <div className="item_bank">
                <Image
                  quality={100}
                  height={50}
                  width={70}
                  sizes="100vw"
                  src={item.pathimage}
                  className=""
                  alt={item.name}
                />
              </div>
            </div>
          ))}
      </div>

      {selectedBank && selectedBank.bank && selectedBank.card && (
        <>
          <div className="col-12 d-flex justify-content-between align-items-center">
            <div className="box_title_choose_bank">
              <span className="number_progress">3</span>
              <span className="title_choose_bank">Chọn gói trả góp</span>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-center align-items-center flex-column my-3">
            <div className="box_name_bank_choose">
              <span>Trả góp qua thẻ </span>
              <span className="text_bank_card">
                {cardArray[selectedBank?.card - 1]?.name},
              </span>
              <span>Ngân hàng</span>
              <span className="text_bank_card">
                {" "}
                {banksArray[selectedBank?.bank - 1]?.name}
              </span>
            </div>
            <TableInstallment />
            <div className="box_bank_choose_month">
              <span className="w_220px"></span>
              {monthArray &&
                monthArray?.length > 0 &&
                monthArray.map((item, index) => (
                  <span
                    onClick={() => handleSelectBank(item.id, "month")}
                    key={index}
                    className={`${
                      selectedBank.month == index + 1
                        ? "selected"
                        : "not_selected"
                    } btn_choose_month`}
                  >
                    {item.name}
                  </span>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChooseBank;
