"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { hostImage } from "./lib/config";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const ProductsCategory = ({ dataCategory, category }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span className="' + className + ' custom_bullet"></span>';
    },
  };

  const handleChangeCategory = (item) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", item.friendly_url.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <div className="col-12  ">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          pagination={pagination}
          modules={[Pagination]}
          className="mySwiper myswiper_featured_products_category px-3  "
        >
          {dataCategory &&
            dataCategory?.length > 0 &&
            dataCategory?.map((item, index) => (
              <SwiperSlide
                key={index}
                className="swiper_featured_products_category"
              >
                <div
                  onClick={() =>
                    router.replace(handleChangeCategory(item), {
                      scroll: false,
                    })
                  }
                  className={`row ${
                    item.friendly_url == category ? "bg_active" : ""
                  }   item_featured_products_category`}
                >
                  <div className="col-12 d-flex justify-content-center container_image_featured_products_category">
                    <div className="box_image_featured_products_category">
                      <Image
                        // loader={loader}
                        quality={75}
                        height={50}
                        width={55}
                        src={hostImage + item.category.picture}
                        alt={item.cat_name}
                      />
                    </div>
                  </div>
                  <div className="col-12 ">
                    <div className="  box_text_featured_products_category">
                      <span className="text_featured_products_category">
                        {item.cat_name}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};
export default ProductsCategory;
