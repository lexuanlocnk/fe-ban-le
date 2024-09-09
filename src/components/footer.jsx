import React from "react";
import { Tag } from "antd";
import { redirect } from "next/navigation";

import "../../public/css/cssFooter.css";
import Image from "next/image";
import { hostApi } from "../app/lib/config";
import Link from "next/link";
import { error } from "console";

async function fetchMostSearch() {
  try {
    const response = await fetch(`${hostApi}/member/statistics-category`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("fetchMostSearch Network response was not ok");
    }

    const data = await response.json();

    if (!data.status || !data.data) {
      redirect("/");
    }
    return data.data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const Footer = async () => {
  const dataMostSearch = await fetchMostSearch();

  return (
    <footer className="py-4 footer_main_container">
      <div id="main_footer" className="footer_main">
        <div className="container_footer row">
          <div className="col-12 container_policy ">
            <div className="row mx-0">
              <div className="col-md-custom-3 box_policy d-flex align-items-center col-custom-3 px-1">
                <div className="row">
                  <div className="box_img_policy col-md-auto ">
                    <Image
                      quality={75}
                      height={45}
                      width={45}
                      sizes="100vw"
                      src="/image/contact.png"
                      className="img_policy"
                      alt="img_icon_share"
                    />
                  </div>
                  <span className="title_policy col-md-auto d-flex align-items-center px-1">
                    Hỗ trợ 24h/7 ngày
                  </span>
                </div>
              </div>
              <div className="col-md-custom-3 box_policy d-flex align-items-center col-custom-3 px-1">
                <div className="row">
                  <div className="box_img_policy col-md-auto ">
                    <Image
                      quality={75}
                      height={45}
                      width={45}
                      sizes="100vw"
                      src="/image/pay.png"
                      className="img_policy"
                      alt="img_icon_share"
                    />
                  </div>
                  <span className="title_policy col-md-auto d-flex align-items-center px-1">
                    Thanh toán tiện lợi, an toàn
                  </span>
                </div>
              </div>
              <div className="col-md-custom-3 box_policy d-flex align-items-center col-custom-3 px-1">
                <div className="row">
                  <div className="box_img_policy col-md-auto ">
                    <Image
                      quality={75}
                      height={45}
                      width={45}
                      sizes="100vw"
                      src="/image/change.png"
                      className="img_policy"
                      alt="img_icon_share"
                    />
                  </div>
                  <span className="title_policy col-md-auto d-flex align-items-center px-1">
                    Đổi trả miễn phí
                  </span>
                </div>
              </div>
              <div className="col-md-custom-3 box_policy d-flex align-items-center col-custom-3 px-1">
                <div className="row">
                  <div className="box_img_policy col-md-auto ">
                    <Image
                      quality={75}
                      height={45}
                      width={45}
                      sizes="100vw"
                      src="/image/price_product.png"
                      className="img_policy"
                      alt="img_icon_share"
                    />
                  </div>
                  <span className="title_policy col-md-auto d-flex align-items-center px-1">
                    Giá cả cạnh tranh
                  </span>
                </div>
              </div>
              <div className="col-md-custom-3 box_policy d-flex align-items-center col-custom-3 px-1">
                <div className="row">
                  <div className="box_img_policy col-md-auto ">
                    <Image
                      quality={75}
                      height={45}
                      width={45}
                      sizes="100vw"
                      src="/image/commit.png"
                      className="img_policy"
                      alt="img_icon_share"
                    />
                  </div>
                  <span className="title_policy col-md-auto d-flex align-items-center px-1">
                    Cam kết hàng chính hãng
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12 container_basic_infor  ">
            <div className="box_image_footer">
              <Image
                quality={75}
                height={0}
                width={0}
                sizes="100vw"
                src="/image/logo.jpg"
                className="w-100 h-100"
                alt="img_icon_share"
              />
            </div>
            <div className="infor_basic_footer text-center">
              <Tag color="purple" className="name_company text-center mb-1">
                Công ty TNHH Vi Tính Nguyên Kim
              </Tag>
              <span className="d-block info_basic">
                Địa chỉ : 245B Trần Quang Khải, p Tân Định, Quận 1, Tp. HCM
              </span>

              <span className="d-block info_basic mt-1 text-center">
                Giấy chứng nhận đăng ký kinh doanh số 0303753468 do Sở kế hoạch
                và đầu tư Tp. HCM cấp ngày 14/4/2005
              </span>
            </div>
          </div>
          <div className="col-md-8 col-12">
            <div className="row mt-md-0 mt-3">
              <div className="introduction_footer col-md-4 col-6  text-center">
                <Tag color="purple" className="title_footer text-center">
                  VỀ QUANGBAO
                </Tag>
                <div>
                  {" "}
                  <a href="#" className="infor_company_footer">
                    Giới thiệu công ty
                  </a>
                </div>

                <div>
                  {" "}
                  <a href="#" className="infor_company_footer">
                    Dịch vụ
                  </a>
                </div>

                <div>
                  {" "}
                  <a href="#" className="infor_company_footer">
                    Tư vấn hỏi đáp
                  </a>
                </div>

                <div>
                  <a href="#" className="infor_company_footer">
                    Tuyển dụng
                  </a>
                </div>
              </div>
              <div className="introduction_footer col-md-4 col-6 text-center">
                <Tag color="purple" className="title_footer text-center">
                  CHÍNH SÁCH MUA HÀNG
                </Tag>

                <div>
                  <a href="#" className="infor_company_footer">
                    Quy định thanh toán
                  </a>
                </div>
                <div>
                  <a href="#" className="infor_company_footer">
                    Chính sách bảo hành
                  </a>
                </div>
                <div>
                  <a href="#" className="infor_company_footer">
                    Chính sách giao hàng
                  </a>
                </div>
                <div>
                  <a href="#" className="infor_company_footer">
                    Chính sách bảo mật thông tin cá nhân
                  </a>
                </div>
                <div>
                  <a href="#" className="infor_company_footer">
                    Hướng dẫn gửi bảo hành
                  </a>
                </div>
                <div>
                  <a href="#" className="infor_company_footer">
                    Chính sách kiểm hàng
                  </a>
                </div>
                <div>
                  <a href="#" className="infor_company_footer">
                    Chính sách đổi sản phẩm
                  </a>
                </div>
                <div>
                  <a href="#" className="infor_company_footer">
                    Chính sách hoàn tiền
                  </a>
                </div>
              </div>

              <div className="col-md-4 mt-md-0 mt-2 col-12 text-center">
                <Tag color="purple" className="title_footer text-center">
                  HỖ TRỢ KHÁCH HÀNG
                </Tag>

                <span className="number_contact">Bán hàng: 1900 6739</span>
                <span className="number_contact">Bảo hành: 1900 6739</span>
                <div className="box_icon_social_network">
                  <Image
                    quality={75}
                    height={0}
                    width={0}
                    sizes="100vw"
                    src="/image/facebook.png"
                    alt="facebook"
                    className="icon_social_networt"
                  />
                </div>
                <div className="box_icon_social_network">
                  <Image
                    quality={75}
                    height={0}
                    width={0}
                    sizes="100vw"
                    src="/image/youtube.png"
                    alt="facebook"
                    className="icon_social_networt"
                  />
                </div>
                <div className="box_icon_social_network">
                  <Image
                    quality={75}
                    height={0}
                    width={0}
                    sizes="100vw"
                    src="/image/twitter.png"
                    alt="twitter"
                    className="icon_social_networt"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 keywords_hot">
            <div className="title_hotkey">
              <span>TÌM KIẾM NHIỀU:</span>
            </div>
            <div className="box_item_hotkey">
              {dataMostSearch &&
                dataMostSearch.length > 0 &&
                dataMostSearch.map((item, index) => (
                  <Tag key={index} className="item_hotkey mt-1">
                    <Link
                      className="text_genaral_one_line"
                      href={
                        item?.type == "product"
                          ? `/detail-product/${item?.url}`
                          : `/category/${item?.url}`
                      }
                    >
                      {item.name}
                    </Link>
                  </Tag>
                ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
