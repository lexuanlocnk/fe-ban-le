"use client";

import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import { hostImage } from "../../lib/config";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const StandardCategoryProduct = ({
  listBrand,
  getValueParams,
  nameCategory,
  totalProduct,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const standardProduct = [
    {
      url: "/image/standard/2in1.png",
      name: "Cảm ứng 2 trong 1",
    },
    {
      url: "/image/standard/gaming.png",
      name: "Gaming",
    },
    {
      url: "/image/standard/graphics.png",
      name: "Đồ họa",
    },
    {
      url: "/image/standard/laptopai.png",
      name: "Laptop AI",
    },
    {
      url: "/image/standard/office.png",
      name: "Văn phòng",
    },
    {
      url: "/image/standard/student.png",
      name: "Sinh viên",
    },
    {
      url: "/image/standard/thinlight.png",
      name: "Mỏng và nhẹ",
    },
    {
      url: "/image/standard/workstation.png",
      name: "Workstation",
    },
  ];
  const activeBrand = getValueParams["thuong-hieu"];

  const createPageURL = (value) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");

    params.set("thuong-hieu", value.slug);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="  box_products_category bg-white mt-2 ">
      <div className="main_content_products_category">
        <div className="box_filter_basic">
          <span className="text_title_products ">
            Danh mục sản phẩm: {nameCategory} ({totalProduct} sản phẩm)
          </span>
          <div className="box_brand_product my-3">
            {listBrand &&
              listBrand?.length > 0 &&
              listBrand?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => createPageURL(item)}
                  className={
                    item.slug === activeBrand
                      ? "active_brand item_img"
                      : "item_img"
                  }
                >
                  <Image
                    alt={item.catName}
                    src={hostImage + item.picture}
                    height={0}
                    width={0}
                    sizes="100vw"
                    quality={70}
                    className="w-100 h-100"
                  />
                </div>
              ))}
          </div>
          <span className="text_title_select_product">Chọn theo nhu cầu</span>
          <div className="box_standard_product">
            {standardProduct &&
              standardProduct.length > 0 &&
              standardProduct.map((item, index) => (
                <Card
                  className="item_card_standard_product"
                  key={index}
                  style={{ width: "110px" }}
                  hoverable
                  cover={
                    <Image
                      alt={item.name}
                      src={item.url}
                      height={0}
                      width={0}
                      sizes="100vw"
                      quality={70}
                      className="w-100 h-100"
                    />
                  }
                >
                  <Meta title={item.name} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardCategoryProduct;
