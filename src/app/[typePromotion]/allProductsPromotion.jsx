"use client";
import ComponentCardProductBasic from "../../components/componentCardProductBasic";
import { Navigation, Grid } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

const AllProductsPromotion = ({ data }) => {
  return (
    <div>
      {data && data.showAllFlashSale && data.showAllFlashSale.length > 0 && (
        <div className="box_container_products_promotion my-3">
          <div className="box_all_products_flash_sale">
            <div className="img_flash_sale_all"></div>
            <div className="product_all_flash_sale ">
              <div className="">
                <Swiper
                  slidesPerView={5}
                  grid={{
                    rows: 2,
                    fill: "row",
                  }}
                  navigation={true}
                  spaceBetween={5}
                  modules={[Grid, Navigation]}
                  className=" mySwiper"
                >
                  {data.showAllFlashSale.map((product, index) => (
                    <SwiperSlide className="" key={index}>
                      {" "}
                      <ComponentCardProductBasic item={product} col={""} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AllProductsPromotion;
