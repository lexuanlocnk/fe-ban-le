import Image from "next/image";
import ButtonChooseAccessory from "./buttonChooseAccessory";
import { RiDeleteBin5Line } from "react-icons/ri";
import { hostImage } from "../lib/config";
import { useSession } from "next-auth/react";

const ItemConfiguration = ({
  setAccessories,
  accessories,
  checkedConfiguration,
  dataBuildPc,
}) => {
  const { status } = useSession();

  const incrementQuantity = (categoryId, part) => {
    setAccessories((prevItems) => ({
      ...prevItems,
      [categoryId]: {
        ...prevItems[categoryId],
        [part]: {
          ...prevItems[categoryId][part],
          quantity: prevItems[categoryId][part].quantity + 1,
        },
      },
    }));
  };

  const decrementQuantity = (categoryId, part) => {
    setAccessories((prevItems) => ({
      ...prevItems,
      [categoryId]: {
        ...prevItems[categoryId],
        [part]: {
          ...prevItems[categoryId][part],
          quantity: Math.max(prevItems[categoryId][part].quantity - 1, 1),
        },
      },
    }));
  };

  const removeAccessory = (keyToRemove) => {
    setAccessories((prev) => {
      // Sao chép state hiện tại
      const updatedAccessories = { ...prev };

      // Kiểm tra xem configuration có tồn tại trong state không
      if (checkedConfiguration.idConfiguration in updatedAccessories) {
        // Sao chép thông tin của configuration hiện tại
        const updatedConfiguration = {
          ...updatedAccessories[checkedConfiguration.idConfiguration],
        };

        // Kiểm tra xem keyToRemove có tồn tại trong configuration hiện tại không
        if (keyToRemove in updatedConfiguration) {
          // Xóa mục cần xóa từ configuration hiện tại
          delete updatedConfiguration[keyToRemove];

          // Cập nhật configuration trong state
          updatedAccessories[checkedConfiguration.idConfiguration] =
            updatedConfiguration;

          return updatedAccessories;
        }
      }

      // Trường hợp không có gì thay đổi, trả về state hiện tại
      return prev;
    });
  };

  return (
    <div className="container_item_configuration">
      {dataBuildPc?.length > 0 &&
        dataBuildPc.map((item, index) => {
          const accessory =
            accessories[checkedConfiguration.idConfiguration]?.[item.catId];

          return (
            <div className="item_accessory" key={index}>
              <div className="box_info_basic_accessory">
                <div className="title_accessory">
                  <span>{item.catName}</span>
                </div>
                <div className="icon_configuration">
                  {accessory ? (
                    <Image
                      src={hostImage + accessory.Picture}
                      alt={accessory.ProductName}
                      width={70}
                      height={70}
                    />
                  ) : (
                    <Image
                      src={hostImage + item.picture}
                      alt={item.catName}
                      width={70}
                      height={70}
                    />
                  )}
                </div>
                {accessory ? (
                  <div className="box_basic_info_accessory ">
                    <div className="title_name_accessory  ">
                      <span className="text_genaral_two_line">
                        {accessory.ProductName}
                      </span>
                    </div>
                    <div className="box_quality_accessory ">
                      {accessory?.quantity && accessory?.quantity > 1 ? (
                        <div
                          className="item_up_down"
                          onClick={() =>
                            decrementQuantity(
                              checkedConfiguration.idConfiguration,
                              item.catId
                            )
                          }
                        >
                          <span>-</span>
                        </div>
                      ) : (
                        <div
                          className="item_up_down"
                          onClick={() => removeAccessory(item.catId)}
                        >
                          <RiDeleteBin5Line />
                        </div>
                      )}

                      <span>{accessory.quantity}</span>
                      <div
                        onClick={() =>
                          incrementQuantity(
                            checkedConfiguration.idConfiguration,
                            item.catId
                          )
                        }
                        className="item_up_down"
                      >
                        <span>+</span>
                      </div>
                    </div>
                    <div className="box_price_quality_accessory  ">
                      <div className="price_main_accessory">
                        <span>
                          {status === "unauthenticated"
                            ? // Đoạn mã khi không xác thực
                              accessory.Price.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })
                            : // Đoạn mã khi đã xác thực
                            status === "loading"
                            ? "Đang cập nhật"
                            : accessory.PriceOld.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}
                        </span>
                      </div>

                      <div className="price_accessory"></div>
                    </div>
                  </div>
                ) : (
                  <div className="title_description">
                    <span>Vui lòng chọn linh kiện</span>
                  </div>
                )}
              </div>
              <ButtonChooseAccessory
                item={item}
                checkedConfiguration={checkedConfiguration}
                accessories={accessories}
                setAccessories={setAccessories}
                keyAccessory={item.catId}
                nameAccessory={item.catName}
              />
            </div>
          );
        })}
    </div>
  );
};

export default ItemConfiguration;
