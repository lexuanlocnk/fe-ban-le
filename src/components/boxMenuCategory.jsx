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

const BoxMenuCategory = () => {
  const [dataMenuCategories, setDataMenuCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMenuCategories();
      setDataMenuCategories(data || []); // Đảm bảo không bị lỗi khi không có dữ liệu
    };

    loadData();
  }, []);

  return (
    <div className="box_menu_category">
      <div className="box_content_menu_category">
        {dataMenuCategories.length > 0 &&
          dataMenuCategories.map((item) => (
            <div className="item_category_menu" key={item.menu_id}>
              <Link
                className="text_category_menu"
                href={`/category/${item.menu_desc?.link}`}
              >
                {item.menu_desc?.title}
              </Link>

              <div className="box_menu_categories_children">
                {item.parenty?.map((i) => (
                  <div key={i.menu_id} className="box_full_sub_menu">
                    <Link
                      title={i.menu_desc.title}
                      href=""
                      className="text_sub_category_menu"
                    >
                      {i.menu_desc.title}
                    </Link>

                    <div className="mt-3">
                      {i.parentx
                        .filter((i2) => i2.menu_desc.link !== "#")
                        .map((i2) => (
                          <div key={i2.menu_id} className="box_value_menu_sub">
                            <Link
                              title={i2.menu_desc.title}
                              href={`/category/${i2.menu_desc.link}`}
                            >
                              {i2.menu_desc.title}
                            </Link>
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

export default BoxMenuCategory;
