"use client";
import { Fragment } from "react";
import { FaCheck } from "react-icons/fa6";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const SortProduct = ({ getValueParams }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChooseSort = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value.key); // Use join to convert array to comma-separated string

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const itemSort = [
    // {
    //   title: "Khuyến mãi tốt nhất",
    //   key: "best_promotion",
    // },

    {
      title: "Giá giảm dần",
      key: "DESC",
    },
    {
      title: "Giá tăng dần",
      key: "ASC",
    },
    {
      title: "Sản phẩm mới nhất",
      key: "new_products",
    },
    {
      title: "Sản phẩm bán chạy nhất",
      key: "best_seller",
    },
  ];

  return (
    <div className="  box_sort_product bg-white mt-2 custom_scroll">
      <div className="main_content_sort_product">
        <div className="box_sort_container">
          <div className="box_title_sort_product">
            <span>Sắp xếp theo</span>
          </div>
          <div className="box_btn_sort_product">
            {itemSort &&
              itemSort?.length > 0 &&
              itemSort?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleChooseSort(item)}
                  className={`item_sort_product ${
                    item.key == (getValueParams["sort"] ?? "DESC")
                      ? "border_active"
                      : ""
                  }`}
                >
                  {item.title}
                  {item.key == (getValueParams["sort"] ?? "DESC") && (
                    <Fragment>
                      <div className="bg_swoosh"></div>
                      <FaCheck className="icon_swoosh" />
                    </Fragment>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortProduct;
