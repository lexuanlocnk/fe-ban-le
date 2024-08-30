"use client";

import { Button, Input, Modal, Tag } from "antd";
import { useEffect, useState } from "react";
import { FiGift } from "react-icons/fi";
import { hostApi } from "../app/lib/config";
import dayjs from "dayjs";
import { UseAppContext } from "../app/lib/appProvider";

const ComponentModalVoucher = ({
  isModalVoucherOpen,
  setIsModalVoucherOpen,
}) => {
  const [voucherDiscount, setVoucherDiscount] = useState();
  const {
    stateCart: { stateCheckedProducts, valueVoucher },
    dispatch,
  } = UseAppContext();
  const fetchDataVoucher = async () => {
    try {
      const response = await fetch(`${hostApi}/member/coupon`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setVoucherDiscount(data.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchDataVoucher();
  }, []);

  const HandleApply = () => <span className="cursor-pointer">Áp dụng</span>;

  const handleCancel = () => {
    setIsModalVoucherOpen(false);
  };

  return (
    <Modal
      title="Chọn mã giảm giá"
      open={isModalVoucherOpen}
      cancelText="Trở lại"
      okText="Xác nhận"
      footer={
        <Button onClick={() => setIsModalVoucherOpen(false)}>Đóng</Button>
      }
      className="modal_voucher"
      onCancel={handleCancel}
    >
      <div className="row w-100 mx-0">
        <div className="col-12 px-0 d-flex align-items-center box_voucher_code_search">
          <span className="mr-2 text-nowrap code-sale">Mã giảm</span>
          <Input
            addonAfter={<HandleApply />}
            placeholder="Mã giảm giá"
            allowClear
          />
        </div>
        {voucherDiscount && voucherDiscount.length > 0 && (
          <div className="col-12 px-0 mt-2 box-voucher custom_scroll">
            {voucherDiscount
              .map((item) => {
                const voucherInfo = stateCheckedProducts.some(
                  (itemCheckedProduct) =>
                    item.categoryName.includes(itemCheckedProduct.Category)
                )
                  ? {
                      statusVoucher: true,
                      codeVoucher: item.MaPhatHanh,
                    }
                  : {
                      statusVoucher: false,
                      codeVoucher: item.MaPhatHanh,
                    };

                const hasValueVoucher = item.dataCouponDesc.some(
                  (itemVoucher) =>
                    valueVoucher?.MaCouponDes === itemVoucher.MaCouponDes
                );

                return {
                  ...item,
                  voucherInfo,
                  hasValueVoucher,
                };
              })
              .sort((a, b) => {
                // Move items with statusVoucher === false to the end
                if (
                  !a.voucherInfo.statusVoucher &&
                  b.voucherInfo.statusVoucher
                ) {
                  return 1;
                }
                if (
                  a.voucherInfo.statusVoucher &&
                  !b.voucherInfo.statusVoucher
                ) {
                  return -1;
                }

                // Move items with valueVoucher?.MaCouponDes === itemVoucher.MaCouponDes to the front
                if (a.hasValueVoucher && !b.hasValueVoucher) {
                  return -1;
                }
                if (!a.hasValueVoucher && b.hasValueVoucher) {
                  return 1;
                }

                return 0;
              })
              .map((item) => (
                <div key={item.id} className="box_type_voucher">
                  <span className="name_type_voucher">{item.TenCoupon}</span>

                  {item?.dataCouponDesc &&
                    item?.dataCouponDesc.map((itemVoucher, index) => {
                      const customItemVoucher = {
                        releaseCode: item.MaPhatHanh,
                        valueVoucher: item.GiaTriCoupon,
                        valueVoucherOld: valueVoucher?.valueVoucher || 0,
                        status: "add",

                        ...itemVoucher,
                      };

                      const handleClick = () => {
                        if (item.voucherInfo?.statusVoucher) {
                          dispatch({
                            type: "ADD_VOUCHER",
                            payload: customItemVoucher,
                          });

                          // Sort the clicked item voucher to the top
                          voucherDiscount.sort((a, b) => {
                            if (
                              a.dataCouponDesc.some(
                                (v) => v.MaCouponDes === itemVoucher.MaCouponDes
                              )
                            ) {
                              return -1;
                            }
                            if (
                              b.dataCouponDesc.some(
                                (v) => v.MaCouponDes === itemVoucher.MaCouponDes
                              )
                            ) {
                              return 1;
                            }
                            return 0;
                          });
                        }
                        if (
                          valueVoucher?.MaCouponDes === itemVoucher.MaCouponDes
                        ) {
                          dispatch({
                            type: "ADD_VOUCHER",
                            payload: {
                              valueVoucherOld: item.GiaTriCoupon || 0,
                              status: "remove",
                            },
                          });
                        }
                      };

                      return (
                        <div
                          onClick={handleClick}
                          key={index}
                          className={`row mx-0 mt-2 item-voucher cursor-pointer ${
                            item.voucherInfo?.statusVoucher
                              ? valueVoucher?.MaCouponDes ===
                                itemVoucher.MaCouponDes
                                ? "active_voucher"
                                : ""
                              : "disabled_item-voucher"
                          }`}
                        >
                          <div className="col-2 box-img-voucher">
                            <FiGift className="icon_voucher" />
                          </div>
                          <div className="col-10 d-flex justify-content-between align-items-center box_voucher_info">
                            <div>
                              <div className="name_voucher">
                                <Tag color="geekblue">
                                  {itemVoucher.MaCouponDes}
                                </Tag>
                                <p>
                                  {item.GiaTriCoupon.toLocaleString("vi", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </p>
                              </div>
                              <div className="text-voucher">
                                Đơn tối thiểu:{" "}
                                {item.DonHangChapNhanTu.toLocaleString("vi", {
                                  style: "currency",
                                  currency: "VND",
                                })}{" "}
                              </div>
                              <div className="text-voucher">
                                HSD:{" "}
                                {dayjs
                                  .unix(item.EndCouponDate)
                                  .format("DD/MM/YYYY")}
                              </div>
                            </div>
                            <div className="btn_choose">
                              {valueVoucher?.MaCouponDes ===
                              itemVoucher.MaCouponDes ? (
                                <div className="box_choose">
                                  <span className="text_choose_voucher">
                                    Bỏ chọn
                                  </span>
                                </div>
                              ) : (
                                <div className="box_choose">
                                  {" "}
                                  <span className="text_choose_voucher">
                                    Chọn
                                  </span>{" "}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ComponentModalVoucher;
