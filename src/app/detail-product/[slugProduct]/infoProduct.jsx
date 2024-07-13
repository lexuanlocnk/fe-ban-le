"use client";

import { Image as ImageAntd } from "antd";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import Breadcrumb from "../../../components/breadcrumb";
import { hostImage } from "../../lib/config";
import CompareProducts from "./compareProducts";
import { scrollToElement } from "../../lib/functions";
import { useSession } from "next-auth/react";
import { memo, useEffect, useState } from "react";
import { Modal } from "antd";
import { UseAppContext } from "../../lib/appProvider";

const InfoProduct = ({ dataProduct, dataProductsCompare }) => {
  const { status } = useSession();
  const [elementBoxDescription, setElementBoxDescription] = useState(null);
  const [checkShowInfo, setCheckShowInfo] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const { handleAddProductViewed } = UseAppContext();

  const handleShowHide = (status) => {
    setCheckShowInfo(!checkShowInfo);

    if (status === "hide") {
      scrollToElement(elementBoxDescription);
    }
  };

  const handleCancel = () => {
    setModalDetail(false);
  };

  useEffect(() => {
    const element = document?.getElementById("box_description-much");
    setElementBoxDescription(element);
  }, []);

  useEffect(() => {
    handleAddProductViewed(dataProduct);
  }, []);

  return (
    <>
      <div className="row container-content-detail-product ">
        <div className="my-2">
          <Breadcrumb nameItem={dataProduct.ProductName} />
        </div>

        <div className="col-md-4 col-12  img-product-detail  bg-white ">
          <div className="row mx-0">
            <div className="box-img-product-detail  overflow-hidden col-12 mb-2">
              <ImageAntd
                className="h-100 w-100 avatar-product "
                src={hostImage + dataProduct.Image}
              />
            </div>
            <div className="col-12 mt-1">
              <span className="text-technical-specifications">
                Thông số kĩ thuật
              </span>
              {dataProduct &&
                dataProduct.parameter &&
                dataProduct.parameter.length > 0 &&
                dataProduct.parameter.slice(0, 7).map((item, index) => {
                  return (
                    <span
                      key={index}
                      className="d-block text-infor-product my-1"
                    >
                      <strong className="me-1">{item.catOption}:</strong>{" "}
                      {item.nameCatOption || "Chưa cập nhật"}
                    </span>
                  );
                })}
              <span
                onClick={() => setModalDetail(true)}
                className="see-detail d-block text-center"
              >
                Xem chi tiết sản phẩm
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-5 col-12 infor-product-detail  ">
          <div className="product-detail bg-white h-100">
            <div className="mx-0 p-2 row list-thumbnail-info">
              <ImageAntd.PreviewGroup>
                {dataProduct &&
                  dataProduct.listPictures.length > 0 &&
                  dataProduct.listPictures.map((item, index) => (
                    <div
                      className={
                        "col-4 p-1   overflow-hidden" +
                        (index + 1 > 6 ? " d-none" : "")
                      }
                      key={index}
                    >
                      <div className="box-image-thumbnail-product">
                        <div className="  p-2 box-border-img-thumbnail ">
                          <ImageAntd
                            className={"img-thumbnail-product "}
                            src={hostImage + item.picture}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </ImageAntd.PreviewGroup>

              <div className="col-12">
                <span className="sum-img-thumbnail">Thương hiệu:</span>
                <span className="text_brand">{dataProduct.brandName}</span>
              </div>
              <div className="col-12">
                <span className="sum-img-thumbnail">hình ảnh :</span>
                <span className="text_brand">
                  {dataProduct.listPictures.length}
                </span>
              </div>
            </div>
            <div className=" mx-2 pb-2 border-bottom"></div>
            {/*
          
          Khuyến mãi
          
          {inforPromotion &&
                !dayjs().isAfter(dayjs(inforPromotion.endDate)) &&
                dayjs(inforPromotion.startDate).isBefore(dayjs()) && (
                  <div className="row mx-0 mt-2">
                    <div className="col-12 pt-4 ">
                      <div className="box_info_promotion">
                        <span>
                          - Balo thời trang + Chuột Không Dây + Bàn di chuột
                        </span>
                        <span>
                          - Giảm thêm 500.000Đ khi mua cùng Màn Hình di động LG
                          Gram View 16MR70.ASDA5 (Hàng nhập KM) trị giá
                          5.690.000Đ
                        </span>
                        <span>
                          - Hỗ trợ miễn phí cài đặt phần mềm + vệ sinh máy trọn
                          đời tại QUANGBAO
                        </span>
                        <div className="text_title_box">
                          <Image
                            src={"/image/icon_image/gift-box.png"}
                            width={35}
                            height={35}
                            alt="icon_box_gift"
                          />
                          <p className="mb-0">Quà tặng/khuyến mãi</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}

            <div className="row mx-0">
              <div className="col-12 p-3 ">
                <span className="text-technical-specifications d-block ">
                  {" "}
                  Sơ lược sản phẩm
                </span>

                {dataProduct.DesShort ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: dataProduct.DesShort }}
                  />
                ) : (
                  <span className="text_summary">
                    Không có sơ lược sản phẩm
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-12 buy-product-detail py-3 px-1">
          <div className="row infor-store mx-1 pb-1">
            <div className="col-12 px-0">
              <div className="name-store ">
                <span>{dataProduct.ProductName}</span>
              </div>
            </div>
          </div>
          <div className="row mx-1 pt-0">
            <div className="col-12 px-0  "></div>

            {/* <div className="col-12 mt-2 text-center text-demand">
                <strong>Nhu cầu: </strong>
                Gamming
              </div> */}
            {/* {softwareSupport && softwareSupport.length > 0 && (
                <div className="col-12 pt-1">
                  <span className="text-supporting-software">
                    Các phần mềm hổ trợ
                  </span>
                  <div className="supporting-software pt-1">
                    <Swiper
                      modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                      spaceBetween={10}
                      slidesPerView={3}
                      loop={true}
                      autoplay={{ delay: 1500 }}
                    >
                      {softwareSupport &&
                        softwareSupport.length > 0 &&
                        softwareSupport.map((item, index) => (
                          <SwiperSlide
                            onClick={() =>
                              handleOpenPopupSupportingSoftware(item)
                            }
                            className="overflow-hidden image is-2by1 custom-swiper "
                            key={index}
                          >
                            <Tooltip
                              placement="bottomRight"
                              color={"#2db7f5"}
                              title={"Cấu hình tối thiểu: " + index + "000"}
                            >
                              <Image
                                quality={100}
                                height={0}
                                width={0}
                                sizes="100vw"
                                className="w-100 h-100 img-custom-swiper"
                                src={item}
                                alt="Các phần mềm hổ trợ"
                              />
                            </Tooltip>
                          </SwiperSlide>
                        ))}
                    </Swiper>{" "}
                  </div>
                </div>
              )} */}

            <div className="col-12 ">
              <div className="mt-3 value-count">
                <span>Chính sách bán hàng</span>
              </div>
              <div className="box_text_commit">
                <IoShieldCheckmarkOutline />
                <span>Cam kết chính hãng 100%</span>
              </div>
            </div>

            <div className="col-12 mb-1">
              <div className="mt-3 value-price">
                <span>Giá sản phẩm:</span>
              </div>
              <div className="mt-1 value-price">
                <span className="price_detail_product">
                  {status === "unauthenticated"
                    ? // Đoạn mã khi không xác thực
                      dataProduct.Price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })
                    : // Đoạn mã khi đã xác thực
                    status === "loading"
                    ? "Đang cập nhật"
                    : dataProduct.PriceOld.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                </span>
              </div>
            </div>

            {/* <div className="box-technical-specifications col-12 mb-1">
                <div className="product_related_news">
                  <div className="text_product_related_news">
                    {dataMarquee &&
                      dataMarquee.length > 0 &&
                      dataMarquee.map((item, index) => (
                        <div
                          key={index}
                          className="row   mx-0 box_product_related mb-3"
                        >
                          <div className="col-4 image is-1by1-custom mx-0">
                            <Image
                              quality={75}
                              height={0}
                              width={0}
                              sizes="100vw"
                              src={item.url}
                              className="w-100 h-100"
                              alt="image"
                            />
                          </div>
                          <div className="col-8 d-flex align-items-center mx-0 px-1">
                            <span
                              title={item.content}
                              className="text_genaral_three_line"
                            >
                              {item.content}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div> */}
          </div>
          <div className="row pt-2 mx-1">
            <div className="col-12 btn-buy-product bg-danger">Mua ngay</div>
            <div className="col-12 btn-buy-product bg-warning">
              Thêm vào giỏ hàng
            </div>
            <div className="col-12 btn-buy-product bg-primary">So sánh</div>
          </div>
        </div>
      </div>

      <div className="row box-description-much pb-3">
        <div className="col-12 description-much bg-white my-2 p-3">
          <div
            id="box_description-much"
            className={`${checkShowInfo ? "" : "box_description-much_hide"}  `}
          >
            {dataProduct && dataProduct.productDescription && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataProduct.productDescription,
                }}
              />
            )}
          </div>
          {elementBoxDescription &&
            elementBoxDescription.offsetHeight > 400 && (
              <div className=" text-center btn-show-hide ">
                {!checkShowInfo ? (
                  <span onClick={() => handleShowHide("show")}>Xem thêm</span>
                ) : (
                  <span onClick={() => handleShowHide("hide")}>Thu gọn</span>
                )}
              </div>
            )}
        </div>

        {dataProductsCompare && Object.keys(dataProductsCompare).length > 1 && (
          <CompareProducts
            status={status}
            dataProductsCompare={dataProductsCompare}
          />
        )}

        <Modal
          title={`Thông số kĩ thuật`}
          open={modalDetail}
          footer={null}
          onCancel={handleCancel}
          width={800}
        >
          <div className="box_content_parameter custom_scroll">
            {dataProduct &&
              dataProduct.parameter &&
              dataProduct.parameter.length > 0 &&
              dataProduct.parameter.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      index % 2 == 0 ? "bg_parameter" : ""
                    } box_parameter `}
                  >
                    <span className="title_parameter">{item.catOption}:</span>{" "}
                    <span className="value_parameter">
                      {item.nameCatOption || "Chưa cập nhật"}
                    </span>
                  </div>
                );
              })}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default memo(InfoProduct);
