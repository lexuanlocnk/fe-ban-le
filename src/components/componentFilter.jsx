"use client";

import { Menu, ConfigProvider, Tooltip, Slider, Checkbox } from "antd";
import { Fragment, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { IoIosCloseCircle } from "react-icons/io";
import { useDebouncedCallback } from "use-debounce";

const ComponentFilter = ({ dataProperties, getValueParams }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();

  const [openKeys, setOpenKeys] = useState(["1", "2", "3", "4", "5", "6"]);
  const [showMoreFilter, setShowMoreFilter] = useState({
    brand: true,
    demand: true,
  });

  const onOpenChangeMenu = (openKeys) => {
    setOpenKeys(openKeys);
  };

  const onChangeSlider = useDebouncedCallback((valueSlider) => {
    const keys = ["minPrice", "maxPrice"];

    const params = new URLSearchParams(searchParams);
    keys.forEach((key, index) => {
      if (valueSlider[index] !== undefined) {
        params.set(key, valueSlider[index]);
      }
    });

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 700);

  // const onChangeSlider = (valueSlider) => {
  //   setDataPrice((previousState) => ({
  //     ...previousState,
  //     min: valueSlider[0],
  //     max: valueSlider[1],
  //   }));
  // };

  const handleShowHide = (key) => {
    setShowMoreFilter((previousState) => ({
      ...previousState,
      [key]: !previousState[key],
    }));
  };

  const handleChooseProperty = (value, key) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, [value]); // Use join to convert array to comma-separated string
    params.delete("page");
    if (value.length == 0) {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const removeProperty = (key, valueToRemove) => {
    const params = new URLSearchParams(searchParams);

    const updatedValues = (params.get(key)?.split(",") || []).filter(
      (value) => value !== valueToRemove
    );

    updatedValues.length
      ? params.set(key, updatedValues.join(","))
      : params.delete(key);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const formatter = (value) =>
    `${value?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    })}`;

  return (
    <Fragment>
      <div className="box_value_selected_checkbox">
        {Object.entries(getValueParams).map(([key, value]) => {
          const itemPro = dataProperties.option.find(
            (item) => item.slug === key
          );
          if (itemPro) {
            return itemPro.subCateOption
              .filter((subItem) => value.split(",").includes(subItem.slug))
              .map((subItem) => {
                return (
                  <span
                    onClick={() => removeProperty(itemPro.slug, subItem.slug)}
                    className="item_value_selected_checkbox"
                    key={subItem.slug}
                  >
                    <div className="text_item_selected_checkbox">
                      {subItem.catName}
                    </div>
                    <IoIosCloseCircle />
                  </span>
                );
              });
          }
          return null;
        })}
      </div>

      <div className="box_price_slider">
        <span className="price_slide">Khoảng giá</span>
        <div className="slider_filter_price">
          <div className="box_input_value_slider ">
            <div className="input_value_slider">
              <span>
                {getValueParams.minPrice
                  ? Number(getValueParams.minPrice).toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })
                  : dataProperties.rangePrice.minPrice.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
              </span>
            </div>
            <div className="input_value_slider">
              <span>
                {getValueParams.maxPrice
                  ? Number(getValueParams.maxPrice).toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })
                  : dataProperties?.rangePrice.maxPrice?.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
              </span>
            </div>
          </div>
          <Slider
            tooltip={{
              formatter,
            }}
            defaultValue={[
              getValueParams["minPrice"] ?? dataProperties.rangePrice.minPrice,
              getValueParams["maxPrice"] ?? dataProperties.rangePrice.maxPrice,
            ]}
            min={dataProperties.rangePrice.minPrice}
            max={dataProperties.rangePrice.maxPrice}
            range
            onChange={onChangeSlider}
          />
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemHoverBg: "white",
              itemSelectedColor: "rgba(0, 0, 0, 0.88)",
              itemSelectedBg: "white",
              itemActiveBg: "rgba(0, 0, 0, 0.02)",
            },
          },
        }}
      >
        <Menu
          mode="inline"
          onOpenChange={onOpenChangeMenu}
          defaultSelectedKeys={[]}
          openKeys={openKeys}
        >
          {dataProperties &&
            dataProperties?.option?.length > 0 &&
            dataProperties?.option?.map((item, index) =>
              item && item.subCateOption && item.subCateOption.length > 0 ? (
                <Menu.SubMenu
                  className="item_menu_custom"
                  key={index + 1}
                  title={item.catName}
                >
                  <Menu.Item
                    key={(index + 1) * 10 + 1}
                    className="item_sub_menu_custom"
                  >
                    {item?.subCateOption?.length > 0 && (
                      <div className="text-center box_content_item_checkbox">
                        <Checkbox.Group
                          value={getValueParams && getValueParams[item.slug]}
                          name={item.label}
                          className={`${
                            showMoreFilter[item.slug]
                              ? "custum_display_column_sub_menu"
                              : "custum_display_grid_sub_menu"
                          }`}
                          key={index}
                          // options={
                          //   showMoreFilter[item.slug]
                          //     ? item?.children[0]?.value
                          //     : item?.children[0]?.value.slice(0, 4)
                          // }
                          onChange={(e) => handleChooseProperty(e, item.slug)}
                        >
                          {showMoreFilter[item.slug]
                            ? item?.subCateOption?.map((itemSub, index) => (
                                <Tooltip
                                  key={index}
                                  placement="topLeft"
                                  color={"#2db7f5"}
                                  title={itemSub.catName}
                                >
                                  <Checkbox value={itemSub.slug}>
                                    {itemSub.catName}
                                  </Checkbox>
                                </Tooltip>
                              ))
                            : item?.subCateOption
                                .slice(0, 4)
                                .map((itemSub, index) => (
                                  <Tooltip
                                    key={index}
                                    placement="topLeft"
                                    color={"#2db7f5"}
                                    title={itemSub.catName}
                                  >
                                    <Checkbox value={itemSub.slug}>
                                      {itemSub.catName}
                                    </Checkbox>
                                  </Tooltip>
                                ))}
                        </Checkbox.Group>
                        {showMoreFilter && showMoreFilter[item.slug] ? (
                          <div onClick={() => handleShowHide(item.slug)}>
                            <span className="text_hide_show"> Thu gọn</span>
                          </div>
                        ) : (
                          <div onClick={() => handleShowHide(item.slug)}>
                            <span className="text_hide_show">Xem thêm</span>
                          </div>
                        )}
                      </div>
                    )}
                  </Menu.Item>
                </Menu.SubMenu>
              ) : (
                <Menu.Item className="item_menu_custom" key={index}>
                  {item.catName}
                </Menu.Item>
              )
            )}
        </Menu>
      </ConfigProvider>
    </Fragment>
  );
};

export default ComponentFilter;
