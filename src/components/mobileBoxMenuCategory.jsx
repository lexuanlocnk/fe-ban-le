"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { hostApi } from "../app/lib/config";

const fetchMenuCategories = async () => {
  try {
    const response = await fetch(`${hostApi}/member/category-menu`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

const MobileBoxMenuCategory = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (menuId) => {
    setActiveCategory(menuId); // Cập nhật ID của danh mục được chọn
  };

  const [dataMenuCategories, setDataMenuCategories] = useState([]);
  const [hasFetched, setHasFetched] = useState(false); // Trạng thái theo dõi việc fetch

  useEffect(() => {
    if (!hasFetched) {
      // Chỉ fetch nếu chưa fetch
      const loadData = async () => {
        const data = await fetchMenuCategories();
        setDataMenuCategories(data || []); // Đảm bảo không bị lỗi khi không có dữ liệu
        setHasFetched(true); // Đánh dấu là đã fetch
      };

      loadData();
    }
  }, [hasFetched]); // Chỉ chạy khi `hasFetched` là false

  return (
    <div className="mb_box_menu_category">
      <div className="mb_box_content_menu_category">
        <div className="menu_category_item_container_mb custom_scroll">
          {dataMenuCategories.length > 0 &&
            dataMenuCategories.map((item) => (
              <div
                className={`menu_category_item_mb ${
                  activeCategory === item.menu_id ? "active" : ""
                }`}
                key={item.menu_id}
                onClick={() => handleCategoryClick(item.menu_id)}
              >
                {item.menu_desc?.title}
              </div>
            ))}
        </div>
        {dataMenuCategories.length > 0 &&
          dataMenuCategories.map((item) => (
            <div
              className={`mb_item_category_menu custom_scroll ${
                activeCategory === item.menu_id ? "active" : "hidden"
              }`} // Hiển thị khi danh mục được chọn
              key={item.menu_id}
            >
              <Link
                className="mb_text_category_menu"
                href={`/category/${item.menu_desc?.link}`}
              >
                {item.menu_desc?.title}
              </Link>

              <div className="mb_box_menu_categories_children">
                {item.parenty?.map((i) => (
                  <div key={i.menu_id} className="mb_box_full_sub_menu">
                    <Link
                      title={i.menu_desc.title}
                      href=""
                      className="mb_text_sub_category_menu"
                    >
                      {i.menu_desc.title}
                    </Link>

                    <div className="mb_box_value_sub_menu_container">
                      {i.parentx
                        .filter((i2) => i2.menu_desc.link !== "#")
                        .map((i2) => (
                          <div className="mb-box-value-menu-p-5">
                            <div
                              key={i2.menu_id}
                              className="mb_box_value_menu_sub"
                            >
                              <Link
                                title={i2.menu_desc.title}
                                href={`/category/${i2.menu_desc.link}`}
                              >
                                {i2.menu_desc.title}
                              </Link>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MobileBoxMenuCategory;
