"use client";

import { MenuOutlined } from "@ant-design/icons";
import { Fragment } from "react";
import ComponentBackdropFilter from "../../components/componentBackdropFilter";
import { UseAppContext } from "../lib/appProvider";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

import Breadcrumb from "../../components/breadcrumb";

const CategoryNews = ({ dataCategory, categoryNews }) => {
  const { menuCategories, setMenuCategories } = UseAppContext();

  return (
    <Fragment>
      <div className="box-container-category-news">
        <div className="in-box-container-category-news pt-2">
          <div className="row box-content-category-news mx-0">
            <div className="col-12 px-0 mb-2">
              <Breadcrumb
                // nameFirstItem={{
                //   link: "/news",
                //   label: "Tin tức",
                // }}
                nameItem={"Tin tức"}
              />
            </div>

            <div className="col-12 d-lg-block d-none px-0">
              <h3 className="text_news mb-0">TIN MỚI</h3>
            </div>

            <div className="col-12 d-lg-block d-none px-0 mb-2">
              <div className="  box_categories">
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    prevEl: ".prev_news_category",
                    nextEl: ".next_news_category",
                  }}
                  slidesPerView={"auto"}
                  spaceBetween={30}
                  className="mySwiper_news_category"
                >
                  <SwiperSlide className="box_text_item_category">
                    <Link href="/news/tin-khuyen-mai">
                      <div className="">
                        <span className={`text_item_category  `}>
                          Tin khuyến mãi
                        </span>
                      </div>
                    </Link>
                  </SwiperSlide>
                  {dataCategory &&
                    dataCategory.length > 0 &&
                    dataCategory.map((item, index) => (
                      <SwiperSlide
                        key={item.cat_id}
                        className="box_text_item_category"
                      >
                        <Link
                          href={`/news?categoryNews=${item?.news_category_desc?.friendly_url}`}
                        >
                          <div className="">
                            <span
                              className={`text_item_category ${
                                item?.news_category_desc?.friendly_url ===
                                categoryNews
                                  ? "active_category"
                                  : ""
                              }`}
                            >
                              {item?.news_category_desc?.cat_name}
                            </span>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))}

                  <div className="prev_news_category">
                    <GrLinkPrevious />
                  </div>
                  <div className="next_news_category">
                    {" "}
                    <GrLinkNext />
                  </div>
                </Swiper>
              </div>
            </div>
            <div className="d-block d-lg-none col-12 box_categories pb-2 pt-1">
              <div className="position-relative">
                <div className="d-flex menu_categories">
                  <div className="in_box_categories ">
                    {dataCategory && dataCategory.length > 0 && (
                      <div className="box_text_item_category">
                        {dataCategory.slice(0, 3).map((item, index) => (
                          <Link key={index} href={"/news/tin-khuyen-mai"}>
                            <span
                              className={`text_item_category ${
                                index === 0 ? "active_category" : ""
                              }`}
                            >
                              {item.cat_id}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <div
                    onClick={() => setMenuCategories(!menuCategories)}
                    className="box_hamburger"
                  >
                    <MenuOutlined />
                  </div>
                </div>

                <div
                  className={`container_item_categories_mobile ${
                    menuCategories ? "d-block" : "d-none"
                  }`}
                >
                  {dataCategory &&
                    dataCategory.length > 0 &&
                    dataCategory.map((item, index) => (
                      <div className="item_in_container" key={index}>
                        <span className={`text_item_category `}>
                          {item.cat_id}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {menuCategories && (
        <ComponentBackdropFilter onClick={() => setMenuCategories(false)} />
      )}
    </Fragment>
  );
};

export default CategoryNews;
